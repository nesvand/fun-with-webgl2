// Assets
import './assets/app.css';

// Libs
import GLInstance from './lib/gl';
import { Shader, } from './lib/Shader';
import RenderLoop from './lib/RenderLoop';
import Model from './lib/Model';
import { GridAxis, } from './lib/Primatives';

// Shaders
import vertexShaderText from './shaders/vertex_shader.glsl';
import fragmentShaderText from './shaders/fragment_shader.glsl';

window.addEventListener('load', () => {
  // Global Context
  let gl: ExtendedWebGLContextLike;

  // Render Loop
  let gRLoop: RenderLoop;

  // Global Variables
  let gVertCount = 0;
  let gShader: TestShader | null = null;
  let gModel: Model | null = null;
  // let aVerts: Float32Array;
  // let gBuffer: WebGLBuffer;
  let uPointSizeLoc: WebGLUniformLocation | null = -1;
  let uAngle: WebGLUniformLocation | null = 0;

  // Animation globals
  let gPointSize = 0;
  let gPointSizeStep = 3;
  let gAngle = 0;
  let gAngleStep = (Math.PI / 180) * 90; // 90 degrees in Radians

  // Get our extended GL Context Object
  gl = GLInstance('glcanvas');
  if (gl) {
    gl.fSetSize(500, 500)
      .fClear();

    // SHADER STEPS
    gShader = new TestShader(gl, [0.8, 0.8, 0.8, 1, 0, 0, 0, 1, 0, 0, 0, 1,]);

    // DATA BUFFER
    // const mesh = gl.fCreateMeshVAO('lines', null, [0, 1, 0, 0, -1, 0, -1, 0, 0, 1, 0, 0]);
    // mesh.drawMode = gl.LINES;

    // gModel = new Model(mesh);
    gModel = new Model(GridAxis.createMesh(gl));

    // Set up for drawing
    gRLoop = new RenderLoop(onRender).start();
  }

  function onRender (dt: number) {
    if (gl) {
      gl.fClear();

      if (gShader && gModel) {
        gShader
          .activate()
          .renderModel(gModel);
      }
    }
  }
});

class TestShader extends Shader {
  constructor (gl: ExtendedWebGLContext, colorArray: number[]) {
    super(gl, vertexShaderText, fragmentShaderText);

    const uColor: WebGLUniformLocation | null = gl.getUniformLocation(this.program, 'uColor');
    gl.uniform3fv(uColor, colorArray);

    gl.useProgram(null);
  }
}
