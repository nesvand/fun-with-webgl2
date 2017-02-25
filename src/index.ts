// Assets
import './assets/app.css';
import './assets/uvgrid01.jpg';

// Libs
import GLInstance from './lib/gl';
import { GLUtil } from './lib/gl';
import { Shader, } from './lib/Shader';
import RenderLoop from './lib/RenderLoop';
import Model from './lib/Model';
import { Camera, CameraController, } from './lib/Camera';

// Shaders
import GridAxisShader from './shaders/GridAxisShader';
import vShader from './shaders/vShader.glsl';
import fShader from './shaders/fShader.glsl';

// Models
import { GridAxis, Quad, MultiQuad, Cube, } from './lib/Primatives';

window.addEventListener('load', () => {
  // Global Context
  let gl: ExtendedWebGLContextLike;

  // Global Camera
  let gCamera: Camera;
  let gCameraCtrl: CameraController;

  // Render Loop
  // let gRLoop: RenderLoop;

  // Grid
  let gGridShader: Shader;
  let gGridModel: Model;

  let testShader: TestShader;
  let gModel: Model;
  let gModel2: Model;

  gl = GLInstance('glcanvas');

  if (gl) {
    gl.fFitScreen(0.95, 0.95).fClear();

    gCamera = new Camera(gl);
    gCamera.transform.position.set(0, 1, 3);
    gCameraCtrl = new CameraController(gl, gCamera);

    // Load up resources
    gl.fLoadTexture('tex001', <HTMLImageElement>document.getElementById('imgTex'));

    // Setup Grid
    gGridShader = new GridAxisShader(gl, gCamera.projectionMatrix);
    gGridModel = GridAxis.createModel(gl, false);

    testShader = new TestShader(gl, gCamera.projectionMatrix)
      .setTexture(gl.mTextureCache['tex001']);

    gModel = Cube.createModel(gl);
    gModel.setPosition(0, 0.6, 0);

    new RenderLoop(onRender).start();
  }

  function onRender() {
    if (gl) {
      gCamera.updateViewMatrix();
      gl.fClear();

      gGridShader.activate()
        .setCameraMatrix(gCamera.viewMatrix)
        .renderModel(gGridModel.preRender());

      testShader.activate().preRender()
        .setCameraMatrix(gCamera.viewMatrix)
        .setTime(performance.now())
        .renderModel(gModel.preRender());
    }
  }
});

class TestShader extends Shader {
  mainTexture: WebGLTexture;

  constructor(gl: ExtendedWebGLContext, projectionMatrix: MixedFloat32Array) {
    super(gl, vShader, fShader);

    this.uniformLoc.time = gl.getUniformLocation(this.program, 'uTime');

    const uColor = gl.getUniformLocation(this.program, 'uColor');
    gl.uniform3fv(uColor, new Float32Array(GLUtil.rgbArray(
      0xFF0000,
      0x00FF00,
      0x0000FF,
      0xFFFF00,
      0x00FFFF,
      0xFF00FF
    )));

    this.setPerspective(projectionMatrix);

    this.mainTexture = -1;
    gl.useProgram(null);
  }

  setTime(t: number) {
    this.gl.uniform1f(this.uniformLoc.time, t);
    return this;
  }

  setTexture(textureID: WebGLTexture) {
    this.mainTexture = textureID;
    return this;
  }

  preRender() {
    // Setup Texture
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.mainTexture);
    this.gl.uniform1i(this.uniformLoc.mainTexture, 0);

    return this;
  }
}
