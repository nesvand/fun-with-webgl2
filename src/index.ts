// Assets
import './assets/app.css';
import './assets/uvgrid01.jpg';

// Libs
import GLInstance from './lib/gl';
import { Shader, } from './lib/Shader';
import RenderLoop from './lib/RenderLoop';
import Model from './lib/Model';
import { Camera, CameraController, } from './lib/Camera';

// Shaders
import GridAxisShader from './shaders/GridAxisShader';
import vShader from './shaders/vShader.glsl';
import fShader from './shaders/fShader.glsl';

// Models
import { GridAxis, Quad, MultiQuad, } from './lib/Primatives';

window.addEventListener('load', () => {
  // Global Context
  let gl: ExtendedWebGLContextLike;

  // Global Camera
  let gCamera: Camera;
  let gCameraCtrl: CameraController;

  // Render Loop
  // let gRLoop: RenderLoop;

  // Grid
  let gridShader: Shader;
  let gridModel: Model;

  let testShader: TestShader;
  let gModel: Model;
  let gModel2: Model;

  gl = GLInstance('glcanvas');

  if (gl) {
    gl.fFitScreen(0.95, 0.9)
      .fClear();

    gCamera = new Camera(gl);
    gCamera.transform.position.set(0, 1, 3);
    gCameraCtrl = new CameraController(gl, gCamera);

    // Load up resources
    gl.fLoadTexture('tex001', <HTMLImageElement>document.getElementById('imgTex'));

    // Setup Grid
    gridShader = new GridAxisShader(gl, gCamera.projectionMatrix);
    gridModel = GridAxis.createModel(gl, true);

    testShader = new TestShader(gl, gCamera.projectionMatrix)
      .setTexture(gl.mTextureCache['tex001']);

    gModel = MultiQuad.createModel(gl);

    // gModel = Quad.createModel(gl);
    // gModel.setPosition(0, 0.6, 0);

    // gModel2 = new Model(gl.mMeshCache['Quad']);

    new RenderLoop(onRender).start();
  }

  function onRender() {
    if (gl) {
      gCamera.updateViewMatrix();
      gl.fClear();

      gridShader.activate()
        .setCameraMatrix(gCamera.viewMatrix)
        .renderModel(gridModel.preRender());

      testShader.activate().preRender()
        .setCameraMatrix(gCamera.viewMatrix)
        .renderModel(gModel.preRender());
      // .renderModel(gModel2.preRender());
    }
  }
});

class TestShader extends Shader {
  mainTexture: WebGLTexture;

  constructor(gl: ExtendedWebGLContext, projectionMatrix: MixedFloat32Array) {
    super(gl, vShader, fShader);

    this.setPerspective(projectionMatrix);

    this.mainTexture = -1;
    gl.useProgram(null);
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
