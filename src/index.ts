// Assets
import './assets/app.css';

// Libs
import GLInstance from './lib/gl';
import { Shader, } from './lib/Shader';
import RenderLoop from './lib/RenderLoop';
import Model from './lib/Model';
import { GridAxis, } from './lib/Primatives';
import {Camera, CameraController} from './lib/Camera';

// Shaders
import vertexShaderText from './shaders/vertex_shader.glsl';
import fragmentShaderText from './shaders/fragment_shader.glsl';

window.addEventListener('load', () => {
  // Global Context
  let gl: ExtendedWebGLContextLike;

  // Render Loop
  // let gRLoop: RenderLoop;

  // Model
  let gModel: Model;

  // Global Variables
  let gShader: TestShader;

  // Global Camera
  let gCamera: Camera;
  let gCameraCtrl: CameraController;

  gl = GLInstance('glcanvas');

  if (gl) {
    gl.fSetSize(500, 500)
      .fClear();

      gCamera = new Camera(gl);
      gCamera.transform.position.set(0, 1, 3);
      gCameraCtrl = new CameraController(gl, gCamera);

    gShader = new TestShader(gl, [0.8, 0.8, 0.8, 1, 0, 0, 0, 1, 0, 0, 0, 1,]); // Gray, Red, Green, Blue
    gShader.activate().setPerspective(gCamera.projectionMatrix).deactivate(); // Push projection data to shader

    gModel = new Model(GridAxis.createMesh(gl, true));
      // .setScale(0.4, 0.4, 0.4)
      // .setRotation(0, 0, 45)
      // .setPosition(0.8, 0.8, 0);

    new RenderLoop(onRender).start();
  }

  function onRender () {
    gCamera.updateViewMatrix();

    if (gl) {
      gl.fClear();

      gShader.activate()
        .setCameraMatrix(gCamera.viewMatrix)
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
