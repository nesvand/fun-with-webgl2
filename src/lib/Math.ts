import { MixedFloat32Array } from "./webgl2-types";

//###########################################################################################
export class Vector3 {
	coords: [number, number, number];

	constructor(x = 0.0, y = 0.0, z = 0.0) {
		this.coords = [x, y, z];
	}

	get x() {
		return this.coords[0];
	}

	set x(value: number) {
		this.coords[0] = value;
	}

	get y() {
		return this.coords[1];
	}

	set y(value: number) {
		this.coords[1] = value;
	}

	get z() {
		return this.coords[2];
	}

	set z(value: number) {
		this.coords[2] = value;
	}

	magnitude(v?: { x: number; y: number }) {
		// Only get the magnitude of this vector
		if (v === undefined) {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		}

		// Get magnitude based on another vector
		const x = v.x - this.x;
		const y = v.y - this.y;
		const z = v.y - this.z;

		return Math.sqrt(x * x + y * y + z * z);
	}

	normalize() {
		const mag = this.magnitude();

		this.coords[0] /= mag;
		this.coords[1] /= mag;
		this.coords[2] /= mag;

		return this;
	}

	set(x: number, y: number, z: number) {
		this.coords[0] = x;
		this.coords[1] = y;
		this.coords[2] = z;

		return this;
	}

	multiScalar(v: number) {
		this.coords[0] *= v;
		this.coords[1] *= v;
		this.coords[2] *= v;

		return this;
	}

	clone() {
		return new Vector3(this.x, this.y, this.z);
	}
}

//###########################################################################################
export class Matrix4 {
	raw: Float32Array;

	constructor() {
		this.raw = Matrix4.identity();
	}

	//....................................................................
	// Transformations Methods
	vtranslate(v: { x: number; y: number; z: number }) {
		Matrix4.translate(this.raw, v.x, v.y, v.z);

		return this;
	}

	translate(x: number, y: number, z: number) {
		Matrix4.translate(this.raw, x, y, z);

		return this;
	}

	rotateY(rad: number) {
		Matrix4.rotateY(this.raw, rad);

		return this;
	}

	rotateX(rad: number) {
		Matrix4.rotateX(this.raw, rad);

		return this;
	}

	rotateZ(rad: number) {
		Matrix4.rotateZ(this.raw, rad);

		return this;
	}

	vscale(vec3: { x: number; y: number; z: number }) {
		Matrix4.scale(this.raw, vec3.x, vec3.y, vec3.z);

		return this;
	}

	scale(x: number, y: number, z: number) {
		Matrix4.scale(this.raw, x, y, z);

		return this;
	}

	invert() {
		Matrix4.invert(this.raw);

		return this;
	}

	//....................................................................
	// Methods
	// Bring us back to identity without changing the transform values.
	resetRotation() {
		for (let i = 0; i < this.raw.length; i++) {
			if (i >= 12 && i <= 14) continue;
			this.raw[i] = i % 5 === 0 ? 1 : 0; //only positions 0,5,10,15 need to be 1 else 0.
		}

		return this;
	}

	// Reset data back to identity.
	reset() {
		for (let i = 0; i < this.raw.length; i++) {
			this.raw[i] = i % 5 === 0 ? 1 : 0; // Only positions 0, 5, 10, 15 need to be 1 else 0
		}

		return this;
	}

	//....................................................................
	// Static Data Methods
	static identity() {
		const a = new Float32Array(16);

		a[0] = a[5] = a[10] = a[15] = 1;

		return a;
	}

	// From glMatrix
	static perspective(
		out: MixedFloat32Array,
		fovy: number,
		aspect: number,
		near: number,
		far: number,
	) {
		const f = 1.0 / Math.tan(fovy / 2);
		const nf = 1 / (near - far);

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
		out[10] = (far + near) * nf;
		out[11] = -1;
		out[12] = 0;
		out[13] = 0;
		out[14] = 2 * far * near * nf;
		out[15] = 0;
	}

	static ortho(
		out: number[],
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number,
	) {
		const lr = 1 / (left - right);
		const bt = 1 / (bottom - top);
		const nf = 1 / (near - far);

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
	}

	// https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js
	// Make the rows into the columns
	static transpose(out: number[], a: number[]) {
		//If we are transposing ourselves we can skip a few steps but have to cache some values
		if (out === a) {
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			const a01 = a[1]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			const a02 = a[2]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			const a03 = a[3]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			const a12 = a[6]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			const a13 = a[7]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			const a23 = a[11]!;

			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[1] = a[4]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[2] = a[8]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[3] = a[12]!;
			out[4] = a01;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[6] = a[9]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[7] = a[13]!;
			out[8] = a02;
			out[9] = a12;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[11] = a[14]!;
			out[12] = a03;
			out[13] = a13;
			out[14] = a23;
		} else {
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[0] = a[0]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[1] = a[4]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[2] = a[8]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[3] = a[12]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[4] = a[1]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[5] = a[5]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[6] = a[9]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[7] = a[13]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[8] = a[2]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[9] = a[6]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[10] = a[10]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[11] = a[14]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[12] = a[3]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[13] = a[7]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[14] = a[11]!;
			// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
			out[15] = a[15]!;
		}

		return out;
	}

	//Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
	static normalMat3(out: Float32Array, a: Float32Array) {
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a00 = a[0]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a01 = a[1]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a02 = a[2]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a03 = a[3]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a10 = a[4]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a11 = a[5]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a12 = a[6]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a13 = a[7]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a20 = a[8]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a21 = a[9]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a22 = a[10]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a23 = a[11]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a30 = a[12]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a31 = a[13]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a32 = a[14]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a33 = a[15]!;

		const b00 = a00 * a11 - a01 * a10;
		const b01 = a00 * a12 - a02 * a10;
		const b02 = a00 * a13 - a03 * a10;
		const b03 = a01 * a12 - a02 * a11;
		const b04 = a01 * a13 - a03 * a11;
		const b05 = a02 * a13 - a03 * a12;
		const b06 = a20 * a31 - a21 * a30;
		const b07 = a20 * a32 - a22 * a30;
		const b08 = a20 * a33 - a23 * a30;
		const b09 = a21 * a32 - a22 * a31;
		const b10 = a21 * a33 - a23 * a31;
		const b11 = a22 * a33 - a23 * a32;

		// Calculate the determinant
		let det =
			b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

		if (!det) {
			return null;
		}

		det = 1.0 / det;

		out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
		out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
		out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

		out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
		out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
		out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

		out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
		out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
		out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

		return out;
	}

	//....................................................................
	// Static Operation

	// https://github.com/gregtatum/mdn-model-view-projection/blob/master/shared/matrices.js
	static multiplyVector(mat4: number[], v: number[]) {
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 4 elements
		const x = v[0]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 4 elements
		const y = v[1]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 4 elements
		const z = v[2]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 4 elements
		const w = v[3]!;

		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c1r1 = mat4[0]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c2r1 = mat4[1]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c3r1 = mat4[2]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c4r1 = mat4[3]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c1r2 = mat4[4]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c2r2 = mat4[5]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c3r2 = mat4[6]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c4r2 = mat4[7]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c1r3 = mat4[8]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c2r3 = mat4[9]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c3r3 = mat4[10]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c4r3 = mat4[11]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c1r4 = mat4[12]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c2r4 = mat4[13]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c3r4 = mat4[14]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const c4r4 = mat4[15]!;

		return [
			x * c1r1 + y * c1r2 + z * c1r3 + w * c1r4,
			x * c2r1 + y * c2r2 + z * c2r3 + w * c2r4,
			x * c3r1 + y * c3r2 + z * c3r3 + w * c3r4,
			x * c4r1 + y * c4r2 + z * c4r3 + w * c4r4,
		];
	}

	//https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/vec4.js, vec4.transformMat4
	static transformVec4(
		out: Float32Array,
		v: [number, number, number, number],
		m: Float32Array,
	) {
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are always set
		out[0] = m[0]! * v[0] + m[4]! * v[1] + m[8]! * v[2] + m[12]! * v[3];
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are always set
		out[1] = m[1]! * v[0] + m[5]! * v[1] + m[9]! * v[2] + m[13]! * v[3];
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are always set
		out[2] = m[2]! * v[0] + m[6]! * v[1] + m[10]! * v[2] + m[14]! * v[3];
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are always set
		out[3] = m[3]! * v[0] + m[7]! * v[1] + m[11]! * v[2] + m[15]! * v[3];

		return out;
	}

	// From glMatrix
	// Multiply two mat4 together
	static mult(
		out: MixedFloat32Array,
		a: MixedFloat32Array,
		b: MixedFloat32Array,
	) {
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a00 = a[0]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a01 = a[1]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a02 = a[2]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a03 = a[3]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a10 = a[4]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a11 = a[5]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a12 = a[6]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a13 = a[7]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a20 = a[8]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a21 = a[9]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a22 = a[10]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a23 = a[11]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a30 = a[12]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a31 = a[13]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a32 = a[14]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		const a33 = a[15]!;

		// Cache only the current line of the second matrix
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		let b0 = b[0]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		let b1 = b[1]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		let b2 = b[2]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		let b3 = b[3]!;

		out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b0 = b[4]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b1 = b[5]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b2 = b[6]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b3 = b[7]!;

		out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b0 = b[8]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b1 = b[9]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b2 = b[10]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b3 = b[11]!;

		out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b0 = b[12]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b1 = b[13]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b2 = b[14]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume to be always using arrays with 16 elements
		b3 = b[15]!;

		out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		return out;
	}

	//....................................................................
	// Static Transformation
	static scale(out: Float32Array, x: number, y: number, z: number) {
		out[0] *= x;
		out[1] *= x;
		out[2] *= x;
		out[3] *= x;
		out[4] *= y;
		out[5] *= y;
		out[6] *= y;
		out[7] *= y;
		out[8] *= z;
		out[9] *= z;
		out[10] *= z;
		out[11] *= z;

		return out;
	}

	static rotateY(out: Float32Array, rad: number) {
		const s = Math.sin(rad);
		const c = Math.cos(rad);

		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a00 = out[0]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a01 = out[1]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a02 = out[2]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a03 = out[3]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a20 = out[8]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a21 = out[9]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a22 = out[10]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a23 = out[11]!;

		// Perform axis-specific matrix multiplication
		out[0] = a00 * c - a20 * s;
		out[1] = a01 * c - a21 * s;
		out[2] = a02 * c - a22 * s;
		out[3] = a03 * c - a23 * s;
		out[8] = a00 * s + a20 * c;
		out[9] = a01 * s + a21 * c;
		out[10] = a02 * s + a22 * c;
		out[11] = a03 * s + a23 * c;

		return out;
	}

	static rotateX(out: Float32Array, rad: number) {
		const s = Math.sin(rad);
		const c = Math.cos(rad);

		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a10 = out[4]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a11 = out[5]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a12 = out[6]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a13 = out[7]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a20 = out[8]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a21 = out[9]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a22 = out[10]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a23 = out[11]!;

		// Perform axis-specific matrix multiplication
		out[4] = a10 * c + a20 * s;
		out[5] = a11 * c + a21 * s;
		out[6] = a12 * c + a22 * s;
		out[7] = a13 * c + a23 * s;
		out[8] = a20 * c - a10 * s;
		out[9] = a21 * c - a11 * s;
		out[10] = a22 * c - a12 * s;
		out[11] = a23 * c - a13 * s;

		return out;
	}

	static rotateZ(out: Float32Array, rad: number) {
		const s = Math.sin(rad);
		const c = Math.cos(rad);

		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a00 = out[0]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a01 = out[1]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a02 = out[2]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a03 = out[3]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a10 = out[4]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a11 = out[5]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a12 = out[6]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a13 = out[7]!;

		// Perform axis-specific matrix multiplication
		out[0] = a00 * c + a10 * s;
		out[1] = a01 * c + a11 * s;
		out[2] = a02 * c + a12 * s;
		out[3] = a03 * c + a13 * s;
		out[4] = a10 * c - a00 * s;
		out[5] = a11 * c - a01 * s;
		out[6] = a12 * c - a02 * s;
		out[7] = a13 * c - a03 * s;

		return out;
	}

	static rotate(out: MixedFloat32Array, rad: number, axis: MixedFloat32Array) {
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		let x = axis[0]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		let y = axis[1]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		let z = axis[2]!;

		let len = Math.sqrt(x * x + y * y + z * z);

		if (Math.abs(len) < 0.000001) {
			return null;
		}

		len = 1 / len;
		x *= len;
		y *= len;
		z *= len;

		const s = Math.sin(rad);
		const c = Math.cos(rad);
		const t = 1 - c;

		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a00 = out[0]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a01 = out[1]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a02 = out[2]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a03 = out[3]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a10 = out[4]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a11 = out[5]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a12 = out[6]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a13 = out[7]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a20 = out[8]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a21 = out[9]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a22 = out[10]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are set
		const a23 = out[11]!;

		// Construct the elements of the rotation matrix
		const b00 = x * x * t + c;
		const b01 = y * x * t + z * s;
		const b02 = z * x * t - y * s;
		const b10 = x * y * t - z * s;
		const b11 = y * y * t + c;
		const b12 = z * y * t + x * s;
		const b20 = x * z * t + y * s;
		const b21 = y * z * t - x * s;
		const b22 = z * z * t + c;

		// Perform rotation-specific matrix multiplication
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
	}

	static invert(out: Float32Array, mat?: Float32Array) {
		let _mat = mat;
		// If the input isn't sent, then the output is considered the input
		if (typeof _mat === "undefined") {
			_mat = out;
		}

		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a00 = _mat[0]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a01 = _mat[1]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a02 = _mat[2]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a03 = _mat[3]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a10 = _mat[4]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a11 = _mat[5]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a12 = _mat[6]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a13 = _mat[7]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a20 = _mat[8]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a21 = _mat[9]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a22 = _mat[10]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a23 = _mat[11]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a30 = _mat[12]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a31 = _mat[13]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a32 = _mat[14]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		const a33 = _mat[15]!;
		const b00 = a00 * a11 - a01 * a10;
		const b01 = a00 * a12 - a02 * a10;
		const b02 = a00 * a13 - a03 * a10;
		const b03 = a01 * a12 - a02 * a11;
		const b04 = a01 * a13 - a03 * a11;
		const b05 = a02 * a13 - a03 * a12;
		const b06 = a20 * a31 - a21 * a30;
		const b07 = a20 * a32 - a22 * a30;
		const b08 = a20 * a33 - a23 * a30;
		const b09 = a21 * a32 - a22 * a31;
		const b10 = a21 * a33 - a23 * a31;
		const b11 = a22 * a33 - a23 * a32;

		// Calculate the determinant
		let det =
			b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

		if (!det) {
			return false;
		}

		det = 1.0 / det;

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

		return true;
	}

	// https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js  mat4.scalar.translate = function (out, a, v) {
	static translate(out: Float32Array, x: number, y: number, z: number) {
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		out[12] = out[0]! * x + out[4]! * y + out[8]! * z + out[12]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		out[13] = out[1]! * x + out[5]! * y + out[9]! * z + out[13]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		out[14] = out[2]! * x + out[6]! * y + out[10]! * z + out[14]!;
		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume we always have 16 elements
		out[15] = out[3]! * x + out[7]! * y + out[11]! * z + out[15]!;
	}
}
