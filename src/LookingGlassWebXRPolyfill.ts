/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import WebXRPolyfill from "@lookingglass/webxr-polyfill/src/WebXRPolyfill"
import XRSystem from "@lookingglass/webxr-polyfill/src/api/XRSystem"
import API from "@lookingglass/webxr-polyfill/src/api/index"
import LookingGlassXRDevice from "./LookingGlassXRDevice"
import LookingGlassXRWebGLLayer from "./LookingGlassXRWebGLLayer"
import { ViewControlArgs, getLookingGlassConfig, updateLookingGlassConfig } from "./LookingGlassConfig"

export class LookingGlassWebXRPolyfill extends WebXRPolyfill {
	private vrButton: HTMLButtonElement | undefined
	public device: LookingGlassXRDevice
	/** true when previewing on Looking Glass */
	public isPresenting: boolean = false

	constructor(cfg?: Partial<ViewControlArgs>) {
		super()

		// Init the configuration
		updateLookingGlassConfig(cfg)

		// Replace Enter VR button with custom Looking Glass button
		this.overrideDefaultVRButton()

		console.warn('Looking Glass WebXR "polyfill" overriding native WebXR API.')
		for (const className in API) {
			this.global[className] = API[className]
		}
		this.global.XRWebGLLayer = LookingGlassXRWebGLLayer

		this.injected = true

		this.device = new LookingGlassXRDevice(this.global)
		this.xr = new XRSystem(Promise.resolve(this.device))
		Object.defineProperty(this.global.navigator, "xr", {
			value: this.xr,
			configurable: true,
		})
	}

	private async overrideDefaultVRButton() {
		this.vrButton = await waitForElement<HTMLButtonElement>("VRButton")

		if (this.vrButton) {
			this.device.addEventListener("@@webxr-polyfill/vr-present-start", () => {
				this.isPresenting = true
				this.updateVRButtonUI()
			})

			this.device.addEventListener("@@webxr-polyfill/vr-present-end", () => {
				this.isPresenting = false
				this.updateVRButtonUI()
			})

			this.vrButton.addEventListener("click", (ev: MouseEvent) => {
				this.updateVRButtonUI()
			})

			this.updateVRButtonUI()
		}
	}

	private updateVRButtonUI() {
		if (this.vrButton) {
			if (this.isPresenting) {
				this.vrButton.innerHTML = "EXIT LOOKING GLASS"
			}
			else {
				this.vrButton.innerHTML = "ENTER LOOKING GLASS"
			}
			
			const width = 220
			this.vrButton.style.width = `${width}px`
			this.vrButton.style.left = `calc(50% - ${width / 2}px)`
		}
	}

	public update(cfg: Partial<ViewControlArgs>) {
		updateLookingGlassConfig(cfg)
	}
}

/** Wait for an HTMLElement with a specific id to be added to the page */
async function waitForElement<T extends HTMLElement>(id: string): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				mutation.addedNodes.forEach(function (node) {
					const el = node as T
					if (el.id == id) {
						resolve(el)
						observer.disconnect()
					}
				})
			})
		})

		observer.observe(document.body, { subtree: false, childList: true })

		// Disconnect the observer after 5 seconds if we dont find the element
		setTimeout(() => {
			observer.disconnect()
			reject(`id:${id} not found`)
		}, 5000)
	})
}

/**
 * Get the global Looking Glass Config.
 * @deprecated In order to migrate to the latest setup, pass the config into LookingGlassWebXRPolyfill
 * ```
 * new LookingGlassWebXRPolyfill({
 * 	 tileHeight: 512,
 *   numViews: 45,
 *  ...
 * })
 * ```
 */
export const LookingGlassConfig = getLookingGlassConfig()