// Assets
import './assets/app.css';

// Libs
import GLInstance from './lib/gl';
import { Shader, } from './lib/Shader';
import RenderLoop from './lib/RenderLoop';
import Model from './lib/Model';
import { GridAxis, } from './lib/Primatives';
import { Vector3, Matrix4, } from './lib/Math';
import Transform from './lib/Transform';

// Shaders
import vertexShaderText from './shaders/vertex_shader.glsl';
import fragmentShaderText from './shaders/fragment_shader.glsl';

window.addEventListener('load', () => {
  // Global Context
  let gl: ExtendedWebGLContextLike;

  // Render Loop
  let gRLoop: RenderLoop;

  // Model
  let gModel: Model;

  // Global Variables
  let gShader: TestShader;

  gl = GLInstance('glcanvas');

  if (gl) {
    gl.fSetSize(500, 500)
      .fClear();

    gShader = new TestShader(gl, [0.8, 0.8, 0.8, 1, 0, 0, 0, 1, 0, 0, 0, 1,]);

    gModel = new Model(GridAxis.createMesh(gl))
      .setScale(0.4, 0.4, 0.4)
      .setRotation(0, 0, 45)
      .setPosition(0.8, 0.8, 0);

    gRLoop = new RenderLoop(onRender).start();
  }

  function onRender (dt: number) {
    if (gl) {
      gl.fClear();

      gShader
        .activate()
        .renderModel(gModel.preRender());
    }
  }
});

class TestShader extends Shader {
  constructor (gl: ExtendedWebGLContext, colorArray: number[]) {
    super(gl, vertexShaderText, fragmentShaderText);

    const uColor = gl.getUniformLocation(this.program, 'uColor');
    gl.uniform3fv(uColor, colorArray);

    gl.useProgram(null);
  }
}
