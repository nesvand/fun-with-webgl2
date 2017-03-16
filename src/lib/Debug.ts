import * as TRANSFORM from './Transform';
import * as GL from './gl';
import * as SHADER from './Shader';
import * as CAMERA from './Camera';

import debugVShader from '../shaders/debugVShader.glsl';
import debugFShader from '../shaders/debugFShader.glsl';

const {Transform} = TRANSFORM;
const {GLUtil} = GL;
const {ShaderUtil} = SHADER;

export class VertexDebugger {
	transform: TRANSFORM.Transform;
	gl: ExtendedWebGLContext;
	mColor: number[];
	mVerts: number[];
	mVertBuffer: WebGLBuffer;
	mVertCount: number;
	mVertexComponentLength: number;
	mPointSize: number;
	mShader: WebGLShader | null;
	mUniformColor: WebGLUniformLocation | null;
	mUniformProj: WebGLUniformLocation | null;
	mUniformCamera: WebGLUniformLocation | null;
	mUniformModelV: WebGLUniformLocation | null;
	mUniformPointSize: WebGLUniformLocation | null;
	mUniformCameraPos: WebGLUniformLocation | null;

	constructor (gl: ExtendedWebGLContext, pointSize: number) {
		this.transform = new Transform();
		this.gl = gl;
		this.mColor = [];
		this.mVerts = [];
		this.mVertBuffer = 0;
		this.mVertCount = 0;
		this.mVertexComponentLength = 4;
		this.mPointSize = pointSize;
	}

	addColor (...args: number[]) {
		const c = GLUtil.rgbArray(...args);
		if (c) {
			this.mColor.push(
				c[0],
				c[1],
				c[2],
			);
		}

		return this;
	}

	addPoint (x1: number, y1: number, z1: number, cIndex: number = 0) {
		this.mVerts.push(x1, y1, z1, cIndex);
		this.mVertCount = this.mVerts.length / this.mVertexComponentLength;

		return this;
	}

	addMeshPoints (cIndex: number, mesh: MeshVAO) {
		if (!mesh.aVert) return this;

		const len = mesh.aVert.length;
		for (let i = 0; i < len; i += 3) {
			this.mVerts.push(
				mesh.aVert[i],
				mesh.aVert[i + 1],
				mesh.aVert[i + 2],
				cIndex,
			)
		}

		this.mVertCount = this.mVerts.length / this.mVertexComponentLength;

		return this;
	}

	createShader () {
		this.mShader = ShaderUtil.shaderProgram(this.gl, debugVShader, debugFShader, true);
		this.mUniformColor = this.gl.getUniformLocation(this.mShader, 'uColorAry');
		this.mUniformProj = this.gl.getUniformLocation(this.mShader, 'uPMatrix');
		this.mUniformCamera = this.gl.getUniformLocation(this.mShader, 'uCameraMatrix');
		this.mUniformModelV = this.gl.getUniformLocation(this.mShader, 'uMVMatrix');
		this.mUniformPointSize = this.gl.getUniformLocation(this.mShader, 'uPointSize');
		this.mUniformCameraPos = this.gl.getUniformLocation(this.mShader, 'uCameraPos');

		this.gl.useProgram(this.mShader);
		this.gl.uniform3fv(this.mUniformColor, new Float32Array(this.mColor));
		this.gl.uniform1f(this.mUniformPointSize, this.mPointSize);
		this.gl.useProgram(null);
	}

	finalize () {
		this.mVertBuffer = this.gl.fCreateArrayBuffer(new Float32Array(this.mVerts), true);
		this.createShader();

		return this;
	}

	render (camera: CAMERA.Camera) {
		this.transform.updateMatrix();

		this.gl.useProgram(this.mShader);

		this.gl.uniformMatrix4fv(this.mUniformProj, false, camera.projectionMatrix);
		this.gl.uniformMatrix4fv(this.mUniformCamera, false, camera.viewMatrix);
		this.gl.uniformMatrix4fv(this.mUniformModelV, false, this.transform.getViewMatrix());
		this.gl.uniform3fv(this.mUniformCameraPos, new Float32Array(camera.transform.position.getArray()));

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mVertBuffer);
		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, this.mVertexComponentLength, this.gl.FLOAT, false, 0, 0);

		this.gl.drawArrays(this.gl.POINTS, 0, this.mVertCount);

		this.gl.disableVertexAttribArray(0);
		this.gl.useProgram(null);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	}
}

export default {
	VertexDebugger,
}
