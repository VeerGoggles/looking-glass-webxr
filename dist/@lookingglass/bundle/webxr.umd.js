var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2["Looking Glass WebXR"] = {}));
})(this, function(exports2) {
  "use strict";
  const PRIVATE$j = Symbol("@@webxr-polyfill/EventTarget");
  class EventTarget$1 {
    constructor() {
      this[PRIVATE$j] = {
        listeners: /* @__PURE__ */ new Map()
      };
    }
    addEventListener(type, listener) {
      if (typeof type !== "string") {
        throw new Error("`type` must be a string");
      }
      if (typeof listener !== "function") {
        throw new Error("`listener` must be a function");
      }
      const typedListeners = this[PRIVATE$j].listeners.get(type) || [];
      typedListeners.push(listener);
      this[PRIVATE$j].listeners.set(type, typedListeners);
    }
    removeEventListener(type, listener) {
      if (typeof type !== "string") {
        throw new Error("`type` must be a string");
      }
      if (typeof listener !== "function") {
        throw new Error("`listener` must be a function");
      }
      const typedListeners = this[PRIVATE$j].listeners.get(type) || [];
      for (let i = typedListeners.length; i >= 0; i--) {
        if (typedListeners[i] === listener) {
          typedListeners.pop();
        }
      }
    }
    dispatchEvent(type, event) {
      const typedListeners = this[PRIVATE$j].listeners.get(type) || [];
      const queue = [];
      for (let i = 0; i < typedListeners.length; i++) {
        queue[i] = typedListeners[i];
      }
      for (let listener of queue) {
        listener(event);
      }
      if (typeof this[`on${type}`] === "function") {
        this[`on${type}`](event);
      }
    }
  }
  const EPSILON$1 = 1e-6;
  let ARRAY_TYPE$1 = typeof Float32Array !== "undefined" ? Float32Array : Array;
  function create$5() {
    let out = new ARRAY_TYPE$1(16);
    if (ARRAY_TYPE$1 != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  function copy$3(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function invert$2(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  function multiply$1(out, a, b) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  function fromRotationTranslation(out, q, v) {
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;
    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  function getRotation(out, mat) {
    let trace = mat[0] + mat[5] + mat[10];
    let S = 0;
    if (trace > 0) {
      S = Math.sqrt(trace + 1) * 2;
      out[3] = 0.25 * S;
      out[0] = (mat[6] - mat[9]) / S;
      out[1] = (mat[8] - mat[2]) / S;
      out[2] = (mat[1] - mat[4]) / S;
    } else if (mat[0] > mat[5] && mat[0] > mat[10]) {
      S = Math.sqrt(1 + mat[0] - mat[5] - mat[10]) * 2;
      out[3] = (mat[6] - mat[9]) / S;
      out[0] = 0.25 * S;
      out[1] = (mat[1] + mat[4]) / S;
      out[2] = (mat[8] + mat[2]) / S;
    } else if (mat[5] > mat[10]) {
      S = Math.sqrt(1 + mat[5] - mat[0] - mat[10]) * 2;
      out[3] = (mat[8] - mat[2]) / S;
      out[0] = (mat[1] + mat[4]) / S;
      out[1] = 0.25 * S;
      out[2] = (mat[6] + mat[9]) / S;
    } else {
      S = Math.sqrt(1 + mat[10] - mat[0] - mat[5]) * 2;
      out[3] = (mat[1] - mat[4]) / S;
      out[0] = (mat[8] + mat[2]) / S;
      out[1] = (mat[6] + mat[9]) / S;
      out[2] = 0.25 * S;
    }
    return out;
  }
  function perspective$1(out, fovy, aspect, near, far) {
    let f = 1 / Math.tan(fovy / 2), nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
  }
  function create$4() {
    let out = new ARRAY_TYPE$1(3);
    if (ARRAY_TYPE$1 != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    return out;
  }
  function clone$2(a) {
    var out = new ARRAY_TYPE$1(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function length(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  function fromValues$2(x, y, z) {
    let out = new ARRAY_TYPE$1(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function copy$2(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  function normalize$2(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let len2 = x * x + y * y + z * z;
    if (len2 > 0) {
      len2 = 1 / Math.sqrt(len2);
      out[0] = a[0] * len2;
      out[1] = a[1] * len2;
      out[2] = a[2] * len2;
    }
    return out;
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function cross(out, a, b) {
    let ax = a[0], ay = a[1], az = a[2];
    let bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  function transformQuat(out, a, q) {
    let qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    let x = a[0], y = a[1], z = a[2];
    let uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
    let uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
    let w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;
    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  function angle(a, b) {
    let tempA = fromValues$2(a[0], a[1], a[2]);
    let tempB = fromValues$2(b[0], b[1], b[2]);
    normalize$2(tempA, tempA);
    normalize$2(tempB, tempB);
    let cosine = dot(tempA, tempB);
    if (cosine > 1) {
      return 0;
    } else if (cosine < -1) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  }
  const len = length;
  (function() {
    let vec = create$4();
    return function(a, stride, offset, count, fn, arg) {
      let i, l;
      if (!stride) {
        stride = 3;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }
      return a;
    };
  })();
  function create$3() {
    let out = new ARRAY_TYPE$1(9);
    if (ARRAY_TYPE$1 != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }
    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }
  function create$2() {
    let out = new ARRAY_TYPE$1(4);
    if (ARRAY_TYPE$1 != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }
    return out;
  }
  function clone$1(a) {
    let out = new ARRAY_TYPE$1(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  function fromValues$1(x, y, z, w) {
    let out = new ARRAY_TYPE$1(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  function copy$1(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  function normalize$1(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    let len2 = x * x + y * y + z * z + w * w;
    if (len2 > 0) {
      len2 = 1 / Math.sqrt(len2);
      out[0] = x * len2;
      out[1] = y * len2;
      out[2] = z * len2;
      out[3] = w * len2;
    }
    return out;
  }
  (function() {
    let vec = create$2();
    return function(a, stride, offset, count, fn, arg) {
      let i, l;
      if (!stride) {
        stride = 4;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }
      return a;
    };
  })();
  function create$1() {
    let out = new ARRAY_TYPE$1(4);
    if (ARRAY_TYPE$1 != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    out[3] = 1;
    return out;
  }
  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  function multiply(out, a, b) {
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  function slerp(out, a, b, t) {
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];
    let omega, cosom, sinom, scale0, scale1;
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    if (cosom < 0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    if (1 - cosom > EPSILON$1) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1 - t;
      scale1 = t;
    }
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  function invert$1(out, a) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let dot2 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    let invDot = dot2 ? 1 / dot2 : 0;
    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
  }
  function fromMat3(out, m) {
    let fTrace = m[0] + m[4] + m[8];
    let fRoot;
    if (fTrace > 0) {
      fRoot = Math.sqrt(fTrace + 1);
      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      let i = 0;
      if (m[4] > m[0])
        i = 1;
      if (m[8] > m[i * 3 + i])
        i = 2;
      let j = (i + 1) % 3;
      let k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }
    return out;
  }
  function fromEuler(out, x, y, z) {
    let halfToRad = 0.5 * Math.PI / 180;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    let sx = Math.sin(x);
    let cx = Math.cos(x);
    let sy = Math.sin(y);
    let cy = Math.cos(y);
    let sz = Math.sin(z);
    let cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
  }
  const clone = clone$1;
  const fromValues = fromValues$1;
  const copy = copy$1;
  const normalize = normalize$1;
  (function() {
    let tmpvec3 = create$4();
    let xUnitVec3 = fromValues$2(1, 0, 0);
    let yUnitVec3 = fromValues$2(0, 1, 0);
    return function(out, a, b) {
      let dot$1 = dot(a, b);
      if (dot$1 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len(tmpvec3) < 1e-6)
          cross(tmpvec3, yUnitVec3, a);
        normalize$2(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot$1 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot$1;
        return normalize(out, out);
      }
    };
  })();
  (function() {
    let temp1 = create$1();
    let temp2 = create$1();
    return function(out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  })();
  (function() {
    let matr = create$3();
    return function(out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize(out, fromMat3(out, matr));
    };
  })();
  const PRIVATE$i = Symbol("@@webxr-polyfill/XRRigidTransform");
  class XRRigidTransform$1 {
    constructor() {
      this[PRIVATE$i] = {
        matrix: null,
        position: null,
        orientation: null,
        inverse: null
      };
      if (arguments.length === 0) {
        this[PRIVATE$i].matrix = identity(new Float32Array(16));
      } else if (arguments.length === 1) {
        if (arguments[0] instanceof Float32Array) {
          this[PRIVATE$i].matrix = arguments[0];
        } else {
          this[PRIVATE$i].position = this._getPoint(arguments[0]);
          this[PRIVATE$i].orientation = DOMPointReadOnly.fromPoint({
            x: 0,
            y: 0,
            z: 0,
            w: 1
          });
        }
      } else if (arguments.length === 2) {
        this[PRIVATE$i].position = this._getPoint(arguments[0]);
        this[PRIVATE$i].orientation = this._getPoint(arguments[1]);
      } else {
        throw new Error("Too many arguments!");
      }
      if (this[PRIVATE$i].matrix) {
        let position = create$4();
        getTranslation(position, this[PRIVATE$i].matrix);
        this[PRIVATE$i].position = DOMPointReadOnly.fromPoint({
          x: position[0],
          y: position[1],
          z: position[2]
        });
        let orientation = create$1();
        getRotation(orientation, this[PRIVATE$i].matrix);
        this[PRIVATE$i].orientation = DOMPointReadOnly.fromPoint({
          x: orientation[0],
          y: orientation[1],
          z: orientation[2],
          w: orientation[3]
        });
      } else {
        this[PRIVATE$i].matrix = identity(new Float32Array(16));
        fromRotationTranslation(
          this[PRIVATE$i].matrix,
          fromValues(
            this[PRIVATE$i].orientation.x,
            this[PRIVATE$i].orientation.y,
            this[PRIVATE$i].orientation.z,
            this[PRIVATE$i].orientation.w
          ),
          fromValues$2(
            this[PRIVATE$i].position.x,
            this[PRIVATE$i].position.y,
            this[PRIVATE$i].position.z
          )
        );
      }
    }
    _getPoint(arg) {
      if (arg instanceof DOMPointReadOnly) {
        return arg;
      }
      return DOMPointReadOnly.fromPoint(arg);
    }
    get matrix() {
      return this[PRIVATE$i].matrix;
    }
    get position() {
      return this[PRIVATE$i].position;
    }
    get orientation() {
      return this[PRIVATE$i].orientation;
    }
    get inverse() {
      if (this[PRIVATE$i].inverse === null) {
        let invMatrix = identity(new Float32Array(16));
        invert$2(invMatrix, this[PRIVATE$i].matrix);
        this[PRIVATE$i].inverse = new XRRigidTransform$1(invMatrix);
        this[PRIVATE$i].inverse[PRIVATE$i].inverse = this;
      }
      return this[PRIVATE$i].inverse;
    }
  }
  const PRIVATE$h = Symbol("@@webxr-polyfill/XRSpace");
  class XRSpace {
    constructor(specialType = null, inputSource = null) {
      this[PRIVATE$h] = {
        specialType,
        inputSource,
        baseMatrix: null,
        inverseBaseMatrix: null,
        lastFrameId: -1
      };
    }
    get _specialType() {
      return this[PRIVATE$h].specialType;
    }
    get _inputSource() {
      return this[PRIVATE$h].inputSource;
    }
    _ensurePoseUpdated(device, frameId) {
      if (frameId == this[PRIVATE$h].lastFrameId)
        return;
      this[PRIVATE$h].lastFrameId = frameId;
      this._onPoseUpdate(device);
    }
    _onPoseUpdate(device) {
      if (this[PRIVATE$h].specialType == "viewer") {
        this._baseMatrix = device.getBasePoseMatrix();
      }
    }
    set _baseMatrix(matrix) {
      this[PRIVATE$h].baseMatrix = matrix;
      this[PRIVATE$h].inverseBaseMatrix = null;
    }
    get _baseMatrix() {
      if (!this[PRIVATE$h].baseMatrix) {
        if (this[PRIVATE$h].inverseBaseMatrix) {
          this[PRIVATE$h].baseMatrix = new Float32Array(16);
          invert$2(this[PRIVATE$h].baseMatrix, this[PRIVATE$h].inverseBaseMatrix);
        }
      }
      return this[PRIVATE$h].baseMatrix;
    }
    set _inverseBaseMatrix(matrix) {
      this[PRIVATE$h].inverseBaseMatrix = matrix;
      this[PRIVATE$h].baseMatrix = null;
    }
    get _inverseBaseMatrix() {
      if (!this[PRIVATE$h].inverseBaseMatrix) {
        if (this[PRIVATE$h].baseMatrix) {
          this[PRIVATE$h].inverseBaseMatrix = new Float32Array(16);
          invert$2(this[PRIVATE$h].inverseBaseMatrix, this[PRIVATE$h].baseMatrix);
        }
      }
      return this[PRIVATE$h].inverseBaseMatrix;
    }
    _getSpaceRelativeTransform(space) {
      if (!this._inverseBaseMatrix || !space._baseMatrix) {
        return null;
      }
      let out = new Float32Array(16);
      multiply$1(out, this._inverseBaseMatrix, space._baseMatrix);
      return new XRRigidTransform$1(out);
    }
  }
  const DEFAULT_EMULATION_HEIGHT = 1.6;
  const PRIVATE$g = Symbol("@@webxr-polyfill/XRReferenceSpace");
  const XRReferenceSpaceTypes = [
    "viewer",
    "local",
    "local-floor",
    "bounded-floor",
    "unbounded"
  ];
  function isFloor(type) {
    return type === "bounded-floor" || type === "local-floor";
  }
  class XRReferenceSpace extends XRSpace {
    constructor(type, transform = null) {
      if (!XRReferenceSpaceTypes.includes(type)) {
        throw new Error(`XRReferenceSpaceType must be one of ${XRReferenceSpaceTypes}`);
      }
      super(type);
      if (type === "bounded-floor" && !transform) {
        throw new Error(`XRReferenceSpace cannot use 'bounded-floor' type if the platform does not provide the floor level`);
      }
      if (isFloor(type) && !transform) {
        transform = identity(new Float32Array(16));
        transform[13] = DEFAULT_EMULATION_HEIGHT;
      }
      this._inverseBaseMatrix = transform || identity(new Float32Array(16));
      this[PRIVATE$g] = {
        type,
        transform,
        originOffset: identity(new Float32Array(16))
      };
    }
    _transformBasePoseMatrix(out, pose) {
      multiply$1(out, this._inverseBaseMatrix, pose);
    }
    _originOffsetMatrix() {
      return this[PRIVATE$g].originOffset;
    }
    _adjustForOriginOffset(transformMatrix) {
      let inverseOriginOffsetMatrix = new Float32Array(16);
      invert$2(inverseOriginOffsetMatrix, this[PRIVATE$g].originOffset);
      multiply$1(transformMatrix, inverseOriginOffsetMatrix, transformMatrix);
    }
    _getSpaceRelativeTransform(space) {
      let transform = super._getSpaceRelativeTransform(space);
      this._adjustForOriginOffset(transform.matrix);
      return new XRRigidTransform(transform.matrix);
    }
    getOffsetReferenceSpace(additionalOffset) {
      let newSpace = new XRReferenceSpace(
        this[PRIVATE$g].type,
        this[PRIVATE$g].transform,
        this[PRIVATE$g].bounds
      );
      multiply$1(newSpace[PRIVATE$g].originOffset, this[PRIVATE$g].originOffset, additionalOffset.matrix);
      return newSpace;
    }
  }
  const PRIVATE$f = Symbol("@@webxr-polyfill/XR");
  const XRSessionModes = ["inline", "immersive-vr", "immersive-ar"];
  const DEFAULT_SESSION_OPTIONS = {
    "inline": {
      requiredFeatures: ["viewer"],
      optionalFeatures: []
    },
    "immersive-vr": {
      requiredFeatures: ["viewer", "local"],
      optionalFeatures: []
    },
    "immersive-ar": {
      requiredFeatures: ["viewer", "local"],
      optionalFeatures: []
    }
  };
  const POLYFILL_REQUEST_SESSION_ERROR = `Polyfill Error: Must call navigator.xr.isSessionSupported() with any XRSessionMode
or navigator.xr.requestSession('inline') prior to requesting an immersive
session. This is a limitation specific to the WebXR Polyfill and does not apply
to native implementations of the API.`;
  class XRSystem extends EventTarget$1 {
    constructor(devicePromise) {
      super();
      this[PRIVATE$f] = {
        device: null,
        devicePromise,
        immersiveSession: null,
        inlineSessions: /* @__PURE__ */ new Set()
      };
      devicePromise.then((device) => {
        this[PRIVATE$f].device = device;
      });
    }
    async isSessionSupported(mode) {
      if (!this[PRIVATE$f].device) {
        await this[PRIVATE$f].devicePromise;
      }
      if (mode != "inline") {
        return Promise.resolve(this[PRIVATE$f].device.isSessionSupported(mode));
      }
      return Promise.resolve(true);
    }
    async requestSession(mode, options) {
      if (!this[PRIVATE$f].device) {
        if (mode != "inline") {
          throw new Error(POLYFILL_REQUEST_SESSION_ERROR);
        } else {
          await this[PRIVATE$f].devicePromise;
        }
      }
      if (!XRSessionModes.includes(mode)) {
        throw new TypeError(
          `The provided value '${mode}' is not a valid enum value of type XRSessionMode`
        );
      }
      const defaultOptions = DEFAULT_SESSION_OPTIONS[mode];
      const requiredFeatures = defaultOptions.requiredFeatures.concat(
        options && options.requiredFeatures ? options.requiredFeatures : []
      );
      const optionalFeatures = defaultOptions.optionalFeatures.concat(
        options && options.optionalFeatures ? options.optionalFeatures : []
      );
      const enabledFeatures = /* @__PURE__ */ new Set();
      let requirementsFailed = false;
      for (let feature of requiredFeatures) {
        if (!this[PRIVATE$f].device.isFeatureSupported(feature)) {
          console.error(`The required feature '${feature}' is not supported`);
          requirementsFailed = true;
        } else {
          enabledFeatures.add(feature);
        }
      }
      if (requirementsFailed) {
        throw new DOMException("Session does not support some required features", "NotSupportedError");
      }
      for (let feature of optionalFeatures) {
        if (!this[PRIVATE$f].device.isFeatureSupported(feature)) {
          console.log(`The optional feature '${feature}' is not supported`);
        } else {
          enabledFeatures.add(feature);
        }
      }
      const sessionId = await this[PRIVATE$f].device.requestSession(mode, enabledFeatures);
      const session = new XRSession(this[PRIVATE$f].device, mode, sessionId);
      if (mode == "inline") {
        this[PRIVATE$f].inlineSessions.add(session);
      } else {
        this[PRIVATE$f].immersiveSession = session;
      }
      const onSessionEnd = () => {
        if (mode == "inline") {
          this[PRIVATE$f].inlineSessions.delete(session);
        } else {
          this[PRIVATE$f].immersiveSession = null;
        }
        session.removeEventListener("end", onSessionEnd);
      };
      session.addEventListener("end", onSessionEnd);
      return session;
    }
  }
  const _global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  let now;
  if ("performance" in _global === false) {
    let startTime = Date.now();
    now = () => Date.now() - startTime;
  } else {
    now = () => performance.now();
  }
  const now$1 = now;
  const PRIVATE$e = Symbol("@@webxr-polyfill/XRPose");
  class XRPose$1 {
    constructor(transform, emulatedPosition) {
      this[PRIVATE$e] = {
        transform,
        emulatedPosition
      };
    }
    get transform() {
      return this[PRIVATE$e].transform;
    }
    get emulatedPosition() {
      return this[PRIVATE$e].emulatedPosition;
    }
  }
  const PRIVATE$d = Symbol("@@webxr-polyfill/XRViewerPose");
  class XRViewerPose extends XRPose$1 {
    constructor(transform, views, emulatedPosition = false) {
      super(transform, emulatedPosition);
      this[PRIVATE$d] = {
        views
      };
    }
    get views() {
      return this[PRIVATE$d].views;
    }
  }
  const PRIVATE$c = Symbol("@@webxr-polyfill/XRViewport");
  class XRViewport {
    constructor(target) {
      this[PRIVATE$c] = { target };
    }
    get x() {
      return this[PRIVATE$c].target.x;
    }
    get y() {
      return this[PRIVATE$c].target.y;
    }
    get width() {
      return this[PRIVATE$c].target.width;
    }
    get height() {
      return this[PRIVATE$c].target.height;
    }
  }
  const XREyes = ["left", "right", "none"];
  const PRIVATE$b = Symbol("@@webxr-polyfill/XRView");
  class XRView {
    constructor(device, transform, eye, sessionId, viewIndex) {
      if (!XREyes.includes(eye)) {
        throw new Error(`XREye must be one of: ${XREyes}`);
      }
      const temp = /* @__PURE__ */ Object.create(null);
      const viewport = new XRViewport(temp);
      this[PRIVATE$b] = {
        device,
        eye,
        viewport,
        temp,
        sessionId,
        transform,
        viewIndex
      };
    }
    get eye() {
      return this[PRIVATE$b].eye;
    }
    get projectionMatrix() {
      return this[PRIVATE$b].device.getProjectionMatrix(this.eye, this[PRIVATE$b].viewIndex);
    }
    get transform() {
      return this[PRIVATE$b].transform;
    }
    _getViewport(layer) {
      if (this[PRIVATE$b].device.getViewport(
        this[PRIVATE$b].sessionId,
        this.eye,
        layer,
        this[PRIVATE$b].temp,
        this[PRIVATE$b].viewIndex
      )) {
        return this[PRIVATE$b].viewport;
      }
      return void 0;
    }
  }
  const PRIVATE$a = Symbol("@@webxr-polyfill/XRFrame");
  const NON_ACTIVE_MSG = "XRFrame access outside the callback that produced it is invalid.";
  const NON_ANIMFRAME_MSG = "getViewerPose can only be called on XRFrame objects passed to XRSession.requestAnimationFrame callbacks.";
  let NEXT_FRAME_ID = 0;
  class XRFrame {
    constructor(device, session, sessionId) {
      this[PRIVATE$a] = {
        id: ++NEXT_FRAME_ID,
        active: false,
        animationFrame: false,
        device,
        session,
        sessionId
      };
    }
    get session() {
      return this[PRIVATE$a].session;
    }
    getViewerPose(referenceSpace) {
      if (!this[PRIVATE$a].animationFrame) {
        throw new DOMException(NON_ANIMFRAME_MSG, "InvalidStateError");
      }
      if (!this[PRIVATE$a].active) {
        throw new DOMException(NON_ACTIVE_MSG, "InvalidStateError");
      }
      const device = this[PRIVATE$a].device;
      const session = this[PRIVATE$a].session;
      session[PRIVATE$5].viewerSpace._ensurePoseUpdated(device, this[PRIVATE$a].id);
      referenceSpace._ensurePoseUpdated(device, this[PRIVATE$a].id);
      let viewerTransform = referenceSpace._getSpaceRelativeTransform(session[PRIVATE$5].viewerSpace);
      const views = [];
      for (const viewSpace of session[PRIVATE$5].viewSpaces) {
        viewSpace._ensurePoseUpdated(device, this[PRIVATE$a].id);
        let viewTransform = referenceSpace._getSpaceRelativeTransform(viewSpace);
        let view = new XRView(device, viewTransform, viewSpace.eye, this[PRIVATE$a].sessionId, viewSpace.viewIndex);
        views.push(view);
      }
      let viewerPose = new XRViewerPose(viewerTransform, views, false);
      return viewerPose;
    }
    getPose(space, baseSpace) {
      if (!this[PRIVATE$a].active) {
        throw new DOMException(NON_ACTIVE_MSG, "InvalidStateError");
      }
      const device = this[PRIVATE$a].device;
      if (space._specialType === "target-ray" || space._specialType === "grip") {
        return device.getInputPose(
          space._inputSource,
          baseSpace,
          space._specialType
        );
      } else {
        space._ensurePoseUpdated(device, this[PRIVATE$a].id);
        baseSpace._ensurePoseUpdated(device, this[PRIVATE$a].id);
        let transform = baseSpace._getSpaceRelativeTransform(space);
        if (!transform) {
          return null;
        }
        return new XRPose(transform, false);
      }
    }
  }
  const PRIVATE$9 = Symbol("@@webxr-polyfill/XRRenderState");
  const XRRenderStateInit = Object.freeze({
    depthNear: 0.1,
    depthFar: 1e3,
    inlineVerticalFieldOfView: null,
    baseLayer: null
  });
  class XRRenderState {
    constructor(stateInit = {}) {
      const config = Object.assign({}, XRRenderStateInit, stateInit);
      this[PRIVATE$9] = { config };
    }
    get depthNear() {
      return this[PRIVATE$9].config.depthNear;
    }
    get depthFar() {
      return this[PRIVATE$9].config.depthFar;
    }
    get inlineVerticalFieldOfView() {
      return this[PRIVATE$9].config.inlineVerticalFieldOfView;
    }
    get baseLayer() {
      return this[PRIVATE$9].config.baseLayer;
    }
  }
  const PRIVATE$8 = Symbol("@@webxr-polyfill/XRInputSourceEvent");
  class XRInputSourceEvent extends Event {
    constructor(type, eventInitDict) {
      super(type, eventInitDict);
      this[PRIVATE$8] = {
        frame: eventInitDict.frame,
        inputSource: eventInitDict.inputSource
      };
      Object.setPrototypeOf(this, XRInputSourceEvent.prototype);
    }
    get frame() {
      return this[PRIVATE$8].frame;
    }
    get inputSource() {
      return this[PRIVATE$8].inputSource;
    }
  }
  const PRIVATE$7 = Symbol("@@webxr-polyfill/XRSessionEvent");
  class XRSessionEvent extends Event {
    constructor(type, eventInitDict) {
      super(type, eventInitDict);
      this[PRIVATE$7] = {
        session: eventInitDict.session
      };
      Object.setPrototypeOf(this, XRSessionEvent.prototype);
    }
    get session() {
      return this[PRIVATE$7].session;
    }
  }
  const PRIVATE$6 = Symbol("@@webxr-polyfill/XRInputSourcesChangeEvent");
  class XRInputSourcesChangeEvent extends Event {
    constructor(type, eventInitDict) {
      super(type, eventInitDict);
      this[PRIVATE$6] = {
        session: eventInitDict.session,
        added: eventInitDict.added,
        removed: eventInitDict.removed
      };
      Object.setPrototypeOf(this, XRInputSourcesChangeEvent.prototype);
    }
    get session() {
      return this[PRIVATE$6].session;
    }
    get added() {
      return this[PRIVATE$6].added;
    }
    get removed() {
      return this[PRIVATE$6].removed;
    }
  }
  const PRIVATE$5 = Symbol("@@webxr-polyfill/XRSession");
  class XRViewSpace extends XRSpace {
    constructor(eye) {
      super(eye);
    }
    get eye() {
      return this._specialType;
    }
    _onPoseUpdate(device) {
      this._inverseBaseMatrix = device.getBaseViewMatrix(this._specialType);
    }
  }
  class XRSession$1 extends EventTarget$1 {
    constructor(device, mode, id) {
      super();
      let immersive = mode != "inline";
      let initialRenderState = new XRRenderState({
        inlineVerticalFieldOfView: immersive ? null : Math.PI * 0.5
      });
      const defaultViewSpaces = immersive ? [new XRViewSpace("left"), new XRViewSpace("right")] : [new XRViewSpace("none")];
      Object.freeze(defaultViewSpaces);
      this[PRIVATE$5] = {
        device,
        mode,
        immersive,
        ended: false,
        suspended: false,
        frameCallbacks: [],
        currentFrameCallbacks: null,
        frameHandle: 0,
        deviceFrameHandle: null,
        id,
        activeRenderState: initialRenderState,
        pendingRenderState: null,
        viewerSpace: new XRReferenceSpace("viewer"),
        get viewSpaces() {
          return device.getViewSpaces(mode) || defaultViewSpaces;
        },
        currentInputSources: []
      };
      this[PRIVATE$5].onDeviceFrame = () => {
        if (this[PRIVATE$5].ended || this[PRIVATE$5].suspended) {
          return;
        }
        this[PRIVATE$5].deviceFrameHandle = null;
        this[PRIVATE$5].startDeviceFrameLoop();
        if (this[PRIVATE$5].pendingRenderState !== null) {
          this[PRIVATE$5].activeRenderState = new XRRenderState(this[PRIVATE$5].pendingRenderState);
          this[PRIVATE$5].pendingRenderState = null;
          if (this[PRIVATE$5].activeRenderState.baseLayer) {
            this[PRIVATE$5].device.onBaseLayerSet(
              this[PRIVATE$5].id,
              this[PRIVATE$5].activeRenderState.baseLayer
            );
          }
        }
        if (this[PRIVATE$5].activeRenderState.baseLayer === null) {
          return;
        }
        const frame = new XRFrame(device, this, this[PRIVATE$5].id);
        const callbacks = this[PRIVATE$5].currentFrameCallbacks = this[PRIVATE$5].frameCallbacks;
        this[PRIVATE$5].frameCallbacks = [];
        frame[PRIVATE$a].active = true;
        frame[PRIVATE$a].animationFrame = true;
        this[PRIVATE$5].device.onFrameStart(this[PRIVATE$5].id, this[PRIVATE$5].activeRenderState);
        this._checkInputSourcesChange();
        const rightNow = now$1();
        for (let i = 0; i < callbacks.length; i++) {
          try {
            if (!callbacks[i].cancelled && typeof callbacks[i].callback === "function") {
              callbacks[i].callback(rightNow, frame);
            }
          } catch (err) {
            console.error(err);
          }
        }
        this[PRIVATE$5].currentFrameCallbacks = null;
        frame[PRIVATE$a].active = false;
        this[PRIVATE$5].device.onFrameEnd(this[PRIVATE$5].id);
      };
      this[PRIVATE$5].startDeviceFrameLoop = () => {
        if (this[PRIVATE$5].deviceFrameHandle === null) {
          this[PRIVATE$5].deviceFrameHandle = this[PRIVATE$5].device.requestAnimationFrame(
            this[PRIVATE$5].onDeviceFrame
          );
        }
      };
      this[PRIVATE$5].stopDeviceFrameLoop = () => {
        const handle = this[PRIVATE$5].deviceFrameHandle;
        if (handle !== null) {
          this[PRIVATE$5].device.cancelAnimationFrame(handle);
          this[PRIVATE$5].deviceFrameHandle = null;
        }
      };
      this[PRIVATE$5].onPresentationEnd = (sessionId) => {
        if (sessionId !== this[PRIVATE$5].id) {
          this[PRIVATE$5].suspended = false;
          this[PRIVATE$5].startDeviceFrameLoop();
          this.dispatchEvent("focus", { session: this });
          return;
        }
        this[PRIVATE$5].ended = true;
        this[PRIVATE$5].stopDeviceFrameLoop();
        device.removeEventListener("@@webxr-polyfill/vr-present-end", this[PRIVATE$5].onPresentationEnd);
        device.removeEventListener("@@webxr-polyfill/vr-present-start", this[PRIVATE$5].onPresentationStart);
        device.removeEventListener("@@webxr-polyfill/input-select-start", this[PRIVATE$5].onSelectStart);
        device.removeEventListener("@@webxr-polyfill/input-select-end", this[PRIVATE$5].onSelectEnd);
        this.dispatchEvent("end", new XRSessionEvent("end", { session: this }));
      };
      device.addEventListener("@@webxr-polyfill/vr-present-end", this[PRIVATE$5].onPresentationEnd);
      this[PRIVATE$5].onPresentationStart = (sessionId) => {
        if (sessionId === this[PRIVATE$5].id) {
          return;
        }
        this[PRIVATE$5].suspended = true;
        this[PRIVATE$5].stopDeviceFrameLoop();
        this.dispatchEvent("blur", { session: this });
      };
      device.addEventListener("@@webxr-polyfill/vr-present-start", this[PRIVATE$5].onPresentationStart);
      this[PRIVATE$5].onSelectStart = (evt) => {
        if (evt.sessionId !== this[PRIVATE$5].id) {
          return;
        }
        this[PRIVATE$5].dispatchInputSourceEvent("selectstart", evt.inputSource);
      };
      device.addEventListener("@@webxr-polyfill/input-select-start", this[PRIVATE$5].onSelectStart);
      this[PRIVATE$5].onSelectEnd = (evt) => {
        if (evt.sessionId !== this[PRIVATE$5].id) {
          return;
        }
        this[PRIVATE$5].dispatchInputSourceEvent("selectend", evt.inputSource);
        this[PRIVATE$5].dispatchInputSourceEvent("select", evt.inputSource);
      };
      device.addEventListener("@@webxr-polyfill/input-select-end", this[PRIVATE$5].onSelectEnd);
      this[PRIVATE$5].onSqueezeStart = (evt) => {
        if (evt.sessionId !== this[PRIVATE$5].id) {
          return;
        }
        this[PRIVATE$5].dispatchInputSourceEvent("squeezestart", evt.inputSource);
      };
      device.addEventListener("@@webxr-polyfill/input-squeeze-start", this[PRIVATE$5].onSqueezeStart);
      this[PRIVATE$5].onSqueezeEnd = (evt) => {
        if (evt.sessionId !== this[PRIVATE$5].id) {
          return;
        }
        this[PRIVATE$5].dispatchInputSourceEvent("squeezeend", evt.inputSource);
        this[PRIVATE$5].dispatchInputSourceEvent("squeeze", evt.inputSource);
      };
      device.addEventListener("@@webxr-polyfill/input-squeeze-end", this[PRIVATE$5].onSqueezeEnd);
      this[PRIVATE$5].dispatchInputSourceEvent = (type, inputSource) => {
        const frame = new XRFrame(device, this, this[PRIVATE$5].id);
        const event = new XRInputSourceEvent(type, { frame, inputSource });
        frame[PRIVATE$a].active = true;
        this.dispatchEvent(type, event);
        frame[PRIVATE$a].active = false;
      };
      this[PRIVATE$5].startDeviceFrameLoop();
      this.onblur = void 0;
      this.onfocus = void 0;
      this.onresetpose = void 0;
      this.onend = void 0;
      this.onselect = void 0;
      this.onselectstart = void 0;
      this.onselectend = void 0;
    }
    get renderState() {
      return this[PRIVATE$5].activeRenderState;
    }
    get environmentBlendMode() {
      return this[PRIVATE$5].device.environmentBlendMode || "opaque";
    }
    async requestReferenceSpace(type) {
      if (this[PRIVATE$5].ended) {
        return;
      }
      if (!XRReferenceSpaceTypes.includes(type)) {
        throw new TypeError(`XRReferenceSpaceType must be one of ${XRReferenceSpaceTypes}`);
      }
      if (!this[PRIVATE$5].device.doesSessionSupportReferenceSpace(this[PRIVATE$5].id, type)) {
        throw new DOMException(`The ${type} reference space is not supported by this session.`, "NotSupportedError");
      }
      if (type === "viewer") {
        return this[PRIVATE$5].viewerSpace;
      }
      let transform = await this[PRIVATE$5].device.requestFrameOfReferenceTransform(type);
      if (type === "bounded-floor") {
        if (!transform) {
          throw new DOMException(`${type} XRReferenceSpace not supported by this device.`, "NotSupportedError");
        }
        let bounds = this[PRIVATE$5].device.requestStageBounds();
        if (!bounds) {
          throw new DOMException(`${type} XRReferenceSpace not supported by this device.`, "NotSupportedError");
        }
        throw new DOMException(`The WebXR polyfill does not support the ${type} reference space yet.`, "NotSupportedError");
      }
      return new XRReferenceSpace(type, transform);
    }
    requestAnimationFrame(callback) {
      if (this[PRIVATE$5].ended) {
        return;
      }
      const handle = ++this[PRIVATE$5].frameHandle;
      this[PRIVATE$5].frameCallbacks.push({
        handle,
        callback,
        cancelled: false
      });
      return handle;
    }
    cancelAnimationFrame(handle) {
      let callbacks = this[PRIVATE$5].frameCallbacks;
      let index = callbacks.findIndex((d) => d && d.handle === handle);
      if (index > -1) {
        callbacks[index].cancelled = true;
        callbacks.splice(index, 1);
      }
      callbacks = this[PRIVATE$5].currentFrameCallbacks;
      if (callbacks) {
        index = callbacks.findIndex((d) => d && d.handle === handle);
        if (index > -1) {
          callbacks[index].cancelled = true;
        }
      }
    }
    get inputSources() {
      return this[PRIVATE$5].device.getInputSources();
    }
    async end() {
      if (this[PRIVATE$5].ended) {
        return;
      }
      if (this[PRIVATE$5].immersive) {
        this[PRIVATE$5].ended = true;
        this[PRIVATE$5].device.removeEventListener(
          "@@webxr-polyfill/vr-present-start",
          this[PRIVATE$5].onPresentationStart
        );
        this[PRIVATE$5].device.removeEventListener(
          "@@webxr-polyfill/vr-present-end",
          this[PRIVATE$5].onPresentationEnd
        );
        this[PRIVATE$5].device.removeEventListener(
          "@@webxr-polyfill/input-select-start",
          this[PRIVATE$5].onSelectStart
        );
        this[PRIVATE$5].device.removeEventListener(
          "@@webxr-polyfill/input-select-end",
          this[PRIVATE$5].onSelectEnd
        );
        this.dispatchEvent("end", new XRSessionEvent("end", { session: this }));
      }
      this[PRIVATE$5].stopDeviceFrameLoop();
      return this[PRIVATE$5].device.endSession(this[PRIVATE$5].id);
    }
    updateRenderState(newState) {
      if (this[PRIVATE$5].ended) {
        const message = "Can't call updateRenderState on an XRSession that has already ended.";
        throw new Error(message);
      }
      if (newState.baseLayer && newState.baseLayer._session !== this) {
        const message = "Called updateRenderState with a base layer that was created by a different session.";
        throw new Error(message);
      }
      const fovSet = newState.inlineVerticalFieldOfView !== null && newState.inlineVerticalFieldOfView !== void 0;
      if (fovSet) {
        if (this[PRIVATE$5].immersive) {
          const message = "inlineVerticalFieldOfView must not be set for an XRRenderState passed to updateRenderState for an immersive session.";
          throw new Error(message);
        } else {
          newState.inlineVerticalFieldOfView = Math.min(
            3.13,
            Math.max(0.01, newState.inlineVerticalFieldOfView)
          );
        }
      }
      if (this[PRIVATE$5].pendingRenderState === null) {
        const activeRenderState = this[PRIVATE$5].activeRenderState;
        this[PRIVATE$5].pendingRenderState = {
          depthNear: activeRenderState.depthNear,
          depthFar: activeRenderState.depthFar,
          inlineVerticalFieldOfView: activeRenderState.inlineVerticalFieldOfView,
          baseLayer: activeRenderState.baseLayer
        };
      }
      Object.assign(this[PRIVATE$5].pendingRenderState, newState);
    }
    _checkInputSourcesChange() {
      const added = [];
      const removed = [];
      const newInputSources = this.inputSources;
      const oldInputSources = this[PRIVATE$5].currentInputSources;
      for (const newInputSource of newInputSources) {
        if (!oldInputSources.includes(newInputSource)) {
          added.push(newInputSource);
        }
      }
      for (const oldInputSource of oldInputSources) {
        if (!newInputSources.includes(oldInputSource)) {
          removed.push(oldInputSource);
        }
      }
      if (added.length > 0 || removed.length > 0) {
        this.dispatchEvent("inputsourceschange", new XRInputSourcesChangeEvent("inputsourceschange", {
          session: this,
          added,
          removed
        }));
      }
      this[PRIVATE$5].currentInputSources.length = 0;
      for (const newInputSource of newInputSources) {
        this[PRIVATE$5].currentInputSources.push(newInputSource);
      }
    }
  }
  const PRIVATE$4 = Symbol("@@webxr-polyfill/XRInputSource");
  class XRInputSource {
    constructor(impl) {
      this[PRIVATE$4] = {
        impl,
        gripSpace: new XRSpace("grip", this),
        targetRaySpace: new XRSpace("target-ray", this)
      };
    }
    get handedness() {
      return this[PRIVATE$4].impl.handedness;
    }
    get targetRayMode() {
      return this[PRIVATE$4].impl.targetRayMode;
    }
    get gripSpace() {
      let mode = this[PRIVATE$4].impl.targetRayMode;
      if (mode === "gaze" || mode === "screen") {
        return null;
      }
      return this[PRIVATE$4].gripSpace;
    }
    get targetRaySpace() {
      return this[PRIVATE$4].targetRaySpace;
    }
    get profiles() {
      return this[PRIVATE$4].impl.profiles;
    }
    get gamepad() {
      return this[PRIVATE$4].impl.gamepad;
    }
  }
  const POLYFILLED_XR_COMPATIBLE = Symbol("@@webxr-polyfill/polyfilled-xr-compatible");
  const XR_COMPATIBLE = Symbol("@@webxr-polyfill/xr-compatible");
  const PRIVATE$3 = Symbol("@@webxr-polyfill/XRWebGLLayer");
  const XRWebGLLayerInit = Object.freeze({
    antialias: true,
    depth: true,
    stencil: false,
    alpha: true,
    multiview: false,
    ignoreDepthValues: false,
    framebufferScaleFactor: 1
  });
  class XRWebGLLayer {
    constructor(session, context, layerInit = {}) {
      const config = Object.assign({}, XRWebGLLayerInit, layerInit);
      if (!(session instanceof XRSession$1)) {
        throw new Error("session must be a XRSession");
      }
      if (session.ended) {
        throw new Error(`InvalidStateError`);
      }
      if (context[POLYFILLED_XR_COMPATIBLE]) {
        if (context[XR_COMPATIBLE] !== true) {
          throw new Error(`InvalidStateError`);
        }
      }
      this[PRIVATE$3] = {
        context,
        config,
        session
      };
    }
    get context() {
      return this[PRIVATE$3].context;
    }
    get antialias() {
      return this[PRIVATE$3].config.antialias;
    }
    get ignoreDepthValues() {
      return true;
    }
    get framebuffer() {
      return null;
    }
    get framebufferWidth() {
      return this[PRIVATE$3].context.drawingBufferWidth;
    }
    get framebufferHeight() {
      return this[PRIVATE$3].context.drawingBufferHeight;
    }
    get _session() {
      return this[PRIVATE$3].session;
    }
    getViewport(view) {
      return view._getViewport(this);
    }
    static getNativeFramebufferScaleFactor(session) {
      if (!session) {
        throw new TypeError("getNativeFramebufferScaleFactor must be passed a session.");
      }
      if (session[PRIVATE$5].ended) {
        return 0;
      }
      return 1;
    }
  }
  const PRIVATE$2 = Symbol("@@webxr-polyfill/XRReferenceSpaceEvent");
  class XRReferenceSpaceEvent extends Event {
    constructor(type, eventInitDict) {
      super(type, eventInitDict);
      this[PRIVATE$2] = {
        referenceSpace: eventInitDict.referenceSpace,
        transform: eventInitDict.transform || null
      };
      Object.setPrototypeOf(this, XRReferenceSpaceEvent.prototype);
    }
    get referenceSpace() {
      return this[PRIVATE$2].referenceSpace;
    }
    get transform() {
      return this[PRIVATE$2].transform;
    }
  }
  const API = {
    XRSystem,
    XRSession: XRSession$1,
    XRSessionEvent,
    XRFrame,
    XRView,
    XRViewport,
    XRViewerPose,
    XRWebGLLayer,
    XRSpace,
    XRReferenceSpace,
    XRReferenceSpaceEvent,
    XRInputSource,
    XRInputSourceEvent,
    XRInputSourcesChangeEvent,
    XRRenderState,
    XRRigidTransform: XRRigidTransform$1,
    XRPose: XRPose$1
  };
  const polyfillMakeXRCompatible = (Context) => {
    if (typeof Context.prototype.makeXRCompatible === "function")
      ;
    Context.prototype.makeXRCompatible = function() {
      this[XR_COMPATIBLE] = true;
      return Promise.resolve();
    };
    return true;
  };
  const polyfillGetContext = (Canvas) => {
    const getContext = Canvas.prototype.getContext;
    Canvas.prototype.getContext = function(contextType, glAttribs) {
      const ctx = getContext.call(this, contextType, glAttribs);
      if (ctx) {
        ctx[POLYFILLED_XR_COMPATIBLE] = true;
        if (glAttribs && "xrCompatible" in glAttribs) {
          ctx[XR_COMPATIBLE] = glAttribs.xrCompatible;
        }
      }
      return ctx;
    };
  };
  const isImageBitmapSupported = (global2) => !!(global2.ImageBitmapRenderingContext && global2.createImageBitmap);
  const isMobile = (global2) => {
    var check = false;
    (function(a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
        check = true;
    })(global2.navigator.userAgent || global2.navigator.vendor || global2.opera);
    return check;
  };
  const applyCanvasStylesForMinimalRendering = (canvas) => {
    canvas.style.display = "block";
    canvas.style.position = "absolute";
    canvas.style.width = canvas.style.height = "1px";
    canvas.style.top = canvas.style.left = "0px";
  };
  var commonjsGlobal$1 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var cardboardVrDisplay = { exports: {} };
  /**
   * @license
   * cardboard-vr-display
   * Copyright (c) 2015-2017 Google
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  (function(module2, exports3) {
    /**
     * @license
     * gl-preserve-state
     * Copyright (c) 2016, Brandon Jones.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * @license
     * webvr-polyfill-dpdb
     * Copyright (c) 2015-2017 Google
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @license
     * nosleep.js
     * Copyright (c) 2017, Rich Tibbett
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    (function(global2, factory) {
      module2.exports = factory();
    })(commonjsGlobal$1, function() {
      var classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      var slicedToArray = function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"])
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();
      var MIN_TIMESTEP = 1e-3;
      var MAX_TIMESTEP = 1;
      var dataUri = function dataUri2(mimeType, svg) {
        return "data:" + mimeType + "," + encodeURIComponent(svg);
      };
      var lerp = function lerp2(a, b, t) {
        return a + (b - a) * t;
      };
      var isIOS = function() {
        var isIOS2 = /iPad|iPhone|iPod/.test(navigator.platform);
        return function() {
          return isIOS2;
        };
      }();
      var isWebViewAndroid = function() {
        var isWebViewAndroid2 = navigator.userAgent.indexOf("Version") !== -1 && navigator.userAgent.indexOf("Android") !== -1 && navigator.userAgent.indexOf("Chrome") !== -1;
        return function() {
          return isWebViewAndroid2;
        };
      }();
      var isSafari = function() {
        var isSafari2 = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        return function() {
          return isSafari2;
        };
      }();
      var isFirefoxAndroid = function() {
        var isFirefoxAndroid2 = navigator.userAgent.indexOf("Firefox") !== -1 && navigator.userAgent.indexOf("Android") !== -1;
        return function() {
          return isFirefoxAndroid2;
        };
      }();
      var getChromeVersion = function() {
        var match = navigator.userAgent.match(/.*Chrome\/([0-9]+)/);
        var value = match ? parseInt(match[1], 10) : null;
        return function() {
          return value;
        };
      }();
      var isSafariWithoutDeviceMotion = function() {
        var value = false;
        value = isIOS() && isSafari() && navigator.userAgent.indexOf("13_4") !== -1;
        return function() {
          return value;
        };
      }();
      var isChromeWithoutDeviceMotion = function() {
        var value = false;
        if (getChromeVersion() === 65) {
          var match = navigator.userAgent.match(/.*Chrome\/([0-9\.]*)/);
          if (match) {
            var _match$1$split = match[1].split("."), _match$1$split2 = slicedToArray(_match$1$split, 4);
            _match$1$split2[0];
            _match$1$split2[1];
            var branch = _match$1$split2[2], build = _match$1$split2[3];
            value = parseInt(branch, 10) === 3325 && parseInt(build, 10) < 148;
          }
        }
        return function() {
          return value;
        };
      }();
      var isR7 = function() {
        var isR72 = navigator.userAgent.indexOf("R7 Build") !== -1;
        return function() {
          return isR72;
        };
      }();
      var isLandscapeMode = function isLandscapeMode2() {
        var rtn = window.orientation == 90 || window.orientation == -90;
        return isR7() ? !rtn : rtn;
      };
      var isTimestampDeltaValid = function isTimestampDeltaValid2(timestampDeltaS) {
        if (isNaN(timestampDeltaS)) {
          return false;
        }
        if (timestampDeltaS <= MIN_TIMESTEP) {
          return false;
        }
        if (timestampDeltaS > MAX_TIMESTEP) {
          return false;
        }
        return true;
      };
      var getScreenWidth = function getScreenWidth2() {
        return Math.max(window.screen.width, window.screen.height) * window.devicePixelRatio;
      };
      var getScreenHeight = function getScreenHeight2() {
        return Math.min(window.screen.width, window.screen.height) * window.devicePixelRatio;
      };
      var requestFullscreen = function requestFullscreen2(element) {
        if (isWebViewAndroid()) {
          return false;
        }
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        } else {
          return false;
        }
        return true;
      };
      var exitFullscreen = function exitFullscreen2() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else {
          return false;
        }
        return true;
      };
      var getFullscreenElement = function getFullscreenElement2() {
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
      };
      var linkProgram = function linkProgram2(gl, vertexSource, fragmentSource, attribLocationMap) {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexSource);
        gl.compileShader(vertexShader);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentSource);
        gl.compileShader(fragmentShader);
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        for (var attribName in attribLocationMap) {
          gl.bindAttribLocation(program, attribLocationMap[attribName], attribName);
        }
        gl.linkProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return program;
      };
      var getProgramUniforms = function getProgramUniforms2(gl, program) {
        var uniforms = {};
        var uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        var uniformName = "";
        for (var i = 0; i < uniformCount; i++) {
          var uniformInfo = gl.getActiveUniform(program, i);
          uniformName = uniformInfo.name.replace("[0]", "");
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
      };
      var orthoMatrix = function orthoMatrix2(out, left, right, bottom, top, near, far) {
        var lr = 1 / (left - right), bt = 1 / (bottom - top), nf = 1 / (near - far);
        out[0] = -2 * lr;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = -2 * bt;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 2 * nf;
        out[11] = 0;
        out[12] = (left + right) * lr;
        out[13] = (top + bottom) * bt;
        out[14] = (far + near) * nf;
        out[15] = 1;
        return out;
      };
      var isMobile2 = function isMobile3() {
        var check = false;
        (function(a) {
          if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
      };
      var extend = function extend2(dest, src) {
        for (var key in src) {
          if (src.hasOwnProperty(key)) {
            dest[key] = src[key];
          }
        }
        return dest;
      };
      var safariCssSizeWorkaround = function safariCssSizeWorkaround2(canvas) {
        if (isIOS()) {
          var width = canvas.style.width;
          var height = canvas.style.height;
          canvas.style.width = parseInt(width) + 1 + "px";
          canvas.style.height = parseInt(height) + "px";
          setTimeout(function() {
            canvas.style.width = width;
            canvas.style.height = height;
          }, 100);
        }
        window.canvas = canvas;
      };
      var frameDataFromPose = function() {
        var piOver180 = Math.PI / 180;
        var rad45 = Math.PI * 0.25;
        function mat4_perspectiveFromFieldOfView(out, fov, near, far) {
          var upTan = Math.tan(fov ? fov.upDegrees * piOver180 : rad45), downTan = Math.tan(fov ? fov.downDegrees * piOver180 : rad45), leftTan = Math.tan(fov ? fov.leftDegrees * piOver180 : rad45), rightTan = Math.tan(fov ? fov.rightDegrees * piOver180 : rad45), xScale = 2 / (leftTan + rightTan), yScale = 2 / (upTan + downTan);
          out[0] = xScale;
          out[1] = 0;
          out[2] = 0;
          out[3] = 0;
          out[4] = 0;
          out[5] = yScale;
          out[6] = 0;
          out[7] = 0;
          out[8] = -((leftTan - rightTan) * xScale * 0.5);
          out[9] = (upTan - downTan) * yScale * 0.5;
          out[10] = far / (near - far);
          out[11] = -1;
          out[12] = 0;
          out[13] = 0;
          out[14] = far * near / (near - far);
          out[15] = 0;
          return out;
        }
        function mat4_fromRotationTranslation(out, q, v) {
          var x = q[0], y = q[1], z = q[2], w = q[3], x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
          out[0] = 1 - (yy + zz);
          out[1] = xy + wz;
          out[2] = xz - wy;
          out[3] = 0;
          out[4] = xy - wz;
          out[5] = 1 - (xx + zz);
          out[6] = yz + wx;
          out[7] = 0;
          out[8] = xz + wy;
          out[9] = yz - wx;
          out[10] = 1 - (xx + yy);
          out[11] = 0;
          out[12] = v[0];
          out[13] = v[1];
          out[14] = v[2];
          out[15] = 1;
          return out;
        }
        function mat4_translate(out, a, v) {
          var x = v[0], y = v[1], z = v[2], a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;
          if (a === out) {
            out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
            out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
            out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
            out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
          } else {
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            out[0] = a00;
            out[1] = a01;
            out[2] = a02;
            out[3] = a03;
            out[4] = a10;
            out[5] = a11;
            out[6] = a12;
            out[7] = a13;
            out[8] = a20;
            out[9] = a21;
            out[10] = a22;
            out[11] = a23;
            out[12] = a00 * x + a10 * y + a20 * z + a[12];
            out[13] = a01 * x + a11 * y + a21 * z + a[13];
            out[14] = a02 * x + a12 * y + a22 * z + a[14];
            out[15] = a03 * x + a13 * y + a23 * z + a[15];
          }
          return out;
        }
        function mat4_invert(out, a) {
          var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
          if (!det) {
            return null;
          }
          det = 1 / det;
          out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
          out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
          out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
          out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
          out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
          out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
          out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
          out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
          out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
          out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
          out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
          out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
          out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
          out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
          out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
          out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
          return out;
        }
        var defaultOrientation = new Float32Array([0, 0, 0, 1]);
        var defaultPosition = new Float32Array([0, 0, 0]);
        function updateEyeMatrices(projection, view, pose, fov, offset, vrDisplay) {
          mat4_perspectiveFromFieldOfView(projection, fov || null, vrDisplay.depthNear, vrDisplay.depthFar);
          var orientation = pose.orientation || defaultOrientation;
          var position = pose.position || defaultPosition;
          mat4_fromRotationTranslation(view, orientation, position);
          if (offset)
            mat4_translate(view, view, offset);
          mat4_invert(view, view);
        }
        return function(frameData, pose, vrDisplay) {
          if (!frameData || !pose)
            return false;
          frameData.pose = pose;
          frameData.timestamp = pose.timestamp;
          updateEyeMatrices(frameData.leftProjectionMatrix, frameData.leftViewMatrix, pose, vrDisplay._getFieldOfView("left"), vrDisplay._getEyeOffset("left"), vrDisplay);
          updateEyeMatrices(frameData.rightProjectionMatrix, frameData.rightViewMatrix, pose, vrDisplay._getFieldOfView("right"), vrDisplay._getEyeOffset("right"), vrDisplay);
          return true;
        };
      }();
      var isInsideCrossOriginIFrame = function isInsideCrossOriginIFrame2() {
        var isFramed = window.self !== window.top;
        var refOrigin = getOriginFromUrl(document.referrer);
        var thisOrigin = getOriginFromUrl(window.location.href);
        return isFramed && refOrigin !== thisOrigin;
      };
      var getOriginFromUrl = function getOriginFromUrl2(url) {
        var domainIdx;
        var protoSepIdx = url.indexOf("://");
        if (protoSepIdx !== -1) {
          domainIdx = protoSepIdx + 3;
        } else {
          domainIdx = 0;
        }
        var domainEndIdx = url.indexOf("/", domainIdx);
        if (domainEndIdx === -1) {
          domainEndIdx = url.length;
        }
        return url.substring(0, domainEndIdx);
      };
      var getQuaternionAngle = function getQuaternionAngle2(quat) {
        if (quat.w > 1) {
          console.warn("getQuaternionAngle: w > 1");
          return 0;
        }
        var angle2 = 2 * Math.acos(quat.w);
        return angle2;
      };
      var warnOnce = function() {
        var observedWarnings = {};
        return function(key, message) {
          if (observedWarnings[key] === void 0) {
            console.warn("webvr-polyfill: " + message);
            observedWarnings[key] = true;
          }
        };
      }();
      var deprecateWarning = function deprecateWarning2(deprecated, suggested) {
        var alternative = suggested ? "Please use " + suggested + " instead." : "";
        warnOnce(deprecated, deprecated + " has been deprecated. This may not work on native WebVR displays. " + alternative);
      };
      function WGLUPreserveGLState(gl, bindings, callback) {
        if (!bindings) {
          callback(gl);
          return;
        }
        var boundValues = [];
        var activeTexture = null;
        for (var i = 0; i < bindings.length; ++i) {
          var binding = bindings[i];
          switch (binding) {
            case gl.TEXTURE_BINDING_2D:
            case gl.TEXTURE_BINDING_CUBE_MAP:
              var textureUnit = bindings[++i];
              if (textureUnit < gl.TEXTURE0 || textureUnit > gl.TEXTURE31) {
                console.error("TEXTURE_BINDING_2D or TEXTURE_BINDING_CUBE_MAP must be followed by a valid texture unit");
                boundValues.push(null, null);
                break;
              }
              if (!activeTexture) {
                activeTexture = gl.getParameter(gl.ACTIVE_TEXTURE);
              }
              gl.activeTexture(textureUnit);
              boundValues.push(gl.getParameter(binding), null);
              break;
            case gl.ACTIVE_TEXTURE:
              activeTexture = gl.getParameter(gl.ACTIVE_TEXTURE);
              boundValues.push(null);
              break;
            default:
              boundValues.push(gl.getParameter(binding));
              break;
          }
        }
        callback(gl);
        for (var i = 0; i < bindings.length; ++i) {
          var binding = bindings[i];
          var boundValue = boundValues[i];
          switch (binding) {
            case gl.ACTIVE_TEXTURE:
              break;
            case gl.ARRAY_BUFFER_BINDING:
              gl.bindBuffer(gl.ARRAY_BUFFER, boundValue);
              break;
            case gl.COLOR_CLEAR_VALUE:
              gl.clearColor(boundValue[0], boundValue[1], boundValue[2], boundValue[3]);
              break;
            case gl.COLOR_WRITEMASK:
              gl.colorMask(boundValue[0], boundValue[1], boundValue[2], boundValue[3]);
              break;
            case gl.CURRENT_PROGRAM:
              gl.useProgram(boundValue);
              break;
            case gl.ELEMENT_ARRAY_BUFFER_BINDING:
              gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boundValue);
              break;
            case gl.FRAMEBUFFER_BINDING:
              gl.bindFramebuffer(gl.FRAMEBUFFER, boundValue);
              break;
            case gl.RENDERBUFFER_BINDING:
              gl.bindRenderbuffer(gl.RENDERBUFFER, boundValue);
              break;
            case gl.TEXTURE_BINDING_2D:
              var textureUnit = bindings[++i];
              if (textureUnit < gl.TEXTURE0 || textureUnit > gl.TEXTURE31)
                break;
              gl.activeTexture(textureUnit);
              gl.bindTexture(gl.TEXTURE_2D, boundValue);
              break;
            case gl.TEXTURE_BINDING_CUBE_MAP:
              var textureUnit = bindings[++i];
              if (textureUnit < gl.TEXTURE0 || textureUnit > gl.TEXTURE31)
                break;
              gl.activeTexture(textureUnit);
              gl.bindTexture(gl.TEXTURE_CUBE_MAP, boundValue);
              break;
            case gl.VIEWPORT:
              gl.viewport(boundValue[0], boundValue[1], boundValue[2], boundValue[3]);
              break;
            case gl.BLEND:
            case gl.CULL_FACE:
            case gl.DEPTH_TEST:
            case gl.SCISSOR_TEST:
            case gl.STENCIL_TEST:
              if (boundValue) {
                gl.enable(binding);
              } else {
                gl.disable(binding);
              }
              break;
            default:
              console.log("No GL restore behavior for 0x" + binding.toString(16));
              break;
          }
          if (activeTexture) {
            gl.activeTexture(activeTexture);
          }
        }
      }
      var glPreserveState = WGLUPreserveGLState;
      var distortionVS = ["attribute vec2 position;", "attribute vec3 texCoord;", "varying vec2 vTexCoord;", "uniform vec4 viewportOffsetScale[2];", "void main() {", "  vec4 viewport = viewportOffsetScale[int(texCoord.z)];", "  vTexCoord = (texCoord.xy * viewport.zw) + viewport.xy;", "  gl_Position = vec4( position, 1.0, 1.0 );", "}"].join("\n");
      var distortionFS = ["precision mediump float;", "uniform sampler2D diffuse;", "varying vec2 vTexCoord;", "void main() {", "  gl_FragColor = texture2D(diffuse, vTexCoord);", "}"].join("\n");
      function CardboardDistorter(gl, cardboardUI, bufferScale, dirtySubmitFrameBindings) {
        this.gl = gl;
        this.cardboardUI = cardboardUI;
        this.bufferScale = bufferScale;
        this.dirtySubmitFrameBindings = dirtySubmitFrameBindings;
        this.ctxAttribs = gl.getContextAttributes();
        this.instanceExt = gl.getExtension("ANGLE_instanced_arrays");
        this.meshWidth = 20;
        this.meshHeight = 20;
        this.bufferWidth = gl.drawingBufferWidth;
        this.bufferHeight = gl.drawingBufferHeight;
        this.realBindFramebuffer = gl.bindFramebuffer;
        this.realEnable = gl.enable;
        this.realDisable = gl.disable;
        this.realColorMask = gl.colorMask;
        this.realClearColor = gl.clearColor;
        this.realViewport = gl.viewport;
        if (!isIOS()) {
          this.realCanvasWidth = Object.getOwnPropertyDescriptor(gl.canvas.__proto__, "width");
          this.realCanvasHeight = Object.getOwnPropertyDescriptor(gl.canvas.__proto__, "height");
        }
        this.isPatched = false;
        this.lastBoundFramebuffer = null;
        this.cullFace = false;
        this.depthTest = false;
        this.blend = false;
        this.scissorTest = false;
        this.stencilTest = false;
        this.viewport = [0, 0, 0, 0];
        this.colorMask = [true, true, true, true];
        this.clearColor = [0, 0, 0, 0];
        this.attribs = {
          position: 0,
          texCoord: 1
        };
        this.program = linkProgram(gl, distortionVS, distortionFS, this.attribs);
        this.uniforms = getProgramUniforms(gl, this.program);
        this.viewportOffsetScale = new Float32Array(8);
        this.setTextureBounds();
        this.vertexBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();
        this.indexCount = 0;
        this.renderTarget = gl.createTexture();
        this.framebuffer = gl.createFramebuffer();
        this.depthStencilBuffer = null;
        this.depthBuffer = null;
        this.stencilBuffer = null;
        if (this.ctxAttribs.depth && this.ctxAttribs.stencil) {
          this.depthStencilBuffer = gl.createRenderbuffer();
        } else if (this.ctxAttribs.depth) {
          this.depthBuffer = gl.createRenderbuffer();
        } else if (this.ctxAttribs.stencil) {
          this.stencilBuffer = gl.createRenderbuffer();
        }
        this.patch();
        this.onResize();
      }
      CardboardDistorter.prototype.destroy = function() {
        var gl = this.gl;
        this.unpatch();
        gl.deleteProgram(this.program);
        gl.deleteBuffer(this.vertexBuffer);
        gl.deleteBuffer(this.indexBuffer);
        gl.deleteTexture(this.renderTarget);
        gl.deleteFramebuffer(this.framebuffer);
        if (this.depthStencilBuffer) {
          gl.deleteRenderbuffer(this.depthStencilBuffer);
        }
        if (this.depthBuffer) {
          gl.deleteRenderbuffer(this.depthBuffer);
        }
        if (this.stencilBuffer) {
          gl.deleteRenderbuffer(this.stencilBuffer);
        }
        if (this.cardboardUI) {
          this.cardboardUI.destroy();
        }
      };
      CardboardDistorter.prototype.onResize = function() {
        var gl = this.gl;
        var self2 = this;
        var glState = [gl.RENDERBUFFER_BINDING, gl.TEXTURE_BINDING_2D, gl.TEXTURE0];
        glPreserveState(gl, glState, function(gl2) {
          self2.realBindFramebuffer.call(gl2, gl2.FRAMEBUFFER, null);
          if (self2.scissorTest) {
            self2.realDisable.call(gl2, gl2.SCISSOR_TEST);
          }
          self2.realColorMask.call(gl2, true, true, true, true);
          self2.realViewport.call(gl2, 0, 0, gl2.drawingBufferWidth, gl2.drawingBufferHeight);
          self2.realClearColor.call(gl2, 0, 0, 0, 1);
          gl2.clear(gl2.COLOR_BUFFER_BIT);
          self2.realBindFramebuffer.call(gl2, gl2.FRAMEBUFFER, self2.framebuffer);
          gl2.bindTexture(gl2.TEXTURE_2D, self2.renderTarget);
          gl2.texImage2D(gl2.TEXTURE_2D, 0, self2.ctxAttribs.alpha ? gl2.RGBA : gl2.RGB, self2.bufferWidth, self2.bufferHeight, 0, self2.ctxAttribs.alpha ? gl2.RGBA : gl2.RGB, gl2.UNSIGNED_BYTE, null);
          gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);
          gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
          gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.CLAMP_TO_EDGE);
          gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.CLAMP_TO_EDGE);
          gl2.framebufferTexture2D(gl2.FRAMEBUFFER, gl2.COLOR_ATTACHMENT0, gl2.TEXTURE_2D, self2.renderTarget, 0);
          if (self2.ctxAttribs.depth && self2.ctxAttribs.stencil) {
            gl2.bindRenderbuffer(gl2.RENDERBUFFER, self2.depthStencilBuffer);
            gl2.renderbufferStorage(gl2.RENDERBUFFER, gl2.DEPTH_STENCIL, self2.bufferWidth, self2.bufferHeight);
            gl2.framebufferRenderbuffer(gl2.FRAMEBUFFER, gl2.DEPTH_STENCIL_ATTACHMENT, gl2.RENDERBUFFER, self2.depthStencilBuffer);
          } else if (self2.ctxAttribs.depth) {
            gl2.bindRenderbuffer(gl2.RENDERBUFFER, self2.depthBuffer);
            gl2.renderbufferStorage(gl2.RENDERBUFFER, gl2.DEPTH_COMPONENT16, self2.bufferWidth, self2.bufferHeight);
            gl2.framebufferRenderbuffer(gl2.FRAMEBUFFER, gl2.DEPTH_ATTACHMENT, gl2.RENDERBUFFER, self2.depthBuffer);
          } else if (self2.ctxAttribs.stencil) {
            gl2.bindRenderbuffer(gl2.RENDERBUFFER, self2.stencilBuffer);
            gl2.renderbufferStorage(gl2.RENDERBUFFER, gl2.STENCIL_INDEX8, self2.bufferWidth, self2.bufferHeight);
            gl2.framebufferRenderbuffer(gl2.FRAMEBUFFER, gl2.STENCIL_ATTACHMENT, gl2.RENDERBUFFER, self2.stencilBuffer);
          }
          if (!gl2.checkFramebufferStatus(gl2.FRAMEBUFFER) === gl2.FRAMEBUFFER_COMPLETE) {
            console.error("Framebuffer incomplete!");
          }
          self2.realBindFramebuffer.call(gl2, gl2.FRAMEBUFFER, self2.lastBoundFramebuffer);
          if (self2.scissorTest) {
            self2.realEnable.call(gl2, gl2.SCISSOR_TEST);
          }
          self2.realColorMask.apply(gl2, self2.colorMask);
          self2.realViewport.apply(gl2, self2.viewport);
          self2.realClearColor.apply(gl2, self2.clearColor);
        });
        if (this.cardboardUI) {
          this.cardboardUI.onResize();
        }
      };
      CardboardDistorter.prototype.patch = function() {
        if (this.isPatched) {
          return;
        }
        var self2 = this;
        var canvas = this.gl.canvas;
        var gl = this.gl;
        if (!isIOS()) {
          canvas.width = getScreenWidth() * this.bufferScale;
          canvas.height = getScreenHeight() * this.bufferScale;
          Object.defineProperty(canvas, "width", {
            configurable: true,
            enumerable: true,
            get: function get() {
              return self2.bufferWidth;
            },
            set: function set2(value) {
              self2.bufferWidth = value;
              self2.realCanvasWidth.set.call(canvas, value);
              self2.onResize();
            }
          });
          Object.defineProperty(canvas, "height", {
            configurable: true,
            enumerable: true,
            get: function get() {
              return self2.bufferHeight;
            },
            set: function set2(value) {
              self2.bufferHeight = value;
              self2.realCanvasHeight.set.call(canvas, value);
              self2.onResize();
            }
          });
        }
        this.lastBoundFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        if (this.lastBoundFramebuffer == null) {
          this.lastBoundFramebuffer = this.framebuffer;
          this.gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        }
        this.gl.bindFramebuffer = function(target, framebuffer) {
          self2.lastBoundFramebuffer = framebuffer ? framebuffer : self2.framebuffer;
          self2.realBindFramebuffer.call(gl, target, self2.lastBoundFramebuffer);
        };
        this.cullFace = gl.getParameter(gl.CULL_FACE);
        this.depthTest = gl.getParameter(gl.DEPTH_TEST);
        this.blend = gl.getParameter(gl.BLEND);
        this.scissorTest = gl.getParameter(gl.SCISSOR_TEST);
        this.stencilTest = gl.getParameter(gl.STENCIL_TEST);
        gl.enable = function(pname) {
          switch (pname) {
            case gl.CULL_FACE:
              self2.cullFace = true;
              break;
            case gl.DEPTH_TEST:
              self2.depthTest = true;
              break;
            case gl.BLEND:
              self2.blend = true;
              break;
            case gl.SCISSOR_TEST:
              self2.scissorTest = true;
              break;
            case gl.STENCIL_TEST:
              self2.stencilTest = true;
              break;
          }
          self2.realEnable.call(gl, pname);
        };
        gl.disable = function(pname) {
          switch (pname) {
            case gl.CULL_FACE:
              self2.cullFace = false;
              break;
            case gl.DEPTH_TEST:
              self2.depthTest = false;
              break;
            case gl.BLEND:
              self2.blend = false;
              break;
            case gl.SCISSOR_TEST:
              self2.scissorTest = false;
              break;
            case gl.STENCIL_TEST:
              self2.stencilTest = false;
              break;
          }
          self2.realDisable.call(gl, pname);
        };
        this.colorMask = gl.getParameter(gl.COLOR_WRITEMASK);
        gl.colorMask = function(r, g, b, a) {
          self2.colorMask[0] = r;
          self2.colorMask[1] = g;
          self2.colorMask[2] = b;
          self2.colorMask[3] = a;
          self2.realColorMask.call(gl, r, g, b, a);
        };
        this.clearColor = gl.getParameter(gl.COLOR_CLEAR_VALUE);
        gl.clearColor = function(r, g, b, a) {
          self2.clearColor[0] = r;
          self2.clearColor[1] = g;
          self2.clearColor[2] = b;
          self2.clearColor[3] = a;
          self2.realClearColor.call(gl, r, g, b, a);
        };
        this.viewport = gl.getParameter(gl.VIEWPORT);
        gl.viewport = function(x, y, w, h) {
          self2.viewport[0] = x;
          self2.viewport[1] = y;
          self2.viewport[2] = w;
          self2.viewport[3] = h;
          self2.realViewport.call(gl, x, y, w, h);
        };
        this.isPatched = true;
        safariCssSizeWorkaround(canvas);
      };
      CardboardDistorter.prototype.unpatch = function() {
        if (!this.isPatched) {
          return;
        }
        var gl = this.gl;
        var canvas = this.gl.canvas;
        if (!isIOS()) {
          Object.defineProperty(canvas, "width", this.realCanvasWidth);
          Object.defineProperty(canvas, "height", this.realCanvasHeight);
        }
        canvas.width = this.bufferWidth;
        canvas.height = this.bufferHeight;
        gl.bindFramebuffer = this.realBindFramebuffer;
        gl.enable = this.realEnable;
        gl.disable = this.realDisable;
        gl.colorMask = this.realColorMask;
        gl.clearColor = this.realClearColor;
        gl.viewport = this.realViewport;
        if (this.lastBoundFramebuffer == this.framebuffer) {
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
        this.isPatched = false;
        setTimeout(function() {
          safariCssSizeWorkaround(canvas);
        }, 1);
      };
      CardboardDistorter.prototype.setTextureBounds = function(leftBounds, rightBounds) {
        if (!leftBounds) {
          leftBounds = [0, 0, 0.5, 1];
        }
        if (!rightBounds) {
          rightBounds = [0.5, 0, 0.5, 1];
        }
        this.viewportOffsetScale[0] = leftBounds[0];
        this.viewportOffsetScale[1] = leftBounds[1];
        this.viewportOffsetScale[2] = leftBounds[2];
        this.viewportOffsetScale[3] = leftBounds[3];
        this.viewportOffsetScale[4] = rightBounds[0];
        this.viewportOffsetScale[5] = rightBounds[1];
        this.viewportOffsetScale[6] = rightBounds[2];
        this.viewportOffsetScale[7] = rightBounds[3];
      };
      CardboardDistorter.prototype.submitFrame = function() {
        var gl = this.gl;
        var self2 = this;
        var glState = [];
        if (!this.dirtySubmitFrameBindings) {
          glState.push(gl.CURRENT_PROGRAM, gl.ARRAY_BUFFER_BINDING, gl.ELEMENT_ARRAY_BUFFER_BINDING, gl.TEXTURE_BINDING_2D, gl.TEXTURE0);
        }
        glPreserveState(gl, glState, function(gl2) {
          self2.realBindFramebuffer.call(gl2, gl2.FRAMEBUFFER, null);
          var positionDivisor = 0;
          var texCoordDivisor = 0;
          if (self2.instanceExt) {
            positionDivisor = gl2.getVertexAttrib(self2.attribs.position, self2.instanceExt.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE);
            texCoordDivisor = gl2.getVertexAttrib(self2.attribs.texCoord, self2.instanceExt.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE);
          }
          if (self2.cullFace) {
            self2.realDisable.call(gl2, gl2.CULL_FACE);
          }
          if (self2.depthTest) {
            self2.realDisable.call(gl2, gl2.DEPTH_TEST);
          }
          if (self2.blend) {
            self2.realDisable.call(gl2, gl2.BLEND);
          }
          if (self2.scissorTest) {
            self2.realDisable.call(gl2, gl2.SCISSOR_TEST);
          }
          if (self2.stencilTest) {
            self2.realDisable.call(gl2, gl2.STENCIL_TEST);
          }
          self2.realColorMask.call(gl2, true, true, true, true);
          self2.realViewport.call(gl2, 0, 0, gl2.drawingBufferWidth, gl2.drawingBufferHeight);
          if (self2.ctxAttribs.alpha || isIOS()) {
            self2.realClearColor.call(gl2, 0, 0, 0, 1);
            gl2.clear(gl2.COLOR_BUFFER_BIT);
          }
          gl2.useProgram(self2.program);
          gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, self2.indexBuffer);
          gl2.bindBuffer(gl2.ARRAY_BUFFER, self2.vertexBuffer);
          gl2.enableVertexAttribArray(self2.attribs.position);
          gl2.enableVertexAttribArray(self2.attribs.texCoord);
          gl2.vertexAttribPointer(self2.attribs.position, 2, gl2.FLOAT, false, 20, 0);
          gl2.vertexAttribPointer(self2.attribs.texCoord, 3, gl2.FLOAT, false, 20, 8);
          if (self2.instanceExt) {
            if (positionDivisor != 0) {
              self2.instanceExt.vertexAttribDivisorANGLE(self2.attribs.position, 0);
            }
            if (texCoordDivisor != 0) {
              self2.instanceExt.vertexAttribDivisorANGLE(self2.attribs.texCoord, 0);
            }
          }
          gl2.activeTexture(gl2.TEXTURE0);
          gl2.uniform1i(self2.uniforms.diffuse, 0);
          gl2.bindTexture(gl2.TEXTURE_2D, self2.renderTarget);
          gl2.uniform4fv(self2.uniforms.viewportOffsetScale, self2.viewportOffsetScale);
          gl2.drawElements(gl2.TRIANGLES, self2.indexCount, gl2.UNSIGNED_SHORT, 0);
          if (self2.cardboardUI) {
            self2.cardboardUI.renderNoState();
          }
          self2.realBindFramebuffer.call(self2.gl, gl2.FRAMEBUFFER, self2.framebuffer);
          if (!self2.ctxAttribs.preserveDrawingBuffer) {
            self2.realClearColor.call(gl2, 0, 0, 0, 0);
            gl2.clear(gl2.COLOR_BUFFER_BIT);
          }
          if (!self2.dirtySubmitFrameBindings) {
            self2.realBindFramebuffer.call(gl2, gl2.FRAMEBUFFER, self2.lastBoundFramebuffer);
          }
          if (self2.cullFace) {
            self2.realEnable.call(gl2, gl2.CULL_FACE);
          }
          if (self2.depthTest) {
            self2.realEnable.call(gl2, gl2.DEPTH_TEST);
          }
          if (self2.blend) {
            self2.realEnable.call(gl2, gl2.BLEND);
          }
          if (self2.scissorTest) {
            self2.realEnable.call(gl2, gl2.SCISSOR_TEST);
          }
          if (self2.stencilTest) {
            self2.realEnable.call(gl2, gl2.STENCIL_TEST);
          }
          self2.realColorMask.apply(gl2, self2.colorMask);
          self2.realViewport.apply(gl2, self2.viewport);
          if (self2.ctxAttribs.alpha || !self2.ctxAttribs.preserveDrawingBuffer) {
            self2.realClearColor.apply(gl2, self2.clearColor);
          }
          if (self2.instanceExt) {
            if (positionDivisor != 0) {
              self2.instanceExt.vertexAttribDivisorANGLE(self2.attribs.position, positionDivisor);
            }
            if (texCoordDivisor != 0) {
              self2.instanceExt.vertexAttribDivisorANGLE(self2.attribs.texCoord, texCoordDivisor);
            }
          }
        });
        if (isIOS()) {
          var canvas = gl.canvas;
          if (canvas.width != self2.bufferWidth || canvas.height != self2.bufferHeight) {
            self2.bufferWidth = canvas.width;
            self2.bufferHeight = canvas.height;
            self2.onResize();
          }
        }
      };
      CardboardDistorter.prototype.updateDeviceInfo = function(deviceInfo) {
        var gl = this.gl;
        var self2 = this;
        var glState = [gl.ARRAY_BUFFER_BINDING, gl.ELEMENT_ARRAY_BUFFER_BINDING];
        glPreserveState(gl, glState, function(gl2) {
          var vertices = self2.computeMeshVertices_(self2.meshWidth, self2.meshHeight, deviceInfo);
          gl2.bindBuffer(gl2.ARRAY_BUFFER, self2.vertexBuffer);
          gl2.bufferData(gl2.ARRAY_BUFFER, vertices, gl2.STATIC_DRAW);
          if (!self2.indexCount) {
            var indices = self2.computeMeshIndices_(self2.meshWidth, self2.meshHeight);
            gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, self2.indexBuffer);
            gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, indices, gl2.STATIC_DRAW);
            self2.indexCount = indices.length;
          }
        });
      };
      CardboardDistorter.prototype.computeMeshVertices_ = function(width, height, deviceInfo) {
        var vertices = new Float32Array(2 * width * height * 5);
        var lensFrustum = deviceInfo.getLeftEyeVisibleTanAngles();
        var noLensFrustum = deviceInfo.getLeftEyeNoLensTanAngles();
        var viewport = deviceInfo.getLeftEyeVisibleScreenRect(noLensFrustum);
        var vidx = 0;
        for (var e = 0; e < 2; e++) {
          for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++, vidx++) {
              var u = i / (width - 1);
              var v = j / (height - 1);
              var s = u;
              var t = v;
              var x = lerp(lensFrustum[0], lensFrustum[2], u);
              var y = lerp(lensFrustum[3], lensFrustum[1], v);
              var d = Math.sqrt(x * x + y * y);
              var r = deviceInfo.distortion.distortInverse(d);
              var p = x * r / d;
              var q = y * r / d;
              u = (p - noLensFrustum[0]) / (noLensFrustum[2] - noLensFrustum[0]);
              v = (q - noLensFrustum[3]) / (noLensFrustum[1] - noLensFrustum[3]);
              u = (viewport.x + u * viewport.width - 0.5) * 2;
              v = (viewport.y + v * viewport.height - 0.5) * 2;
              vertices[vidx * 5 + 0] = u;
              vertices[vidx * 5 + 1] = v;
              vertices[vidx * 5 + 2] = s;
              vertices[vidx * 5 + 3] = t;
              vertices[vidx * 5 + 4] = e;
            }
          }
          var w = lensFrustum[2] - lensFrustum[0];
          lensFrustum[0] = -(w + lensFrustum[0]);
          lensFrustum[2] = w - lensFrustum[2];
          w = noLensFrustum[2] - noLensFrustum[0];
          noLensFrustum[0] = -(w + noLensFrustum[0]);
          noLensFrustum[2] = w - noLensFrustum[2];
          viewport.x = 1 - (viewport.x + viewport.width);
        }
        return vertices;
      };
      CardboardDistorter.prototype.computeMeshIndices_ = function(width, height) {
        var indices = new Uint16Array(2 * (width - 1) * (height - 1) * 6);
        var halfwidth = width / 2;
        var halfheight = height / 2;
        var vidx = 0;
        var iidx = 0;
        for (var e = 0; e < 2; e++) {
          for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++, vidx++) {
              if (i == 0 || j == 0)
                continue;
              if (i <= halfwidth == j <= halfheight) {
                indices[iidx++] = vidx;
                indices[iidx++] = vidx - width - 1;
                indices[iidx++] = vidx - width;
                indices[iidx++] = vidx - width - 1;
                indices[iidx++] = vidx;
                indices[iidx++] = vidx - 1;
              } else {
                indices[iidx++] = vidx - 1;
                indices[iidx++] = vidx - width;
                indices[iidx++] = vidx;
                indices[iidx++] = vidx - width;
                indices[iidx++] = vidx - 1;
                indices[iidx++] = vidx - width - 1;
              }
            }
          }
        }
        return indices;
      };
      CardboardDistorter.prototype.getOwnPropertyDescriptor_ = function(proto, attrName) {
        var descriptor = Object.getOwnPropertyDescriptor(proto, attrName);
        if (descriptor.get === void 0 || descriptor.set === void 0) {
          descriptor.configurable = true;
          descriptor.enumerable = true;
          descriptor.get = function() {
            return this.getAttribute(attrName);
          };
          descriptor.set = function(val) {
            this.setAttribute(attrName, val);
          };
        }
        return descriptor;
      };
      var uiVS = ["attribute vec2 position;", "uniform mat4 projectionMat;", "void main() {", "  gl_Position = projectionMat * vec4( position, -1.0, 1.0 );", "}"].join("\n");
      var uiFS = ["precision mediump float;", "uniform vec4 color;", "void main() {", "  gl_FragColor = color;", "}"].join("\n");
      var DEG2RAD = Math.PI / 180;
      var kAnglePerGearSection = 60;
      var kOuterRimEndAngle = 12;
      var kInnerRimBeginAngle = 20;
      var kOuterRadius = 1;
      var kMiddleRadius = 0.75;
      var kInnerRadius = 0.3125;
      var kCenterLineThicknessDp = 4;
      var kButtonWidthDp = 28;
      var kTouchSlopFactor = 1.5;
      function CardboardUI(gl) {
        this.gl = gl;
        this.attribs = {
          position: 0
        };
        this.program = linkProgram(gl, uiVS, uiFS, this.attribs);
        this.uniforms = getProgramUniforms(gl, this.program);
        this.vertexBuffer = gl.createBuffer();
        this.gearOffset = 0;
        this.gearVertexCount = 0;
        this.arrowOffset = 0;
        this.arrowVertexCount = 0;
        this.projMat = new Float32Array(16);
        this.listener = null;
        this.onResize();
      }
      CardboardUI.prototype.destroy = function() {
        var gl = this.gl;
        if (this.listener) {
          gl.canvas.removeEventListener("click", this.listener, false);
        }
        gl.deleteProgram(this.program);
        gl.deleteBuffer(this.vertexBuffer);
      };
      CardboardUI.prototype.listen = function(optionsCallback, backCallback) {
        var canvas = this.gl.canvas;
        this.listener = function(event) {
          var midline = canvas.clientWidth / 2;
          var buttonSize = kButtonWidthDp * kTouchSlopFactor;
          if (event.clientX > midline - buttonSize && event.clientX < midline + buttonSize && event.clientY > canvas.clientHeight - buttonSize) {
            optionsCallback(event);
          } else if (event.clientX < buttonSize && event.clientY < buttonSize) {
            backCallback(event);
          }
        };
        canvas.addEventListener("click", this.listener, false);
      };
      CardboardUI.prototype.onResize = function() {
        var gl = this.gl;
        var self2 = this;
        var glState = [gl.ARRAY_BUFFER_BINDING];
        glPreserveState(gl, glState, function(gl2) {
          var vertices = [];
          var midline = gl2.drawingBufferWidth / 2;
          var physicalPixels = Math.max(screen.width, screen.height) * window.devicePixelRatio;
          var scalingRatio = gl2.drawingBufferWidth / physicalPixels;
          var dps = scalingRatio * window.devicePixelRatio;
          var lineWidth = kCenterLineThicknessDp * dps / 2;
          var buttonSize = kButtonWidthDp * kTouchSlopFactor * dps;
          var buttonScale = kButtonWidthDp * dps / 2;
          var buttonBorder = (kButtonWidthDp * kTouchSlopFactor - kButtonWidthDp) * dps;
          vertices.push(midline - lineWidth, buttonSize);
          vertices.push(midline - lineWidth, gl2.drawingBufferHeight);
          vertices.push(midline + lineWidth, buttonSize);
          vertices.push(midline + lineWidth, gl2.drawingBufferHeight);
          self2.gearOffset = vertices.length / 2;
          function addGearSegment(theta, r) {
            var angle2 = (90 - theta) * DEG2RAD;
            var x = Math.cos(angle2);
            var y = Math.sin(angle2);
            vertices.push(kInnerRadius * x * buttonScale + midline, kInnerRadius * y * buttonScale + buttonScale);
            vertices.push(r * x * buttonScale + midline, r * y * buttonScale + buttonScale);
          }
          for (var i = 0; i <= 6; i++) {
            var segmentTheta = i * kAnglePerGearSection;
            addGearSegment(segmentTheta, kOuterRadius);
            addGearSegment(segmentTheta + kOuterRimEndAngle, kOuterRadius);
            addGearSegment(segmentTheta + kInnerRimBeginAngle, kMiddleRadius);
            addGearSegment(segmentTheta + (kAnglePerGearSection - kInnerRimBeginAngle), kMiddleRadius);
            addGearSegment(segmentTheta + (kAnglePerGearSection - kOuterRimEndAngle), kOuterRadius);
          }
          self2.gearVertexCount = vertices.length / 2 - self2.gearOffset;
          self2.arrowOffset = vertices.length / 2;
          function addArrowVertex(x, y) {
            vertices.push(buttonBorder + x, gl2.drawingBufferHeight - buttonBorder - y);
          }
          var angledLineWidth = lineWidth / Math.sin(45 * DEG2RAD);
          addArrowVertex(0, buttonScale);
          addArrowVertex(buttonScale, 0);
          addArrowVertex(buttonScale + angledLineWidth, angledLineWidth);
          addArrowVertex(angledLineWidth, buttonScale + angledLineWidth);
          addArrowVertex(angledLineWidth, buttonScale - angledLineWidth);
          addArrowVertex(0, buttonScale);
          addArrowVertex(buttonScale, buttonScale * 2);
          addArrowVertex(buttonScale + angledLineWidth, buttonScale * 2 - angledLineWidth);
          addArrowVertex(angledLineWidth, buttonScale - angledLineWidth);
          addArrowVertex(0, buttonScale);
          addArrowVertex(angledLineWidth, buttonScale - lineWidth);
          addArrowVertex(kButtonWidthDp * dps, buttonScale - lineWidth);
          addArrowVertex(angledLineWidth, buttonScale + lineWidth);
          addArrowVertex(kButtonWidthDp * dps, buttonScale + lineWidth);
          self2.arrowVertexCount = vertices.length / 2 - self2.arrowOffset;
          gl2.bindBuffer(gl2.ARRAY_BUFFER, self2.vertexBuffer);
          gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(vertices), gl2.STATIC_DRAW);
        });
      };
      CardboardUI.prototype.render = function() {
        var gl = this.gl;
        var self2 = this;
        var glState = [gl.CULL_FACE, gl.DEPTH_TEST, gl.BLEND, gl.SCISSOR_TEST, gl.STENCIL_TEST, gl.COLOR_WRITEMASK, gl.VIEWPORT, gl.CURRENT_PROGRAM, gl.ARRAY_BUFFER_BINDING];
        glPreserveState(gl, glState, function(gl2) {
          gl2.disable(gl2.CULL_FACE);
          gl2.disable(gl2.DEPTH_TEST);
          gl2.disable(gl2.BLEND);
          gl2.disable(gl2.SCISSOR_TEST);
          gl2.disable(gl2.STENCIL_TEST);
          gl2.colorMask(true, true, true, true);
          gl2.viewport(0, 0, gl2.drawingBufferWidth, gl2.drawingBufferHeight);
          self2.renderNoState();
        });
      };
      CardboardUI.prototype.renderNoState = function() {
        var gl = this.gl;
        gl.useProgram(this.program);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.enableVertexAttribArray(this.attribs.position);
        gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 8, 0);
        gl.uniform4f(this.uniforms.color, 1, 1, 1, 1);
        orthoMatrix(this.projMat, 0, gl.drawingBufferWidth, 0, gl.drawingBufferHeight, 0.1, 1024);
        gl.uniformMatrix4fv(this.uniforms.projectionMat, false, this.projMat);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.drawArrays(gl.TRIANGLE_STRIP, this.gearOffset, this.gearVertexCount);
        gl.drawArrays(gl.TRIANGLE_STRIP, this.arrowOffset, this.arrowVertexCount);
      };
      function Distortion(coefficients) {
        this.coefficients = coefficients;
      }
      Distortion.prototype.distortInverse = function(radius) {
        var r0 = 0;
        var r1 = 1;
        var dr0 = radius - this.distort(r0);
        while (Math.abs(r1 - r0) > 1e-4) {
          var dr1 = radius - this.distort(r1);
          var r2 = r1 - dr1 * ((r1 - r0) / (dr1 - dr0));
          r0 = r1;
          r1 = r2;
          dr0 = dr1;
        }
        return r1;
      };
      Distortion.prototype.distort = function(radius) {
        var r2 = radius * radius;
        var ret = 0;
        for (var i = 0; i < this.coefficients.length; i++) {
          ret = r2 * (ret + this.coefficients[i]);
        }
        return (ret + 1) * radius;
      };
      var degToRad = Math.PI / 180;
      var radToDeg = 180 / Math.PI;
      var Vector3 = function Vector32(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
      };
      Vector3.prototype = {
        constructor: Vector3,
        set: function set2(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
          return this;
        },
        copy: function copy2(v) {
          this.x = v.x;
          this.y = v.y;
          this.z = v.z;
          return this;
        },
        length: function length2() {
          return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        normalize: function normalize2() {
          var scalar = this.length();
          if (scalar !== 0) {
            var invScalar = 1 / scalar;
            this.multiplyScalar(invScalar);
          } else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
          }
          return this;
        },
        multiplyScalar: function multiplyScalar(scalar) {
          this.x *= scalar;
          this.y *= scalar;
          this.z *= scalar;
        },
        applyQuaternion: function applyQuaternion(q) {
          var x = this.x;
          var y = this.y;
          var z = this.z;
          var qx = q.x;
          var qy = q.y;
          var qz = q.z;
          var qw = q.w;
          var ix = qw * x + qy * z - qz * y;
          var iy = qw * y + qz * x - qx * z;
          var iz = qw * z + qx * y - qy * x;
          var iw = -qx * x - qy * y - qz * z;
          this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
          this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
          this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
          return this;
        },
        dot: function dot2(v) {
          return this.x * v.x + this.y * v.y + this.z * v.z;
        },
        crossVectors: function crossVectors(a, b) {
          var ax = a.x, ay = a.y, az = a.z;
          var bx = b.x, by = b.y, bz = b.z;
          this.x = ay * bz - az * by;
          this.y = az * bx - ax * bz;
          this.z = ax * by - ay * bx;
          return this;
        }
      };
      var Quaternion = function Quaternion2(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w !== void 0 ? w : 1;
      };
      Quaternion.prototype = {
        constructor: Quaternion,
        set: function set2(x, y, z, w) {
          this.x = x;
          this.y = y;
          this.z = z;
          this.w = w;
          return this;
        },
        copy: function copy2(quaternion) {
          this.x = quaternion.x;
          this.y = quaternion.y;
          this.z = quaternion.z;
          this.w = quaternion.w;
          return this;
        },
        setFromEulerXYZ: function setFromEulerXYZ(x, y, z) {
          var c1 = Math.cos(x / 2);
          var c2 = Math.cos(y / 2);
          var c3 = Math.cos(z / 2);
          var s1 = Math.sin(x / 2);
          var s2 = Math.sin(y / 2);
          var s3 = Math.sin(z / 2);
          this.x = s1 * c2 * c3 + c1 * s2 * s3;
          this.y = c1 * s2 * c3 - s1 * c2 * s3;
          this.z = c1 * c2 * s3 + s1 * s2 * c3;
          this.w = c1 * c2 * c3 - s1 * s2 * s3;
          return this;
        },
        setFromEulerYXZ: function setFromEulerYXZ(x, y, z) {
          var c1 = Math.cos(x / 2);
          var c2 = Math.cos(y / 2);
          var c3 = Math.cos(z / 2);
          var s1 = Math.sin(x / 2);
          var s2 = Math.sin(y / 2);
          var s3 = Math.sin(z / 2);
          this.x = s1 * c2 * c3 + c1 * s2 * s3;
          this.y = c1 * s2 * c3 - s1 * c2 * s3;
          this.z = c1 * c2 * s3 - s1 * s2 * c3;
          this.w = c1 * c2 * c3 + s1 * s2 * s3;
          return this;
        },
        setFromAxisAngle: function setFromAxisAngle(axis, angle2) {
          var halfAngle = angle2 / 2, s = Math.sin(halfAngle);
          this.x = axis.x * s;
          this.y = axis.y * s;
          this.z = axis.z * s;
          this.w = Math.cos(halfAngle);
          return this;
        },
        multiply: function multiply2(q) {
          return this.multiplyQuaternions(this, q);
        },
        multiplyQuaternions: function multiplyQuaternions(a, b) {
          var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
          var qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;
          this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
          this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
          this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
          this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
          return this;
        },
        inverse: function inverse() {
          this.x *= -1;
          this.y *= -1;
          this.z *= -1;
          this.normalize();
          return this;
        },
        normalize: function normalize2() {
          var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
          if (l === 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
          } else {
            l = 1 / l;
            this.x = this.x * l;
            this.y = this.y * l;
            this.z = this.z * l;
            this.w = this.w * l;
          }
          return this;
        },
        slerp: function slerp2(qb, t) {
          if (t === 0)
            return this;
          if (t === 1)
            return this.copy(qb);
          var x = this.x, y = this.y, z = this.z, w = this.w;
          var cosHalfTheta = w * qb.w + x * qb.x + y * qb.y + z * qb.z;
          if (cosHalfTheta < 0) {
            this.w = -qb.w;
            this.x = -qb.x;
            this.y = -qb.y;
            this.z = -qb.z;
            cosHalfTheta = -cosHalfTheta;
          } else {
            this.copy(qb);
          }
          if (cosHalfTheta >= 1) {
            this.w = w;
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
          }
          var halfTheta = Math.acos(cosHalfTheta);
          var sinHalfTheta = Math.sqrt(1 - cosHalfTheta * cosHalfTheta);
          if (Math.abs(sinHalfTheta) < 1e-3) {
            this.w = 0.5 * (w + this.w);
            this.x = 0.5 * (x + this.x);
            this.y = 0.5 * (y + this.y);
            this.z = 0.5 * (z + this.z);
            return this;
          }
          var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta, ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
          this.w = w * ratioA + this.w * ratioB;
          this.x = x * ratioA + this.x * ratioB;
          this.y = y * ratioA + this.y * ratioB;
          this.z = z * ratioA + this.z * ratioB;
          return this;
        },
        setFromUnitVectors: function() {
          var v1, r;
          var EPS = 1e-6;
          return function(vFrom, vTo) {
            if (v1 === void 0)
              v1 = new Vector3();
            r = vFrom.dot(vTo) + 1;
            if (r < EPS) {
              r = 0;
              if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                v1.set(-vFrom.y, vFrom.x, 0);
              } else {
                v1.set(0, -vFrom.z, vFrom.y);
              }
            } else {
              v1.crossVectors(vFrom, vTo);
            }
            this.x = v1.x;
            this.y = v1.y;
            this.z = v1.z;
            this.w = r;
            this.normalize();
            return this;
          };
        }()
      };
      function Device(params) {
        this.width = params.width || getScreenWidth();
        this.height = params.height || getScreenHeight();
        this.widthMeters = params.widthMeters;
        this.heightMeters = params.heightMeters;
        this.bevelMeters = params.bevelMeters;
      }
      var DEFAULT_ANDROID = new Device({
        widthMeters: 0.11,
        heightMeters: 0.062,
        bevelMeters: 4e-3
      });
      var DEFAULT_IOS = new Device({
        widthMeters: 0.1038,
        heightMeters: 0.0584,
        bevelMeters: 4e-3
      });
      var Viewers = {
        CardboardV1: new CardboardViewer({
          id: "CardboardV1",
          label: "Cardboard I/O 2014",
          fov: 40,
          interLensDistance: 0.06,
          baselineLensDistance: 0.035,
          screenLensDistance: 0.042,
          distortionCoefficients: [0.441, 0.156],
          inverseCoefficients: [-0.4410035, 0.42756155, -0.4804439, 0.5460139, -0.58821183, 0.5733938, -0.48303202, 0.33299083, -0.17573841, 0.0651772, -0.01488963, 1559834e-9]
        }),
        CardboardV2: new CardboardViewer({
          id: "CardboardV2",
          label: "Cardboard I/O 2015",
          fov: 60,
          interLensDistance: 0.064,
          baselineLensDistance: 0.035,
          screenLensDistance: 0.039,
          distortionCoefficients: [0.34, 0.55],
          inverseCoefficients: [-0.33836704, -0.18162185, 0.862655, -1.2462051, 1.0560602, -0.58208317, 0.21609078, -0.05444823, 9177956e-9, -9904169e-10, 6183535e-11, -16981803e-13]
        })
      };
      function DeviceInfo(deviceParams, additionalViewers) {
        this.viewer = Viewers.CardboardV2;
        this.updateDeviceParams(deviceParams);
        this.distortion = new Distortion(this.viewer.distortionCoefficients);
        for (var i = 0; i < additionalViewers.length; i++) {
          var viewer = additionalViewers[i];
          Viewers[viewer.id] = new CardboardViewer(viewer);
        }
      }
      DeviceInfo.prototype.updateDeviceParams = function(deviceParams) {
        this.device = this.determineDevice_(deviceParams) || this.device;
      };
      DeviceInfo.prototype.getDevice = function() {
        return this.device;
      };
      DeviceInfo.prototype.setViewer = function(viewer) {
        this.viewer = viewer;
        this.distortion = new Distortion(this.viewer.distortionCoefficients);
      };
      DeviceInfo.prototype.determineDevice_ = function(deviceParams) {
        if (!deviceParams) {
          if (isIOS()) {
            console.warn("Using fallback iOS device measurements.");
            return DEFAULT_IOS;
          } else {
            console.warn("Using fallback Android device measurements.");
            return DEFAULT_ANDROID;
          }
        }
        var METERS_PER_INCH = 0.0254;
        var metersPerPixelX = METERS_PER_INCH / deviceParams.xdpi;
        var metersPerPixelY = METERS_PER_INCH / deviceParams.ydpi;
        var width = getScreenWidth();
        var height = getScreenHeight();
        return new Device({
          widthMeters: metersPerPixelX * width,
          heightMeters: metersPerPixelY * height,
          bevelMeters: deviceParams.bevelMm * 1e-3
        });
      };
      DeviceInfo.prototype.getDistortedFieldOfViewLeftEye = function() {
        var viewer = this.viewer;
        var device = this.device;
        var distortion = this.distortion;
        var eyeToScreenDistance = viewer.screenLensDistance;
        var outerDist = (device.widthMeters - viewer.interLensDistance) / 2;
        var innerDist = viewer.interLensDistance / 2;
        var bottomDist = viewer.baselineLensDistance - device.bevelMeters;
        var topDist = device.heightMeters - bottomDist;
        var outerAngle = radToDeg * Math.atan(distortion.distort(outerDist / eyeToScreenDistance));
        var innerAngle = radToDeg * Math.atan(distortion.distort(innerDist / eyeToScreenDistance));
        var bottomAngle = radToDeg * Math.atan(distortion.distort(bottomDist / eyeToScreenDistance));
        var topAngle = radToDeg * Math.atan(distortion.distort(topDist / eyeToScreenDistance));
        return {
          leftDegrees: Math.min(outerAngle, viewer.fov),
          rightDegrees: Math.min(innerAngle, viewer.fov),
          downDegrees: Math.min(bottomAngle, viewer.fov),
          upDegrees: Math.min(topAngle, viewer.fov)
        };
      };
      DeviceInfo.prototype.getLeftEyeVisibleTanAngles = function() {
        var viewer = this.viewer;
        var device = this.device;
        var distortion = this.distortion;
        var fovLeft = Math.tan(-degToRad * viewer.fov);
        var fovTop = Math.tan(degToRad * viewer.fov);
        var fovRight = Math.tan(degToRad * viewer.fov);
        var fovBottom = Math.tan(-degToRad * viewer.fov);
        var halfWidth = device.widthMeters / 4;
        var halfHeight = device.heightMeters / 2;
        var verticalLensOffset = viewer.baselineLensDistance - device.bevelMeters - halfHeight;
        var centerX = viewer.interLensDistance / 2 - halfWidth;
        var centerY = -verticalLensOffset;
        var centerZ = viewer.screenLensDistance;
        var screenLeft = distortion.distort((centerX - halfWidth) / centerZ);
        var screenTop = distortion.distort((centerY + halfHeight) / centerZ);
        var screenRight = distortion.distort((centerX + halfWidth) / centerZ);
        var screenBottom = distortion.distort((centerY - halfHeight) / centerZ);
        var result = new Float32Array(4);
        result[0] = Math.max(fovLeft, screenLeft);
        result[1] = Math.min(fovTop, screenTop);
        result[2] = Math.min(fovRight, screenRight);
        result[3] = Math.max(fovBottom, screenBottom);
        return result;
      };
      DeviceInfo.prototype.getLeftEyeNoLensTanAngles = function() {
        var viewer = this.viewer;
        var device = this.device;
        var distortion = this.distortion;
        var result = new Float32Array(4);
        var fovLeft = distortion.distortInverse(Math.tan(-degToRad * viewer.fov));
        var fovTop = distortion.distortInverse(Math.tan(degToRad * viewer.fov));
        var fovRight = distortion.distortInverse(Math.tan(degToRad * viewer.fov));
        var fovBottom = distortion.distortInverse(Math.tan(-degToRad * viewer.fov));
        var halfWidth = device.widthMeters / 4;
        var halfHeight = device.heightMeters / 2;
        var verticalLensOffset = viewer.baselineLensDistance - device.bevelMeters - halfHeight;
        var centerX = viewer.interLensDistance / 2 - halfWidth;
        var centerY = -verticalLensOffset;
        var centerZ = viewer.screenLensDistance;
        var screenLeft = (centerX - halfWidth) / centerZ;
        var screenTop = (centerY + halfHeight) / centerZ;
        var screenRight = (centerX + halfWidth) / centerZ;
        var screenBottom = (centerY - halfHeight) / centerZ;
        result[0] = Math.max(fovLeft, screenLeft);
        result[1] = Math.min(fovTop, screenTop);
        result[2] = Math.min(fovRight, screenRight);
        result[3] = Math.max(fovBottom, screenBottom);
        return result;
      };
      DeviceInfo.prototype.getLeftEyeVisibleScreenRect = function(undistortedFrustum) {
        var viewer = this.viewer;
        var device = this.device;
        var dist = viewer.screenLensDistance;
        var eyeX = (device.widthMeters - viewer.interLensDistance) / 2;
        var eyeY = viewer.baselineLensDistance - device.bevelMeters;
        var left = (undistortedFrustum[0] * dist + eyeX) / device.widthMeters;
        var top = (undistortedFrustum[1] * dist + eyeY) / device.heightMeters;
        var right = (undistortedFrustum[2] * dist + eyeX) / device.widthMeters;
        var bottom = (undistortedFrustum[3] * dist + eyeY) / device.heightMeters;
        return {
          x: left,
          y: bottom,
          width: right - left,
          height: top - bottom
        };
      };
      DeviceInfo.prototype.getFieldOfViewLeftEye = function(opt_isUndistorted) {
        return opt_isUndistorted ? this.getUndistortedFieldOfViewLeftEye() : this.getDistortedFieldOfViewLeftEye();
      };
      DeviceInfo.prototype.getFieldOfViewRightEye = function(opt_isUndistorted) {
        var fov = this.getFieldOfViewLeftEye(opt_isUndistorted);
        return {
          leftDegrees: fov.rightDegrees,
          rightDegrees: fov.leftDegrees,
          upDegrees: fov.upDegrees,
          downDegrees: fov.downDegrees
        };
      };
      DeviceInfo.prototype.getUndistortedFieldOfViewLeftEye = function() {
        var p = this.getUndistortedParams_();
        return {
          leftDegrees: radToDeg * Math.atan(p.outerDist),
          rightDegrees: radToDeg * Math.atan(p.innerDist),
          downDegrees: radToDeg * Math.atan(p.bottomDist),
          upDegrees: radToDeg * Math.atan(p.topDist)
        };
      };
      DeviceInfo.prototype.getUndistortedViewportLeftEye = function() {
        var p = this.getUndistortedParams_();
        var viewer = this.viewer;
        var device = this.device;
        var eyeToScreenDistance = viewer.screenLensDistance;
        var screenWidth = device.widthMeters / eyeToScreenDistance;
        var screenHeight = device.heightMeters / eyeToScreenDistance;
        var xPxPerTanAngle = device.width / screenWidth;
        var yPxPerTanAngle = device.height / screenHeight;
        var x = Math.round((p.eyePosX - p.outerDist) * xPxPerTanAngle);
        var y = Math.round((p.eyePosY - p.bottomDist) * yPxPerTanAngle);
        return {
          x,
          y,
          width: Math.round((p.eyePosX + p.innerDist) * xPxPerTanAngle) - x,
          height: Math.round((p.eyePosY + p.topDist) * yPxPerTanAngle) - y
        };
      };
      DeviceInfo.prototype.getUndistortedParams_ = function() {
        var viewer = this.viewer;
        var device = this.device;
        var distortion = this.distortion;
        var eyeToScreenDistance = viewer.screenLensDistance;
        var halfLensDistance = viewer.interLensDistance / 2 / eyeToScreenDistance;
        var screenWidth = device.widthMeters / eyeToScreenDistance;
        var screenHeight = device.heightMeters / eyeToScreenDistance;
        var eyePosX = screenWidth / 2 - halfLensDistance;
        var eyePosY = (viewer.baselineLensDistance - device.bevelMeters) / eyeToScreenDistance;
        var maxFov = viewer.fov;
        var viewerMax = distortion.distortInverse(Math.tan(degToRad * maxFov));
        var outerDist = Math.min(eyePosX, viewerMax);
        var innerDist = Math.min(halfLensDistance, viewerMax);
        var bottomDist = Math.min(eyePosY, viewerMax);
        var topDist = Math.min(screenHeight - eyePosY, viewerMax);
        return {
          outerDist,
          innerDist,
          topDist,
          bottomDist,
          eyePosX,
          eyePosY
        };
      };
      function CardboardViewer(params) {
        this.id = params.id;
        this.label = params.label;
        this.fov = params.fov;
        this.interLensDistance = params.interLensDistance;
        this.baselineLensDistance = params.baselineLensDistance;
        this.screenLensDistance = params.screenLensDistance;
        this.distortionCoefficients = params.distortionCoefficients;
        this.inverseCoefficients = params.inverseCoefficients;
      }
      DeviceInfo.Viewers = Viewers;
      var format = 1;
      var last_updated = "2019-11-09T17:36:14Z";
      var devices = [{ "type": "android", "rules": [{ "mdmh": "asus/*/Nexus 7/*" }, { "ua": "Nexus 7" }], "dpi": [320.8, 323], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "asus/*/ASUS_X00PD/*" }, { "ua": "ASUS_X00PD" }], "dpi": 245, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "asus/*/ASUS_X008D/*" }, { "ua": "ASUS_X008D" }], "dpi": 282, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "asus/*/ASUS_Z00AD/*" }, { "ua": "ASUS_Z00AD" }], "dpi": [403, 404.6], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Google/*/Pixel 2 XL/*" }, { "ua": "Pixel 2 XL" }], "dpi": 537.9, "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Google/*/Pixel 3 XL/*" }, { "ua": "Pixel 3 XL" }], "dpi": [558.5, 553.8], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Google/*/Pixel XL/*" }, { "ua": "Pixel XL" }], "dpi": [537.9, 533], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Google/*/Pixel 3/*" }, { "ua": "Pixel 3" }], "dpi": 442.4, "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Google/*/Pixel 2/*" }, { "ua": "Pixel 2" }], "dpi": 441, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "Google/*/Pixel/*" }, { "ua": "Pixel" }], "dpi": [432.6, 436.7], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "HTC/*/HTC6435LVW/*" }, { "ua": "HTC6435LVW" }], "dpi": [449.7, 443.3], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "HTC/*/HTC One XL/*" }, { "ua": "HTC One XL" }], "dpi": [315.3, 314.6], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "htc/*/Nexus 9/*" }, { "ua": "Nexus 9" }], "dpi": 289, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "HTC/*/HTC One M9/*" }, { "ua": "HTC One M9" }], "dpi": [442.5, 443.3], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "HTC/*/HTC One_M8/*" }, { "ua": "HTC One_M8" }], "dpi": [449.7, 447.4], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "HTC/*/HTC One/*" }, { "ua": "HTC One" }], "dpi": 472.8, "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Huawei/*/Nexus 6P/*" }, { "ua": "Nexus 6P" }], "dpi": [515.1, 518], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Huawei/*/BLN-L24/*" }, { "ua": "HONORBLN-L24" }], "dpi": 480, "bw": 4, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "Huawei/*/BKL-L09/*" }, { "ua": "BKL-L09" }], "dpi": 403, "bw": 3.47, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "LENOVO/*/Lenovo PB2-690Y/*" }, { "ua": "Lenovo PB2-690Y" }], "dpi": [457.2, 454.713], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "LGE/*/Nexus 5X/*" }, { "ua": "Nexus 5X" }], "dpi": [422, 419.9], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "LGE/*/LGMS345/*" }, { "ua": "LGMS345" }], "dpi": [221.7, 219.1], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "LGE/*/LG-D800/*" }, { "ua": "LG-D800" }], "dpi": [422, 424.1], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "LGE/*/LG-D850/*" }, { "ua": "LG-D850" }], "dpi": [537.9, 541.9], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "LGE/*/VS985 4G/*" }, { "ua": "VS985 4G" }], "dpi": [537.9, 535.6], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "LGE/*/Nexus 5/*" }, { "ua": "Nexus 5 B" }], "dpi": [442.4, 444.8], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "LGE/*/Nexus 4/*" }, { "ua": "Nexus 4" }], "dpi": [319.8, 318.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "LGE/*/LG-P769/*" }, { "ua": "LG-P769" }], "dpi": [240.6, 247.5], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "LGE/*/LGMS323/*" }, { "ua": "LGMS323" }], "dpi": [206.6, 204.6], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "LGE/*/LGLS996/*" }, { "ua": "LGLS996" }], "dpi": [403.4, 401.5], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Micromax/*/4560MMX/*" }, { "ua": "4560MMX" }], "dpi": [240, 219.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Micromax/*/A250/*" }, { "ua": "Micromax A250" }], "dpi": [480, 446.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Micromax/*/Micromax AQ4501/*" }, { "ua": "Micromax AQ4501" }], "dpi": 240, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/G5/*" }, { "ua": "Moto G (5) Plus" }], "dpi": [403.4, 403], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/DROID RAZR/*" }, { "ua": "DROID RAZR" }], "dpi": [368.1, 256.7], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/XT830C/*" }, { "ua": "XT830C" }], "dpi": [254, 255.9], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/XT1021/*" }, { "ua": "XT1021" }], "dpi": [254, 256.7], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/XT1023/*" }, { "ua": "XT1023" }], "dpi": [254, 256.7], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/XT1028/*" }, { "ua": "XT1028" }], "dpi": [326.6, 327.6], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/XT1034/*" }, { "ua": "XT1034" }], "dpi": [326.6, 328.4], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/XT1053/*" }, { "ua": "XT1053" }], "dpi": [315.3, 316.1], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/XT1562/*" }, { "ua": "XT1562" }], "dpi": [403.4, 402.7], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/Nexus 6/*" }, { "ua": "Nexus 6 B" }], "dpi": [494.3, 489.7], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/XT1063/*" }, { "ua": "XT1063" }], "dpi": [295, 296.6], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/XT1064/*" }, { "ua": "XT1064" }], "dpi": [295, 295.6], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/XT1092/*" }, { "ua": "XT1092" }], "dpi": [422, 424.1], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/XT1095/*" }, { "ua": "XT1095" }], "dpi": [422, 423.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "motorola/*/G4/*" }, { "ua": "Moto G (4)" }], "dpi": 401, "bw": 4, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/A0001/*" }, { "ua": "A0001" }], "dpi": [403.4, 401], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONE E1001/*" }, { "ua": "ONE E1001" }], "dpi": [442.4, 441.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONE E1003/*" }, { "ua": "ONE E1003" }], "dpi": [442.4, 441.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONE E1005/*" }, { "ua": "ONE E1005" }], "dpi": [442.4, 441.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONE A2001/*" }, { "ua": "ONE A2001" }], "dpi": [391.9, 405.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONE A2003/*" }, { "ua": "ONE A2003" }], "dpi": [391.9, 405.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONE A2005/*" }, { "ua": "ONE A2005" }], "dpi": [391.9, 405.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONEPLUS A3000/*" }, { "ua": "ONEPLUS A3000" }], "dpi": 401, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONEPLUS A3003/*" }, { "ua": "ONEPLUS A3003" }], "dpi": 401, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONEPLUS A3010/*" }, { "ua": "ONEPLUS A3010" }], "dpi": 401, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONEPLUS A5000/*" }, { "ua": "ONEPLUS A5000 " }], "dpi": [403.411, 399.737], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONE A5010/*" }, { "ua": "ONEPLUS A5010" }], "dpi": [403, 400], "bw": 2, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONEPLUS A6000/*" }, { "ua": "ONEPLUS A6000" }], "dpi": 401, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONEPLUS A6003/*" }, { "ua": "ONEPLUS A6003" }], "dpi": 401, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONEPLUS A6010/*" }, { "ua": "ONEPLUS A6010" }], "dpi": 401, "bw": 2, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "OnePlus/*/ONEPLUS A6013/*" }, { "ua": "ONEPLUS A6013" }], "dpi": 401, "bw": 2, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "OPPO/*/X909/*" }, { "ua": "X909" }], "dpi": [442.4, 444.1], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/GT-I9082/*" }, { "ua": "GT-I9082" }], "dpi": [184.7, 185.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G360P/*" }, { "ua": "SM-G360P" }], "dpi": [196.7, 205.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/Nexus S/*" }, { "ua": "Nexus S" }], "dpi": [234.5, 229.8], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/GT-I9300/*" }, { "ua": "GT-I9300" }], "dpi": [304.8, 303.9], "bw": 5, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-T230NU/*" }, { "ua": "SM-T230NU" }], "dpi": 216, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SGH-T399/*" }, { "ua": "SGH-T399" }], "dpi": [217.7, 231.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SGH-M919/*" }, { "ua": "SGH-M919" }], "dpi": [440.8, 437.7], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-N9005/*" }, { "ua": "SM-N9005" }], "dpi": [386.4, 387], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SAMSUNG-SM-N900A/*" }, { "ua": "SAMSUNG-SM-N900A" }], "dpi": [386.4, 387.7], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/GT-I9500/*" }, { "ua": "GT-I9500" }], "dpi": [442.5, 443.3], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/GT-I9505/*" }, { "ua": "GT-I9505" }], "dpi": 439.4, "bw": 4, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G900F/*" }, { "ua": "SM-G900F" }], "dpi": [415.6, 431.6], "bw": 5, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G900M/*" }, { "ua": "SM-G900M" }], "dpi": [415.6, 431.6], "bw": 5, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G800F/*" }, { "ua": "SM-G800F" }], "dpi": 326.8, "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G906S/*" }, { "ua": "SM-G906S" }], "dpi": [562.7, 572.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/GT-I9300/*" }, { "ua": "GT-I9300" }], "dpi": [306.7, 304.8], "bw": 5, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-T535/*" }, { "ua": "SM-T535" }], "dpi": [142.6, 136.4], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-N920C/*" }, { "ua": "SM-N920C" }], "dpi": [515.1, 518.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-N920P/*" }, { "ua": "SM-N920P" }], "dpi": [386.3655, 390.144], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-N920W8/*" }, { "ua": "SM-N920W8" }], "dpi": [515.1, 518.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/GT-I9300I/*" }, { "ua": "GT-I9300I" }], "dpi": [304.8, 305.8], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/GT-I9195/*" }, { "ua": "GT-I9195" }], "dpi": [249.4, 256.7], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SPH-L520/*" }, { "ua": "SPH-L520" }], "dpi": [249.4, 255.9], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SAMSUNG-SGH-I717/*" }, { "ua": "SAMSUNG-SGH-I717" }], "dpi": 285.8, "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SPH-D710/*" }, { "ua": "SPH-D710" }], "dpi": [217.7, 204.2], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/GT-N7100/*" }, { "ua": "GT-N7100" }], "dpi": 265.1, "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SCH-I605/*" }, { "ua": "SCH-I605" }], "dpi": 265.1, "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/Galaxy Nexus/*" }, { "ua": "Galaxy Nexus" }], "dpi": [315.3, 314.2], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-N910H/*" }, { "ua": "SM-N910H" }], "dpi": [515.1, 518], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-N910C/*" }, { "ua": "SM-N910C" }], "dpi": [515.2, 520.2], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G130M/*" }, { "ua": "SM-G130M" }], "dpi": [165.9, 164.8], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G928I/*" }, { "ua": "SM-G928I" }], "dpi": [515.1, 518.4], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G920F/*" }, { "ua": "SM-G920F" }], "dpi": 580.6, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G920P/*" }, { "ua": "SM-G920P" }], "dpi": [522.5, 577], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G925F/*" }, { "ua": "SM-G925F" }], "dpi": 580.6, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G925V/*" }, { "ua": "SM-G925V" }], "dpi": [522.5, 576.6], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G930F/*" }, { "ua": "SM-G930F" }], "dpi": 576.6, "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G935F/*" }, { "ua": "SM-G935F" }], "dpi": 533, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G950F/*" }, { "ua": "SM-G950F" }], "dpi": [562.707, 565.293], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G955U/*" }, { "ua": "SM-G955U" }], "dpi": [522.514, 525.762], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G955F/*" }, { "ua": "SM-G955F" }], "dpi": [522.514, 525.762], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G960F/*" }, { "ua": "SM-G960F" }], "dpi": [569.575, 571.5], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G9600/*" }, { "ua": "SM-G9600" }], "dpi": [569.575, 571.5], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G960T/*" }, { "ua": "SM-G960T" }], "dpi": [569.575, 571.5], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G960N/*" }, { "ua": "SM-G960N" }], "dpi": [569.575, 571.5], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G960U/*" }, { "ua": "SM-G960U" }], "dpi": [569.575, 571.5], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G9608/*" }, { "ua": "SM-G9608" }], "dpi": [569.575, 571.5], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G960FD/*" }, { "ua": "SM-G960FD" }], "dpi": [569.575, 571.5], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G960W/*" }, { "ua": "SM-G960W" }], "dpi": [569.575, 571.5], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G965F/*" }, { "ua": "SM-G965F" }], "dpi": 529, "bw": 2, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Sony/*/C6903/*" }, { "ua": "C6903" }], "dpi": [442.5, 443.3], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "Sony/*/D6653/*" }, { "ua": "D6653" }], "dpi": [428.6, 427.6], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Sony/*/E6653/*" }, { "ua": "E6653" }], "dpi": [428.6, 425.7], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Sony/*/E6853/*" }, { "ua": "E6853" }], "dpi": [403.4, 401.9], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Sony/*/SGP321/*" }, { "ua": "SGP321" }], "dpi": [224.7, 224.1], "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "TCT/*/ALCATEL ONE TOUCH Fierce/*" }, { "ua": "ALCATEL ONE TOUCH Fierce" }], "dpi": [240, 247.5], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "THL/*/thl 5000/*" }, { "ua": "thl 5000" }], "dpi": [480, 443.3], "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Fly/*/IQ4412/*" }, { "ua": "IQ4412" }], "dpi": 307.9, "bw": 3, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "ZTE/*/ZTE Blade L2/*" }, { "ua": "ZTE Blade L2" }], "dpi": 240, "bw": 3, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "BENEVE/*/VR518/*" }, { "ua": "VR518" }], "dpi": 480, "bw": 3, "ac": 500 }, { "type": "ios", "rules": [{ "res": [640, 960] }], "dpi": [325.1, 328.4], "bw": 4, "ac": 1e3 }, { "type": "ios", "rules": [{ "res": [640, 1136] }], "dpi": [317.1, 320.2], "bw": 3, "ac": 1e3 }, { "type": "ios", "rules": [{ "res": [750, 1334] }], "dpi": 326.4, "bw": 4, "ac": 1e3 }, { "type": "ios", "rules": [{ "res": [1242, 2208] }], "dpi": [453.6, 458.4], "bw": 4, "ac": 1e3 }, { "type": "ios", "rules": [{ "res": [1125, 2001] }], "dpi": [410.9, 415.4], "bw": 4, "ac": 1e3 }, { "type": "ios", "rules": [{ "res": [1125, 2436] }], "dpi": 458, "bw": 4, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "Huawei/*/EML-L29/*" }, { "ua": "EML-L29" }], "dpi": 428, "bw": 3.45, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "Nokia/*/Nokia 7.1/*" }, { "ua": "Nokia 7.1" }], "dpi": [432, 431.9], "bw": 3, "ac": 500 }, { "type": "ios", "rules": [{ "res": [1242, 2688] }], "dpi": 458, "bw": 4, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G570M/*" }, { "ua": "SM-G570M" }], "dpi": 320, "bw": 3.684, "ac": 1e3 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G970F/*" }, { "ua": "SM-G970F" }], "dpi": 438, "bw": 2.281, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G973F/*" }, { "ua": "SM-G973F" }], "dpi": 550, "bw": 2.002, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G975F/*" }, { "ua": "SM-G975F" }], "dpi": 522, "bw": 2.054, "ac": 500 }, { "type": "android", "rules": [{ "mdmh": "samsung/*/SM-G977F/*" }, { "ua": "SM-G977F" }], "dpi": 505, "bw": 2.334, "ac": 500 }, { "type": "ios", "rules": [{ "res": [828, 1792] }], "dpi": 326, "bw": 5, "ac": 500 }];
      var DPDB_CACHE = {
        format,
        last_updated,
        devices
      };
      function Dpdb(url, onDeviceParamsUpdated) {
        this.dpdb = DPDB_CACHE;
        this.recalculateDeviceParams_();
        if (url) {
          this.onDeviceParamsUpdated = onDeviceParamsUpdated;
          var xhr = new XMLHttpRequest();
          var obj = this;
          xhr.open("GET", url, true);
          xhr.addEventListener("load", function() {
            obj.loading = false;
            if (xhr.status >= 200 && xhr.status <= 299) {
              obj.dpdb = JSON.parse(xhr.response);
              obj.recalculateDeviceParams_();
            } else {
              console.error("Error loading online DPDB!");
            }
          });
          xhr.send();
        }
      }
      Dpdb.prototype.getDeviceParams = function() {
        return this.deviceParams;
      };
      Dpdb.prototype.recalculateDeviceParams_ = function() {
        var newDeviceParams = this.calcDeviceParams_();
        if (newDeviceParams) {
          this.deviceParams = newDeviceParams;
          if (this.onDeviceParamsUpdated) {
            this.onDeviceParamsUpdated(this.deviceParams);
          }
        } else {
          console.error("Failed to recalculate device parameters.");
        }
      };
      Dpdb.prototype.calcDeviceParams_ = function() {
        var db = this.dpdb;
        if (!db) {
          console.error("DPDB not available.");
          return null;
        }
        if (db.format != 1) {
          console.error("DPDB has unexpected format version.");
          return null;
        }
        if (!db.devices || !db.devices.length) {
          console.error("DPDB does not have a devices section.");
          return null;
        }
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        var width = getScreenWidth();
        var height = getScreenHeight();
        if (!db.devices) {
          console.error("DPDB has no devices section.");
          return null;
        }
        for (var i = 0; i < db.devices.length; i++) {
          var device = db.devices[i];
          if (!device.rules) {
            console.warn("Device[" + i + "] has no rules section.");
            continue;
          }
          if (device.type != "ios" && device.type != "android") {
            console.warn("Device[" + i + "] has invalid type.");
            continue;
          }
          if (isIOS() != (device.type == "ios"))
            continue;
          var matched = false;
          for (var j = 0; j < device.rules.length; j++) {
            var rule = device.rules[j];
            if (this.ruleMatches_(rule, userAgent, width, height)) {
              matched = true;
              break;
            }
          }
          if (!matched)
            continue;
          var xdpi = device.dpi[0] || device.dpi;
          var ydpi = device.dpi[1] || device.dpi;
          return new DeviceParams({ xdpi, ydpi, bevelMm: device.bw });
        }
        console.warn("No DPDB device match.");
        return null;
      };
      Dpdb.prototype.ruleMatches_ = function(rule, ua, screenWidth, screenHeight) {
        if (!rule.ua && !rule.res)
          return false;
        if (rule.ua && rule.ua.substring(0, 2) === "SM")
          rule.ua = rule.ua.substring(0, 7);
        if (rule.ua && ua.indexOf(rule.ua) < 0)
          return false;
        if (rule.res) {
          if (!rule.res[0] || !rule.res[1])
            return false;
          var resX = rule.res[0];
          var resY = rule.res[1];
          if (Math.min(screenWidth, screenHeight) != Math.min(resX, resY) || Math.max(screenWidth, screenHeight) != Math.max(resX, resY)) {
            return false;
          }
        }
        return true;
      };
      function DeviceParams(params) {
        this.xdpi = params.xdpi;
        this.ydpi = params.ydpi;
        this.bevelMm = params.bevelMm;
      }
      function SensorSample(sample, timestampS) {
        this.set(sample, timestampS);
      }
      SensorSample.prototype.set = function(sample, timestampS) {
        this.sample = sample;
        this.timestampS = timestampS;
      };
      SensorSample.prototype.copy = function(sensorSample) {
        this.set(sensorSample.sample, sensorSample.timestampS);
      };
      function ComplementaryFilter(kFilter, isDebug) {
        this.kFilter = kFilter;
        this.isDebug = isDebug;
        this.currentAccelMeasurement = new SensorSample();
        this.currentGyroMeasurement = new SensorSample();
        this.previousGyroMeasurement = new SensorSample();
        if (isIOS()) {
          this.filterQ = new Quaternion(-1, 0, 0, 1);
        } else {
          this.filterQ = new Quaternion(1, 0, 0, 1);
        }
        this.previousFilterQ = new Quaternion();
        this.previousFilterQ.copy(this.filterQ);
        this.accelQ = new Quaternion();
        this.isOrientationInitialized = false;
        this.estimatedGravity = new Vector3();
        this.measuredGravity = new Vector3();
        this.gyroIntegralQ = new Quaternion();
      }
      ComplementaryFilter.prototype.addAccelMeasurement = function(vector, timestampS) {
        this.currentAccelMeasurement.set(vector, timestampS);
      };
      ComplementaryFilter.prototype.addGyroMeasurement = function(vector, timestampS) {
        this.currentGyroMeasurement.set(vector, timestampS);
        var deltaT = timestampS - this.previousGyroMeasurement.timestampS;
        if (isTimestampDeltaValid(deltaT)) {
          this.run_();
        }
        this.previousGyroMeasurement.copy(this.currentGyroMeasurement);
      };
      ComplementaryFilter.prototype.run_ = function() {
        if (!this.isOrientationInitialized) {
          this.accelQ = this.accelToQuaternion_(this.currentAccelMeasurement.sample);
          this.previousFilterQ.copy(this.accelQ);
          this.isOrientationInitialized = true;
          return;
        }
        var deltaT = this.currentGyroMeasurement.timestampS - this.previousGyroMeasurement.timestampS;
        var gyroDeltaQ = this.gyroToQuaternionDelta_(this.currentGyroMeasurement.sample, deltaT);
        this.gyroIntegralQ.multiply(gyroDeltaQ);
        this.filterQ.copy(this.previousFilterQ);
        this.filterQ.multiply(gyroDeltaQ);
        var invFilterQ = new Quaternion();
        invFilterQ.copy(this.filterQ);
        invFilterQ.inverse();
        this.estimatedGravity.set(0, 0, -1);
        this.estimatedGravity.applyQuaternion(invFilterQ);
        this.estimatedGravity.normalize();
        this.measuredGravity.copy(this.currentAccelMeasurement.sample);
        this.measuredGravity.normalize();
        var deltaQ = new Quaternion();
        deltaQ.setFromUnitVectors(this.estimatedGravity, this.measuredGravity);
        deltaQ.inverse();
        if (this.isDebug) {
          console.log("Delta: %d deg, G_est: (%s, %s, %s), G_meas: (%s, %s, %s)", radToDeg * getQuaternionAngle(deltaQ), this.estimatedGravity.x.toFixed(1), this.estimatedGravity.y.toFixed(1), this.estimatedGravity.z.toFixed(1), this.measuredGravity.x.toFixed(1), this.measuredGravity.y.toFixed(1), this.measuredGravity.z.toFixed(1));
        }
        var targetQ = new Quaternion();
        targetQ.copy(this.filterQ);
        targetQ.multiply(deltaQ);
        this.filterQ.slerp(targetQ, 1 - this.kFilter);
        this.previousFilterQ.copy(this.filterQ);
      };
      ComplementaryFilter.prototype.getOrientation = function() {
        return this.filterQ;
      };
      ComplementaryFilter.prototype.accelToQuaternion_ = function(accel) {
        var normAccel = new Vector3();
        normAccel.copy(accel);
        normAccel.normalize();
        var quat = new Quaternion();
        quat.setFromUnitVectors(new Vector3(0, 0, -1), normAccel);
        quat.inverse();
        return quat;
      };
      ComplementaryFilter.prototype.gyroToQuaternionDelta_ = function(gyro, dt) {
        var quat = new Quaternion();
        var axis = new Vector3();
        axis.copy(gyro);
        axis.normalize();
        quat.setFromAxisAngle(axis, gyro.length() * dt);
        return quat;
      };
      function PosePredictor(predictionTimeS, isDebug) {
        this.predictionTimeS = predictionTimeS;
        this.isDebug = isDebug;
        this.previousQ = new Quaternion();
        this.previousTimestampS = null;
        this.deltaQ = new Quaternion();
        this.outQ = new Quaternion();
      }
      PosePredictor.prototype.getPrediction = function(currentQ, gyro, timestampS) {
        if (!this.previousTimestampS) {
          this.previousQ.copy(currentQ);
          this.previousTimestampS = timestampS;
          return currentQ;
        }
        var axis = new Vector3();
        axis.copy(gyro);
        axis.normalize();
        var angularSpeed = gyro.length();
        if (angularSpeed < degToRad * 20) {
          if (this.isDebug) {
            console.log("Moving slowly, at %s deg/s: no prediction", (radToDeg * angularSpeed).toFixed(1));
          }
          this.outQ.copy(currentQ);
          this.previousQ.copy(currentQ);
          return this.outQ;
        }
        var predictAngle = angularSpeed * this.predictionTimeS;
        this.deltaQ.setFromAxisAngle(axis, predictAngle);
        this.outQ.copy(this.previousQ);
        this.outQ.multiply(this.deltaQ);
        this.previousQ.copy(currentQ);
        this.previousTimestampS = timestampS;
        return this.outQ;
      };
      function FusionPoseSensor(kFilter, predictionTime, yawOnly, isDebug) {
        this.yawOnly = yawOnly;
        this.accelerometer = new Vector3();
        this.gyroscope = new Vector3();
        this.filter = new ComplementaryFilter(kFilter, isDebug);
        this.posePredictor = new PosePredictor(predictionTime, isDebug);
        this.isFirefoxAndroid = isFirefoxAndroid();
        this.isIOS = isIOS();
        var chromeVersion = getChromeVersion();
        this.isDeviceMotionInRadians = !this.isIOS && chromeVersion && chromeVersion < 66;
        this.isWithoutDeviceMotion = isChromeWithoutDeviceMotion() || isSafariWithoutDeviceMotion();
        this.filterToWorldQ = new Quaternion();
        if (isIOS()) {
          this.filterToWorldQ.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);
        } else {
          this.filterToWorldQ.setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
        }
        this.inverseWorldToScreenQ = new Quaternion();
        this.worldToScreenQ = new Quaternion();
        this.originalPoseAdjustQ = new Quaternion();
        this.originalPoseAdjustQ.setFromAxisAngle(new Vector3(0, 0, 1), -window.orientation * Math.PI / 180);
        this.setScreenTransform_();
        if (isLandscapeMode()) {
          this.filterToWorldQ.multiply(this.inverseWorldToScreenQ);
        }
        this.resetQ = new Quaternion();
        this.orientationOut_ = new Float32Array(4);
        this.start();
      }
      FusionPoseSensor.prototype.getPosition = function() {
        return null;
      };
      FusionPoseSensor.prototype.getOrientation = function() {
        var orientation = void 0;
        if (this.isWithoutDeviceMotion && this._deviceOrientationQ) {
          this.deviceOrientationFixQ = this.deviceOrientationFixQ || function() {
            var z = new Quaternion().setFromAxisAngle(new Vector3(0, 0, -1), 0);
            var y = new Quaternion();
            if (window.orientation === -90) {
              y.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / -2);
            } else {
              y.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
            }
            return z.multiply(y);
          }();
          this.deviceOrientationFilterToWorldQ = this.deviceOrientationFilterToWorldQ || function() {
            var q = new Quaternion();
            q.setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
            return q;
          }();
          orientation = this._deviceOrientationQ;
          var out = new Quaternion();
          out.copy(orientation);
          out.multiply(this.deviceOrientationFilterToWorldQ);
          out.multiply(this.resetQ);
          out.multiply(this.worldToScreenQ);
          out.multiplyQuaternions(this.deviceOrientationFixQ, out);
          if (this.yawOnly) {
            out.x = 0;
            out.z = 0;
            out.normalize();
          }
          this.orientationOut_[0] = out.x;
          this.orientationOut_[1] = out.y;
          this.orientationOut_[2] = out.z;
          this.orientationOut_[3] = out.w;
          return this.orientationOut_;
        } else {
          var filterOrientation = this.filter.getOrientation();
          orientation = this.posePredictor.getPrediction(filterOrientation, this.gyroscope, this.previousTimestampS);
        }
        var out = new Quaternion();
        out.copy(this.filterToWorldQ);
        out.multiply(this.resetQ);
        out.multiply(orientation);
        out.multiply(this.worldToScreenQ);
        if (this.yawOnly) {
          out.x = 0;
          out.z = 0;
          out.normalize();
        }
        this.orientationOut_[0] = out.x;
        this.orientationOut_[1] = out.y;
        this.orientationOut_[2] = out.z;
        this.orientationOut_[3] = out.w;
        return this.orientationOut_;
      };
      FusionPoseSensor.prototype.resetPose = function() {
        this.resetQ.copy(this.filter.getOrientation());
        this.resetQ.x = 0;
        this.resetQ.y = 0;
        this.resetQ.z *= -1;
        this.resetQ.normalize();
        if (isLandscapeMode()) {
          this.resetQ.multiply(this.inverseWorldToScreenQ);
        }
        this.resetQ.multiply(this.originalPoseAdjustQ);
      };
      FusionPoseSensor.prototype.onDeviceOrientation_ = function(e) {
        this._deviceOrientationQ = this._deviceOrientationQ || new Quaternion();
        var alpha = e.alpha, beta = e.beta, gamma = e.gamma;
        alpha = (alpha || 0) * Math.PI / 180;
        beta = (beta || 0) * Math.PI / 180;
        gamma = (gamma || 0) * Math.PI / 180;
        this._deviceOrientationQ.setFromEulerYXZ(beta, alpha, -gamma);
      };
      FusionPoseSensor.prototype.onDeviceMotion_ = function(deviceMotion) {
        this.updateDeviceMotion_(deviceMotion);
      };
      FusionPoseSensor.prototype.updateDeviceMotion_ = function(deviceMotion) {
        var accGravity = deviceMotion.accelerationIncludingGravity;
        var rotRate = deviceMotion.rotationRate;
        var timestampS = deviceMotion.timeStamp / 1e3;
        var deltaS = timestampS - this.previousTimestampS;
        if (deltaS < 0) {
          warnOnce("fusion-pose-sensor:invalid:non-monotonic", "Invalid timestamps detected: non-monotonic timestamp from devicemotion");
          this.previousTimestampS = timestampS;
          return;
        } else if (deltaS <= MIN_TIMESTEP || deltaS > MAX_TIMESTEP) {
          warnOnce("fusion-pose-sensor:invalid:outside-threshold", "Invalid timestamps detected: Timestamp from devicemotion outside expected range.");
          this.previousTimestampS = timestampS;
          return;
        }
        this.accelerometer.set(-accGravity.x, -accGravity.y, -accGravity.z);
        if (rotRate) {
          if (isR7()) {
            this.gyroscope.set(-rotRate.beta, rotRate.alpha, rotRate.gamma);
          } else {
            this.gyroscope.set(rotRate.alpha, rotRate.beta, rotRate.gamma);
          }
          if (!this.isDeviceMotionInRadians) {
            this.gyroscope.multiplyScalar(Math.PI / 180);
          }
          this.filter.addGyroMeasurement(this.gyroscope, timestampS);
        }
        this.filter.addAccelMeasurement(this.accelerometer, timestampS);
        this.previousTimestampS = timestampS;
      };
      FusionPoseSensor.prototype.onOrientationChange_ = function(screenOrientation) {
        this.setScreenTransform_();
      };
      FusionPoseSensor.prototype.onMessage_ = function(event) {
        var message = event.data;
        if (!message || !message.type) {
          return;
        }
        var type = message.type.toLowerCase();
        if (type !== "devicemotion") {
          return;
        }
        this.updateDeviceMotion_(message.deviceMotionEvent);
      };
      FusionPoseSensor.prototype.setScreenTransform_ = function() {
        this.worldToScreenQ.set(0, 0, 0, 1);
        switch (window.orientation) {
          case 0:
            break;
          case 90:
            this.worldToScreenQ.setFromAxisAngle(new Vector3(0, 0, 1), -Math.PI / 2);
            break;
          case -90:
            this.worldToScreenQ.setFromAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
            break;
        }
        this.inverseWorldToScreenQ.copy(this.worldToScreenQ);
        this.inverseWorldToScreenQ.inverse();
      };
      FusionPoseSensor.prototype.start = function() {
        this.onDeviceMotionCallback_ = this.onDeviceMotion_.bind(this);
        this.onOrientationChangeCallback_ = this.onOrientationChange_.bind(this);
        this.onMessageCallback_ = this.onMessage_.bind(this);
        this.onDeviceOrientationCallback_ = this.onDeviceOrientation_.bind(this);
        if (isIOS() && isInsideCrossOriginIFrame()) {
          window.addEventListener("message", this.onMessageCallback_);
        }
        window.addEventListener("orientationchange", this.onOrientationChangeCallback_);
        if (this.isWithoutDeviceMotion) {
          window.addEventListener("deviceorientation", this.onDeviceOrientationCallback_);
        } else {
          window.addEventListener("devicemotion", this.onDeviceMotionCallback_);
        }
      };
      FusionPoseSensor.prototype.stop = function() {
        window.removeEventListener("devicemotion", this.onDeviceMotionCallback_);
        window.removeEventListener("deviceorientation", this.onDeviceOrientationCallback_);
        window.removeEventListener("orientationchange", this.onOrientationChangeCallback_);
        window.removeEventListener("message", this.onMessageCallback_);
      };
      var SENSOR_FREQUENCY = 60;
      var X_AXIS = new Vector3(1, 0, 0);
      var Z_AXIS = new Vector3(0, 0, 1);
      var SENSOR_TO_VR = new Quaternion();
      SENSOR_TO_VR.setFromAxisAngle(X_AXIS, -Math.PI / 2);
      SENSOR_TO_VR.multiply(new Quaternion().setFromAxisAngle(Z_AXIS, Math.PI / 2));
      var PoseSensor = function() {
        function PoseSensor2(config2) {
          classCallCheck(this, PoseSensor2);
          this.config = config2;
          this.sensor = null;
          this.fusionSensor = null;
          this._out = new Float32Array(4);
          this.api = null;
          this.errors = [];
          this._sensorQ = new Quaternion();
          this._outQ = new Quaternion();
          this._onSensorRead = this._onSensorRead.bind(this);
          this._onSensorError = this._onSensorError.bind(this);
          this.init();
        }
        createClass(PoseSensor2, [{
          key: "init",
          value: function init() {
            var sensor = null;
            try {
              sensor = new RelativeOrientationSensor({
                frequency: SENSOR_FREQUENCY,
                referenceFrame: "screen"
              });
              sensor.addEventListener("error", this._onSensorError);
            } catch (error) {
              this.errors.push(error);
              if (error.name === "SecurityError") {
                console.error("Cannot construct sensors due to the Feature Policy");
                console.warn('Attempting to fall back using "devicemotion"; however this will fail in the future without correct permissions.');
                this.useDeviceMotion();
              } else if (error.name === "ReferenceError") {
                this.useDeviceMotion();
              } else {
                console.error(error);
              }
            }
            if (sensor) {
              this.api = "sensor";
              this.sensor = sensor;
              this.sensor.addEventListener("reading", this._onSensorRead);
              this.sensor.start();
            }
          }
        }, {
          key: "useDeviceMotion",
          value: function useDeviceMotion() {
            this.api = "devicemotion";
            this.fusionSensor = new FusionPoseSensor(this.config.K_FILTER, this.config.PREDICTION_TIME_S, this.config.YAW_ONLY, this.config.DEBUG);
            if (this.sensor) {
              this.sensor.removeEventListener("reading", this._onSensorRead);
              this.sensor.removeEventListener("error", this._onSensorError);
              this.sensor = null;
            }
          }
        }, {
          key: "getOrientation",
          value: function getOrientation() {
            if (this.fusionSensor) {
              return this.fusionSensor.getOrientation();
            }
            if (!this.sensor || !this.sensor.quaternion) {
              this._out[0] = this._out[1] = this._out[2] = 0;
              this._out[3] = 1;
              return this._out;
            }
            var q = this.sensor.quaternion;
            this._sensorQ.set(q[0], q[1], q[2], q[3]);
            var out = this._outQ;
            out.copy(SENSOR_TO_VR);
            out.multiply(this._sensorQ);
            if (this.config.YAW_ONLY) {
              out.x = out.z = 0;
              out.normalize();
            }
            this._out[0] = out.x;
            this._out[1] = out.y;
            this._out[2] = out.z;
            this._out[3] = out.w;
            return this._out;
          }
        }, {
          key: "_onSensorError",
          value: function _onSensorError(event) {
            this.errors.push(event.error);
            if (event.error.name === "NotAllowedError") {
              console.error("Permission to access sensor was denied");
            } else if (event.error.name === "NotReadableError") {
              console.error("Sensor could not be read");
            } else {
              console.error(event.error);
            }
            this.useDeviceMotion();
          }
        }, {
          key: "_onSensorRead",
          value: function _onSensorRead() {
          }
        }]);
        return PoseSensor2;
      }();
      var rotateInstructionsAsset = "<svg width='198' height='240' viewBox='0 0 198 240' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><path d='M149.625 109.527l6.737 3.891v.886c0 .177.013.36.038.549.01.081.02.162.027.242.14 1.415.974 2.998 2.105 3.999l5.72 5.062.081-.09s4.382-2.53 5.235-3.024l25.97 14.993v54.001c0 .771-.386 1.217-.948 1.217-.233 0-.495-.076-.772-.236l-23.967-13.838-.014.024-27.322 15.775-.85-1.323c-4.731-1.529-9.748-2.74-14.951-3.61a.27.27 0 0 0-.007.024l-5.067 16.961-7.891 4.556-.037-.063v27.59c0 .772-.386 1.217-.948 1.217-.232 0-.495-.076-.772-.236l-42.473-24.522c-.95-.549-1.72-1.877-1.72-2.967v-1.035l-.021.047a5.111 5.111 0 0 0-1.816-.399 5.682 5.682 0 0 0-.546.001 13.724 13.724 0 0 1-1.918-.041c-1.655-.153-3.2-.6-4.404-1.296l-46.576-26.89.005.012-10.278-18.75c-1.001-1.827-.241-4.216 1.698-5.336l56.011-32.345a4.194 4.194 0 0 1 2.099-.572c1.326 0 2.572.659 3.227 1.853l.005-.003.227.413-.006.004a9.63 9.63 0 0 0 1.477 2.018l.277.27c1.914 1.85 4.468 2.801 7.113 2.801 1.949 0 3.948-.517 5.775-1.572.013 0 7.319-4.219 7.319-4.219a4.194 4.194 0 0 1 2.099-.572c1.326 0 2.572.658 3.226 1.853l3.25 5.928.022-.018 6.785 3.917-.105-.182 46.881-26.965m0-1.635c-.282 0-.563.073-.815.218l-46.169 26.556-5.41-3.124-3.005-5.481c-.913-1.667-2.699-2.702-4.66-2.703-1.011 0-2.02.274-2.917.792a3825 3825 0 0 1-7.275 4.195l-.044.024a9.937 9.937 0 0 1-4.957 1.353c-2.292 0-4.414-.832-5.976-2.342l-.252-.245a7.992 7.992 0 0 1-1.139-1.534 1.379 1.379 0 0 0-.06-.122l-.227-.414a1.718 1.718 0 0 0-.095-.154c-.938-1.574-2.673-2.545-4.571-2.545-1.011 0-2.02.274-2.917.792L3.125 155.502c-2.699 1.559-3.738 4.94-2.314 7.538l10.278 18.75c.177.323.448.563.761.704l46.426 26.804c1.403.81 3.157 1.332 5.072 1.508a15.661 15.661 0 0 0 2.146.046 4.766 4.766 0 0 1 .396 0c.096.004.19.011.283.022.109 1.593 1.159 3.323 2.529 4.114l42.472 24.522c.524.302 1.058.455 1.59.455 1.497 0 2.583-1.2 2.583-2.852v-26.562l7.111-4.105a1.64 1.64 0 0 0 .749-.948l4.658-15.593c4.414.797 8.692 1.848 12.742 3.128l.533.829a1.634 1.634 0 0 0 2.193.531l26.532-15.317L193 192.433c.523.302 1.058.455 1.59.455 1.497 0 2.583-1.199 2.583-2.852v-54.001c0-.584-.312-1.124-.818-1.416l-25.97-14.993a1.633 1.633 0 0 0-1.636.001c-.606.351-2.993 1.73-4.325 2.498l-4.809-4.255c-.819-.725-1.461-1.933-1.561-2.936a7.776 7.776 0 0 0-.033-.294 2.487 2.487 0 0 1-.023-.336v-.886c0-.584-.312-1.123-.817-1.416l-6.739-3.891a1.633 1.633 0 0 0-.817-.219' fill='#455A64'/><path d='M96.027 132.636l46.576 26.891c1.204.695 1.979 1.587 2.242 2.541l-.01.007-81.374 46.982h-.001c-1.654-.152-3.199-.6-4.403-1.295l-46.576-26.891 83.546-48.235' fill='#FAFAFA'/><path d='M63.461 209.174c-.008 0-.015 0-.022-.002-1.693-.156-3.228-.609-4.441-1.309l-46.576-26.89a.118.118 0 0 1 0-.203l83.546-48.235a.117.117 0 0 1 .117 0l46.576 26.891c1.227.708 2.021 1.612 2.296 2.611a.116.116 0 0 1-.042.124l-.021.016-81.375 46.981a.11.11 0 0 1-.058.016zm-50.747-28.303l46.401 26.79c1.178.68 2.671 1.121 4.32 1.276l81.272-46.922c-.279-.907-1.025-1.73-2.163-2.387l-46.517-26.857-83.313 48.1z' fill='#607D8B'/><path d='M148.327 165.471a5.85 5.85 0 0 1-.546.001c-1.894-.083-3.302-1.038-3.145-2.132a2.693 2.693 0 0 0-.072-1.105l-81.103 46.822c.628.058 1.272.073 1.918.042.182-.009.364-.009.546-.001 1.894.083 3.302 1.038 3.145 2.132l79.257-45.759' fill='#FFF'/><path d='M69.07 211.347a.118.118 0 0 1-.115-.134c.045-.317-.057-.637-.297-.925-.505-.61-1.555-1.022-2.738-1.074a5.966 5.966 0 0 0-.535.001 14.03 14.03 0 0 1-1.935-.041.117.117 0 0 1-.103-.092.116.116 0 0 1 .055-.126l81.104-46.822a.117.117 0 0 1 .171.07c.104.381.129.768.074 1.153-.045.316.057.637.296.925.506.61 1.555 1.021 2.739 1.073.178.008.357.008.535-.001a.117.117 0 0 1 .064.218l-79.256 45.759a.114.114 0 0 1-.059.016zm-3.405-2.372c.089 0 .177.002.265.006 1.266.056 2.353.488 2.908 1.158.227.274.35.575.36.882l78.685-45.429c-.036 0-.072-.001-.107-.003-1.267-.056-2.354-.489-2.909-1.158-.282-.34-.402-.724-.347-1.107a2.604 2.604 0 0 0-.032-.91L63.846 208.97a13.91 13.91 0 0 0 1.528.012c.097-.005.194-.007.291-.007z' fill='#607D8B'/><path d='M2.208 162.134c-1.001-1.827-.241-4.217 1.698-5.337l56.011-32.344c1.939-1.12 4.324-.546 5.326 1.281l.232.41a9.344 9.344 0 0 0 1.47 2.021l.278.27c3.325 3.214 8.583 3.716 12.888 1.23l7.319-4.22c1.94-1.119 4.324-.546 5.325 1.282l3.25 5.928-83.519 48.229-10.278-18.75z' fill='#FAFAFA'/><path d='M12.486 181.001a.112.112 0 0 1-.031-.005.114.114 0 0 1-.071-.056L2.106 162.19c-1.031-1.88-.249-4.345 1.742-5.494l56.01-32.344a4.328 4.328 0 0 1 2.158-.588c1.415 0 2.65.702 3.311 1.882.01.008.018.017.024.028l.227.414a.122.122 0 0 1 .013.038 9.508 9.508 0 0 0 1.439 1.959l.275.266c1.846 1.786 4.344 2.769 7.031 2.769 1.977 0 3.954-.538 5.717-1.557a.148.148 0 0 1 .035-.013l7.284-4.206a4.321 4.321 0 0 1 2.157-.588c1.427 0 2.672.716 3.329 1.914l3.249 5.929a.116.116 0 0 1-.044.157l-83.518 48.229a.116.116 0 0 1-.059.016zm49.53-57.004c-.704 0-1.41.193-2.041.557l-56.01 32.345c-1.882 1.086-2.624 3.409-1.655 5.179l10.221 18.645 83.317-48.112-3.195-5.829c-.615-1.122-1.783-1.792-3.124-1.792a4.08 4.08 0 0 0-2.04.557l-7.317 4.225a.148.148 0 0 1-.035.013 11.7 11.7 0 0 1-5.801 1.569c-2.748 0-5.303-1.007-7.194-2.835l-.278-.27a9.716 9.716 0 0 1-1.497-2.046.096.096 0 0 1-.013-.037l-.191-.347a.11.11 0 0 1-.023-.029c-.615-1.123-1.783-1.793-3.124-1.793z' fill='#607D8B'/><path d='M42.434 155.808c-2.51-.001-4.697-1.258-5.852-3.365-1.811-3.304-.438-7.634 3.059-9.654l12.291-7.098a7.599 7.599 0 0 1 3.789-1.033c2.51 0 4.697 1.258 5.852 3.365 1.811 3.304.439 7.634-3.059 9.654l-12.291 7.098a7.606 7.606 0 0 1-3.789 1.033zm13.287-20.683a7.128 7.128 0 0 0-3.555.971l-12.291 7.098c-3.279 1.893-4.573 5.942-2.883 9.024 1.071 1.955 3.106 3.122 5.442 3.122a7.13 7.13 0 0 0 3.556-.97l12.291-7.098c3.279-1.893 4.572-5.942 2.883-9.024-1.072-1.955-3.106-3.123-5.443-3.123z' fill='#607D8B'/><path d='M149.588 109.407l6.737 3.89v.887c0 .176.013.36.037.549.011.081.02.161.028.242.14 1.415.973 2.998 2.105 3.999l7.396 6.545c.177.156.358.295.541.415 1.579 1.04 2.95.466 3.062-1.282.049-.784.057-1.595.023-2.429l-.003-.16v-1.151l25.987 15.003v54c0 1.09-.77 1.53-1.72.982l-42.473-24.523c-.95-.548-1.72-1.877-1.72-2.966v-34.033' fill='#FAFAFA'/><path d='M194.553 191.25c-.257 0-.54-.085-.831-.253l-42.472-24.521c-.981-.567-1.779-1.943-1.779-3.068v-34.033h.234v34.033c0 1.051.745 2.336 1.661 2.866l42.473 24.521c.424.245.816.288 1.103.122.285-.164.442-.52.442-1.002v-53.933l-25.753-14.868.003 1.106c.034.832.026 1.654-.024 2.439-.054.844-.396 1.464-.963 1.746-.619.309-1.45.173-2.28-.373a5.023 5.023 0 0 1-.553-.426l-7.397-6.544c-1.158-1.026-1.999-2.625-2.143-4.076a9.624 9.624 0 0 0-.027-.238 4.241 4.241 0 0 1-.038-.564v-.82l-6.68-3.856.117-.202 6.738 3.89.058.034v.954c0 .171.012.351.036.533.011.083.021.165.029.246.138 1.395.948 2.935 2.065 3.923l7.397 6.545c.173.153.35.289.527.406.758.499 1.504.63 2.047.359.49-.243.786-.795.834-1.551.05-.778.057-1.591.024-2.417l-.004-.163v-1.355l.175.1 25.987 15.004.059.033v54.068c0 .569-.198.996-.559 1.204a1.002 1.002 0 0 1-.506.131' fill='#607D8B'/><path d='M145.685 163.161l24.115 13.922-25.978 14.998-1.462-.307c-6.534-2.17-13.628-3.728-21.019-4.616-4.365-.524-8.663 1.096-9.598 3.62a2.746 2.746 0 0 0-.011 1.928c1.538 4.267 4.236 8.363 7.995 12.135l.532.845-25.977 14.997-24.115-13.922 75.518-43.6' fill='#FFF'/><path d='M94.282 220.818l-.059-.033-24.29-14.024.175-.101 75.577-43.634.058.033 24.29 14.024-26.191 15.122-.045-.01-1.461-.307c-6.549-2.174-13.613-3.725-21.009-4.614a13.744 13.744 0 0 0-1.638-.097c-3.758 0-7.054 1.531-7.837 3.642a2.62 2.62 0 0 0-.01 1.848c1.535 4.258 4.216 8.326 7.968 12.091l.016.021.526.835.006.01.064.102-.105.061-25.977 14.998-.058.033zm-23.881-14.057l23.881 13.788 24.802-14.32c.546-.315.846-.489 1.017-.575l-.466-.74c-3.771-3.787-6.467-7.881-8.013-12.168a2.851 2.851 0 0 1 .011-2.008c.815-2.199 4.203-3.795 8.056-3.795.557 0 1.117.033 1.666.099 7.412.891 14.491 2.445 21.041 4.621.836.175 1.215.254 1.39.304l25.78-14.884-23.881-13.788-75.284 43.466z' fill='#607D8B'/><path d='M167.23 125.979v50.871l-27.321 15.773-6.461-14.167c-.91-1.996-3.428-1.738-5.624.574a10.238 10.238 0 0 0-2.33 4.018l-6.46 21.628-27.322 15.774v-50.871l75.518-43.6' fill='#FFF'/><path d='M91.712 220.567a.127.127 0 0 1-.059-.016.118.118 0 0 1-.058-.101v-50.871c0-.042.023-.08.058-.101l75.519-43.6a.117.117 0 0 1 .175.101v50.871c0 .041-.023.08-.059.1l-27.321 15.775a.118.118 0 0 1-.094.01.12.12 0 0 1-.071-.063l-6.46-14.168c-.375-.822-1.062-1.275-1.934-1.275-1.089 0-2.364.686-3.5 1.881a10.206 10.206 0 0 0-2.302 3.972l-6.46 21.627a.118.118 0 0 1-.054.068L91.77 220.551a.12.12 0 0 1-.058.016zm.117-50.92v50.601l27.106-15.65 6.447-21.583a10.286 10.286 0 0 1 2.357-4.065c1.18-1.242 2.517-1.954 3.669-1.954.969 0 1.731.501 2.146 1.411l6.407 14.051 27.152-15.676v-50.601l-75.284 43.466z' fill='#607D8B'/><path d='M168.543 126.213v50.87l-27.322 15.774-6.46-14.168c-.91-1.995-3.428-1.738-5.624.574a10.248 10.248 0 0 0-2.33 4.019l-6.461 21.627-27.321 15.774v-50.87l75.518-43.6' fill='#FFF'/><path d='M93.025 220.8a.123.123 0 0 1-.059-.015.12.12 0 0 1-.058-.101v-50.871c0-.042.023-.08.058-.101l75.518-43.6a.112.112 0 0 1 .117 0c.036.02.059.059.059.1v50.871a.116.116 0 0 1-.059.101l-27.321 15.774a.111.111 0 0 1-.094.01.115.115 0 0 1-.071-.062l-6.46-14.168c-.375-.823-1.062-1.275-1.935-1.275-1.088 0-2.363.685-3.499 1.881a10.19 10.19 0 0 0-2.302 3.971l-6.461 21.628a.108.108 0 0 1-.053.067l-27.322 15.775a.12.12 0 0 1-.058.015zm.117-50.919v50.6l27.106-15.649 6.447-21.584a10.293 10.293 0 0 1 2.357-4.065c1.179-1.241 2.516-1.954 3.668-1.954.969 0 1.732.502 2.147 1.412l6.407 14.051 27.152-15.676v-50.601l-75.284 43.466z' fill='#607D8B'/><path d='M169.8 177.083l-27.322 15.774-6.46-14.168c-.91-1.995-3.428-1.738-5.625.574a10.246 10.246 0 0 0-2.329 4.019l-6.461 21.627-27.321 15.774v-50.87l75.518-43.6v50.87z' fill='#FAFAFA'/><path d='M94.282 220.917a.234.234 0 0 1-.234-.233v-50.871c0-.083.045-.161.117-.202l75.518-43.601a.234.234 0 1 1 .35.202v50.871a.233.233 0 0 1-.116.202l-27.322 15.775a.232.232 0 0 1-.329-.106l-6.461-14.168c-.36-.789-.992-1.206-1.828-1.206-1.056 0-2.301.672-3.415 1.844a10.099 10.099 0 0 0-2.275 3.924l-6.46 21.628a.235.235 0 0 1-.107.136l-27.322 15.774a.23.23 0 0 1-.116.031zm.233-50.969v50.331l26.891-15.525 6.434-21.539a10.41 10.41 0 0 1 2.384-4.112c1.201-1.265 2.569-1.991 3.753-1.991 1.018 0 1.818.526 2.253 1.48l6.354 13.934 26.982-15.578v-50.331l-75.051 43.331z' fill='#607D8B'/><path d='M109.894 199.943c-1.774 0-3.241-.725-4.244-2.12a.224.224 0 0 1 .023-.294.233.233 0 0 1 .301-.023c.78.547 1.705.827 2.75.827 1.323 0 2.754-.439 4.256-1.306 5.311-3.067 9.631-10.518 9.631-16.611 0-1.927-.442-3.56-1.278-4.724a.232.232 0 0 1 .323-.327c1.671 1.172 2.591 3.381 2.591 6.219 0 6.242-4.426 13.863-9.865 17.003-1.574.908-3.084 1.356-4.488 1.356zm-2.969-1.542c.813.651 1.82.877 2.968.877h.001c1.321 0 2.753-.327 4.254-1.194 5.311-3.067 9.632-10.463 9.632-16.556 0-1.979-.463-3.599-1.326-4.761.411 1.035.625 2.275.625 3.635 0 6.243-4.426 13.883-9.865 17.023-1.574.909-3.084 1.317-4.49 1.317-.641 0-1.243-.149-1.799-.341z' fill='#607D8B'/><path d='M113.097 197.23c5.384-3.108 9.748-10.636 9.748-16.814 0-2.051-.483-3.692-1.323-4.86-1.784-1.252-4.374-1.194-7.257.47-5.384 3.108-9.748 10.636-9.748 16.814 0 2.051.483 3.692 1.323 4.86 1.784 1.252 4.374 1.194 7.257-.47' fill='#FAFAFA'/><path d='M108.724 198.614c-1.142 0-2.158-.213-3.019-.817-.021-.014-.04.014-.055-.007-.894-1.244-1.367-2.948-1.367-4.973 0-6.242 4.426-13.864 9.865-17.005 1.574-.908 3.084-1.363 4.49-1.363 1.142 0 2.158.309 3.018.913a.23.23 0 0 1 .056.056c.894 1.244 1.367 2.972 1.367 4.997 0 6.243-4.426 13.783-9.865 16.923-1.574.909-3.084 1.276-4.49 1.276zm-2.718-1.109c.774.532 1.688.776 2.718.776 1.323 0 2.754-.413 4.256-1.28 5.311-3.066 9.631-10.505 9.631-16.598 0-1.909-.434-3.523-1.255-4.685-.774-.533-1.688-.799-2.718-.799-1.323 0-2.755.441-4.256 1.308-5.311 3.066-9.631 10.506-9.631 16.599 0 1.909.434 3.517 1.255 4.679z' fill='#607D8B'/><path d='M149.318 114.262l-9.984 8.878 15.893 11.031 5.589-6.112-11.498-13.797' fill='#FAFAFA'/><path d='M169.676 120.84l-9.748 5.627c-3.642 2.103-9.528 2.113-13.147.024-3.62-2.089-3.601-5.488.041-7.591l9.495-5.608-6.729-3.885-81.836 47.071 45.923 26.514 3.081-1.779c.631-.365.869-.898.618-1.39-2.357-4.632-2.593-9.546-.683-14.262 5.638-13.92 24.509-24.815 48.618-28.07 8.169-1.103 16.68-.967 24.704.394.852.145 1.776.008 2.407-.357l3.081-1.778-25.825-14.91' fill='#FAFAFA'/><path d='M113.675 183.459a.47.47 0 0 1-.233-.062l-45.924-26.515a.468.468 0 0 1 .001-.809l81.836-47.071a.467.467 0 0 1 .466 0l6.729 3.885a.467.467 0 0 1-.467.809l-6.496-3.75-80.9 46.533 44.988 25.973 2.848-1.644c.192-.111.62-.409.435-.773-2.416-4.748-2.658-9.814-.7-14.65 2.806-6.927 8.885-13.242 17.582-18.263 8.657-4.998 19.518-8.489 31.407-10.094 8.198-1.107 16.79-.97 24.844.397.739.125 1.561.007 2.095-.301l2.381-1.374-25.125-14.506a.467.467 0 0 1 .467-.809l25.825 14.91a.467.467 0 0 1 0 .809l-3.081 1.779c-.721.417-1.763.575-2.718.413-7.963-1.351-16.457-1.486-24.563-.392-11.77 1.589-22.512 5.039-31.065 9.977-8.514 4.916-14.456 11.073-17.183 17.805-1.854 4.578-1.623 9.376.666 13.875.37.725.055 1.513-.8 2.006l-3.081 1.78a.476.476 0 0 1-.234.062' fill='#455A64'/><path d='M153.316 128.279c-2.413 0-4.821-.528-6.652-1.586-1.818-1.049-2.82-2.461-2.82-3.975 0-1.527 1.016-2.955 2.861-4.02l9.493-5.607a.233.233 0 1 1 .238.402l-9.496 5.609c-1.696.979-2.628 2.263-2.628 3.616 0 1.34.918 2.608 2.585 3.571 3.549 2.049 9.343 2.038 12.914-.024l9.748-5.628a.234.234 0 0 1 .234.405l-9.748 5.628c-1.858 1.072-4.296 1.609-6.729 1.609' fill='#607D8B'/><path d='M113.675 182.992l-45.913-26.508M113.675 183.342a.346.346 0 0 1-.175-.047l-45.913-26.508a.35.35 0 1 1 .35-.607l45.913 26.508a.35.35 0 0 1-.175.654' fill='#455A64'/><path d='M67.762 156.484v54.001c0 1.09.77 2.418 1.72 2.967l42.473 24.521c.95.549 1.72.11 1.72-.98v-54.001' fill='#FAFAFA'/><path d='M112.727 238.561c-.297 0-.62-.095-.947-.285l-42.473-24.521c-1.063-.613-1.895-2.05-1.895-3.27v-54.001a.35.35 0 1 1 .701 0v54.001c0 .96.707 2.18 1.544 2.663l42.473 24.522c.344.198.661.243.87.122.206-.119.325-.411.325-.799v-54.001a.35.35 0 1 1 .7 0v54.001c0 .655-.239 1.154-.675 1.406a1.235 1.235 0 0 1-.623.162' fill='#455A64'/><path d='M112.86 147.512h-.001c-2.318 0-4.499-.522-6.142-1.471-1.705-.984-2.643-2.315-2.643-3.749 0-1.445.952-2.791 2.68-3.788l12.041-6.953c1.668-.962 3.874-1.493 6.212-1.493 2.318 0 4.499.523 6.143 1.472 1.704.984 2.643 2.315 2.643 3.748 0 1.446-.952 2.791-2.68 3.789l-12.042 6.952c-1.668.963-3.874 1.493-6.211 1.493zm12.147-16.753c-2.217 0-4.298.497-5.861 1.399l-12.042 6.952c-1.502.868-2.33 1.998-2.33 3.182 0 1.173.815 2.289 2.293 3.142 1.538.889 3.596 1.378 5.792 1.378h.001c2.216 0 4.298-.497 5.861-1.399l12.041-6.953c1.502-.867 2.33-1.997 2.33-3.182 0-1.172-.814-2.288-2.292-3.142-1.539-.888-3.596-1.377-5.793-1.377z' fill='#607D8B'/><path d='M165.63 123.219l-5.734 3.311c-3.167 1.828-8.286 1.837-11.433.02-3.147-1.817-3.131-4.772.036-6.601l5.734-3.31 11.397 6.58' fill='#FAFAFA'/><path d='M154.233 117.448l9.995 5.771-4.682 2.704c-1.434.827-3.352 1.283-5.399 1.283-2.029 0-3.923-.449-5.333-1.263-1.29-.744-2-1.694-2-2.674 0-.991.723-1.955 2.036-2.713l5.383-3.108m0-.809l-5.734 3.31c-3.167 1.829-3.183 4.784-.036 6.601 1.568.905 3.623 1.357 5.684 1.357 2.077 0 4.159-.46 5.749-1.377l5.734-3.311-11.397-6.58M145.445 179.667c-1.773 0-3.241-.85-4.243-2.245-.067-.092-.057-.275.023-.356.08-.081.207-.12.3-.055.781.548 1.706.812 2.751.811 1.322 0 2.754-.446 4.256-1.313 5.31-3.066 9.631-10.522 9.631-16.615 0-1.927-.442-3.562-1.279-4.726a.235.235 0 0 1 .024-.301.232.232 0 0 1 .3-.027c1.67 1.172 2.59 3.38 2.59 6.219 0 6.242-4.425 13.987-9.865 17.127-1.573.908-3.083 1.481-4.488 1.481zM142.476 178c.814.651 1.82 1.002 2.969 1.002 1.322 0 2.753-.452 4.255-1.32 5.31-3.065 9.631-10.523 9.631-16.617 0-1.98-.463-3.63-1.325-4.793.411 1.035.624 2.26.624 3.62 0 6.242-4.425 13.875-9.865 17.015-1.573.909-3.084 1.376-4.489 1.376a5.49 5.49 0 0 1-1.8-.283z' fill='#607D8B'/><path d='M148.648 176.704c5.384-3.108 9.748-10.636 9.748-16.813 0-2.052-.483-3.693-1.322-4.861-1.785-1.252-4.375-1.194-7.258.471-5.383 3.108-9.748 10.636-9.748 16.813 0 2.051.484 3.692 1.323 4.86 1.785 1.253 4.374 1.195 7.257-.47' fill='#FAFAFA'/><path d='M144.276 178.276c-1.143 0-2.158-.307-3.019-.911a.217.217 0 0 1-.055-.054c-.895-1.244-1.367-2.972-1.367-4.997 0-6.241 4.425-13.875 9.865-17.016 1.573-.908 3.084-1.369 4.489-1.369 1.143 0 2.158.307 3.019.91a.24.24 0 0 1 .055.055c.894 1.244 1.367 2.971 1.367 4.997 0 6.241-4.425 13.875-9.865 17.016-1.573.908-3.084 1.369-4.489 1.369zm-2.718-1.172c.773.533 1.687.901 2.718.901 1.322 0 2.754-.538 4.256-1.405 5.31-3.066 9.631-10.567 9.631-16.661 0-1.908-.434-3.554-1.256-4.716-.774-.532-1.688-.814-2.718-.814-1.322 0-2.754.433-4.256 1.3-5.31 3.066-9.631 10.564-9.631 16.657 0 1.91.434 3.576 1.256 4.738z' fill='#607D8B'/><path d='M150.72 172.361l-.363-.295a24.105 24.105 0 0 0 2.148-3.128 24.05 24.05 0 0 0 1.977-4.375l.443.149a24.54 24.54 0 0 1-2.015 4.46 24.61 24.61 0 0 1-2.19 3.189M115.917 191.514l-.363-.294a24.174 24.174 0 0 0 2.148-3.128 24.038 24.038 0 0 0 1.976-4.375l.443.148a24.48 24.48 0 0 1-2.015 4.461 24.662 24.662 0 0 1-2.189 3.188M114 237.476V182.584 237.476' fill='#607D8B'/><g><path d='M81.822 37.474c.017-.135-.075-.28-.267-.392-.327-.188-.826-.21-1.109-.045l-6.012 3.471c-.131.076-.194.178-.191.285.002.132.002.461.002.578v.043l-.007.128-6.591 3.779c-.001 0-2.077 1.046-2.787 5.192 0 0-.912 6.961-.898 19.745.015 12.57.606 17.07 1.167 21.351.22 1.684 3.001 2.125 3.001 2.125.331.04.698-.027 1.08-.248l75.273-43.551c1.808-1.069 2.667-3.719 3.056-6.284 1.213-7.99 1.675-32.978-.275-39.878-.196-.693-.51-1.083-.868-1.282l-2.086-.79c-.727.028-1.416.467-1.534.535L82.032 37.072l-.21.402' fill='#FFF'/><path d='M144.311 1.701l2.085.79c.358.199.672.589.868 1.282 1.949 6.9 1.487 31.887.275 39.878-.39 2.565-1.249 5.215-3.056 6.284L69.21 93.486a1.78 1.78 0 0 1-.896.258l-.183-.011c0 .001-2.782-.44-3.003-2.124-.56-4.282-1.151-8.781-1.165-21.351-.015-12.784.897-19.745.897-19.745.71-4.146 2.787-5.192 2.787-5.192l6.591-3.779.007-.128v-.043c0-.117 0-.446-.002-.578-.003-.107.059-.21.191-.285l6.012-3.472a.98.98 0 0 1 .481-.11c.218 0 .449.053.627.156.193.112.285.258.268.392l.211-.402 60.744-34.836c.117-.068.806-.507 1.534-.535m0-.997l-.039.001c-.618.023-1.283.244-1.974.656l-.021.012-60.519 34.706a2.358 2.358 0 0 0-.831-.15c-.365 0-.704.084-.98.244l-6.012 3.471c-.442.255-.699.69-.689 1.166l.001.15-6.08 3.487c-.373.199-2.542 1.531-3.29 5.898l-.006.039c-.009.07-.92 7.173-.906 19.875.014 12.62.603 17.116 1.172 21.465l.002.015c.308 2.355 3.475 2.923 3.836 2.98l.034.004c.101.013.204.019.305.019a2.77 2.77 0 0 0 1.396-.392l75.273-43.552c1.811-1.071 2.999-3.423 3.542-6.997 1.186-7.814 1.734-33.096-.301-40.299-.253-.893-.704-1.527-1.343-1.882l-.132-.062-2.085-.789a.973.973 0 0 0-.353-.065' fill='#455A64'/><path d='M128.267 11.565l1.495.434-56.339 32.326' fill='#FFF'/><path d='M74.202 90.545a.5.5 0 0 1-.25-.931l18.437-10.645a.499.499 0 1 1 .499.864L74.451 90.478l-.249.067M75.764 42.654l-.108-.062.046-.171 5.135-2.964.17.045-.045.171-5.135 2.964-.063.017M70.52 90.375V46.421l.063-.036L137.84 7.554v43.954l-.062.036L70.52 90.375zm.25-43.811v43.38l66.821-38.579V7.985L70.77 46.564z' fill='#607D8B'/><path d='M86.986 83.182c-.23.149-.612.384-.849.523l-11.505 6.701c-.237.139-.206.252.068.252h.565c.275 0 .693-.113.93-.252L87.7 83.705c.237-.139.428-.253.425-.256a11.29 11.29 0 0 1-.006-.503c0-.274-.188-.377-.418-.227l-.715.463' fill='#607D8B'/><path d='M75.266 90.782H74.7c-.2 0-.316-.056-.346-.166-.03-.11.043-.217.215-.317l11.505-6.702c.236-.138.615-.371.844-.519l.715-.464a.488.488 0 0 1 .266-.089c.172 0 .345.13.345.421 0 .214.001.363.003.437l.006.004-.004.069c-.003.075-.003.075-.486.356l-11.505 6.702a2.282 2.282 0 0 1-.992.268zm-.6-.25l.034.001h.566c.252 0 .649-.108.866-.234l11.505-6.702c.168-.098.294-.173.361-.214-.004-.084-.004-.218-.004-.437l-.095-.171-.131.049-.714.463c-.232.15-.616.386-.854.525l-11.505 6.702-.029.018z' fill='#607D8B'/><path d='M75.266 89.871H74.7c-.2 0-.316-.056-.346-.166-.03-.11.043-.217.215-.317l11.505-6.702c.258-.151.694-.268.993-.268h.565c.2 0 .316.056.346.166.03.11-.043.217-.215.317l-11.505 6.702a2.282 2.282 0 0 1-.992.268zm-.6-.25l.034.001h.566c.252 0 .649-.107.866-.234l11.505-6.702.03-.018-.035-.001h-.565c-.252 0-.649.108-.867.234l-11.505 6.702-.029.018zM74.37 90.801v-1.247 1.247' fill='#607D8B'/><path d='M68.13 93.901c-.751-.093-1.314-.737-1.439-1.376-.831-4.238-1.151-8.782-1.165-21.352-.015-12.784.897-19.745.897-19.745.711-4.146 2.787-5.192 2.787-5.192l74.859-43.219c.223-.129 2.487-1.584 3.195.923 1.95 6.9 1.488 31.887.275 39.878-.389 2.565-1.248 5.215-3.056 6.283L69.21 93.653c-.382.221-.749.288-1.08.248 0 0-2.781-.441-3.001-2.125-.561-4.281-1.152-8.781-1.167-21.351-.014-12.784.898-19.745.898-19.745.71-4.146 2.787-5.191 2.787-5.191l6.598-3.81.871-.119 6.599-3.83.046-.461L68.13 93.901' fill='#FAFAFA'/><path d='M68.317 94.161l-.215-.013h-.001l-.244-.047c-.719-.156-2.772-.736-2.976-2.292-.568-4.34-1.154-8.813-1.168-21.384-.014-12.654.891-19.707.9-19.777.725-4.231 2.832-5.338 2.922-5.382l6.628-3.827.87-.119 6.446-3.742.034-.334a.248.248 0 0 1 .273-.223.248.248 0 0 1 .223.272l-.059.589-6.752 3.919-.87.118-6.556 3.785c-.031.016-1.99 1.068-2.666 5.018-.007.06-.908 7.086-.894 19.702.014 12.539.597 16.996 1.161 21.305.091.691.689 1.154 1.309 1.452a1.95 1.95 0 0 1-.236-.609c-.781-3.984-1.155-8.202-1.17-21.399-.014-12.653.891-19.707.9-19.777.725-4.231 2.832-5.337 2.922-5.382-.004.001 74.444-42.98 74.846-43.212l.028-.017c.904-.538 1.72-.688 2.36-.433.555.221.949.733 1.172 1.52 2.014 7.128 1.46 32.219.281 39.983-.507 3.341-1.575 5.515-3.175 6.462L69.335 93.869a2.023 2.023 0 0 1-1.018.292zm-.147-.507c.293.036.604-.037.915-.217l75.273-43.551c1.823-1.078 2.602-3.915 2.934-6.106 1.174-7.731 1.731-32.695-.268-39.772-.178-.631-.473-1.032-.876-1.192-.484-.193-1.166-.052-1.921.397l-.034.021-74.858 43.218c-.031.017-1.989 1.069-2.666 5.019-.007.059-.908 7.085-.894 19.702.015 13.155.386 17.351 1.161 21.303.09.461.476.983 1.037 1.139.114.025.185.037.196.039h.001z' fill='#455A64'/><path d='M69.317 68.982c.489-.281.885-.056.885.505 0 .56-.396 1.243-.885 1.525-.488.282-.884.057-.884-.504 0-.56.396-1.243.884-1.526' fill='#FFF'/><path d='M68.92 71.133c-.289 0-.487-.228-.487-.625 0-.56.396-1.243.884-1.526a.812.812 0 0 1 .397-.121c.289 0 .488.229.488.626 0 .56-.396 1.243-.885 1.525a.812.812 0 0 1-.397.121m.794-2.459a.976.976 0 0 0-.49.147c-.548.317-.978 1.058-.978 1.687 0 .486.271.812.674.812a.985.985 0 0 0 .491-.146c.548-.317.978-1.057.978-1.687 0-.486-.272-.813-.675-.813' fill='#8097A2'/><path d='M68.92 70.947c-.271 0-.299-.307-.299-.439 0-.491.361-1.116.79-1.363a.632.632 0 0 1 .303-.096c.272 0 .301.306.301.438 0 .491-.363 1.116-.791 1.364a.629.629 0 0 1-.304.096m.794-2.086a.812.812 0 0 0-.397.121c-.488.283-.884.966-.884 1.526 0 .397.198.625.487.625a.812.812 0 0 0 .397-.121c.489-.282.885-.965.885-1.525 0-.397-.199-.626-.488-.626' fill='#8097A2'/><path d='M69.444 85.35c.264-.152.477-.031.477.272 0 .303-.213.67-.477.822-.263.153-.477.031-.477-.271 0-.302.214-.671.477-.823' fill='#FFF'/><path d='M69.23 86.51c-.156 0-.263-.123-.263-.337 0-.302.214-.671.477-.823a.431.431 0 0 1 .214-.066c.156 0 .263.124.263.338 0 .303-.213.67-.477.822a.431.431 0 0 1-.214.066m.428-1.412c-.1 0-.203.029-.307.09-.32.185-.57.618-.57.985 0 .309.185.524.449.524a.63.63 0 0 0 .308-.09c.32-.185.57-.618.57-.985 0-.309-.185-.524-.45-.524' fill='#8097A2'/><path d='M69.23 86.322l-.076-.149c0-.235.179-.544.384-.661l.12-.041.076.151c0 .234-.179.542-.383.66l-.121.04m.428-1.038a.431.431 0 0 0-.214.066c-.263.152-.477.521-.477.823 0 .214.107.337.263.337a.431.431 0 0 0 .214-.066c.264-.152.477-.519.477-.822 0-.214-.107-.338-.263-.338' fill='#8097A2'/><path d='M139.278 7.769v43.667L72.208 90.16V46.493l67.07-38.724' fill='#455A64'/><path d='M72.083 90.375V46.421l.063-.036 67.257-38.831v43.954l-.062.036-67.258 38.831zm.25-43.811v43.38l66.821-38.579V7.985L72.333 46.564z' fill='#607D8B'/></g><path d='M125.737 88.647l-7.639 3.334V84l-11.459 4.713v8.269L99 100.315l13.369 3.646 13.368-15.314' fill='#455A64'/></g></svg>";
      function RotateInstructions() {
        this.loadIcon_();
        var overlay = document.createElement("div");
        var s = overlay.style;
        s.position = "fixed";
        s.top = 0;
        s.right = 0;
        s.bottom = 0;
        s.left = 0;
        s.backgroundColor = "gray";
        s.fontFamily = "sans-serif";
        s.zIndex = 1e6;
        var img = document.createElement("img");
        img.src = this.icon;
        var s = img.style;
        s.marginLeft = "25%";
        s.marginTop = "25%";
        s.width = "50%";
        overlay.appendChild(img);
        var text = document.createElement("div");
        var s = text.style;
        s.textAlign = "center";
        s.fontSize = "16px";
        s.lineHeight = "24px";
        s.margin = "24px 25%";
        s.width = "50%";
        text.innerHTML = "Place your phone into your Cardboard viewer.";
        overlay.appendChild(text);
        var snackbar = document.createElement("div");
        var s = snackbar.style;
        s.backgroundColor = "#CFD8DC";
        s.position = "fixed";
        s.bottom = 0;
        s.width = "100%";
        s.height = "48px";
        s.padding = "14px 24px";
        s.boxSizing = "border-box";
        s.color = "#656A6B";
        overlay.appendChild(snackbar);
        var snackbarText = document.createElement("div");
        snackbarText.style.float = "left";
        snackbarText.innerHTML = "No Cardboard viewer?";
        var snackbarButton = document.createElement("a");
        snackbarButton.href = "https://www.google.com/get/cardboard/get-cardboard/";
        snackbarButton.innerHTML = "get one";
        snackbarButton.target = "_blank";
        var s = snackbarButton.style;
        s.float = "right";
        s.fontWeight = 600;
        s.textTransform = "uppercase";
        s.borderLeft = "1px solid gray";
        s.paddingLeft = "24px";
        s.textDecoration = "none";
        s.color = "#656A6B";
        snackbar.appendChild(snackbarText);
        snackbar.appendChild(snackbarButton);
        this.overlay = overlay;
        this.text = text;
        this.hide();
      }
      RotateInstructions.prototype.show = function(parent) {
        if (!parent && !this.overlay.parentElement) {
          document.body.appendChild(this.overlay);
        } else if (parent) {
          if (this.overlay.parentElement && this.overlay.parentElement != parent)
            this.overlay.parentElement.removeChild(this.overlay);
          parent.appendChild(this.overlay);
        }
        this.overlay.style.display = "block";
        var img = this.overlay.querySelector("img");
        var s = img.style;
        if (isLandscapeMode()) {
          s.width = "20%";
          s.marginLeft = "40%";
          s.marginTop = "3%";
        } else {
          s.width = "50%";
          s.marginLeft = "25%";
          s.marginTop = "25%";
        }
      };
      RotateInstructions.prototype.hide = function() {
        this.overlay.style.display = "none";
      };
      RotateInstructions.prototype.showTemporarily = function(ms, parent) {
        this.show(parent);
        this.timer = setTimeout(this.hide.bind(this), ms);
      };
      RotateInstructions.prototype.disableShowTemporarily = function() {
        clearTimeout(this.timer);
      };
      RotateInstructions.prototype.update = function() {
        this.disableShowTemporarily();
        if (!isLandscapeMode() && isMobile2()) {
          this.show();
        } else {
          this.hide();
        }
      };
      RotateInstructions.prototype.loadIcon_ = function() {
        this.icon = dataUri("image/svg+xml", rotateInstructionsAsset);
      };
      var DEFAULT_VIEWER = "CardboardV1";
      var VIEWER_KEY = "WEBVR_CARDBOARD_VIEWER";
      var CLASS_NAME = "webvr-polyfill-viewer-selector";
      function ViewerSelector(defaultViewer) {
        try {
          this.selectedKey = localStorage.getItem(VIEWER_KEY);
        } catch (error) {
          console.error("Failed to load viewer profile: %s", error);
        }
        if (!this.selectedKey) {
          this.selectedKey = defaultViewer || DEFAULT_VIEWER;
        }
        this.dialog = this.createDialog_(DeviceInfo.Viewers);
        this.root = null;
        this.onChangeCallbacks_ = [];
      }
      ViewerSelector.prototype.show = function(root) {
        this.root = root;
        root.appendChild(this.dialog);
        var selected = this.dialog.querySelector("#" + this.selectedKey);
        selected.checked = true;
        this.dialog.style.display = "block";
      };
      ViewerSelector.prototype.hide = function() {
        if (this.root && this.root.contains(this.dialog)) {
          this.root.removeChild(this.dialog);
        }
        this.dialog.style.display = "none";
      };
      ViewerSelector.prototype.getCurrentViewer = function() {
        return DeviceInfo.Viewers[this.selectedKey];
      };
      ViewerSelector.prototype.getSelectedKey_ = function() {
        var input = this.dialog.querySelector("input[name=field]:checked");
        if (input) {
          return input.id;
        }
        return null;
      };
      ViewerSelector.prototype.onChange = function(cb) {
        this.onChangeCallbacks_.push(cb);
      };
      ViewerSelector.prototype.fireOnChange_ = function(viewer) {
        for (var i = 0; i < this.onChangeCallbacks_.length; i++) {
          this.onChangeCallbacks_[i](viewer);
        }
      };
      ViewerSelector.prototype.onSave_ = function() {
        this.selectedKey = this.getSelectedKey_();
        if (!this.selectedKey || !DeviceInfo.Viewers[this.selectedKey]) {
          console.error("ViewerSelector.onSave_: this should never happen!");
          return;
        }
        this.fireOnChange_(DeviceInfo.Viewers[this.selectedKey]);
        try {
          localStorage.setItem(VIEWER_KEY, this.selectedKey);
        } catch (error) {
          console.error("Failed to save viewer profile: %s", error);
        }
        this.hide();
      };
      ViewerSelector.prototype.createDialog_ = function(options) {
        var container = document.createElement("div");
        container.classList.add(CLASS_NAME);
        container.style.display = "none";
        var overlay = document.createElement("div");
        var s = overlay.style;
        s.position = "fixed";
        s.left = 0;
        s.top = 0;
        s.width = "100%";
        s.height = "100%";
        s.background = "rgba(0, 0, 0, 0.3)";
        overlay.addEventListener("click", this.hide.bind(this));
        var width = 280;
        var dialog = document.createElement("div");
        var s = dialog.style;
        s.boxSizing = "border-box";
        s.position = "fixed";
        s.top = "24px";
        s.left = "50%";
        s.marginLeft = -width / 2 + "px";
        s.width = width + "px";
        s.padding = "24px";
        s.overflow = "hidden";
        s.background = "#fafafa";
        s.fontFamily = "'Roboto', sans-serif";
        s.boxShadow = "0px 5px 20px #666";
        dialog.appendChild(this.createH1_("Select your viewer"));
        for (var id in options) {
          dialog.appendChild(this.createChoice_(id, options[id].label));
        }
        dialog.appendChild(this.createButton_("Save", this.onSave_.bind(this)));
        container.appendChild(overlay);
        container.appendChild(dialog);
        return container;
      };
      ViewerSelector.prototype.createH1_ = function(name) {
        var h1 = document.createElement("h1");
        var s = h1.style;
        s.color = "black";
        s.fontSize = "20px";
        s.fontWeight = "bold";
        s.marginTop = 0;
        s.marginBottom = "24px";
        h1.innerHTML = name;
        return h1;
      };
      ViewerSelector.prototype.createChoice_ = function(id, name) {
        var div = document.createElement("div");
        div.style.marginTop = "8px";
        div.style.color = "black";
        var input = document.createElement("input");
        input.style.fontSize = "30px";
        input.setAttribute("id", id);
        input.setAttribute("type", "radio");
        input.setAttribute("value", id);
        input.setAttribute("name", "field");
        var label = document.createElement("label");
        label.style.marginLeft = "4px";
        label.setAttribute("for", id);
        label.innerHTML = name;
        div.appendChild(input);
        div.appendChild(label);
        return div;
      };
      ViewerSelector.prototype.createButton_ = function(label, onclick) {
        var button = document.createElement("button");
        button.innerHTML = label;
        var s = button.style;
        s.float = "right";
        s.textTransform = "uppercase";
        s.color = "#1094f7";
        s.fontSize = "14px";
        s.letterSpacing = 0;
        s.border = 0;
        s.background = "none";
        s.marginTop = "16px";
        button.addEventListener("click", onclick);
        return button;
      };
      var commonjsGlobal2 = typeof window !== "undefined" ? window : typeof commonjsGlobal$1 !== "undefined" ? commonjsGlobal$1 : typeof self !== "undefined" ? self : {};
      function unwrapExports(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
      }
      function createCommonjsModule2(fn, module3) {
        return module3 = { exports: {} }, fn(module3, module3.exports), module3.exports;
      }
      var NoSleep = createCommonjsModule2(function(module3, exports4) {
        (function webpackUniversalModuleDefinition(root, factory) {
          module3.exports = factory();
        })(commonjsGlobal2, function() {
          return function(modules) {
            var installedModules = {};
            function __webpack_require__(moduleId) {
              if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
              }
              var module4 = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
              };
              modules[moduleId].call(module4.exports, module4, module4.exports, __webpack_require__);
              module4.l = true;
              return module4.exports;
            }
            __webpack_require__.m = modules;
            __webpack_require__.c = installedModules;
            __webpack_require__.d = function(exports5, name, getter) {
              if (!__webpack_require__.o(exports5, name)) {
                Object.defineProperty(exports5, name, {
                  configurable: false,
                  enumerable: true,
                  get: getter
                });
              }
            };
            __webpack_require__.n = function(module4) {
              var getter = module4 && module4.__esModule ? function getDefault() {
                return module4["default"];
              } : function getModuleExports() {
                return module4;
              };
              __webpack_require__.d(getter, "a", getter);
              return getter;
            };
            __webpack_require__.o = function(object, property) {
              return Object.prototype.hasOwnProperty.call(object, property);
            };
            __webpack_require__.p = "";
            return __webpack_require__(__webpack_require__.s = 0);
          }([
            function(module4, exports5, __webpack_require__) {
              var _createClass = function() {
                function defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor)
                      descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                  }
                }
                return function(Constructor, protoProps, staticProps) {
                  if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                  if (staticProps)
                    defineProperties(Constructor, staticProps);
                  return Constructor;
                };
              }();
              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }
              var mediaFile = __webpack_require__(1);
              var oldIOS = typeof navigator !== "undefined" && parseFloat(("" + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) < 10 && !window.MSStream;
              var NoSleep2 = function() {
                function NoSleep3() {
                  _classCallCheck(this, NoSleep3);
                  if (oldIOS) {
                    this.noSleepTimer = null;
                  } else {
                    this.noSleepVideo = document.createElement("video");
                    this.noSleepVideo.setAttribute("playsinline", "");
                    this.noSleepVideo.setAttribute("src", mediaFile);
                    this.noSleepVideo.addEventListener("timeupdate", function(e) {
                      if (this.noSleepVideo.currentTime > 0.5) {
                        this.noSleepVideo.currentTime = Math.random();
                      }
                    }.bind(this));
                  }
                }
                _createClass(NoSleep3, [{
                  key: "enable",
                  value: function enable() {
                    if (oldIOS) {
                      this.disable();
                      this.noSleepTimer = window.setInterval(function() {
                        window.location.href = "/";
                        window.setTimeout(window.stop, 0);
                      }, 15e3);
                    } else {
                      this.noSleepVideo.play();
                    }
                  }
                }, {
                  key: "disable",
                  value: function disable() {
                    if (oldIOS) {
                      if (this.noSleepTimer) {
                        window.clearInterval(this.noSleepTimer);
                        this.noSleepTimer = null;
                      }
                    } else {
                      this.noSleepVideo.pause();
                    }
                  }
                }]);
                return NoSleep3;
              }();
              module4.exports = NoSleep2;
            },
            function(module4, exports5, __webpack_require__) {
              module4.exports = "data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC8wYF///v3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ3OSBkZDc5YTYxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTEgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MToweDExMSBtZT1oZXggc3VibWU9MiBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0wIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MCA4eDhkY3Q9MCBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0wIHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MSBrZXlpbnQ9MzAwIGtleWludF9taW49MzAgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD0xMCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIwLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IHZidl9tYXhyYXRlPTIwMDAwIHZidl9idWZzaXplPTI1MDAwIGNyZl9tYXg9MC4wIG5hbF9ocmQ9bm9uZSBmaWxsZXI9MCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAOWWIhAA3//p+C7v8tDDSTjf97w55i3SbRPO4ZY+hkjD5hbkAkL3zpJ6h/LR1CAABzgB1kqqzUorlhQAAAAxBmiQYhn/+qZYADLgAAAAJQZ5CQhX/AAj5IQADQGgcIQADQGgcAAAACQGeYUQn/wALKCEAA0BoHAAAAAkBnmNEJ/8ACykhAANAaBwhAANAaBwAAAANQZpoNExDP/6plgAMuSEAA0BoHAAAAAtBnoZFESwr/wAI+SEAA0BoHCEAA0BoHAAAAAkBnqVEJ/8ACykhAANAaBwAAAAJAZ6nRCf/AAsoIQADQGgcIQADQGgcAAAADUGarDRMQz/+qZYADLghAANAaBwAAAALQZ7KRRUsK/8ACPkhAANAaBwAAAAJAZ7pRCf/AAsoIQADQGgcIQADQGgcAAAACQGe60Qn/wALKCEAA0BoHAAAAA1BmvA0TEM//qmWAAy5IQADQGgcIQADQGgcAAAAC0GfDkUVLCv/AAj5IQADQGgcAAAACQGfLUQn/wALKSEAA0BoHCEAA0BoHAAAAAkBny9EJ/8ACyghAANAaBwAAAANQZs0NExDP/6plgAMuCEAA0BoHAAAAAtBn1JFFSwr/wAI+SEAA0BoHCEAA0BoHAAAAAkBn3FEJ/8ACyghAANAaBwAAAAJAZ9zRCf/AAsoIQADQGgcIQADQGgcAAAADUGbeDRMQz/+qZYADLkhAANAaBwAAAALQZ+WRRUsK/8ACPghAANAaBwhAANAaBwAAAAJAZ+1RCf/AAspIQADQGgcAAAACQGft0Qn/wALKSEAA0BoHCEAA0BoHAAAAA1Bm7w0TEM//qmWAAy4IQADQGgcAAAAC0Gf2kUVLCv/AAj5IQADQGgcAAAACQGf+UQn/wALKCEAA0BoHCEAA0BoHAAAAAkBn/tEJ/8ACykhAANAaBwAAAANQZvgNExDP/6plgAMuSEAA0BoHCEAA0BoHAAAAAtBnh5FFSwr/wAI+CEAA0BoHAAAAAkBnj1EJ/8ACyghAANAaBwhAANAaBwAAAAJAZ4/RCf/AAspIQADQGgcAAAADUGaJDRMQz/+qZYADLghAANAaBwAAAALQZ5CRRUsK/8ACPkhAANAaBwhAANAaBwAAAAJAZ5hRCf/AAsoIQADQGgcAAAACQGeY0Qn/wALKSEAA0BoHCEAA0BoHAAAAA1Bmmg0TEM//qmWAAy5IQADQGgcAAAAC0GehkUVLCv/AAj5IQADQGgcIQADQGgcAAAACQGepUQn/wALKSEAA0BoHAAAAAkBnqdEJ/8ACyghAANAaBwAAAANQZqsNExDP/6plgAMuCEAA0BoHCEAA0BoHAAAAAtBnspFFSwr/wAI+SEAA0BoHAAAAAkBnulEJ/8ACyghAANAaBwhAANAaBwAAAAJAZ7rRCf/AAsoIQADQGgcAAAADUGa8DRMQz/+qZYADLkhAANAaBwhAANAaBwAAAALQZ8ORRUsK/8ACPkhAANAaBwAAAAJAZ8tRCf/AAspIQADQGgcIQADQGgcAAAACQGfL0Qn/wALKCEAA0BoHAAAAA1BmzQ0TEM//qmWAAy4IQADQGgcAAAAC0GfUkUVLCv/AAj5IQADQGgcIQADQGgcAAAACQGfcUQn/wALKCEAA0BoHAAAAAkBn3NEJ/8ACyghAANAaBwhAANAaBwAAAANQZt4NExC//6plgAMuSEAA0BoHAAAAAtBn5ZFFSwr/wAI+CEAA0BoHCEAA0BoHAAAAAkBn7VEJ/8ACykhAANAaBwAAAAJAZ+3RCf/AAspIQADQGgcAAAADUGbuzRMQn/+nhAAYsAhAANAaBwhAANAaBwAAAAJQZ/aQhP/AAspIQADQGgcAAAACQGf+UQn/wALKCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHAAACiFtb292AAAAbG12aGQAAAAA1YCCX9WAgl8AAAPoAAAH/AABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAGGlvZHMAAAAAEICAgAcAT////v7/AAAF+XRyYWsAAABcdGtoZAAAAAPVgIJf1YCCXwAAAAEAAAAAAAAH0AAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAygAAAMoAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAB9AAABdwAAEAAAAABXFtZGlhAAAAIG1kaGQAAAAA1YCCX9WAgl8AAV+QAAK/IFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAUcbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAE3HN0YmwAAACYc3RzZAAAAAAAAAABAAAAiGF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAygDKAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAyYXZjQwFNQCj/4QAbZ01AKOyho3ySTUBAQFAAAAMAEAAr8gDxgxlgAQAEaO+G8gAAABhzdHRzAAAAAAAAAAEAAAA8AAALuAAAABRzdHNzAAAAAAAAAAEAAAABAAAB8GN0dHMAAAAAAAAAPAAAAAEAABdwAAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAAC7gAAAAAQAAF3AAAAABAAAAAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAEEc3RzegAAAAAAAAAAAAAAPAAAAzQAAAAQAAAADQAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAANAAAADQAAAQBzdGNvAAAAAAAAADwAAAAwAAADZAAAA3QAAAONAAADoAAAA7kAAAPQAAAD6wAAA/4AAAQXAAAELgAABEMAAARcAAAEbwAABIwAAAShAAAEugAABM0AAATkAAAE/wAABRIAAAUrAAAFQgAABV0AAAVwAAAFiQAABaAAAAW1AAAFzgAABeEAAAX+AAAGEwAABiwAAAY/AAAGVgAABnEAAAaEAAAGnQAABrQAAAbPAAAG4gAABvUAAAcSAAAHJwAAB0AAAAdTAAAHcAAAB4UAAAeeAAAHsQAAB8gAAAfjAAAH9gAACA8AAAgmAAAIQQAACFQAAAhnAAAIhAAACJcAAAMsdHJhawAAAFx0a2hkAAAAA9WAgl/VgIJfAAAAAgAAAAAAAAf8AAAAAAAAAAAAAAABAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAACsm1kaWEAAAAgbWRoZAAAAADVgIJf1YCCXwAArEQAAWAAVcQAAAAAACdoZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU3RlcmVvAAAAAmNtaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAidzdGJsAAAAZ3N0c2QAAAAAAAAAAQAAAFdtcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAADNlc2RzAAAAAAOAgIAiAAIABICAgBRAFQAAAAADDUAAAAAABYCAgAISEAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAABYAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAAGAAAAWAAAAXBzdGNvAAAAAAAAAFgAAAOBAAADhwAAA5oAAAOtAAADswAAA8oAAAPfAAAD5QAAA/gAAAQLAAAEEQAABCgAAAQ9AAAEUAAABFYAAARpAAAEgAAABIYAAASbAAAErgAABLQAAATHAAAE3gAABPMAAAT5AAAFDAAABR8AAAUlAAAFPAAABVEAAAVXAAAFagAABX0AAAWDAAAFmgAABa8AAAXCAAAFyAAABdsAAAXyAAAF+AAABg0AAAYgAAAGJgAABjkAAAZQAAAGZQAABmsAAAZ+AAAGkQAABpcAAAauAAAGwwAABskAAAbcAAAG7wAABwYAAAcMAAAHIQAABzQAAAc6AAAHTQAAB2QAAAdqAAAHfwAAB5IAAAeYAAAHqwAAB8IAAAfXAAAH3QAAB/AAAAgDAAAICQAACCAAAAg1AAAIOwAACE4AAAhhAAAIeAAACH4AAAiRAAAIpAAACKoAAAiwAAAItgAACLwAAAjCAAAAFnVkdGEAAAAObmFtZVN0ZXJlbwAAAHB1ZHRhAAAAaG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAO2lsc3QAAAAzqXRvbwAAACtkYXRhAAAAAQAAAABIYW5kQnJha2UgMC4xMC4yIDIwMTUwNjExMDA=";
            }
          ]);
        });
      });
      var NoSleep$1 = unwrapExports(NoSleep);
      var nextDisplayId = 1e3;
      var defaultLeftBounds = [0, 0, 0.5, 1];
      var defaultRightBounds = [0.5, 0, 0.5, 1];
      var raf = window.requestAnimationFrame;
      var caf = window.cancelAnimationFrame;
      function VRFrameData() {
        this.leftProjectionMatrix = new Float32Array(16);
        this.leftViewMatrix = new Float32Array(16);
        this.rightProjectionMatrix = new Float32Array(16);
        this.rightViewMatrix = new Float32Array(16);
        this.pose = null;
      }
      function VRDisplayCapabilities(config2) {
        Object.defineProperties(this, {
          hasPosition: {
            writable: false,
            enumerable: true,
            value: config2.hasPosition
          },
          hasExternalDisplay: {
            writable: false,
            enumerable: true,
            value: config2.hasExternalDisplay
          },
          canPresent: {
            writable: false,
            enumerable: true,
            value: config2.canPresent
          },
          maxLayers: {
            writable: false,
            enumerable: true,
            value: config2.maxLayers
          },
          hasOrientation: {
            enumerable: true,
            get: function get() {
              deprecateWarning("VRDisplayCapabilities.prototype.hasOrientation", "VRDisplay.prototype.getFrameData");
              return config2.hasOrientation;
            }
          }
        });
      }
      function VRDisplay(config2) {
        config2 = config2 || {};
        var USE_WAKELOCK = "wakelock" in config2 ? config2.wakelock : true;
        this.isPolyfilled = true;
        this.displayId = nextDisplayId++;
        this.displayName = "";
        this.depthNear = 0.01;
        this.depthFar = 1e4;
        this.isPresenting = false;
        Object.defineProperty(this, "isConnected", {
          get: function get() {
            deprecateWarning("VRDisplay.prototype.isConnected", "VRDisplayCapabilities.prototype.hasExternalDisplay");
            return false;
          }
        });
        this.capabilities = new VRDisplayCapabilities({
          hasPosition: false,
          hasOrientation: false,
          hasExternalDisplay: false,
          canPresent: false,
          maxLayers: 1
        });
        this.stageParameters = null;
        this.waitingForPresent_ = false;
        this.layer_ = null;
        this.originalParent_ = null;
        this.fullscreenElement_ = null;
        this.fullscreenWrapper_ = null;
        this.fullscreenElementCachedStyle_ = null;
        this.fullscreenEventTarget_ = null;
        this.fullscreenChangeHandler_ = null;
        this.fullscreenErrorHandler_ = null;
        if (USE_WAKELOCK && isMobile2()) {
          this.wakelock_ = new NoSleep$1();
        }
      }
      VRDisplay.prototype.getFrameData = function(frameData) {
        return frameDataFromPose(frameData, this._getPose(), this);
      };
      VRDisplay.prototype.getPose = function() {
        deprecateWarning("VRDisplay.prototype.getPose", "VRDisplay.prototype.getFrameData");
        return this._getPose();
      };
      VRDisplay.prototype.resetPose = function() {
        deprecateWarning("VRDisplay.prototype.resetPose");
        return this._resetPose();
      };
      VRDisplay.prototype.getImmediatePose = function() {
        deprecateWarning("VRDisplay.prototype.getImmediatePose", "VRDisplay.prototype.getFrameData");
        return this._getPose();
      };
      VRDisplay.prototype.requestAnimationFrame = function(callback) {
        return raf(callback);
      };
      VRDisplay.prototype.cancelAnimationFrame = function(id) {
        return caf(id);
      };
      VRDisplay.prototype.wrapForFullscreen = function(element) {
        if (isIOS()) {
          return element;
        }
        if (!this.fullscreenWrapper_) {
          this.fullscreenWrapper_ = document.createElement("div");
          var cssProperties = ["height: " + Math.min(screen.height, screen.width) + "px !important", "top: 0 !important", "left: 0 !important", "right: 0 !important", "border: 0", "margin: 0", "padding: 0", "z-index: 999999 !important", "position: fixed"];
          this.fullscreenWrapper_.setAttribute("style", cssProperties.join("; ") + ";");
          this.fullscreenWrapper_.classList.add("webvr-polyfill-fullscreen-wrapper");
        }
        if (this.fullscreenElement_ == element) {
          return this.fullscreenWrapper_;
        }
        if (this.fullscreenElement_) {
          if (this.originalParent_) {
            this.originalParent_.appendChild(this.fullscreenElement_);
          } else {
            this.fullscreenElement_.parentElement.removeChild(this.fullscreenElement_);
          }
        }
        this.fullscreenElement_ = element;
        this.originalParent_ = element.parentElement;
        if (!this.originalParent_) {
          document.body.appendChild(element);
        }
        if (!this.fullscreenWrapper_.parentElement) {
          var parent = this.fullscreenElement_.parentElement;
          parent.insertBefore(this.fullscreenWrapper_, this.fullscreenElement_);
          parent.removeChild(this.fullscreenElement_);
        }
        this.fullscreenWrapper_.insertBefore(this.fullscreenElement_, this.fullscreenWrapper_.firstChild);
        this.fullscreenElementCachedStyle_ = this.fullscreenElement_.getAttribute("style");
        var self2 = this;
        function applyFullscreenElementStyle() {
          if (!self2.fullscreenElement_) {
            return;
          }
          var cssProperties2 = ["position: absolute", "top: 0", "left: 0", "width: " + Math.max(screen.width, screen.height) + "px", "height: " + Math.min(screen.height, screen.width) + "px", "border: 0", "margin: 0", "padding: 0"];
          self2.fullscreenElement_.setAttribute("style", cssProperties2.join("; ") + ";");
        }
        applyFullscreenElementStyle();
        return this.fullscreenWrapper_;
      };
      VRDisplay.prototype.removeFullscreenWrapper = function() {
        if (!this.fullscreenElement_) {
          return;
        }
        var element = this.fullscreenElement_;
        if (this.fullscreenElementCachedStyle_) {
          element.setAttribute("style", this.fullscreenElementCachedStyle_);
        } else {
          element.removeAttribute("style");
        }
        this.fullscreenElement_ = null;
        this.fullscreenElementCachedStyle_ = null;
        var parent = this.fullscreenWrapper_.parentElement;
        this.fullscreenWrapper_.removeChild(element);
        if (this.originalParent_ === parent) {
          parent.insertBefore(element, this.fullscreenWrapper_);
        } else if (this.originalParent_) {
          this.originalParent_.appendChild(element);
        }
        parent.removeChild(this.fullscreenWrapper_);
        return element;
      };
      VRDisplay.prototype.requestPresent = function(layers) {
        var wasPresenting = this.isPresenting;
        var self2 = this;
        if (!(layers instanceof Array)) {
          deprecateWarning("VRDisplay.prototype.requestPresent with non-array argument", "an array of VRLayers as the first argument");
          layers = [layers];
        }
        return new Promise(function(resolve, reject) {
          if (!self2.capabilities.canPresent) {
            reject(new Error("VRDisplay is not capable of presenting."));
            return;
          }
          if (layers.length == 0 || layers.length > self2.capabilities.maxLayers) {
            reject(new Error("Invalid number of layers."));
            return;
          }
          var incomingLayer = layers[0];
          if (!incomingLayer.source) {
            resolve();
            return;
          }
          var leftBounds = incomingLayer.leftBounds || defaultLeftBounds;
          var rightBounds = incomingLayer.rightBounds || defaultRightBounds;
          if (wasPresenting) {
            var layer = self2.layer_;
            if (layer.source !== incomingLayer.source) {
              layer.source = incomingLayer.source;
            }
            for (var i = 0; i < 4; i++) {
              layer.leftBounds[i] = leftBounds[i];
              layer.rightBounds[i] = rightBounds[i];
            }
            self2.wrapForFullscreen(self2.layer_.source);
            self2.updatePresent_();
            resolve();
            return;
          }
          self2.layer_ = {
            predistorted: incomingLayer.predistorted,
            source: incomingLayer.source,
            leftBounds: leftBounds.slice(0),
            rightBounds: rightBounds.slice(0)
          };
          self2.waitingForPresent_ = false;
          if (self2.layer_ && self2.layer_.source) {
            var fullscreenElement = self2.wrapForFullscreen(self2.layer_.source);
            var onFullscreenChange = function onFullscreenChange2() {
              var actualFullscreenElement = getFullscreenElement();
              self2.isPresenting = fullscreenElement === actualFullscreenElement;
              if (self2.isPresenting) {
                if (screen.orientation && screen.orientation.lock) {
                  screen.orientation.lock("landscape-primary").catch(function(error) {
                    console.error("screen.orientation.lock() failed due to", error.message);
                  });
                }
                self2.waitingForPresent_ = false;
                self2.beginPresent_();
                resolve();
              } else {
                if (screen.orientation && screen.orientation.unlock) {
                  screen.orientation.unlock();
                }
                self2.removeFullscreenWrapper();
                self2.disableWakeLock();
                self2.endPresent_();
                self2.removeFullscreenListeners_();
              }
              self2.fireVRDisplayPresentChange_();
            };
            var onFullscreenError = function onFullscreenError2() {
              if (!self2.waitingForPresent_) {
                return;
              }
              self2.removeFullscreenWrapper();
              self2.removeFullscreenListeners_();
              self2.disableWakeLock();
              self2.waitingForPresent_ = false;
              self2.isPresenting = false;
              reject(new Error("Unable to present."));
            };
            self2.addFullscreenListeners_(fullscreenElement, onFullscreenChange, onFullscreenError);
            if (requestFullscreen(fullscreenElement)) {
              self2.enableWakeLock();
              self2.waitingForPresent_ = true;
            } else if (isIOS() || isWebViewAndroid()) {
              self2.enableWakeLock();
              self2.isPresenting = true;
              self2.beginPresent_();
              self2.fireVRDisplayPresentChange_();
              resolve();
            }
          }
          if (!self2.waitingForPresent_ && !isIOS()) {
            exitFullscreen();
            reject(new Error("Unable to present."));
          }
        });
      };
      VRDisplay.prototype.exitPresent = function() {
        var wasPresenting = this.isPresenting;
        var self2 = this;
        this.isPresenting = false;
        this.layer_ = null;
        this.disableWakeLock();
        return new Promise(function(resolve, reject) {
          if (wasPresenting) {
            if (!exitFullscreen() && isIOS()) {
              self2.endPresent_();
              self2.fireVRDisplayPresentChange_();
            }
            if (isWebViewAndroid()) {
              self2.removeFullscreenWrapper();
              self2.removeFullscreenListeners_();
              self2.endPresent_();
              self2.fireVRDisplayPresentChange_();
            }
            resolve();
          } else {
            reject(new Error("Was not presenting to VRDisplay."));
          }
        });
      };
      VRDisplay.prototype.getLayers = function() {
        if (this.layer_) {
          return [this.layer_];
        }
        return [];
      };
      VRDisplay.prototype.fireVRDisplayPresentChange_ = function() {
        var event = new CustomEvent("vrdisplaypresentchange", { detail: { display: this } });
        window.dispatchEvent(event);
      };
      VRDisplay.prototype.fireVRDisplayConnect_ = function() {
        var event = new CustomEvent("vrdisplayconnect", { detail: { display: this } });
        window.dispatchEvent(event);
      };
      VRDisplay.prototype.addFullscreenListeners_ = function(element, changeHandler, errorHandler) {
        this.removeFullscreenListeners_();
        this.fullscreenEventTarget_ = element;
        this.fullscreenChangeHandler_ = changeHandler;
        this.fullscreenErrorHandler_ = errorHandler;
        if (changeHandler) {
          if (document.fullscreenEnabled) {
            element.addEventListener("fullscreenchange", changeHandler, false);
          } else if (document.webkitFullscreenEnabled) {
            element.addEventListener("webkitfullscreenchange", changeHandler, false);
          } else if (document.mozFullScreenEnabled) {
            document.addEventListener("mozfullscreenchange", changeHandler, false);
          } else if (document.msFullscreenEnabled) {
            element.addEventListener("msfullscreenchange", changeHandler, false);
          }
        }
        if (errorHandler) {
          if (document.fullscreenEnabled) {
            element.addEventListener("fullscreenerror", errorHandler, false);
          } else if (document.webkitFullscreenEnabled) {
            element.addEventListener("webkitfullscreenerror", errorHandler, false);
          } else if (document.mozFullScreenEnabled) {
            document.addEventListener("mozfullscreenerror", errorHandler, false);
          } else if (document.msFullscreenEnabled) {
            element.addEventListener("msfullscreenerror", errorHandler, false);
          }
        }
      };
      VRDisplay.prototype.removeFullscreenListeners_ = function() {
        if (!this.fullscreenEventTarget_)
          return;
        var element = this.fullscreenEventTarget_;
        if (this.fullscreenChangeHandler_) {
          var changeHandler = this.fullscreenChangeHandler_;
          element.removeEventListener("fullscreenchange", changeHandler, false);
          element.removeEventListener("webkitfullscreenchange", changeHandler, false);
          document.removeEventListener("mozfullscreenchange", changeHandler, false);
          element.removeEventListener("msfullscreenchange", changeHandler, false);
        }
        if (this.fullscreenErrorHandler_) {
          var errorHandler = this.fullscreenErrorHandler_;
          element.removeEventListener("fullscreenerror", errorHandler, false);
          element.removeEventListener("webkitfullscreenerror", errorHandler, false);
          document.removeEventListener("mozfullscreenerror", errorHandler, false);
          element.removeEventListener("msfullscreenerror", errorHandler, false);
        }
        this.fullscreenEventTarget_ = null;
        this.fullscreenChangeHandler_ = null;
        this.fullscreenErrorHandler_ = null;
      };
      VRDisplay.prototype.enableWakeLock = function() {
        if (this.wakelock_) {
          this.wakelock_.enable();
        }
      };
      VRDisplay.prototype.disableWakeLock = function() {
        if (this.wakelock_) {
          this.wakelock_.disable();
        }
      };
      VRDisplay.prototype.beginPresent_ = function() {
      };
      VRDisplay.prototype.endPresent_ = function() {
      };
      VRDisplay.prototype.submitFrame = function(pose) {
      };
      VRDisplay.prototype.getEyeParameters = function(whichEye) {
        return null;
      };
      var config = {
        ADDITIONAL_VIEWERS: [],
        DEFAULT_VIEWER: "",
        MOBILE_WAKE_LOCK: true,
        DEBUG: false,
        DPDB_URL: "https://dpdb.webvr.rocks/dpdb.json",
        K_FILTER: 0.98,
        PREDICTION_TIME_S: 0.04,
        CARDBOARD_UI_DISABLED: false,
        ROTATE_INSTRUCTIONS_DISABLED: false,
        YAW_ONLY: false,
        BUFFER_SCALE: 0.5,
        DIRTY_SUBMIT_FRAME_BINDINGS: false
      };
      var Eye = {
        LEFT: "left",
        RIGHT: "right"
      };
      function CardboardVRDisplay2(config$$1) {
        var defaults = extend({}, config);
        config$$1 = extend(defaults, config$$1 || {});
        VRDisplay.call(this, {
          wakelock: config$$1.MOBILE_WAKE_LOCK
        });
        this.config = config$$1;
        this.displayName = "Cardboard VRDisplay";
        this.capabilities = new VRDisplayCapabilities({
          hasPosition: false,
          hasOrientation: true,
          hasExternalDisplay: false,
          canPresent: true,
          maxLayers: 1
        });
        this.stageParameters = null;
        this.bufferScale_ = this.config.BUFFER_SCALE;
        this.poseSensor_ = new PoseSensor(this.config);
        this.distorter_ = null;
        this.cardboardUI_ = null;
        this.dpdb_ = new Dpdb(this.config.DPDB_URL, this.onDeviceParamsUpdated_.bind(this));
        this.deviceInfo_ = new DeviceInfo(this.dpdb_.getDeviceParams(), config$$1.ADDITIONAL_VIEWERS);
        this.viewerSelector_ = new ViewerSelector(config$$1.DEFAULT_VIEWER);
        this.viewerSelector_.onChange(this.onViewerChanged_.bind(this));
        this.deviceInfo_.setViewer(this.viewerSelector_.getCurrentViewer());
        if (!this.config.ROTATE_INSTRUCTIONS_DISABLED) {
          this.rotateInstructions_ = new RotateInstructions();
        }
        if (isIOS()) {
          window.addEventListener("resize", this.onResize_.bind(this));
        }
      }
      CardboardVRDisplay2.prototype = Object.create(VRDisplay.prototype);
      CardboardVRDisplay2.prototype._getPose = function() {
        return {
          position: null,
          orientation: this.poseSensor_.getOrientation(),
          linearVelocity: null,
          linearAcceleration: null,
          angularVelocity: null,
          angularAcceleration: null
        };
      };
      CardboardVRDisplay2.prototype._resetPose = function() {
        if (this.poseSensor_.resetPose) {
          this.poseSensor_.resetPose();
        }
      };
      CardboardVRDisplay2.prototype._getFieldOfView = function(whichEye) {
        var fieldOfView;
        if (whichEye == Eye.LEFT) {
          fieldOfView = this.deviceInfo_.getFieldOfViewLeftEye();
        } else if (whichEye == Eye.RIGHT) {
          fieldOfView = this.deviceInfo_.getFieldOfViewRightEye();
        } else {
          console.error("Invalid eye provided: %s", whichEye);
          return null;
        }
        return fieldOfView;
      };
      CardboardVRDisplay2.prototype._getEyeOffset = function(whichEye) {
        var offset;
        if (whichEye == Eye.LEFT) {
          offset = [-this.deviceInfo_.viewer.interLensDistance * 0.5, 0, 0];
        } else if (whichEye == Eye.RIGHT) {
          offset = [this.deviceInfo_.viewer.interLensDistance * 0.5, 0, 0];
        } else {
          console.error("Invalid eye provided: %s", whichEye);
          return null;
        }
        return offset;
      };
      CardboardVRDisplay2.prototype.getEyeParameters = function(whichEye) {
        var offset = this._getEyeOffset(whichEye);
        var fieldOfView = this._getFieldOfView(whichEye);
        var eyeParams = {
          offset,
          renderWidth: this.deviceInfo_.device.width * 0.5 * this.bufferScale_,
          renderHeight: this.deviceInfo_.device.height * this.bufferScale_
        };
        Object.defineProperty(eyeParams, "fieldOfView", {
          enumerable: true,
          get: function get() {
            deprecateWarning("VRFieldOfView", "VRFrameData's projection matrices");
            return fieldOfView;
          }
        });
        return eyeParams;
      };
      CardboardVRDisplay2.prototype.onDeviceParamsUpdated_ = function(newParams) {
        if (this.config.DEBUG) {
          console.log("DPDB reported that device params were updated.");
        }
        this.deviceInfo_.updateDeviceParams(newParams);
        if (this.distorter_) {
          this.distorter_.updateDeviceInfo(this.deviceInfo_);
        }
      };
      CardboardVRDisplay2.prototype.updateBounds_ = function() {
        if (this.layer_ && this.distorter_ && (this.layer_.leftBounds || this.layer_.rightBounds)) {
          this.distorter_.setTextureBounds(this.layer_.leftBounds, this.layer_.rightBounds);
        }
      };
      CardboardVRDisplay2.prototype.beginPresent_ = function() {
        var gl = this.layer_.source.getContext("webgl");
        if (!gl)
          gl = this.layer_.source.getContext("experimental-webgl");
        if (!gl)
          gl = this.layer_.source.getContext("webgl2");
        if (!gl)
          return;
        if (this.layer_.predistorted) {
          if (!this.config.CARDBOARD_UI_DISABLED) {
            gl.canvas.width = getScreenWidth() * this.bufferScale_;
            gl.canvas.height = getScreenHeight() * this.bufferScale_;
            this.cardboardUI_ = new CardboardUI(gl);
          }
        } else {
          if (!this.config.CARDBOARD_UI_DISABLED) {
            this.cardboardUI_ = new CardboardUI(gl);
          }
          this.distorter_ = new CardboardDistorter(gl, this.cardboardUI_, this.config.BUFFER_SCALE, this.config.DIRTY_SUBMIT_FRAME_BINDINGS);
          this.distorter_.updateDeviceInfo(this.deviceInfo_);
        }
        if (this.cardboardUI_) {
          this.cardboardUI_.listen(function(e) {
            this.viewerSelector_.show(this.layer_.source.parentElement);
            e.stopPropagation();
            e.preventDefault();
          }.bind(this), function(e) {
            this.exitPresent();
            e.stopPropagation();
            e.preventDefault();
          }.bind(this));
        }
        if (this.rotateInstructions_) {
          if (isLandscapeMode() && isMobile2()) {
            this.rotateInstructions_.showTemporarily(3e3, this.layer_.source.parentElement);
          } else {
            this.rotateInstructions_.update();
          }
        }
        this.orientationHandler = this.onOrientationChange_.bind(this);
        window.addEventListener("orientationchange", this.orientationHandler);
        this.vrdisplaypresentchangeHandler = this.updateBounds_.bind(this);
        window.addEventListener("vrdisplaypresentchange", this.vrdisplaypresentchangeHandler);
        this.fireVRDisplayDeviceParamsChange_();
      };
      CardboardVRDisplay2.prototype.endPresent_ = function() {
        if (this.distorter_) {
          this.distorter_.destroy();
          this.distorter_ = null;
        }
        if (this.cardboardUI_) {
          this.cardboardUI_.destroy();
          this.cardboardUI_ = null;
        }
        if (this.rotateInstructions_) {
          this.rotateInstructions_.hide();
        }
        this.viewerSelector_.hide();
        window.removeEventListener("orientationchange", this.orientationHandler);
        window.removeEventListener("vrdisplaypresentchange", this.vrdisplaypresentchangeHandler);
      };
      CardboardVRDisplay2.prototype.updatePresent_ = function() {
        this.endPresent_();
        this.beginPresent_();
      };
      CardboardVRDisplay2.prototype.submitFrame = function(pose) {
        if (this.distorter_) {
          this.updateBounds_();
          this.distorter_.submitFrame();
        } else if (this.cardboardUI_ && this.layer_) {
          var gl = this.layer_.source.getContext("webgl");
          if (!gl)
            gl = this.layer_.source.getContext("experimental-webgl");
          if (!gl)
            gl = this.layer_.source.getContext("webgl2");
          var canvas = gl.canvas;
          if (canvas.width != this.lastWidth || canvas.height != this.lastHeight) {
            this.cardboardUI_.onResize();
          }
          this.lastWidth = canvas.width;
          this.lastHeight = canvas.height;
          this.cardboardUI_.render();
        }
      };
      CardboardVRDisplay2.prototype.onOrientationChange_ = function(e) {
        this.viewerSelector_.hide();
        if (this.rotateInstructions_) {
          this.rotateInstructions_.update();
        }
        this.onResize_();
      };
      CardboardVRDisplay2.prototype.onResize_ = function(e) {
        if (this.layer_) {
          var gl = this.layer_.source.getContext("webgl");
          if (!gl)
            gl = this.layer_.source.getContext("experimental-webgl");
          if (!gl)
            gl = this.layer_.source.getContext("webgl2");
          var cssProperties = [
            "position: absolute",
            "top: 0",
            "left: 0",
            "width: 100vw",
            "height: 100vh",
            "border: 0",
            "margin: 0",
            "padding: 0px",
            "box-sizing: content-box"
          ];
          gl.canvas.setAttribute("style", cssProperties.join("; ") + ";");
          safariCssSizeWorkaround(gl.canvas);
        }
      };
      CardboardVRDisplay2.prototype.onViewerChanged_ = function(viewer) {
        this.deviceInfo_.setViewer(viewer);
        if (this.distorter_) {
          this.distorter_.updateDeviceInfo(this.deviceInfo_);
        }
        this.fireVRDisplayDeviceParamsChange_();
      };
      CardboardVRDisplay2.prototype.fireVRDisplayDeviceParamsChange_ = function() {
        var event = new CustomEvent("vrdisplaydeviceparamschange", {
          detail: {
            vrdisplay: this,
            deviceInfo: this.deviceInfo_
          }
        });
        window.dispatchEvent(event);
      };
      CardboardVRDisplay2.VRFrameData = VRFrameData;
      CardboardVRDisplay2.VRDisplay = VRDisplay;
      return CardboardVRDisplay2;
    });
  })(cardboardVrDisplay);
  const CardboardVRDisplay = /* @__PURE__ */ getDefaultExportFromCjs(cardboardVrDisplay.exports);
  class XRDevice extends EventTarget$1 {
    constructor(global2) {
      super();
      this.global = global2;
      this.onWindowResize = this.onWindowResize.bind(this);
      this.global.window.addEventListener("resize", this.onWindowResize);
      this.environmentBlendMode = "opaque";
    }
    onBaseLayerSet(sessionId, layer) {
      throw new Error("Not implemented");
    }
    isSessionSupported(mode) {
      throw new Error("Not implemented");
    }
    isFeatureSupported(featureDescriptor) {
      throw new Error("Not implemented");
    }
    async requestSession(mode, enabledFeatures) {
      throw new Error("Not implemented");
    }
    requestAnimationFrame(callback) {
      throw new Error("Not implemented");
    }
    onFrameStart(sessionId) {
      throw new Error("Not implemented");
    }
    onFrameEnd(sessionId) {
      throw new Error("Not implemented");
    }
    doesSessionSupportReferenceSpace(sessionId, type) {
      throw new Error("Not implemented");
    }
    requestStageBounds() {
      throw new Error("Not implemented");
    }
    async requestFrameOfReferenceTransform(type, options) {
      return void 0;
    }
    cancelAnimationFrame(handle) {
      throw new Error("Not implemented");
    }
    endSession(sessionId) {
      throw new Error("Not implemented");
    }
    getViewSpaces(mode) {
      return void 0;
    }
    getViewport(sessionId, eye, layer, target, viewIndex) {
      throw new Error("Not implemented");
    }
    getProjectionMatrix(eye, viewIndex) {
      throw new Error("Not implemented");
    }
    getBasePoseMatrix() {
      throw new Error("Not implemented");
    }
    getBaseViewMatrix(eye) {
      throw new Error("Not implemented");
    }
    getInputSources() {
      throw new Error("Not implemented");
    }
    getInputPose(inputSource, coordinateSystem, poseType) {
      throw new Error("Not implemented");
    }
    onWindowResize() {
      this.onWindowResize();
    }
  }
  let daydream = {
    mapping: "",
    profiles: ["google-daydream", "generic-trigger-touchpad"],
    buttons: {
      length: 3,
      0: null,
      1: null,
      2: 0
    }
  };
  let viveFocus = {
    mapping: "xr-standard",
    profiles: ["htc-vive-focus", "generic-trigger-touchpad"],
    buttons: {
      length: 3,
      0: 1,
      1: null,
      2: 0
    }
  };
  let oculusGo = {
    mapping: "xr-standard",
    profiles: ["oculus-go", "generic-trigger-touchpad"],
    buttons: {
      length: 3,
      0: 1,
      1: null,
      2: 0
    },
    gripTransform: {
      orientation: [Math.PI * 0.11, 0, 0, 1]
    }
  };
  let oculusTouch = {
    mapping: "xr-standard",
    displayProfiles: {
      "Oculus Quest": ["oculus-touch-v2", "oculus-touch", "generic-trigger-squeeze-thumbstick"]
    },
    profiles: ["oculus-touch", "generic-trigger-squeeze-thumbstick"],
    axes: {
      length: 4,
      0: null,
      1: null,
      2: 0,
      3: 1
    },
    buttons: {
      length: 7,
      0: 1,
      1: 2,
      2: null,
      3: 0,
      4: 3,
      5: 4,
      6: null
    },
    gripTransform: {
      position: [0, -0.02, 0.04, 1],
      orientation: [Math.PI * 0.11, 0, 0, 1]
    }
  };
  let openVr = {
    mapping: "xr-standard",
    profiles: ["htc-vive", "generic-trigger-squeeze-touchpad"],
    displayProfiles: {
      "HTC Vive": ["htc-vive", "generic-trigger-squeeze-touchpad"],
      "HTC Vive DVT": ["htc-vive", "generic-trigger-squeeze-touchpad"],
      "Valve Index": ["valve-index", "generic-trigger-squeeze-touchpad-thumbstick"]
    },
    buttons: {
      length: 3,
      0: 1,
      1: 2,
      2: 0
    },
    gripTransform: {
      position: [0, 0, 0.05, 1]
    },
    targetRayTransform: {
      orientation: [Math.PI * -0.08, 0, 0, 1]
    },
    userAgentOverrides: {
      "Firefox": {
        axes: {
          invert: [1, 3]
        }
      }
    }
  };
  let samsungGearVR = {
    mapping: "xr-standard",
    profiles: ["samsung-gearvr", "generic-trigger-touchpad"],
    buttons: {
      length: 3,
      0: 1,
      1: null,
      2: 0
    },
    gripTransform: {
      orientation: [Math.PI * 0.11, 0, 0, 1]
    }
  };
  let samsungOdyssey = {
    mapping: "xr-standard",
    profiles: ["samsung-odyssey", "microsoft-mixed-reality", "generic-trigger-squeeze-touchpad-thumbstick"],
    buttons: {
      length: 4,
      0: 1,
      1: 0,
      2: 2,
      3: 4
    },
    gripTransform: {
      position: [0, -0.02, 0.04, 1],
      orientation: [Math.PI * 0.11, 0, 0, 1]
    }
  };
  let windowsMixedReality = {
    mapping: "xr-standard",
    profiles: ["microsoft-mixed-reality", "generic-trigger-squeeze-touchpad-thumbstick"],
    buttons: {
      length: 4,
      0: 1,
      1: 0,
      2: 2,
      3: 4
    },
    gripTransform: {
      position: [0, -0.02, 0.04, 1],
      orientation: [Math.PI * 0.11, 0, 0, 1]
    }
  };
  let GamepadMappings = {
    "Daydream Controller": daydream,
    "Gear VR Controller": samsungGearVR,
    "HTC Vive Focus Controller": viveFocus,
    "Oculus Go Controller": oculusGo,
    "Oculus Touch (Right)": oculusTouch,
    "Oculus Touch (Left)": oculusTouch,
    "OpenVR Gamepad": openVr,
    "Spatial Controller (Spatial Interaction Source) 045E-065A": windowsMixedReality,
    "Spatial Controller (Spatial Interaction Source) 045E-065D": samsungOdyssey,
    "Windows Mixed Reality (Right)": windowsMixedReality,
    "Windows Mixed Reality (Left)": windowsMixedReality
  };
  const HEAD_ELBOW_OFFSET_RIGHTHANDED = fromValues$2(0.155, -0.465, -0.15);
  const HEAD_ELBOW_OFFSET_LEFTHANDED = fromValues$2(-0.155, -0.465, -0.15);
  const ELBOW_WRIST_OFFSET = fromValues$2(0, 0, -0.25);
  const WRIST_CONTROLLER_OFFSET = fromValues$2(0, 0, 0.05);
  const ARM_EXTENSION_OFFSET = fromValues$2(-0.08, 0.14, 0.08);
  const ELBOW_BEND_RATIO = 0.4;
  const EXTENSION_RATIO_WEIGHT = 0.4;
  const MIN_ANGULAR_SPEED = 0.61;
  const MIN_ANGLE_DELTA = 0.175;
  const MIN_EXTENSION_COS = 0.12;
  const MAX_EXTENSION_COS = 0.87;
  const RAD_TO_DEG = 180 / Math.PI;
  function eulerFromQuaternion(out, q, order) {
    function clamp(value, min, max) {
      return value < min ? min : value > max ? max : value;
    }
    var sqx = q[0] * q[0];
    var sqy = q[1] * q[1];
    var sqz = q[2] * q[2];
    var sqw = q[3] * q[3];
    if (order === "XYZ") {
      out[0] = Math.atan2(2 * (q[0] * q[3] - q[1] * q[2]), sqw - sqx - sqy + sqz);
      out[1] = Math.asin(clamp(2 * (q[0] * q[2] + q[1] * q[3]), -1, 1));
      out[2] = Math.atan2(2 * (q[2] * q[3] - q[0] * q[1]), sqw + sqx - sqy - sqz);
    } else if (order === "YXZ") {
      out[0] = Math.asin(clamp(2 * (q[0] * q[3] - q[1] * q[2]), -1, 1));
      out[1] = Math.atan2(2 * (q[0] * q[2] + q[1] * q[3]), sqw - sqx - sqy + sqz);
      out[2] = Math.atan2(2 * (q[0] * q[1] + q[2] * q[3]), sqw - sqx + sqy - sqz);
    } else if (order === "ZXY") {
      out[0] = Math.asin(clamp(2 * (q[0] * q[3] + q[1] * q[2]), -1, 1));
      out[1] = Math.atan2(2 * (q[1] * q[3] - q[2] * q[0]), sqw - sqx - sqy + sqz);
      out[2] = Math.atan2(2 * (q[2] * q[3] - q[0] * q[1]), sqw - sqx + sqy - sqz);
    } else if (order === "ZYX") {
      out[0] = Math.atan2(2 * (q[0] * q[3] + q[2] * q[1]), sqw - sqx - sqy + sqz);
      out[1] = Math.asin(clamp(2 * (q[1] * q[3] - q[0] * q[2]), -1, 1));
      out[2] = Math.atan2(2 * (q[0] * q[1] + q[2] * q[3]), sqw + sqx - sqy - sqz);
    } else if (order === "YZX") {
      out[0] = Math.atan2(2 * (q[0] * q[3] - q[2] * q[1]), sqw - sqx + sqy - sqz);
      out[1] = Math.atan2(2 * (q[1] * q[3] - q[0] * q[2]), sqw + sqx - sqy - sqz);
      out[2] = Math.asin(clamp(2 * (q[0] * q[1] + q[2] * q[3]), -1, 1));
    } else if (order === "XZY") {
      out[0] = Math.atan2(2 * (q[0] * q[3] + q[1] * q[2]), sqw - sqx + sqy - sqz);
      out[1] = Math.atan2(2 * (q[0] * q[2] + q[1] * q[3]), sqw + sqx - sqy - sqz);
      out[2] = Math.asin(clamp(2 * (q[2] * q[3] - q[0] * q[1]), -1, 1));
    } else {
      console.log("No order given for quaternion to euler conversion.");
      return;
    }
  }
  class OrientationArmModel {
    constructor() {
      this.hand = "right";
      this.headElbowOffset = HEAD_ELBOW_OFFSET_RIGHTHANDED;
      this.controllerQ = create$1();
      this.lastControllerQ = create$1();
      this.headQ = create$1();
      this.headPos = create$4();
      this.elbowPos = create$4();
      this.wristPos = create$4();
      this.time = null;
      this.lastTime = null;
      this.rootQ = create$1();
      this.position = create$4();
    }
    setHandedness(hand) {
      if (this.hand != hand) {
        this.hand = hand;
        if (this.hand == "left") {
          this.headElbowOffset = HEAD_ELBOW_OFFSET_LEFTHANDED;
        } else {
          this.headElbowOffset = HEAD_ELBOW_OFFSET_RIGHTHANDED;
        }
      }
    }
    update(controllerOrientation, headPoseMatrix) {
      this.time = now$1();
      if (controllerOrientation) {
        copy(this.lastControllerQ, this.controllerQ);
        copy(this.controllerQ, controllerOrientation);
      }
      if (headPoseMatrix) {
        getTranslation(this.headPos, headPoseMatrix);
        getRotation(this.headQ, headPoseMatrix);
      }
      let headYawQ = this.getHeadYawOrientation_();
      let angleDelta = this.quatAngle_(this.lastControllerQ, this.controllerQ);
      let timeDelta = (this.time - this.lastTime) / 1e3;
      let controllerAngularSpeed = angleDelta / timeDelta;
      if (controllerAngularSpeed > MIN_ANGULAR_SPEED) {
        slerp(
          this.rootQ,
          this.rootQ,
          headYawQ,
          Math.min(angleDelta / MIN_ANGLE_DELTA, 1)
        );
      } else {
        copy(this.rootQ, headYawQ);
      }
      let controllerForward = fromValues$2(0, 0, -1);
      transformQuat(controllerForward, controllerForward, this.controllerQ);
      let controllerDotY = dot(controllerForward, [0, 1, 0]);
      let extensionRatio = this.clamp_(
        (controllerDotY - MIN_EXTENSION_COS) / MAX_EXTENSION_COS,
        0,
        1
      );
      let controllerCameraQ = clone(this.rootQ);
      invert$1(controllerCameraQ, controllerCameraQ);
      multiply(controllerCameraQ, controllerCameraQ, this.controllerQ);
      let elbowPos = this.elbowPos;
      copy$2(elbowPos, this.headPos);
      add(elbowPos, elbowPos, this.headElbowOffset);
      let elbowOffset = clone$2(ARM_EXTENSION_OFFSET);
      scale(elbowOffset, elbowOffset, extensionRatio);
      add(elbowPos, elbowPos, elbowOffset);
      let totalAngle = this.quatAngle_(controllerCameraQ, create$1());
      let totalAngleDeg = totalAngle * RAD_TO_DEG;
      let lerpSuppression = 1 - Math.pow(totalAngleDeg / 180, 4);
      sssss;
      let elbowRatio = ELBOW_BEND_RATIO;
      let wristRatio = 1 - ELBOW_BEND_RATIO;
      let lerpValue = lerpSuppression * (elbowRatio + wristRatio * extensionRatio * EXTENSION_RATIO_WEIGHT);
      let wristQ = create$1();
      slerp(wristQ, wristQ, controllerCameraQ, lerpValue);
      let invWristQ = invert$1(create$1(), wristQ);
      let elbowQ = clone(controllerCameraQ);
      multiply(elbowQ, elbowQ, invWristQ);
      let wristPos = this.wristPos;
      copy$2(wristPos, WRIST_CONTROLLER_OFFSET);
      transformQuat(wristPos, wristPos, wristQ);
      add(wristPos, wristPos, ELBOW_WRIST_OFFSET);
      transformQuat(wristPos, wristPos, elbowQ);
      add(wristPos, wristPos, elbowPos);
      let offset = clone$2(ARM_EXTENSION_OFFSET);
      scale(offset, offset, extensionRatio);
      add(this.position, this.wristPos, offset);
      transformQuat(this.position, this.position, this.rootQ);
      this.lastTime = this.time;
    }
    getPosition() {
      return this.position;
    }
    getHeadYawOrientation_() {
      let headEuler = create$4();
      eulerFromQuaternion(headEuler, this.headQ, "YXZ");
      let destinationQ = fromEuler(create$1(), 0, headEuler[1] * RAD_TO_DEG, 0);
      return destinationQ;
    }
    clamp_(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }
    quatAngle_(q1, q2) {
      let vec1 = [0, 0, -1];
      let vec2 = [0, 0, -1];
      transformQuat(vec1, vec1, q1);
      transformQuat(vec2, vec2, q2);
      return angle(vec1, vec2);
    }
  }
  const PRIVATE$1 = Symbol("@@webxr-polyfill/XRRemappedGamepad");
  const PLACEHOLDER_BUTTON = { pressed: false, touched: false, value: 0 };
  Object.freeze(PLACEHOLDER_BUTTON);
  class XRRemappedGamepad {
    constructor(gamepad, display, map) {
      if (!map) {
        map = {};
      }
      if (map.userAgentOverrides) {
        for (let agent in map.userAgentOverrides) {
          if (navigator.userAgent.includes(agent)) {
            let override = map.userAgentOverrides[agent];
            for (let key in override) {
              if (key in map) {
                Object.assign(map[key], override[key]);
              } else {
                map[key] = override[key];
              }
            }
            break;
          }
        }
      }
      let axes = new Array(map.axes && map.axes.length ? map.axes.length : gamepad.axes.length);
      let buttons = new Array(map.buttons && map.buttons.length ? map.buttons.length : gamepad.buttons.length);
      let gripTransform = null;
      if (map.gripTransform) {
        let orientation = map.gripTransform.orientation || [0, 0, 0, 1];
        gripTransform = create$5();
        fromRotationTranslation(
          gripTransform,
          normalize(orientation, orientation),
          map.gripTransform.position || [0, 0, 0]
        );
      }
      let targetRayTransform = null;
      if (map.targetRayTransform) {
        let orientation = map.targetRayTransform.orientation || [0, 0, 0, 1];
        targetRayTransform = create$5();
        fromRotationTranslation(
          targetRayTransform,
          normalize(orientation, orientation),
          map.targetRayTransform.position || [0, 0, 0]
        );
      }
      let profiles = map.profiles;
      if (map.displayProfiles) {
        if (display.displayName in map.displayProfiles) {
          profiles = map.displayProfiles[display.displayName];
        }
      }
      this[PRIVATE$1] = {
        gamepad,
        map,
        profiles: profiles || [gamepad.id],
        mapping: map.mapping || gamepad.mapping,
        axes,
        buttons,
        gripTransform,
        targetRayTransform
      };
      this._update();
    }
    _update() {
      let gamepad = this[PRIVATE$1].gamepad;
      let map = this[PRIVATE$1].map;
      let axes = this[PRIVATE$1].axes;
      for (let i = 0; i < axes.length; ++i) {
        if (map.axes && i in map.axes) {
          if (map.axes[i] === null) {
            axes[i] = 0;
          } else {
            axes[i] = gamepad.axes[map.axes[i]];
          }
        } else {
          axes[i] = gamepad.axes[i];
        }
      }
      if (map.axes && map.axes.invert) {
        for (let axis of map.axes.invert) {
          if (axis < axes.length) {
            axes[axis] *= -1;
          }
        }
      }
      let buttons = this[PRIVATE$1].buttons;
      for (let i = 0; i < buttons.length; ++i) {
        if (map.buttons && i in map.buttons) {
          if (map.buttons[i] === null) {
            buttons[i] = PLACEHOLDER_BUTTON;
          } else {
            buttons[i] = gamepad.buttons[map.buttons[i]];
          }
        } else {
          buttons[i] = gamepad.buttons[i];
        }
      }
    }
    get id() {
      return "";
    }
    get _profiles() {
      return this[PRIVATE$1].profiles;
    }
    get index() {
      return -1;
    }
    get connected() {
      return this[PRIVATE$1].gamepad.connected;
    }
    get timestamp() {
      return this[PRIVATE$1].gamepad.timestamp;
    }
    get mapping() {
      return this[PRIVATE$1].mapping;
    }
    get axes() {
      return this[PRIVATE$1].axes;
    }
    get buttons() {
      return this[PRIVATE$1].buttons;
    }
    get hapticActuators() {
      return this[PRIVATE$1].gamepad.hapticActuators;
    }
  }
  class GamepadXRInputSource {
    constructor(polyfill, display, primaryButtonIndex = 0, primarySqueezeButtonIndex = -1) {
      this.polyfill = polyfill;
      this.display = display;
      this.nativeGamepad = null;
      this.gamepad = null;
      this.inputSource = new XRInputSource(this);
      this.lastPosition = create$4();
      this.emulatedPosition = false;
      this.basePoseMatrix = create$5();
      this.outputMatrix = create$5();
      this.primaryButtonIndex = primaryButtonIndex;
      this.primaryActionPressed = false;
      this.primarySqueezeButtonIndex = primarySqueezeButtonIndex;
      this.primarySqueezeActionPressed = false;
      this.handedness = "";
      this.targetRayMode = "gaze";
      this.armModel = null;
    }
    get profiles() {
      return this.gamepad ? this.gamepad._profiles : [];
    }
    updateFromGamepad(gamepad) {
      if (this.nativeGamepad !== gamepad) {
        this.nativeGamepad = gamepad;
        if (gamepad) {
          this.gamepad = new XRRemappedGamepad(gamepad, this.display, GamepadMappings[gamepad.id]);
        } else {
          this.gamepad = null;
        }
      }
      this.handedness = gamepad.hand === "" ? "none" : gamepad.hand;
      if (this.gamepad) {
        this.gamepad._update();
      }
      if (gamepad.pose) {
        this.targetRayMode = "tracked-pointer";
        this.emulatedPosition = !gamepad.pose.hasPosition;
      } else if (gamepad.hand === "") {
        this.targetRayMode = "gaze";
        this.emulatedPosition = false;
      }
    }
    updateBasePoseMatrix() {
      if (this.nativeGamepad && this.nativeGamepad.pose) {
        let pose = this.nativeGamepad.pose;
        let position = pose.position;
        let orientation = pose.orientation;
        if (!position && !orientation) {
          return;
        }
        if (!position) {
          if (!pose.hasPosition) {
            if (!this.armModel) {
              this.armModel = new OrientationArmModel();
            }
            this.armModel.setHandedness(this.nativeGamepad.hand);
            this.armModel.update(orientation, this.polyfill.getBasePoseMatrix());
            position = this.armModel.getPosition();
          } else {
            position = this.lastPosition;
          }
        } else {
          this.lastPosition[0] = position[0];
          this.lastPosition[1] = position[1];
          this.lastPosition[2] = position[2];
        }
        fromRotationTranslation(this.basePoseMatrix, orientation, position);
      } else {
        copy$3(this.basePoseMatrix, this.polyfill.getBasePoseMatrix());
      }
      return this.basePoseMatrix;
    }
    getXRPose(coordinateSystem, poseType) {
      this.updateBasePoseMatrix();
      switch (poseType) {
        case "target-ray":
          coordinateSystem._transformBasePoseMatrix(this.outputMatrix, this.basePoseMatrix);
          if (this.gamepad && this.gamepad[PRIVATE$1].targetRayTransform) {
            multiply$1(this.outputMatrix, this.outputMatrix, this.gamepad[PRIVATE$1].targetRayTransform);
          }
          break;
        case "grip":
          if (!this.nativeGamepad || !this.nativeGamepad.pose) {
            return null;
          }
          coordinateSystem._transformBasePoseMatrix(this.outputMatrix, this.basePoseMatrix);
          if (this.gamepad && this.gamepad[PRIVATE$1].gripTransform) {
            multiply$1(this.outputMatrix, this.outputMatrix, this.gamepad[PRIVATE$1].gripTransform);
          }
          break;
        default:
          return null;
      }
      coordinateSystem._adjustForOriginOffset(this.outputMatrix);
      return new XRPose(new XRRigidTransform(this.outputMatrix), this.emulatedPosition);
    }
  }
  const TEST_ENV = false;
  const EXTRA_PRESENTATION_ATTRIBUTES = {
    highRefreshRate: true
  };
  const PRIMARY_BUTTON_MAP = {
    oculus: 1,
    openvr: 1,
    "spatial controller (spatial interaction source)": 1
  };
  let SESSION_ID$2 = 0;
  class Session$2 {
    constructor(mode, enabledFeatures, polyfillOptions = {}) {
      this.mode = mode;
      this.enabledFeatures = enabledFeatures;
      this.outputContext = null;
      this.immersive = mode == "immersive-vr" || mode == "immersive-ar";
      this.ended = null;
      this.baseLayer = null;
      this.id = ++SESSION_ID$2;
      this.modifiedCanvasLayer = false;
      if (this.outputContext && !TEST_ENV) {
        const renderContextType = polyfillOptions.renderContextType || "2d";
        this.renderContext = this.outputContext.canvas.getContext(renderContextType);
      }
    }
  }
  class WebVRDevice extends XRDevice {
    constructor(global2, display) {
      const { canPresent } = display.capabilities;
      super(global2);
      this.display = display;
      this.frame = new global2.VRFrameData();
      this.sessions = /* @__PURE__ */ new Map();
      this.immersiveSession = null;
      this.canPresent = canPresent;
      this.baseModelMatrix = create$5();
      this.gamepadInputSources = {};
      this.tempVec3 = new Float32Array(3);
      this.onVRDisplayPresentChange = this.onVRDisplayPresentChange.bind(this);
      global2.window.addEventListener("vrdisplaypresentchange", this.onVRDisplayPresentChange);
      this.CAN_USE_GAMEPAD = global2.navigator && "getGamepads" in global2.navigator;
      this.HAS_BITMAP_SUPPORT = isImageBitmapSupported(global2);
    }
    get depthNear() {
      return this.display.depthNear;
    }
    set depthNear(val) {
      this.display.depthNear = val;
    }
    get depthFar() {
      return this.display.depthFar;
    }
    set depthFar(val) {
      this.display.depthFar = val;
    }
    onBaseLayerSet(sessionId, layer) {
      const session = this.sessions.get(sessionId);
      const canvas = layer.context.canvas;
      if (session.immersive) {
        const left = this.display.getEyeParameters("left");
        const right = this.display.getEyeParameters("right");
        canvas.width = Math.max(left.renderWidth, right.renderWidth) * 2;
        canvas.height = Math.max(left.renderHeight, right.renderHeight);
        this.display.requestPresent([{
          source: canvas,
          attributes: EXTRA_PRESENTATION_ATTRIBUTES
        }]).then(() => {
          if (!this.global.document.body.contains(canvas)) {
            session.modifiedCanvasLayer = true;
            this.global.document.body.appendChild(canvas);
            applyCanvasStylesForMinimalRendering(canvas);
          }
          session.baseLayer = layer;
        });
      } else {
        session.baseLayer = layer;
      }
    }
    isSessionSupported(mode) {
      if (mode == "immersive-ar") {
        return false;
      }
      if (mode == "immersive-vr" && this.canPresent === false) {
        return false;
      }
      return true;
    }
    isFeatureSupported(featureDescriptor) {
      switch (featureDescriptor) {
        case "viewer":
          return true;
        case "local":
          return true;
        case "local-floor":
          return true;
        case "bounded":
          return false;
        case "unbounded":
          return false;
        default:
          return false;
      }
    }
    async requestSession(mode, enabledFeatures) {
      if (!this.isSessionSupported(mode)) {
        return Promise.reject();
      }
      let immersive = mode == "immersive-vr";
      if (immersive) {
        const canvas = this.global.document.createElement("canvas");
        {
          canvas.getContext("webgl");
        }
        await this.display.requestPresent([{
          source: canvas,
          attributes: EXTRA_PRESENTATION_ATTRIBUTES
        }]);
      }
      const session = new Session$2(mode, enabledFeatures, {
        renderContextType: this.HAS_BITMAP_SUPPORT ? "bitmaprenderer" : "2d"
      });
      this.sessions.set(session.id, session);
      if (immersive) {
        this.immersiveSession = session;
        this.dispatchEvent("@@webxr-polyfill/vr-present-start", session.id);
      }
      return Promise.resolve(session.id);
    }
    requestAnimationFrame(callback) {
      return this.display.requestAnimationFrame(callback);
    }
    getPrimaryButtonIndex(gamepad) {
      let primaryButton = 0;
      let name = gamepad.id.toLowerCase();
      for (let key in PRIMARY_BUTTON_MAP) {
        if (name.includes(key)) {
          primaryButton = PRIMARY_BUTTON_MAP[key];
          break;
        }
      }
      return Math.min(primaryButton, gamepad.buttons.length - 1);
    }
    onFrameStart(sessionId, renderState) {
      this.display.depthNear = renderState.depthNear;
      this.display.depthFar = renderState.depthFar;
      this.display.getFrameData(this.frame);
      const session = this.sessions.get(sessionId);
      if (session.immersive && this.CAN_USE_GAMEPAD) {
        let prevInputSources = this.gamepadInputSources;
        this.gamepadInputSources = {};
        let gamepads = this.global.navigator.getGamepads();
        for (let i = 0; i < gamepads.length; ++i) {
          let gamepad = gamepads[i];
          if (gamepad && gamepad.displayId > 0) {
            let inputSourceImpl = prevInputSources[i];
            if (!inputSourceImpl) {
              inputSourceImpl = new GamepadXRInputSource(this, this.display, this.getPrimaryButtonIndex(gamepad));
            }
            inputSourceImpl.updateFromGamepad(gamepad);
            this.gamepadInputSources[i] = inputSourceImpl;
            if (inputSourceImpl.primaryButtonIndex != -1) {
              let primaryActionPressed = gamepad.buttons[inputSourceImpl.primaryButtonIndex].pressed;
              if (primaryActionPressed && !inputSourceImpl.primaryActionPressed) {
                this.dispatchEvent("@@webxr-polyfill/input-select-start", { sessionId: session.id, inputSource: inputSourceImpl.inputSource });
              } else if (!primaryActionPressed && inputSourceImpl.primaryActionPressed) {
                this.dispatchEvent("@@webxr-polyfill/input-select-end", { sessionId: session.id, inputSource: inputSourceImpl.inputSource });
              }
              inputSourceImpl.primaryActionPressed = primaryActionPressed;
            }
            if (inputSourceImpl.primarySqueezeButtonIndex != -1) {
              let primarySqueezeActionPressed = gamepad.buttons[inputSourceImpl.primarySqueezeButtonIndex].pressed;
              if (primarySqueezeActionPressed && !inputSourceImpl.primarySqueezeActionPressed) {
                this.dispatchEvent("@@webxr-polyfill/input-squeeze-start", { sessionId: session.id, inputSource: inputSourceImpl.inputSource });
              } else if (!primarySqueezeActionPressed && inputSourceImpl.primarySqueezeActionPressed) {
                this.dispatchEvent("@@webxr-polyfill/input-squeeze-end", { sessionId: session.id, inputSource: inputSourceImpl.inputSource });
              }
              inputSourceImpl.primarySqueezeActionPressed = primarySqueezeActionPressed;
            }
          }
        }
      }
      if (!session.immersive && session.baseLayer) {
        const canvas = session.baseLayer.context.canvas;
        perspective$1(
          this.frame.leftProjectionMatrix,
          renderState.inlineVerticalFieldOfView,
          canvas.width / canvas.height,
          renderState.depthNear,
          renderState.depthFar
        );
      }
    }
    onFrameEnd(sessionId) {
      const session = this.sessions.get(sessionId);
      if (session.ended || !session.baseLayer) {
        return;
      }
      if (session.outputContext && !(session.immersive && !this.display.capabilities.hasExternalDisplay)) {
        const mirroring = session.immersive && this.display.capabilities.hasExternalDisplay;
        const iCanvas = session.baseLayer.context.canvas;
        const iWidth = mirroring ? iCanvas.width / 2 : iCanvas.width;
        const iHeight = iCanvas.height;
        {
          const oCanvas = session.outputContext.canvas;
          const oWidth = oCanvas.width;
          const oHeight = oCanvas.height;
          const renderContext = session.renderContext;
          if (this.HAS_BITMAP_SUPPORT) {
            if (iCanvas.transferToImageBitmap) {
              renderContext.transferFromImageBitmap(iCanvas.transferToImageBitmap());
            } else {
              this.global.createImageBitmap(iCanvas, 0, 0, iWidth, iHeight, {
                resizeWidth: oWidth,
                resizeHeight: oHeight
              }).then((bitmap) => renderContext.transferFromImageBitmap(bitmap));
            }
          } else {
            renderContext.drawImage(
              iCanvas,
              0,
              0,
              iWidth,
              iHeight,
              0,
              0,
              oWidth,
              oHeight
            );
          }
        }
      }
      if (session.immersive && session.baseLayer) {
        this.display.submitFrame();
      }
    }
    cancelAnimationFrame(handle) {
      this.display.cancelAnimationFrame(handle);
    }
    async endSession(sessionId) {
      const session = this.sessions.get(sessionId);
      if (session.ended) {
        return;
      }
      if (session.immersive) {
        return this.display.exitPresent();
      } else {
        session.ended = true;
      }
    }
    doesSessionSupportReferenceSpace(sessionId, type) {
      const session = this.sessions.get(sessionId);
      if (session.ended) {
        return false;
      }
      return session.enabledFeatures.has(type);
    }
    requestStageBounds() {
      if (this.display.stageParameters) {
        const width = this.display.stageParameters.sizeX;
        const depth = this.display.stageParameters.sizeZ;
        const data = [];
        data.push(-width / 2);
        data.push(-depth / 2);
        data.push(width / 2);
        data.push(-depth / 2);
        data.push(width / 2);
        data.push(depth / 2);
        data.push(-width / 2);
        data.push(depth / 2);
        return data;
      }
      return null;
    }
    async requestFrameOfReferenceTransform(type, options) {
      if ((type === "local-floor" || type === "bounded-floor") && this.display.stageParameters && this.display.stageParameters.sittingToStandingTransform) {
        return this.display.stageParameters.sittingToStandingTransform;
      }
      return null;
    }
    getProjectionMatrix(eye) {
      if (eye === "left") {
        return this.frame.leftProjectionMatrix;
      } else if (eye === "right") {
        return this.frame.rightProjectionMatrix;
      } else if (eye === "none") {
        return this.frame.leftProjectionMatrix;
      } else {
        throw new Error(`eye must be of type 'left' or 'right'`);
      }
    }
    getViewport(sessionId, eye, layer, target) {
      const session = this.sessions.get(sessionId);
      const { width, height } = layer.context.canvas;
      if (!session.immersive) {
        target.x = target.y = 0;
        target.width = width;
        target.height = height;
        return true;
      }
      if (eye === "left" || eye === "none") {
        target.x = 0;
      } else if (eye === "right") {
        target.x = width / 2;
      } else {
        return false;
      }
      target.y = 0;
      target.width = width / 2;
      target.height = height;
      return true;
    }
    getBasePoseMatrix() {
      let { position, orientation } = this.frame.pose;
      if (!position && !orientation) {
        return this.baseModelMatrix;
      }
      if (!position) {
        position = this.tempVec3;
        position[0] = position[1] = position[2] = 0;
      }
      fromRotationTranslation(this.baseModelMatrix, orientation, position);
      return this.baseModelMatrix;
    }
    getBaseViewMatrix(eye) {
      if (eye === "left" || eye === "none") {
        return this.frame.leftViewMatrix;
      } else if (eye === "right") {
        return this.frame.rightViewMatrix;
      } else {
        throw new Error(`eye must be of type 'left' or 'right'`);
      }
    }
    getInputSources() {
      let inputSources = [];
      for (let i in this.gamepadInputSources) {
        inputSources.push(this.gamepadInputSources[i].inputSource);
      }
      return inputSources;
    }
    getInputPose(inputSource, coordinateSystem, poseType) {
      if (!coordinateSystem) {
        return null;
      }
      for (let i in this.gamepadInputSources) {
        let inputSourceImpl = this.gamepadInputSources[i];
        if (inputSourceImpl.inputSource === inputSource) {
          return inputSourceImpl.getXRPose(coordinateSystem, poseType);
        }
      }
      return null;
    }
    onWindowResize() {
    }
    onVRDisplayPresentChange(e) {
      if (!this.display.isPresenting) {
        this.sessions.forEach((session) => {
          if (session.immersive && !session.ended) {
            if (session.modifiedCanvasLayer) {
              const canvas = session.baseLayer.context.canvas;
              document.body.removeChild(canvas);
              canvas.setAttribute("style", "");
            }
            if (this.immersiveSession === session) {
              this.immersiveSession = null;
            }
            this.dispatchEvent("@@webxr-polyfill/vr-present-end", session.id);
          }
        });
      }
    }
  }
  class CardboardXRDevice extends WebVRDevice {
    constructor(global2, cardboardConfig) {
      const display = new CardboardVRDisplay(cardboardConfig || {});
      super(global2, display);
      this.display = display;
      this.frame = {
        rightViewMatrix: new Float32Array(16),
        leftViewMatrix: new Float32Array(16),
        rightProjectionMatrix: new Float32Array(16),
        leftProjectionMatrix: new Float32Array(16),
        pose: null,
        timestamp: null
      };
    }
  }
  let SESSION_ID$1 = 0;
  class Session$1 {
    constructor(mode, enabledFeatures) {
      this.mode = mode;
      this.enabledFeatures = enabledFeatures;
      this.ended = null;
      this.baseLayer = null;
      this.id = ++SESSION_ID$1;
    }
  }
  class InlineDevice extends XRDevice {
    constructor(global2) {
      super(global2);
      this.sessions = /* @__PURE__ */ new Map();
      this.projectionMatrix = create$5();
      this.identityMatrix = create$5();
    }
    onBaseLayerSet(sessionId, layer) {
      const session = this.sessions.get(sessionId);
      session.baseLayer = layer;
    }
    isSessionSupported(mode) {
      return mode == "inline";
    }
    isFeatureSupported(featureDescriptor) {
      switch (featureDescriptor) {
        case "viewer":
          return true;
        default:
          return false;
      }
    }
    async requestSession(mode, enabledFeatures) {
      if (!this.isSessionSupported(mode)) {
        return Promise.reject();
      }
      const session = new Session$1(mode, enabledFeatures);
      this.sessions.set(session.id, session);
      return Promise.resolve(session.id);
    }
    requestAnimationFrame(callback) {
      return window.requestAnimationFrame(callback);
    }
    cancelAnimationFrame(handle) {
      window.cancelAnimationFrame(handle);
    }
    onFrameStart(sessionId, renderState) {
      const session = this.sessions.get(sessionId);
      if (session.baseLayer) {
        const canvas = session.baseLayer.context.canvas;
        perspective$1(
          this.projectionMatrix,
          renderState.inlineVerticalFieldOfView,
          canvas.width / canvas.height,
          renderState.depthNear,
          renderState.depthFar
        );
      }
    }
    onFrameEnd(sessionId) {
    }
    async endSession(sessionId) {
      const session = this.sessions.get(sessionId);
      session.ended = true;
    }
    doesSessionSupportReferenceSpace(sessionId, type) {
      const session = this.sessions.get(sessionId);
      if (session.ended) {
        return false;
      }
      return session.enabledFeatures.has(type);
    }
    requestStageBounds() {
      return null;
    }
    async requestFrameOfReferenceTransform(type, options) {
      return null;
    }
    getProjectionMatrix(eye) {
      return this.projectionMatrix;
    }
    getViewport(sessionId, eye, layer, target) {
      this.sessions.get(sessionId);
      const { width, height } = layer.context.canvas;
      target.x = target.y = 0;
      target.width = width;
      target.height = height;
      return true;
    }
    getBasePoseMatrix() {
      return this.identityMatrix;
    }
    getBaseViewMatrix(eye) {
      return this.identityMatrix;
    }
    getInputSources() {
      return [];
    }
    getInputPose(inputSource, coordinateSystem, poseType) {
      return null;
    }
    onWindowResize() {
    }
  }
  const getWebVRDevice = async function(global2) {
    let device = null;
    if ("getVRDisplays" in global2.navigator) {
      try {
        const displays = await global2.navigator.getVRDisplays();
        if (displays && displays.length) {
          device = new WebVRDevice(global2, displays[0]);
        }
      } catch (e) {
      }
    }
    return device;
  };
  const requestXRDevice = async function(global2, config) {
    if (config.webvr) {
      let xr = await getWebVRDevice(global2);
      if (xr) {
        return xr;
      }
    }
    let mobile = isMobile(global2);
    if (mobile && config.cardboard || !mobile && config.allowCardboardOnDesktop) {
      if (!global2.VRFrameData) {
        global2.VRFrameData = function() {
          this.rightViewMatrix = new Float32Array(16);
          this.leftViewMatrix = new Float32Array(16);
          this.rightProjectionMatrix = new Float32Array(16);
          this.leftProjectionMatrix = new Float32Array(16);
          this.pose = null;
        };
      }
      return new CardboardXRDevice(global2, config.cardboardConfig);
    }
    return new InlineDevice(global2);
  };
  const CONFIG_DEFAULTS = {
    global: _global,
    webvr: true,
    cardboard: true,
    cardboardConfig: null,
    allowCardboardOnDesktop: false
  };
  const partials = ["navigator", "HTMLCanvasElement", "WebGLRenderingContext"];
  class WebXRPolyfill {
    constructor(config = {}) {
      this.config = Object.freeze(Object.assign({}, CONFIG_DEFAULTS, config));
      this.global = this.config.global;
      this.nativeWebXR = "xr" in this.global.navigator;
      this.injected = false;
      {
        this._injectPolyfill(this.global);
      }
    }
    _injectPolyfill(global2) {
      if (!partials.every((iface) => !!global2[iface])) {
        throw new Error(`Global must have the following attributes : ${partials}`);
      }
      for (const className of Object.keys(API)) {
        if (global2[className] !== void 0) {
          console.warn(`${className} already defined on global.`);
        } else {
          global2[className] = API[className];
        }
      }
      {
        polyfillMakeXRCompatible(global2.WebGLRenderingContext);
        {
          polyfillGetContext(global2.HTMLCanvasElement);
          if (global2.OffscreenCanvas) {
            polyfillGetContext(global2.OffscreenCanvas);
          }
          if (global2.WebGL2RenderingContext) {
            polyfillMakeXRCompatible(global2.WebGL2RenderingContext);
          }
          if (!window.isSecureContext) {
            console.warn(`WebXR Polyfill Warning:
This page is not running in a secure context (https:// or localhost)!
This means that although the page may be able to use the WebXR Polyfill it will
not be able to use native WebXR implementations, and as such will not be able to
access dedicated VR or AR hardware, and will not be able to take advantage of
any performance improvements a native WebXR implementation may offer. Please
host this content on a secure origin for the best user experience.
`);
          }
        }
      }
      this.injected = true;
      this._patchNavigatorXR();
    }
    _patchNavigatorXR() {
      let devicePromise = requestXRDevice(this.global, this.config);
      this.xr = new API.XRSystem(devicePromise);
      Object.defineProperty(this.global.navigator, "xr", {
        value: this.xr,
        configurable: true
      });
    }
    _injectCompatibilityShims(global2) {
      if (!partials.every((iface) => !!global2[iface])) {
        throw new Error(`Global must have the following attributes : ${partials}`);
      }
      if (global2.navigator.xr && "supportsSession" in global2.navigator.xr && !("isSessionSupported" in global2.navigator.xr)) {
        let originalSupportsSession = global2.navigator.xr.supportsSession;
        global2.navigator.xr.isSessionSupported = function(mode) {
          return originalSupportsSession.call(this, mode).then(() => {
            return true;
          }).catch(() => {
            return false;
          });
        };
        global2.navigator.xr.supportsSession = function(mode) {
          console.warn("navigator.xr.supportsSession() is deprecated. Please call navigator.xr.isSessionSupported() instead and check the boolean value returned when the promise resolves.");
          return originalSupportsSession.call(this, mode);
        };
      }
    }
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function createCommonjsModule(fn, module2) {
    return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
  }
  var cbor = createCommonjsModule(function(module2) {
    (function(global2, undefined$1) {
      var POW_2_24 = Math.pow(2, -24), POW_2_32 = Math.pow(2, 32), POW_2_53 = Math.pow(2, 53);
      function encode(value) {
        var data = new ArrayBuffer(256);
        var dataView = new DataView(data);
        var lastLength;
        var offset = 0;
        function ensureSpace(length2) {
          var newByteLength = data.byteLength;
          var requiredLength = offset + length2;
          while (newByteLength < requiredLength)
            newByteLength *= 2;
          if (newByteLength !== data.byteLength) {
            var oldDataView = dataView;
            data = new ArrayBuffer(newByteLength);
            dataView = new DataView(data);
            var uint32count = offset + 3 >> 2;
            for (var i2 = 0; i2 < uint32count; ++i2)
              dataView.setUint32(i2 * 4, oldDataView.getUint32(i2 * 4));
          }
          lastLength = length2;
          return dataView;
        }
        function write() {
          offset += lastLength;
        }
        function writeFloat64(value2) {
          write(ensureSpace(8).setFloat64(offset, value2));
        }
        function writeUint8(value2) {
          write(ensureSpace(1).setUint8(offset, value2));
        }
        function writeUint8Array(value2) {
          var dataView2 = ensureSpace(value2.length);
          for (var i2 = 0; i2 < value2.length; ++i2)
            dataView2.setUint8(offset + i2, value2[i2]);
          write();
        }
        function writeUint16(value2) {
          write(ensureSpace(2).setUint16(offset, value2));
        }
        function writeUint32(value2) {
          write(ensureSpace(4).setUint32(offset, value2));
        }
        function writeUint64(value2) {
          var low = value2 % POW_2_32;
          var high = (value2 - low) / POW_2_32;
          var dataView2 = ensureSpace(8);
          dataView2.setUint32(offset, high);
          dataView2.setUint32(offset + 4, low);
          write();
        }
        function writeTypeAndLength(type, length2) {
          if (length2 < 24) {
            writeUint8(type << 5 | length2);
          } else if (length2 < 256) {
            writeUint8(type << 5 | 24);
            writeUint8(length2);
          } else if (length2 < 65536) {
            writeUint8(type << 5 | 25);
            writeUint16(length2);
          } else if (length2 < 4294967296) {
            writeUint8(type << 5 | 26);
            writeUint32(length2);
          } else {
            writeUint8(type << 5 | 27);
            writeUint64(length2);
          }
        }
        function encodeItem(value2) {
          var i2;
          if (value2 === false)
            return writeUint8(244);
          if (value2 === true)
            return writeUint8(245);
          if (value2 === null)
            return writeUint8(246);
          if (value2 === undefined$1)
            return writeUint8(247);
          switch (typeof value2) {
            case "number":
              if (Math.floor(value2) === value2) {
                if (0 <= value2 && value2 <= POW_2_53)
                  return writeTypeAndLength(0, value2);
                if (-POW_2_53 <= value2 && value2 < 0)
                  return writeTypeAndLength(1, -(value2 + 1));
              }
              writeUint8(251);
              return writeFloat64(value2);
            case "string":
              var utf8data = [];
              for (i2 = 0; i2 < value2.length; ++i2) {
                var charCode = value2.charCodeAt(i2);
                if (charCode < 128) {
                  utf8data.push(charCode);
                } else if (charCode < 2048) {
                  utf8data.push(192 | charCode >> 6);
                  utf8data.push(128 | charCode & 63);
                } else if (charCode < 55296) {
                  utf8data.push(224 | charCode >> 12);
                  utf8data.push(128 | charCode >> 6 & 63);
                  utf8data.push(128 | charCode & 63);
                } else {
                  charCode = (charCode & 1023) << 10;
                  charCode |= value2.charCodeAt(++i2) & 1023;
                  charCode += 65536;
                  utf8data.push(240 | charCode >> 18);
                  utf8data.push(128 | charCode >> 12 & 63);
                  utf8data.push(128 | charCode >> 6 & 63);
                  utf8data.push(128 | charCode & 63);
                }
              }
              writeTypeAndLength(3, utf8data.length);
              return writeUint8Array(utf8data);
            default:
              var length2;
              if (Array.isArray(value2)) {
                length2 = value2.length;
                writeTypeAndLength(4, length2);
                for (i2 = 0; i2 < length2; ++i2)
                  encodeItem(value2[i2]);
              } else if (value2 instanceof Uint8Array) {
                writeTypeAndLength(2, value2.length);
                writeUint8Array(value2);
              } else {
                var keys = Object.keys(value2);
                length2 = keys.length;
                writeTypeAndLength(5, length2);
                for (i2 = 0; i2 < length2; ++i2) {
                  var key = keys[i2];
                  encodeItem(key);
                  encodeItem(value2[key]);
                }
              }
          }
        }
        encodeItem(value);
        if ("slice" in data)
          return data.slice(0, offset);
        var ret = new ArrayBuffer(offset);
        var retView = new DataView(ret);
        for (var i = 0; i < offset; ++i)
          retView.setUint8(i, dataView.getUint8(i));
        return ret;
      }
      function decode(data, tagger, simpleValue) {
        var dataView = new DataView(data);
        var offset = 0;
        if (typeof tagger !== "function")
          tagger = function(value) {
            return value;
          };
        if (typeof simpleValue !== "function")
          simpleValue = function() {
            return undefined$1;
          };
        function read(value, length2) {
          offset += length2;
          return value;
        }
        function readArrayBuffer(length2) {
          return read(new Uint8Array(data, offset, length2), length2);
        }
        function readFloat16() {
          var tempArrayBuffer = new ArrayBuffer(4);
          var tempDataView = new DataView(tempArrayBuffer);
          var value = readUint16();
          var sign = value & 32768;
          var exponent = value & 31744;
          var fraction = value & 1023;
          if (exponent === 31744)
            exponent = 255 << 10;
          else if (exponent !== 0)
            exponent += 127 - 15 << 10;
          else if (fraction !== 0)
            return fraction * POW_2_24;
          tempDataView.setUint32(0, sign << 16 | exponent << 13 | fraction << 13);
          return tempDataView.getFloat32(0);
        }
        function readFloat32() {
          return read(dataView.getFloat32(offset), 4);
        }
        function readFloat64() {
          return read(dataView.getFloat64(offset), 8);
        }
        function readUint8() {
          return read(dataView.getUint8(offset), 1);
        }
        function readUint16() {
          return read(dataView.getUint16(offset), 2);
        }
        function readUint32() {
          return read(dataView.getUint32(offset), 4);
        }
        function readUint64() {
          return readUint32() * POW_2_32 + readUint32();
        }
        function readBreak() {
          if (dataView.getUint8(offset) !== 255)
            return false;
          offset += 1;
          return true;
        }
        function readLength(additionalInformation) {
          if (additionalInformation < 24)
            return additionalInformation;
          if (additionalInformation === 24)
            return readUint8();
          if (additionalInformation === 25)
            return readUint16();
          if (additionalInformation === 26)
            return readUint32();
          if (additionalInformation === 27)
            return readUint64();
          if (additionalInformation === 31)
            return -1;
          throw "Invalid length encoding";
        }
        function readIndefiniteStringLength(majorType) {
          var initialByte = readUint8();
          if (initialByte === 255)
            return -1;
          var length2 = readLength(initialByte & 31);
          if (length2 < 0 || initialByte >> 5 !== majorType)
            throw "Invalid indefinite length element";
          return length2;
        }
        function appendUtf16data(utf16data, length2) {
          for (var i = 0; i < length2; ++i) {
            var value = readUint8();
            if (value & 128) {
              if (value < 224) {
                value = (value & 31) << 6 | readUint8() & 63;
                length2 -= 1;
              } else if (value < 240) {
                value = (value & 15) << 12 | (readUint8() & 63) << 6 | readUint8() & 63;
                length2 -= 2;
              } else {
                value = (value & 15) << 18 | (readUint8() & 63) << 12 | (readUint8() & 63) << 6 | readUint8() & 63;
                length2 -= 3;
              }
            }
            if (value < 65536) {
              utf16data.push(value);
            } else {
              value -= 65536;
              utf16data.push(55296 | value >> 10);
              utf16data.push(56320 | value & 1023);
            }
          }
        }
        function decodeItem() {
          var initialByte = readUint8();
          var majorType = initialByte >> 5;
          var additionalInformation = initialByte & 31;
          var i;
          var length2;
          if (majorType === 7) {
            switch (additionalInformation) {
              case 25:
                return readFloat16();
              case 26:
                return readFloat32();
              case 27:
                return readFloat64();
            }
          }
          length2 = readLength(additionalInformation);
          if (length2 < 0 && (majorType < 2 || 6 < majorType))
            throw "Invalid length";
          switch (majorType) {
            case 0:
              return length2;
            case 1:
              return -1 - length2;
            case 2:
              if (length2 < 0) {
                var elements = [];
                var fullArrayLength = 0;
                while ((length2 = readIndefiniteStringLength(majorType)) >= 0) {
                  fullArrayLength += length2;
                  elements.push(readArrayBuffer(length2));
                }
                var fullArray = new Uint8Array(fullArrayLength);
                var fullArrayOffset = 0;
                for (i = 0; i < elements.length; ++i) {
                  fullArray.set(elements[i], fullArrayOffset);
                  fullArrayOffset += elements[i].length;
                }
                return fullArray;
              }
              return readArrayBuffer(length2);
            case 3:
              var utf16data = [];
              if (length2 < 0) {
                while ((length2 = readIndefiniteStringLength(majorType)) >= 0)
                  appendUtf16data(utf16data, length2);
              } else
                appendUtf16data(utf16data, length2);
              return String.fromCharCode.apply(null, utf16data);
            case 4:
              var retArray;
              if (length2 < 0) {
                retArray = [];
                while (!readBreak())
                  retArray.push(decodeItem());
              } else {
                retArray = new Array(length2);
                for (i = 0; i < length2; ++i)
                  retArray[i] = decodeItem();
              }
              return retArray;
            case 5:
              var retObject = {};
              for (i = 0; i < length2 || length2 < 0 && !readBreak(); ++i) {
                var key = decodeItem();
                retObject[key] = decodeItem();
              }
              return retObject;
            case 6:
              return tagger(decodeItem(), length2);
            case 7:
              switch (length2) {
                case 20:
                  return false;
                case 21:
                  return true;
                case 22:
                  return null;
                case 23:
                  return undefined$1;
                default:
                  return simpleValue(length2);
              }
          }
        }
        var ret = decodeItem();
        if (offset !== data.byteLength)
          throw "Remaining bytes";
        return ret;
      }
      var obj = { encode, decode };
      if (typeof undefined$1 === "function" && undefined$1.amd)
        undefined$1("cbor/cbor", obj);
      else if (module2.exports)
        module2.exports = obj;
      else if (!global2.CBOR)
        global2.CBOR = obj;
    })(commonjsGlobal);
  });
  /**
   * This files defines the HoloPlayClient class and Message class.
   *
   * Copyright (c) [2019] [Looking Glass Factory]
   *
   * @link    https://lookingglassfactory.com/
   * @file    This files defines the HoloPlayClient class and Message class.
   * @author  Looking Glass Factory.
   * @version 0.0.8
   * @license SEE LICENSE IN LICENSE.md
   */
  const WebSocket = typeof window === "undefined" ? require("ws") : window.WebSocket;
  class Client {
    constructor(initCallback, errCallback, closeCallback, debug = false, appId, isGreedy, oncloseBehavior) {
      this.reqs = [];
      this.reps = [];
      this.requestId = this.getRequestId();
      this.debug = debug;
      this.isGreedy = isGreedy;
      this.errCallback = errCallback;
      this.closeCallback = closeCallback;
      this.alwaysdebug = false;
      this.isConnected = false;
      let initCmd = null;
      if (appId || isGreedy || oncloseBehavior) {
        initCmd = new InitMessage(appId, isGreedy, oncloseBehavior, this.debug);
      } else {
        if (debug)
          this.alwaysdebug = true;
        if (typeof initCallback == "function")
          initCmd = new InfoMessage();
      }
      this.openWebsocket(initCmd, initCallback);
    }
    sendMessage(msg, timeoutSecs = 60) {
      if (this.alwaysdebug)
        msg.cmd.debug = true;
      let cborData = msg.toCbor();
      return this.sendRequestObj(cborData, timeoutSecs);
    }
    disconnect() {
      this.ws.close();
    }
    openWebsocket(firstCmd = null, initCallback = null) {
      this.ws = new WebSocket("ws://localhost:11222/driver", ["rep.sp.nanomsg.org"]);
      this.ws.parent = this;
      this.ws.binaryType = "arraybuffer";
      this.ws.onmessage = this.messageHandler;
      this.ws.onopen = () => {
        this.isConnected = true;
        if (this.debug) {
          console.log("socket open");
        }
        if (firstCmd != null) {
          this.sendMessage(firstCmd).then(initCallback);
        }
      };
      this.ws.onerror = this.onSocketError;
      this.ws.onclose = this.onClose;
    }
    sendRequestObj(data, timeoutSecs) {
      return new Promise((resolve, reject) => {
        let reqObj = {
          id: this.requestId++,
          parent: this,
          payload: data,
          success: resolve,
          error: reject,
          send: function() {
            if (this.debug)
              console.log("attemtping to send request with ID " + this.id);
            this.timeout = setTimeout(reqObj.send.bind(this), timeoutSecs * 1e3);
            let tmp = new Uint8Array(data.byteLength + 4);
            let view = new DataView(tmp.buffer);
            view.setUint32(0, this.id);
            tmp.set(new Uint8Array(this.payload), 4);
            this.parent.ws.send(tmp.buffer);
          }
        };
        this.reqs.push(reqObj);
        reqObj.send();
      });
    }
    messageHandler(event) {
      console.log("message");
      let data = event.data;
      if (data.byteLength < 4)
        return;
      let view = new DataView(data);
      let replyId = view.getUint32(0);
      if (replyId < 2147483648) {
        this.parent.err("bad nng header");
        return;
      }
      let i = this.parent.findReqIndex(replyId);
      if (i == -1) {
        this.parent.err("got reply that doesn't match known request!");
        return;
      }
      let rep = { id: replyId, payload: cbor.decode(data.slice(4)) };
      if (rep.payload.error == 0) {
        this.parent.reqs[i].success(rep.payload);
      } else {
        this.parent.reqs[i].error(rep.payload);
      }
      clearTimeout(this.parent.reqs[i].timeout);
      this.parent.reqs.splice(i, 1);
      this.parent.reps.push(rep);
      if (this.debug) {
        console.log(rep.payload);
      }
    }
    getRequestId() {
      return Math.floor(this.prng() * 2147483647) + 2147483648;
    }
    onClose(event) {
      this.parent.isConnected = false;
      if (this.parent.debug) {
        console.log("socket closed");
      }
      if (typeof this.parent.closeCallback == "function")
        this.parent.closeCallback(event);
    }
    onSocketError(error) {
      if (this.parent.debug) {
        console.log(error);
      }
      if (typeof this.parent.errCallback == "function") {
        this.parent.errCallback(error);
      }
    }
    err(errorMsg) {
      if (this.debug) {
        console.log("[DRIVER ERROR]" + errorMsg);
      }
    }
    findReqIndex(replyId) {
      let i = 0;
      for (; i < this.reqs.length; i++) {
        if (this.reqs[i].id == replyId) {
          return i;
        }
      }
      return -1;
    }
    prng() {
      if (this.rng == void 0) {
        this.rng = generateRng();
      }
      return this.rng();
    }
  }
  class Message {
    constructor(cmd, bin) {
      this.cmd = cmd;
      this.bin = bin;
    }
    toCbor() {
      return cbor.encode(this);
    }
  }
  class InitMessage extends Message {
    constructor(appId = "", isGreedy = false, onclose = "", debug = false) {
      let cmd = { "init": {} };
      if (appId != "")
        cmd["init"].appid = appId;
      if (onclose != "")
        cmd["init"].onclose = onclose;
      if (isGreedy)
        cmd["init"].greedy = true;
      if (debug)
        cmd["init"].debug = true;
      super(cmd, null);
    }
  }
  class InfoMessage extends Message {
    constructor() {
      let cmd = { "info": {} };
      super(cmd, null);
    }
  }
  function generateRng() {
    function xmur3(str) {
      for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353), h = h << 13 | h >>> 19;
      return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
      };
    }
    function xoshiro128ss(a, b, c, d) {
      return () => {
        var t = b << 9, r = a * 5;
        r = (r << 7 | r >>> 25) * 9;
        c ^= a;
        d ^= b;
        b ^= c;
        a ^= d;
        c ^= t;
        d = d << 11 | d >>> 21;
        return (r >>> 0) / 4294967296;
      };
    }
    var state = Date.now();
    var seed = xmur3(state.toString());
    return xoshiro128ss(seed(), seed(), seed(), seed());
  }
  function glslifyNumbers(strings, ...values) {
    let s = strings[0];
    for (let i = 1; i < strings.length; ++i) {
      const v = values[i - 1];
      s += typeof v === "number" ? v.toPrecision(10) : v;
      s += strings[i];
    }
    return s;
  }
  function Shader(cfg) {
    return glslifyNumbers`
  precision mediump float;
  uniform int u_viewType;
  uniform sampler2D u_texture;
  varying vec2 v_texcoord;
  const float pitch    = ${cfg.pitch};
  const float tilt     = ${cfg.tilt};
  const float center   = ${cfg.calibration.center.value};
  const float invView  = ${cfg.calibration.invView.value};
  const float flipX    = ${cfg.calibration.flipImageX.value};
  const float flipY    = ${cfg.calibration.flipImageY.value};
  const float subp     = ${cfg.subp};
  const float numViews = ${cfg.numViews};
  const float tilesX   = ${cfg.quiltWidth};
  const float tilesY   = ${cfg.quiltHeight};
  const vec2 quiltViewPortion = vec2(
    ${cfg.quiltWidth * cfg.tileWidth / cfg.framebufferWidth},
    ${cfg.quiltHeight * cfg.tileHeight / cfg.framebufferHeight});
  vec2 texArr(vec3 uvz) {
    float z = floor(uvz.z * numViews);
    float x = (mod(z, tilesX) + uvz.x) / tilesX;
    float y = (floor(z / tilesX) + uvz.y) / tilesY;
    return vec2(x, y) * quiltViewPortion;
  }
  float remap(float value, float from1, float to1, float from2, float to2) {
    return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
  }
  void main() {
    if (u_viewType == 2) { // "quilt" view
      gl_FragColor = texture2D(u_texture, v_texcoord);
      return;
    }
    if (u_viewType == 1) { // middle view
      gl_FragColor = texture2D(u_texture, texArr(vec3(v_texcoord.x, v_texcoord.y, 0.5)));
      return;
    }
    vec4 rgb[3];
    vec3 nuv = vec3(v_texcoord.xy, 0.0);
    // Flip UVs if necessary
    nuv.x = (1.0 - flipX) * nuv.x + flipX * (1.0 - nuv.x);
    nuv.y = (1.0 - flipY) * nuv.y + flipY * (1.0 - nuv.y);
    for (int i = 0; i < 3; i++) {
      nuv.z = (v_texcoord.x + float(i) * subp + v_texcoord.y * tilt) * pitch - center;
      nuv.z = mod(nuv.z + ceil(abs(nuv.z)), 1.0);
      nuv.z = (1.0 - invView) * nuv.z + invView * (1.0 - nuv.z);
      rgb[i] = texture2D(u_texture, texArr(vec3(v_texcoord.x, v_texcoord.y, nuv.z)));
    }
    gl_FragColor = vec4(rgb[0].r, rgb[1].g, rgb[2].b, 1);
  }
`;
  }
  const DefaultEyeHeight = 1.6;
  var InlineView;
  (function(InlineView2) {
    InlineView2[InlineView2["Swizzled"] = 0] = "Swizzled";
    InlineView2[InlineView2["Center"] = 1] = "Center";
    InlineView2[InlineView2["Quilt"] = 2] = "Quilt";
  })(InlineView || (InlineView = {}));
  class LookingGlassConfig$1 extends EventTarget {
    constructor(cfg) {
      super();
      __publicField(this, "_calibration", {
        configVersion: "1.0",
        pitch: { value: 45 },
        slope: { value: -5 },
        center: { value: -0.5 },
        viewCone: { value: 40 },
        invView: { value: 1 },
        verticalAngle: { value: 0 },
        DPI: { value: 338 },
        screenW: { value: 250 },
        screenH: { value: 250 },
        flipImageX: { value: 0 },
        flipImageY: { value: 0 },
        flipSubp: { value: 0 },
        serial: "LKG-DEFAULT-#####"
      });
      __publicField(this, "_viewControls", {
        tileHeight: 512,
        numViews: 45,
        trackballX: 0,
        trackballY: 0,
        targetX: 0,
        targetY: DefaultEyeHeight,
        targetZ: -0.5,
        targetDiam: 2,
        fovy: 13 / 180 * Math.PI,
        depthiness: 1.25,
        inlineView: InlineView.Center
      });
      __publicField(this, "LookingGlassDetected");
      this._viewControls = { ...this._viewControls, ...cfg };
      this.syncCalibration();
    }
    syncCalibration() {
      new Client((msg) => {
        if (msg.devices.length < 1) {
          console.log("No Looking Glass devices found");
          return;
        }
        if (msg.devices.length > 1) {
          console.log("More than one Looking Glass device found... using the first one");
        }
        this.calibration = msg.devices[0].calibration;
      });
    }
    addEventListener(type, callback, options) {
      super.addEventListener(type, callback, options);
    }
    onConfigChange() {
      this.dispatchEvent(new Event("on-config-changed"));
    }
    get calibration() {
      return this._calibration;
    }
    set calibration(value) {
      this._calibration = {
        ...this._calibration,
        ...value
      };
      this.onConfigChange();
    }
    updateViewControls(value) {
      if (value != void 0) {
        this._viewControls = {
          ...this._viewControls,
          ...value
        };
        this.onConfigChange();
      }
    }
    get tileHeight() {
      return this._viewControls.tileHeight;
    }
    set tileHeight(v) {
      this.updateViewControls({ tileHeight: v });
    }
    get numViews() {
      return this._viewControls.numViews;
    }
    set numViews(v) {
      this.updateViewControls({ numViews: v });
    }
    get targetX() {
      return this._viewControls.targetX;
    }
    set targetX(v) {
      this.updateViewControls({ targetX: v });
    }
    get targetY() {
      return this._viewControls.targetY;
    }
    set targetY(v) {
      this.updateViewControls({ targetY: v });
    }
    get targetZ() {
      return this._viewControls.targetZ;
    }
    set targetZ(v) {
      this.updateViewControls({ targetZ: v });
    }
    get trackballX() {
      return this._viewControls.trackballX;
    }
    set trackballX(v) {
      this.updateViewControls({ trackballX: v });
    }
    get trackballY() {
      return this._viewControls.trackballY;
    }
    set trackballY(v) {
      this.updateViewControls({ trackballY: v });
    }
    get targetDiam() {
      return this._viewControls.targetDiam;
    }
    set targetDiam(v) {
      this.updateViewControls({ targetDiam: v });
    }
    get fovy() {
      return this._viewControls.fovy;
    }
    set fovy(v) {
      this.updateViewControls({ fovy: v });
    }
    get depthiness() {
      return this._viewControls.depthiness;
    }
    set depthiness(v) {
      this.updateViewControls({ depthiness: v });
    }
    get inlineView() {
      return this._viewControls.inlineView;
    }
    set inlineView(v) {
      this.updateViewControls({ inlineView: v });
    }
    get aspect() {
      return this._calibration.screenW.value / this._calibration.screenH.value;
    }
    get tileWidth() {
      return Math.round(this.tileHeight * this.aspect);
    }
    get framebufferWidth() {
      const numPixels = this.tileWidth * this.tileHeight * this.numViews;
      return 2 ** Math.ceil(Math.log2(Math.max(Math.sqrt(numPixels), this.tileWidth)));
    }
    get quiltWidth() {
      return Math.floor(this.framebufferWidth / this.tileWidth);
    }
    get quiltHeight() {
      return Math.ceil(this.numViews / this.quiltWidth);
    }
    get framebufferHeight() {
      return 2 ** Math.ceil(Math.log2(this.quiltHeight * this.tileHeight));
    }
    get viewCone() {
      return this._calibration.viewCone.value * this.depthiness / 180 * Math.PI;
    }
    get tilt() {
      return this._calibration.screenH.value / (this._calibration.screenW.value * this._calibration.slope.value) * (this._calibration.flipImageX.value ? -1 : 1);
    }
    get subp() {
      return 1 / (this._calibration.screenW.value * 3);
    }
    get pitch() {
      const screenInches = this._calibration.screenW.value / this._calibration.DPI.value;
      return this._calibration.pitch.value * screenInches * Math.cos(Math.atan(1 / this._calibration.slope.value));
    }
  }
  let globalLkgConfig = null;
  function getLookingGlassConfig() {
    if (globalLkgConfig == null) {
      globalLkgConfig = new LookingGlassConfig$1();
    }
    return globalLkgConfig;
  }
  function updateLookingGlassConfig(viewControls) {
    const lkgConfig = getLookingGlassConfig();
    if (viewControls != void 0) {
      lkgConfig.updateViewControls(viewControls);
    }
  }
  var EPSILON = 1e-6;
  var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
  function create() {
    var out = new ARRAY_TYPE(16);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    var a00 = void 0, a01 = void 0, a02 = void 0, a03 = void 0;
    var a10 = void 0, a11 = void 0, a12 = void 0, a13 = void 0;
    var a20 = void 0, a21 = void 0, a22 = void 0, a23 = void 0;
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  }
  function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len2 = Math.sqrt(x * x + y * y + z * z);
    var s = void 0, c = void 0, t = void 0;
    var a00 = void 0, a01 = void 0, a02 = void 0, a03 = void 0;
    var a10 = void 0, a11 = void 0, a12 = void 0, a13 = void 0;
    var a20 = void 0, a21 = void 0, a22 = void 0, a23 = void 0;
    var b00 = void 0, b01 = void 0, b02 = void 0;
    var b10 = void 0, b11 = void 0, b12 = void 0;
    var b20 = void 0, b21 = void 0, b22 = void 0;
    if (len2 < EPSILON) {
      return null;
    }
    len2 = 1 / len2;
    x *= len2;
    y *= len2;
    z *= len2;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }
  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function perspective(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf = void 0;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
  }
  function initLookingGlassControlGUI(lkgCanvas) {
    var _a;
    const cfg = getLookingGlassConfig();
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    (_a = styleElement.sheet) == null ? void 0 : _a.insertRule("#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }");
    const c = document.createElement("div");
    c.id = "LookingGlassWebXRControls";
    c.style.position = "fixed";
    c.style.zIndex = "1000";
    c.style.padding = "15px";
    c.style.width = "320px";
    c.style.maxWidth = "calc(100vw - 18px)";
    c.style.maxHeight = "calc(100vh - 18px)";
    c.style.whiteSpace = "nowrap";
    c.style.background = "rgba(0, 0, 0, 0.6)";
    c.style.color = "white";
    c.style.borderRadius = "10px";
    c.style.right = "15px";
    c.style.bottom = "15px";
    const title = document.createElement("div");
    c.appendChild(title);
    title.style.width = "100%";
    title.style.textAlign = "center";
    title.style.fontWeight = "bold";
    title.innerText = "Looking Glass Controls ";
    const help = document.createElement("div");
    c.appendChild(help);
    help.style.width = "100%";
    help.style.whiteSpace = "normal";
    help.style.color = "rgba(255,255,255,0.7)";
    help.style.fontSize = "14px";
    help.style.margin = "5px 0";
    help.innerHTML = "Click the popup and use WASD, mouse left/right drag, and scroll.";
    const lrToggle = document.createElement("input");
    title.appendChild(lrToggle);
    lrToggle.type = "button";
    lrToggle.value = "\u2190";
    lrToggle.dataset.otherValue = "\u2192";
    lrToggle.onclick = () => {
      [c.style.right, c.style.left] = [c.style.left, c.style.right];
      [lrToggle.value, lrToggle.dataset.otherValue] = [lrToggle.dataset.otherValue || "", lrToggle.value];
    };
    const controlListDiv = document.createElement("div");
    c.appendChild(controlListDiv);
    const addControl = (name, attrs, opts) => {
      const stringify = opts.stringify;
      const controlLineDiv = document.createElement("div");
      controlLineDiv.style.marginBottom = "8px";
      controlListDiv.appendChild(controlLineDiv);
      const controlID = name;
      const initialValue = cfg[name];
      const label = document.createElement("label");
      controlLineDiv.appendChild(label);
      label.innerText = opts.label;
      label.setAttribute("for", controlID);
      label.style.width = "100px";
      label.style.display = "inline-block";
      label.style.textDecoration = "dotted underline 1px";
      label.style.fontFamily = `"Courier New"`;
      label.style.fontSize = "13px";
      label.style.fontWeight = "bold";
      label.title = opts.title;
      if (attrs.type !== "checkbox") {
        const reset = document.createElement("input");
        controlLineDiv.appendChild(reset);
        reset.type = "button";
        reset.value = "\u238C";
        reset.alt = "reset";
        reset.title = "Reset value to default";
        reset.style.padding = "0 4px";
        reset.onclick = (e) => {
          control.value = initialValue;
          control.oninput(e);
        };
      }
      const control = document.createElement("input");
      controlLineDiv.appendChild(control);
      Object.assign(control, attrs);
      control.id = controlID;
      control.title = opts.title;
      control.value = attrs.value !== void 0 ? attrs.value : initialValue;
      const updateValue = (newValue) => {
        cfg[name] = newValue;
        updateNumberText(newValue);
      };
      control.oninput = () => {
        const newValue = attrs.type === "range" ? parseFloat(control.value) : attrs.type === "checkbox" ? control.checked : control.value;
        updateValue(newValue);
      };
      const updateExternally = (callback) => {
        let newValue = callback(cfg[name]);
        if (opts.fixRange) {
          newValue = opts.fixRange(newValue);
          control.max = Math.max(parseFloat(control.max), newValue).toString();
          control.min = Math.min(parseFloat(control.min), newValue).toString();
        }
        control.value = newValue;
        updateValue(newValue);
      };
      if (attrs.type === "range") {
        control.style.width = "110px";
        control.style.height = "8px";
        control.onwheel = (ev) => {
          updateExternally((oldValue) => oldValue + Math.sign(ev.deltaX - ev.deltaY) * attrs.step);
        };
      }
      let updateNumberText = (value) => {
      };
      if (stringify) {
        const numberText = document.createElement("span");
        numberText.style.fontFamily = `"Courier New"`;
        numberText.style.fontSize = "13px";
        numberText.style.marginLeft = "3px";
        controlLineDiv.appendChild(numberText);
        updateNumberText = (v) => {
          numberText.innerHTML = stringify(v);
        };
        updateNumberText(initialValue);
      }
      return updateExternally;
    };
    addControl("tileHeight", { type: "range", min: 160, max: 455, step: 1 }, {
      label: "resolution",
      title: "resolution of each view",
      stringify: (v) => `${(v * cfg.aspect).toFixed()}&times;${v.toFixed()}`
    });
    addControl("numViews", { type: "range", min: 1, max: 145, step: 1 }, {
      label: "views",
      title: "number of different viewing angles to render",
      stringify: (v) => v.toFixed()
    });
    const setTrackballX = addControl("trackballX", {
      type: "range",
      min: -Math.PI,
      max: 1.0001 * Math.PI,
      step: 0.5 / 180 * Math.PI
    }, {
      label: "trackball x",
      title: "camera trackball x",
      fixRange: (v) => (v + Math.PI * 3) % (Math.PI * 2) - Math.PI,
      stringify: (v) => `${(v / Math.PI * 180).toFixed()}&deg;`
    });
    const setTrackballY = addControl("trackballY", {
      type: "range",
      min: -0.5 * Math.PI,
      max: 0.5001 * Math.PI,
      step: 1 / 180 * Math.PI
    }, {
      label: "trackball y",
      title: "camera trackball y",
      fixRange: (v) => Math.max(-0.5 * Math.PI, Math.min(v, 0.5 * Math.PI)),
      stringify: (v) => `${(v / Math.PI * 180).toFixed()}&deg;`
    });
    const setTargetX = addControl("targetX", { type: "range", min: -20, max: 20, step: 0.1 }, {
      label: "target x",
      title: "target position x",
      fixRange: (v) => v,
      stringify: (v) => v.toFixed(2) + " m"
    });
    const setTargetY = addControl("targetY", { type: "range", min: -20, max: 20, step: 0.1 }, {
      label: "target y",
      title: "target position y",
      fixRange: (v) => v,
      stringify: (v) => v.toFixed(2) + " m"
    });
    const setTargetZ = addControl("targetZ", { type: "range", min: -20, max: 20, step: 0.1 }, {
      label: "target z",
      title: "target position z",
      fixRange: (v) => v,
      stringify: (v) => v.toFixed(2) + " m"
    });
    addControl("fovy", {
      type: "range",
      min: 1 / 180 * Math.PI,
      max: 120.1 / 180 * Math.PI,
      step: 1 / 180 * Math.PI
    }, {
      label: "fov",
      title: "perspective fov (degrades stereo effect)",
      fixRange: (v) => Math.max(1 / 180 * Math.PI, Math.min(v, 120.1 / 180 * Math.PI)),
      stringify: (v) => {
        const xdeg = v / Math.PI * 180;
        const ydeg = Math.atan(Math.tan(v / 2) * cfg.aspect) * 2 / Math.PI * 180;
        return `${xdeg.toFixed()}&deg;&times;${ydeg.toFixed()}&deg;`;
      }
    });
    addControl("depthiness", { type: "range", min: 0, max: 2, step: 0.01 }, {
      label: "depthiness",
      title: 'exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov. 1.25 seems to be most physically accurate on Looking Glass 8.9".',
      fixRange: (v) => Math.max(0, v),
      stringify: (v) => `${v.toFixed(2)}x`
    });
    addControl("inlineView", { type: "range", min: 0, max: 2, step: 1 }, {
      label: "inline view",
      title: "what to show inline on the original canvas (swizzled = no overwrite)",
      fixRange: (v) => Math.max(0, Math.min(v, 2)),
      stringify: (v) => v === 0 ? "swizzled" : v === 1 ? "center" : v === 2 ? "quilt" : "?"
    });
    lkgCanvas.oncontextmenu = (ev) => {
      ev.preventDefault();
    };
    lkgCanvas.addEventListener("wheel", (ev) => {
      const old = cfg.targetDiam;
      const GAMMA = 1.1;
      const logOld = Math.log(old) / Math.log(GAMMA);
      return cfg.targetDiam = Math.pow(GAMMA, logOld + ev.deltaY * 0.01);
    });
    lkgCanvas.addEventListener("mousemove", (ev) => {
      const mx = ev.movementX, my = -ev.movementY;
      if (ev.buttons & 2 || ev.buttons & 1 && (ev.shiftKey || ev.ctrlKey)) {
        const tx = cfg.trackballX, ty = cfg.trackballY;
        const dx = -Math.cos(tx) * mx + Math.sin(tx) * Math.sin(ty) * my;
        const dy = -Math.cos(ty) * my;
        const dz = Math.sin(tx) * mx + Math.cos(tx) * Math.sin(ty) * my;
        setTargetX((v) => v + dx * cfg.targetDiam * 1e-3);
        setTargetY((v) => v + dy * cfg.targetDiam * 1e-3);
        setTargetZ((v) => v + dz * cfg.targetDiam * 1e-3);
      } else if (ev.buttons & 1) {
        setTrackballX((v) => v - mx * 0.01);
        setTrackballY((v) => v - my * 0.01);
      }
    });
    const keys = { w: 0, a: 0, s: 0, d: 0 };
    lkgCanvas.addEventListener("keydown", (ev) => {
      switch (ev.code) {
        case "KeyW":
          keys.w = 1;
          break;
        case "KeyA":
          keys.a = 1;
          break;
        case "KeyS":
          keys.s = 1;
          break;
        case "KeyD":
          keys.d = 1;
          break;
      }
    });
    lkgCanvas.addEventListener("keyup", (ev) => {
      switch (ev.code) {
        case "KeyW":
          keys.w = 0;
          break;
        case "KeyA":
          keys.a = 0;
          break;
        case "KeyS":
          keys.s = 0;
          break;
        case "KeyD":
          keys.d = 0;
          break;
      }
    });
    requestAnimationFrame(flyCamera);
    function flyCamera() {
      let kx = keys.d - keys.a;
      let ky = keys.w - keys.s;
      if (kx && ky) {
        kx *= Math.sqrt(0.5);
        ky *= Math.sqrt(0.5);
      }
      const tx = cfg.trackballX, ty = cfg.trackballY;
      const dx = Math.cos(tx) * kx - Math.sin(tx) * Math.cos(ty) * ky;
      const dy = -Math.sin(ty) * ky;
      const dz = -Math.sin(tx) * kx - Math.cos(tx) * Math.cos(ty) * ky;
      setTargetX((v) => v + dx * cfg.targetDiam * 0.03);
      setTargetY((v) => v + dy * cfg.targetDiam * 0.03);
      setTargetZ((v) => v + dz * cfg.targetDiam * 0.03);
      requestAnimationFrame(flyCamera);
    }
    return c;
  }
  const PRIVATE = Symbol("LookingGlassXRWebGLLayer");
  class LookingGlassXRWebGLLayer extends XRWebGLLayer {
    constructor(session, gl, layerInit) {
      super(session, gl, layerInit);
      const lkgCanvas = document.createElement("canvas");
      lkgCanvas.tabIndex = 0;
      const lkgCtx = lkgCanvas.getContext("2d", { alpha: false });
      lkgCanvas.addEventListener("dblclick", function() {
        this.requestFullscreen();
      });
      const controls = initLookingGlassControlGUI(lkgCanvas);
      const cfg = getLookingGlassConfig();
      const config = this[PRIVATE$3].config;
      const texture = gl.createTexture();
      let depthStencil, dsConfig;
      const framebuffer = gl.createFramebuffer();
      const glEnable = gl.enable.bind(gl);
      const glDisable = gl.disable.bind(gl);
      const OES_VAO = gl.getExtension("OES_vertex_array_object");
      const GL_VERTEX_ARRAY_BINDING = 34229;
      const glBindVertexArray = OES_VAO ? OES_VAO.bindVertexArrayOES.bind(OES_VAO) : gl.bindVertexArray.bind(gl);
      const allocateFramebufferAttachments = () => {
        const oldTextureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D);
        {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, cfg.framebufferWidth, cfg.framebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        gl.bindTexture(gl.TEXTURE_2D, oldTextureBinding);
        if (depthStencil) {
          const oldRenderbufferBinding = gl.getParameter(gl.RENDERBUFFER_BINDING);
          {
            gl.bindRenderbuffer(gl.RENDERBUFFER, depthStencil);
            gl.renderbufferStorage(gl.RENDERBUFFER, dsConfig.format, cfg.framebufferWidth, cfg.framebufferHeight);
          }
          gl.bindRenderbuffer(gl.RENDERBUFFER, oldRenderbufferBinding);
        }
      };
      if (config.depth || config.stencil) {
        if (config.depth && config.stencil) {
          dsConfig = {
            format: gl.DEPTH_STENCIL,
            attachment: gl.DEPTH_STENCIL_ATTACHMENT
          };
        } else if (config.depth) {
          dsConfig = {
            format: gl.DEPTH_COMPONENT16,
            attachment: gl.DEPTH_ATTACHMENT
          };
        } else if (config.stencil) {
          dsConfig = {
            format: gl.STENCIL_INDEX8,
            attachment: gl.STENCIL_ATTACHMENT
          };
        }
        depthStencil = gl.createRenderbuffer();
      }
      allocateFramebufferAttachments();
      cfg.addEventListener("on-config-changed", allocateFramebufferAttachments);
      const oldFramebufferBinding = gl.getParameter(gl.FRAMEBUFFER_BINDING);
      {
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        if (config.depth || config.stencil) {
          gl.framebufferRenderbuffer(gl.FRAMEBUFFER, dsConfig.attachment, gl.RENDERBUFFER, depthStencil);
        }
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, oldFramebufferBinding);
      const program = gl.createProgram();
      const vs = gl.createShader(gl.VERTEX_SHADER);
      gl.attachShader(program, vs);
      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      gl.attachShader(program, fs);
      {
        const vsSource = `
       attribute vec2 a_position;
       varying vec2 v_texcoord;
       void main() {
         gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
         v_texcoord = a_position;
       }
     `;
        gl.shaderSource(vs, vsSource);
        gl.compileShader(vs);
        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
          console.warn(gl.getShaderInfoLog(vs));
      }
      let lastGeneratedFSSource;
      let a_location;
      let u_viewType;
      const recompileProgram = () => {
        const fsSource = Shader(cfg);
        if (fsSource === lastGeneratedFSSource)
          return;
        lastGeneratedFSSource = fsSource;
        gl.shaderSource(fs, fsSource);
        gl.compileShader(fs);
        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
          console.warn(gl.getShaderInfoLog(fs));
          return;
        }
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.warn(gl.getProgramInfoLog(program));
          return;
        }
        a_location = gl.getAttribLocation(program, "a_position");
        u_viewType = gl.getUniformLocation(program, "u_viewType");
        const u_texture = gl.getUniformLocation(program, "u_texture");
        const oldProgram = gl.getParameter(gl.CURRENT_PROGRAM);
        {
          gl.useProgram(program);
          gl.uniform1i(u_texture, 0);
        }
        gl.useProgram(oldProgram);
      };
      cfg.addEventListener("on-config-changed", recompileProgram);
      const vao = OES_VAO ? OES_VAO.createVertexArrayOES() : gl.createVertexArray();
      const vbo = gl.createBuffer();
      const oldBufferBinding = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
      const oldVAO = gl.getParameter(GL_VERTEX_ARRAY_BINDING);
      {
        glBindVertexArray(vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(a_location);
        gl.vertexAttribPointer(a_location, 2, gl.FLOAT, false, 0, 0);
      }
      glBindVertexArray(oldVAO);
      gl.bindBuffer(gl.ARRAY_BUFFER, oldBufferBinding);
      const clearFramebuffer = () => {
        console.assert(this[PRIVATE].LookingGlassEnabled);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        const currentClearColor = gl.getParameter(gl.COLOR_CLEAR_VALUE);
        const currentClearDepth = gl.getParameter(gl.DEPTH_CLEAR_VALUE);
        const currentClearStencil = gl.getParameter(gl.STENCIL_CLEAR_VALUE);
        gl.clearColor(0, 0, 0, 0);
        gl.clearDepth(1);
        gl.clearStencil(0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        gl.clearColor(currentClearColor[0], currentClearColor[1], currentClearColor[2], currentClearColor[3]);
        gl.clearDepth(currentClearDepth);
        gl.clearStencil(currentClearStencil);
      };
      const appCanvas = gl.canvas;
      let origWidth, origHeight;
      const blitTextureToDefaultFramebufferIfNeeded = () => {
        if (!this[PRIVATE].LookingGlassEnabled)
          return;
        if (appCanvas.width !== cfg.calibration.screenW.value || appCanvas.height !== cfg.calibration.screenH.value) {
          origWidth = appCanvas.width;
          origHeight = appCanvas.height;
          appCanvas.width = cfg.calibration.screenW.value;
          appCanvas.height = cfg.calibration.screenH.value;
        }
        const oldVAO2 = gl.getParameter(GL_VERTEX_ARRAY_BINDING);
        const oldCullFace = gl.getParameter(gl.CULL_FACE);
        const oldBlend = gl.getParameter(gl.BLEND);
        const oldDepthTest = gl.getParameter(gl.DEPTH_TEST);
        const oldStencilTest = gl.getParameter(gl.STENCIL_TEST);
        const oldScissorTest = gl.getParameter(gl.SCISSOR_TEST);
        const oldViewport = gl.getParameter(gl.VIEWPORT);
        const oldFramebufferBinding2 = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        const oldRenderbufferBinding = gl.getParameter(gl.RENDERBUFFER_BINDING);
        const oldProgram = gl.getParameter(gl.CURRENT_PROGRAM);
        const oldActiveTexture = gl.getParameter(gl.ACTIVE_TEXTURE);
        {
          const oldTextureBinding = gl.getParameter(gl.TEXTURE_BINDING_2D);
          {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.useProgram(program);
            glBindVertexArray(vao);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.disable(gl.BLEND);
            gl.disable(gl.CULL_FACE);
            gl.disable(gl.DEPTH_TEST);
            gl.disable(gl.STENCIL_TEST);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.uniform1i(u_viewType, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            lkgCtx == null ? void 0 : lkgCtx.clearRect(0, 0, lkgCanvas.width, lkgCanvas.height);
            lkgCtx == null ? void 0 : lkgCtx.drawImage(appCanvas, 0, 0);
            if (cfg.inlineView !== 0) {
              gl.uniform1i(u_viewType, cfg.inlineView);
              gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
          }
          gl.bindTexture(gl.TEXTURE_2D, oldTextureBinding);
        }
        gl.activeTexture(oldActiveTexture);
        gl.useProgram(oldProgram);
        gl.bindRenderbuffer(gl.RENDERBUFFER, oldRenderbufferBinding);
        gl.bindFramebuffer(gl.FRAMEBUFFER, oldFramebufferBinding2);
        gl.viewport(...oldViewport);
        (oldScissorTest ? glEnable : glDisable)(gl.SCISSOR_TEST);
        (oldStencilTest ? glEnable : glDisable)(gl.STENCIL_TEST);
        (oldDepthTest ? glEnable : glDisable)(gl.DEPTH_TEST);
        (oldBlend ? glEnable : glDisable)(gl.BLEND);
        (oldCullFace ? glEnable : glDisable)(gl.CULL_FACE);
        glBindVertexArray(oldVAO2);
      };
      let popup;
      window.addEventListener("unload", () => {
        if (popup)
          popup.close();
        popup = void 0;
      });
      const moveCanvasToWindow = (enabled, onbeforeunload) => {
        var _a;
        if (!!popup == enabled)
          return;
        if (enabled) {
          recompileProgram();
          lkgCanvas.style.position = "fixed";
          lkgCanvas.style.top = "0";
          lkgCanvas.style.left = "0";
          lkgCanvas.style.width = "100%";
          lkgCanvas.style.height = "100%";
          lkgCanvas.width = cfg.calibration.screenW.value;
          lkgCanvas.height = cfg.calibration.screenH.value;
          document.body.appendChild(controls);
          const screenPlacement = "getScreenDetails" in window;
          if (screenPlacement) {
            this.placeWindow(popup, lkgCanvas, cfg);
          } else {
            popup = window.open("", void 0, "width=640,height=360");
            popup.document.title = "Looking Glass Window (fullscreen me on Looking Glass!)";
            popup.document.body.style.background = "black";
            popup.document.body.appendChild(lkgCanvas);
            console.assert(onbeforeunload);
            popup.onbeforeunload = onbeforeunload;
          }
        } else {
          (_a = controls.parentElement) == null ? void 0 : _a.removeChild(controls);
          appCanvas.width = origWidth;
          appCanvas.height = origHeight;
          popup.onbeforeunload = void 0;
          popup.close();
          popup = void 0;
        }
      };
      this[PRIVATE] = {
        LookingGlassEnabled: false,
        framebuffer,
        clearFramebuffer,
        blitTextureToDefaultFramebufferIfNeeded,
        moveCanvasToWindow
      };
    }
    async placeWindow(popup, lkgCanvas, config) {
      const screenDetails = await window.getScreenDetails();
      console.log(screenDetails, "cached screen details");
      const LKG = screenDetails.screens.filter((screen2) => screen2.label.includes("LKG"))[0];
      console.log(LKG);
      console.log("monitor ID", LKG.label, "serial number", config._calibration.serial);
      const features = [
        `left=${LKG.left}`,
        `top=${LKG.top}`,
        `width=${LKG.width}`,
        `height=${LKG.height}`,
        `menubar=no`,
        `toolbar=no`,
        `location=no`,
        `status=no`,
        `resizable=yes`,
        `scrollbars=no`,
        `fullscreenEnabled=true`
      ].join(",");
      popup = window.open("", "new", features);
      config._calibration.slope = popup.document.body.height / (LKG.width * config._calibration.slope) * config._calibration.flipImageX;
      console.log(popup);
      popup.document.body.style.background = "black";
      popup.document.body.appendChild(lkgCanvas);
      await lkgCanvas.requestFullscreen();
    }
    get framebuffer() {
      return this[PRIVATE].LookingGlassEnabled ? this[PRIVATE].framebuffer : null;
    }
    get framebufferWidth() {
      return getLookingGlassConfig().framebufferWidth;
    }
    get framebufferHeight() {
      return getLookingGlassConfig().framebufferHeight;
    }
  }
  class LookingGlassXRDevice extends XRDevice {
    constructor(global2) {
      super(global2);
      this.sessions = /* @__PURE__ */ new Map();
      this.viewSpaces = [];
      this.basePoseMatrix = create();
      this.inlineProjectionMatrix = create();
      this.inlineInverseViewMatrix = create();
      this.LookingGlassProjectionMatrices = [];
      this.LookingGlassInverseViewMatrices = [];
    }
    onBaseLayerSet(sessionId, layer) {
      const session = this.sessions.get(sessionId);
      session.baseLayer = layer;
      const baseLayerPrivate = layer[PRIVATE];
      baseLayerPrivate.LookingGlassEnabled = session.immersive;
      if (session.immersive) {
        baseLayerPrivate.moveCanvasToWindow(true, () => {
          this.endSession(sessionId);
        });
      }
    }
    isSessionSupported(mode) {
      return mode === "inline" || mode === "immersive-vr";
    }
    isFeatureSupported(featureDescriptor) {
      switch (featureDescriptor) {
        case "viewer":
          return true;
        case "local":
          return true;
        case "local-floor":
          return true;
        case "bounded-floor":
          return false;
        case "unbounded":
          return false;
        default:
          console.warn("LookingGlassXRDevice.isFeatureSupported: feature not understood:", featureDescriptor);
          return false;
      }
    }
    async requestSession(mode, enabledFeatures) {
      if (!this.isSessionSupported(mode)) {
        return Promise.reject();
      }
      const immersive = mode !== "inline";
      const session = new Session(mode, enabledFeatures);
      this.sessions.set(session.id, session);
      if (immersive) {
        this.dispatchEvent("@@webxr-polyfill/vr-present-start", session.id);
      }
      return Promise.resolve(session.id);
    }
    requestAnimationFrame(callback) {
      return this.global.requestAnimationFrame(callback);
    }
    cancelAnimationFrame(handle) {
      this.global.cancelAnimationFrame(handle);
    }
    onFrameStart(sessionId, renderState) {
      const session = this.sessions.get(sessionId);
      const cfg = getLookingGlassConfig();
      if (session.immersive) {
        const tanHalfFovy = Math.tan(0.5 * cfg.fovy);
        const focalDistance = 0.5 * cfg.targetDiam / tanHalfFovy;
        const clipPlaneBias = focalDistance - cfg.targetDiam;
        const mPose = this.basePoseMatrix;
        fromTranslation(mPose, [cfg.targetX, cfg.targetY, cfg.targetZ]);
        rotate(mPose, mPose, cfg.trackballX, [0, 1, 0]);
        rotate(mPose, mPose, -cfg.trackballY, [1, 0, 0]);
        translate(mPose, mPose, [0, 0, focalDistance]);
        for (let i = 0; i < cfg.numViews; ++i) {
          const fractionAlongViewCone = (i + 0.5) / cfg.numViews - 0.5;
          const tanAngleToThisCamera = Math.tan(cfg.viewCone * fractionAlongViewCone);
          const offsetAlongBaseline = focalDistance * tanAngleToThisCamera;
          const mView = this.LookingGlassInverseViewMatrices[i] = this.LookingGlassInverseViewMatrices[i] || create();
          translate(mView, mPose, [offsetAlongBaseline, 0, 0]);
          invert(mView, mView);
          const n = Math.max(clipPlaneBias + renderState.depthNear, 0.01);
          const f = clipPlaneBias + renderState.depthFar;
          const halfYRange = n * tanHalfFovy;
          const t = halfYRange, b = -halfYRange;
          const midpointX = n * -tanAngleToThisCamera;
          const halfXRange = cfg.aspect * halfYRange;
          const r = midpointX + halfXRange, l = midpointX - halfXRange;
          const mProj = this.LookingGlassProjectionMatrices[i] = this.LookingGlassProjectionMatrices[i] || create();
          set(mProj, 2 * n / (r - l), 0, 0, 0, 0, 2 * n / (t - b), 0, 0, (r + l) / (r - l), (t + b) / (t - b), -(f + n) / (f - n), -1, 0, 0, -2 * f * n / (f - n), 0);
        }
        const baseLayerPrivate = session.baseLayer[PRIVATE];
        baseLayerPrivate.clearFramebuffer();
      } else {
        const gl = session.baseLayer.context;
        const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
        perspective(this.inlineProjectionMatrix, renderState.inlineVerticalFieldOfView, aspect, renderState.depthNear, renderState.depthFar);
        fromTranslation(this.basePoseMatrix, [0, DefaultEyeHeight, 0]);
        invert(this.inlineInverseViewMatrix, this.basePoseMatrix);
      }
    }
    onFrameEnd(sessionId) {
      const session = this.sessions.get(sessionId);
      session.baseLayer[PRIVATE].blitTextureToDefaultFramebufferIfNeeded();
    }
    async requestFrameOfReferenceTransform(type, options) {
      const matrix = create();
      switch (type) {
        case "viewer":
        case "local":
          fromTranslation(matrix, [0, -DefaultEyeHeight, 0]);
          return matrix;
        case "local-floor":
          return matrix;
        default:
          throw new Error("XRReferenceSpaceType not understood");
      }
    }
    endSession(sessionId) {
      const session = this.sessions.get(sessionId);
      if (session.immersive && session.baseLayer) {
        session.baseLayer[PRIVATE].moveCanvasToWindow(false);
        this.dispatchEvent("@@webxr-polyfill/vr-present-end", sessionId);
      }
      session.ended = true;
    }
    doesSessionSupportReferenceSpace(sessionId, type) {
      const session = this.sessions.get(sessionId);
      if (session.ended) {
        return false;
      }
      return session.enabledFeatures.has(type);
    }
    getViewSpaces(mode) {
      if (mode === "immersive-vr") {
        const cfg = getLookingGlassConfig();
        for (let i = this.viewSpaces.length; i < cfg.numViews; ++i) {
          this.viewSpaces[i] = new LookingGlassXRSpace(i);
        }
        this.viewSpaces.length = cfg.numViews;
        return this.viewSpaces;
      }
      return void 0;
    }
    getViewport(sessionId, eye, layer, target, viewIndex) {
      if (viewIndex === void 0) {
        const session = this.sessions.get(sessionId);
        const gl = session.baseLayer.context;
        target.x = 0;
        target.y = 0;
        target.width = gl.drawingBufferWidth;
        target.height = gl.drawingBufferHeight;
      } else {
        const cfg = getLookingGlassConfig();
        const col = viewIndex % cfg.quiltWidth;
        const row = Math.floor(viewIndex / cfg.quiltWidth);
        target.x = cfg.tileWidth * col;
        target.y = cfg.tileHeight * row;
        target.width = cfg.tileWidth;
        target.height = cfg.tileHeight;
      }
      return true;
    }
    getProjectionMatrix(eye, viewIndex) {
      if (viewIndex === void 0) {
        return this.inlineProjectionMatrix;
      }
      return this.LookingGlassProjectionMatrices[viewIndex] || create();
    }
    getBasePoseMatrix() {
      return this.basePoseMatrix;
    }
    getBaseViewMatrix() {
      return this.inlineInverseViewMatrix;
    }
    _getViewMatrixByIndex(viewIndex) {
      return this.LookingGlassInverseViewMatrices[viewIndex] = this.LookingGlassInverseViewMatrices[viewIndex] || create();
    }
    getInputSources() {
      return [];
    }
    getInputPose(inputSource, coordinateSystem, poseType) {
      return null;
    }
    onWindowResize() {
    }
  }
  let SESSION_ID = 0;
  class Session {
    constructor(mode, enabledFeatures) {
      __publicField(this, "mode");
      __publicField(this, "immersive");
      __publicField(this, "id");
      __publicField(this, "baseLayer");
      __publicField(this, "inlineVerticalFieldOfView");
      __publicField(this, "ended");
      __publicField(this, "enabledFeatures");
      this.mode = mode;
      this.immersive = mode === "immersive-vr" || mode === "immersive-ar";
      this.id = ++SESSION_ID;
      this.baseLayer = null;
      this.inlineVerticalFieldOfView = Math.PI * 0.5;
      this.ended = false;
      this.enabledFeatures = enabledFeatures;
    }
  }
  class LookingGlassXRSpace extends XRSpace {
    constructor(viewIndex) {
      super();
      __publicField(this, "viewIndex");
      this.viewIndex = viewIndex;
    }
    get eye() {
      return "none";
    }
    _onPoseUpdate(device) {
      this._inverseBaseMatrix = device._getViewMatrixByIndex(this.viewIndex);
    }
  }
  class LookingGlassWebXRPolyfill extends WebXRPolyfill {
    constructor(cfg) {
      super();
      __publicField(this, "vrButton");
      __publicField(this, "device");
      __publicField(this, "isPresenting", false);
      updateLookingGlassConfig(cfg);
      this.loadPolyfill();
    }
    static async init(cfg) {
      const success = await LookingGlassWebXRPolyfill.detectLookingGlassDevice();
      if (success) {
        new LookingGlassWebXRPolyfill(cfg);
      }
    }
    static async detectLookingGlassDevice() {
      return new Promise((resolve) => {
        new Client(async (msg) => {
          console.log(msg, "message from core");
          if (msg.devices.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    }
    async loadPolyfill() {
      this.overrideDefaultVRButton();
      console.warn('Looking Glass WebXR "polyfill" overriding native WebXR API.');
      for (const className in API) {
        this.global[className] = API[className];
      }
      this.global.XRWebGLLayer = LookingGlassXRWebGLLayer;
      this.injected = true;
      this.device = new LookingGlassXRDevice(this.global);
      this.xr = new XRSystem(Promise.resolve(this.device));
      Object.defineProperty(this.global.navigator, "xr", {
        value: this.xr,
        configurable: true
      });
    }
    async overrideDefaultVRButton() {
      this.vrButton = await waitForElement("VRButton");
      if (this.vrButton && this.device) {
        this.device.addEventListener("@@webxr-polyfill/vr-present-start", () => {
          this.isPresenting = true;
          this.updateVRButtonUI();
        });
        this.device.addEventListener("@@webxr-polyfill/vr-present-end", () => {
          this.isPresenting = false;
          this.updateVRButtonUI();
        });
        this.vrButton.addEventListener("click", (ev) => {
          this.updateVRButtonUI();
        });
        this.updateVRButtonUI();
      }
    }
    async updateVRButtonUI() {
      if (this.vrButton) {
        await delay(100);
        if (this.isPresenting) {
          this.vrButton.innerHTML = "EXIT LOOKING GLASS";
        } else {
          this.vrButton.innerHTML = "ENTER LOOKING GLASS";
        }
        const width = 220;
        this.vrButton.style.width = `${width}px`;
        this.vrButton.style.left = `calc(50% - ${width / 2}px)`;
      }
    }
    update(cfg) {
      updateLookingGlassConfig(cfg);
    }
  }
  async function waitForElement(id) {
    return new Promise((resolve, reject) => {
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          mutation.addedNodes.forEach(function(node) {
            const el = node;
            if (el.id == id) {
              resolve(el);
              observer.disconnect();
            }
          });
        });
      });
      observer.observe(document.body, { subtree: false, childList: true });
      setTimeout(() => {
        observer.disconnect();
        reject(`id:${id} not found`);
      }, 5e3);
    });
  }
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const LookingGlassConfig = getLookingGlassConfig();
  exports2.LookingGlassConfig = LookingGlassConfig;
  exports2.LookingGlassWebXRPolyfill = LookingGlassWebXRPolyfill;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
