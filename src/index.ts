// Assets
import './assets/app.css';

// Libs
import GLInstance from './lib/gl';
import { Shader, } from './lib/Shader';
import RenderLoop from './lib/RenderLoop';
import Model from './lib/Model';
import { Camera, CameraController, } from './lib/Camera';

// Shaders
import GridAxisShader from './shaders/GridAxisShader';

// Models
import { GridAxis, } from './lib/Primatives';

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

  gl = GLInstance('glcanvas');

  if (gl) {
    gl.fFitScreen(0.95, 0.9)
      .fClear();

    gCamera = new Camera(gl);
    gCamera.transform.position.set(0, 1, 3);
    gCameraCtrl = new CameraController(gl, gCamera);

    gridShader = new GridAxisShader(gl, gCamera.projectionMatrix);

    gridModel = GridAxis.createModel(gl, true);

    new RenderLoop(onRender).start();
  }

  function onRender () {
    gCamera.updateViewMatrix();

    if (gl) {
      gl.fClear();

      gridShader.activate()
        .setCameraMatrix(gCamera.viewMatrix)
        .renderModel(gridModel.preRender());
    }
  }
});
