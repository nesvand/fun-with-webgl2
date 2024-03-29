import { Shader } from "../lib/Shader";
import fShader from "../shaders/grid_axis_fshader.glsl";
import vShader from "../shaders/grid_axis_vshader.glsl";
import type { ExtendedWebGLContext, MixedFloat32Array } from "./webgl2-types";

export class GridAxisShader extends Shader {
	constructor(gl: ExtendedWebGLContext, projectionMatrix: MixedFloat32Array) {
		super(gl, vShader, fShader);

		this.setPerspective(projectionMatrix);

		if (!this.program) throw Error("Shader program is not available.");

		const uColor = gl.getUniformLocation(this.program, "uColor");
		gl.uniform3fv(uColor, [0.8, 0.8, 0.8, 1, 0, 0, 0, 1, 0, 0, 0, 1]); // Gray, Red, Green, Blue

		gl.useProgram(null);
	}
}
