// Assets
import './assets/app.css';

// Libs
import GLInstance from './lib/gl';
import { ShaderUtil, Shader } from './lib/Shader';
import RenderLoop from './lib/RenderLoop';
import Model from './lib/Model';

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
    gShader = new TestShader(gl);

    // DATA BUFFER
    const mesh = gl.fCreateMeshVAO('dots', null, [0, 0, 0, 0.1, 0.1, 0, 0.1, -0.1, 0, -0.1, -0.1, 0, -0.1, 0.1, 0]);
    mesh.drawMode = gl.POINTS;

    gModel = new Model(mesh);

    // Set up for drawing
    gRLoop = new RenderLoop(onRender).start();
  }

  function onRender(dt: number) {
    if (gl) {
      gPointSize += gPointSizeStep * dt;
      gAngle += gAngleStep * dt;

      let size = (Math.sin(gPointSize) * 10) + 30;

      gl.fClear();

      if (gShader && gModel) {
        gShader
          .activate()
          .set(size, gAngle)
          .renderModel(gModel);
      }
    }
  }
});

class TestShader extends Shader {
  uniformLoc: any;

  constructor(gl: ExtendedWebGLContext) {
    super(gl, vertexShaderText, fragmentShaderText);

    this.uniformLoc.uPointSize = gl.getUniformLocation(this.program, 'uPointSize');
    this.uniformLoc.uAngle = gl.getUniformLocation(this.program, 'uAngle');

    gl.useProgram(null);
  }

  set(size: number, angle: number): TestShader {
    this.gl.uniform1f(this.uniformLoc.uPointSize, size);
    this.gl.uniform1f(this.uniformLoc.uAngle, angle);

    return this;
  }
}
