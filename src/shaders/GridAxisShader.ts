import { Shader } from '../lib/Shader';
import vShader from './grid_axis_vshader.glsl';
import fShader from './grid_axis_fshader.glsl';

export default class GridAxisShader extends Shader {
  constructor (gl: ExtendedWebGLContext, projectionMatrix: MixedFloat32Array ) {
    super(gl, vShader, fShader );

    this.setPerspective(projectionMatrix );

    const uColor = gl.getUniformLocation(this.program, 'uColor' );
    gl.uniform3fv(uColor, [0.8, 0.8, 0.8, 1, 0, 0, 0, 1, 0, 0, 0, 1 ] ); // Gray, Red, Green, Blue

    gl.useProgram(null );
  }
}
