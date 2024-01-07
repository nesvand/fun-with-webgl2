import { Model } from "./Model";
import {
	ATTR_NORMAL_LOC,
	ATTR_NORMAL_NAME,
	ATTR_POSITION_LOC,
	ATTR_POSITION_NAME,
	ATTR_UV_LOC,
	ATTR_UV_NAME,
} from "./globals";
import type {
	AttribLocations,
	ExtendedWebGLContext,
	MixedFloat32Array,
	UniformLocations,
} from "./webgl2-types";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ShaderUtil {
	static createShader(gl: ExtendedWebGLContext, source: string, type: number) {
		const shader = gl.createShader(type);

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		// Handle errors if the shader fails to compile
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			const infoLog = gl.getShaderInfoLog(shader);

			gl.deleteShader(shader);

			throw Error(infoLog || `Error compiling shader : ${source}`);
		}

		if (!shader) {
			throw Error(`Shader returned as null: ${source}`);
		}

		return shader;
	}

	static createProgram(
		gl: ExtendedWebGLContext,
		vShader: WebGLShader,
		fShader: WebGLShader,
		doValidate: boolean,
	): WebGLProgram | null {
		// Link shaders together
		const prog = gl.createProgram();
		gl.attachShader(prog, vShader);
		gl.attachShader(prog, fShader);

		// Force predefined locations for specific attributes
		// If the attribute isn't used in the shader its location will default to -1
		gl.bindAttribLocation(prog, ATTR_POSITION_LOC, ATTR_POSITION_NAME);
		gl.bindAttribLocation(prog, ATTR_NORMAL_LOC, ATTR_NORMAL_NAME);
		gl.bindAttribLocation(prog, ATTR_UV_LOC, ATTR_UV_NAME);

		gl.linkProgram(prog);

		// Check if successful
		if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
			const infoLog = gl.getProgramInfoLog(prog);

			gl.deleteProgram(prog);

			throw Error(infoLog || "Error creating shader program.");
		}

		// Only do this for additional debugging
		if (doValidate) {
			gl.validateProgram(prog);
			if (!gl.getProgramParameter(prog, gl.VALIDATE_STATUS)) {
				const infoLog = gl.getProgramInfoLog(prog);

				gl.deleteProgram(prog);

				throw Error(infoLog || "Error validating program.");
			}
		}

		// Can delete the shaders since the program has been made
		gl.detachShader(prog, vShader);
		gl.detachShader(prog, fShader);
		gl.deleteShader(fShader);
		gl.deleteShader(vShader);

		return prog;
	}

	// ----------------------
	// HELPER FUNCTIONS
	// ----------------------
	static shaderProgram(
		gl: ExtendedWebGLContext,
		vShaderTxt: string,
		fShaderTxt: string,
		doValidate: boolean,
	): WebGLProgram | null {
		const vShader = ShaderUtil.createShader(gl, vShaderTxt, gl.VERTEX_SHADER);
		if (vShader === null) {
			gl.deleteShader(vShader);
			return null;
		}

		const fShader = ShaderUtil.createShader(gl, fShaderTxt, gl.FRAGMENT_SHADER);
		if (fShader === null) {
			gl.deleteShader(fShader);
			return null;
		}

		return ShaderUtil.createProgram(gl, vShader, fShader, doValidate);
	}

	// ----------------------
	// SETTERS / GETTERS
	// ----------------------

	static getStandardAttribLocations(
		gl: ExtendedWebGLContext,
		program: WebGLProgram,
	): AttribLocations {
		return {
			position: gl.getAttribLocation(program, ATTR_POSITION_NAME),
			norm: gl.getAttribLocation(program, ATTR_NORMAL_NAME),
			uv: gl.getAttribLocation(program, ATTR_UV_NAME),
		};
	}

	static getStandardUniformLocations(
		gl: ExtendedWebGLContext,
		program: WebGLProgram,
	): UniformLocations {
		return {
			perspective: gl.getUniformLocation(program, "uPMatrix"),
			modelMatrix: gl.getUniformLocation(program, "uMVMatrix"),
			cameraMatrix: gl.getUniformLocation(program, "uCameraMatrix"),
			mainTexture: gl.getUniformLocation(program, "uMainTex"),
		};
	}
}

export class Shader {
	program: WebGLProgram | null;
	gl: ExtendedWebGLContext;
	attribLoc: AttribLocations;
	uniformLoc: UniformLocations;

	constructor(
		gl: ExtendedWebGLContext,
		vertShaderSource: string,
		fragmentShaderSource: string,
	) {
		this.program = ShaderUtil.shaderProgram(
			gl,
			vertShaderSource,
			fragmentShaderSource,
			true,
		);

		if (this.program !== null) {
			this.gl = gl;
			gl.useProgram(this.program);
			this.attribLoc = ShaderUtil.getStandardAttribLocations(
				this.gl,
				this.program,
			);
			this.uniformLoc = ShaderUtil.getStandardUniformLocations(
				this.gl,
				this.program,
			);
		}
	}

	// --------------
	// METHODS
	activate() {
		this.gl.useProgram(this.program);
		return this;
	}

	deactivate() {
		this.gl.useProgram(null);
		return this;
	}

	setPerspective(matData: MixedFloat32Array) {
		this.gl.uniformMatrix4fv(this.uniformLoc.perspective, false, matData);

		return this;
	}

	setModelMatrix(matData: MixedFloat32Array) {
		this.gl.uniformMatrix4fv(this.uniformLoc.modelMatrix, false, matData);

		return this;
	}

	setCameraMatrix(matData: MixedFloat32Array) {
		this.gl.uniformMatrix4fv(this.uniformLoc.cameraMatrix, false, matData);

		return this;
	}

	dispose() {
		if (this.gl.getParameter(this.gl.CURRENT_PROGRAM) === this.program) {
			this.gl.useProgram(null);
		}

		this.gl.deleteProgram(this.program);
	}

	// --------------
	// RENDER METHODS
	// --------------

	preRender() {}

	renderModel(model: Model) {
		this.setModelMatrix(model.transform.getViewMatrix());
		this.gl.bindVertexArray(model.mesh.vao);

		if (model.mesh.noCulling) {
			this.gl.disable(this.gl.CULL_FACE);
		}

		if (model.mesh.doBlending) {
			this.gl.enable(this.gl.BLEND);
		}

		if (model.mesh.drawMode !== undefined) {
			if (model.mesh.indexCount) {
				this.gl.drawElements(
					model.mesh.drawMode,
					model.mesh.indexCount,
					this.gl.UNSIGNED_SHORT,
					0,
				);
			} else {
				if (model.mesh.vertexCount !== undefined) {
					this.gl.drawArrays(model.mesh.drawMode, 0, model.mesh.vertexCount);
					this.gl.bindVertexArray(null);
				} else {
					throw TypeError("[Shader][renderModel] model missing vertexCount");
				}
			}
		} else {
			throw TypeError("[Shader][renderModel] model missing drawMode");
		}

		if (model.mesh.noCulling) {
			this.gl.enable(this.gl.CULL_FACE);
		}

		if (model.mesh.doBlending) {
			this.gl.disable(this.gl.BLEND);
		}

		return this;
	}
}
