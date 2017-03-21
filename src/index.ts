// Assets
import './assets/app.css';
import './assets/uvgrid01.jpg';
import './assets/miramar_01.png';
import './assets/miramar_02.png';
import './assets/miramar_03.png';
import './assets/miramar_04.png';
import './assets/miramar_05.png';
import './assets/miramar_06.png';
import './assets/interstellar_01.png';
import './assets/interstellar_02.png';
import './assets/interstellar_03.png';
import './assets/interstellar_04.png';
import './assets/interstellar_05.png';
import './assets/interstellar_06.png';
import './assets/pirate_girl.jpg';

import vShader from './shaders/vShader.glsl';
import fShader from './shaders/fShader.glsl';

// Libs
import * as GL from './lib/gl';
import * as MATH from './lib/Math';
import * as SHADERS from './lib/Shaders';
import * as RENDERLOOP from './lib/RenderLoop';
import * as TRANSFORM from './lib/Transform';
import * as MODEL from './lib/Model';
import * as PRIMATIVES from './lib/Primatives';
import * as CAMERA from './lib/Camera';
import * as DEBUG from './lib/Debug';
import * as GRIDFLOOR from './lib/GridFloor';
import * as RESOURCES from './lib/Resources';

const { GLInstance } = GL;
const { ShaderBuilder } = SHADERS;
const { Camera, CameraController } = CAMERA;
const { GridFloor } = GRIDFLOOR;
const { Resources } = RESOURCES;
const { Cube } = PRIMATIVES;
const { RenderLoop } = RENDERLOOP;




let gl;
let gRLoop;
let gShader;
let gModel;
let gCamera;
let gCameraCtrl;
let gGridFloor;
// var mDebugVerts;
// var mDebugLine;

window.addEventListener('load', function () {
  //....................................
  //System Setup
  gl = GLInstance('glcanvas').fFitScreen(0.95, 0.9).fClear();

  gCamera = new Camera(gl);
  gCamera.transform.position.set(0, 1, 3);
  gCameraCtrl = new CameraController(gl, gCamera);

  gGridFloor = new GridFloor(gl);
  gRLoop = new RenderLoop(onRender, 30);

  //....................................
  //Load up resources
  Resources.setup(gl, onReady).loadTexture('tex001', './assets/uvgrid01.jpg').start();
});

//==================================================
//When Main System is setup and all resources are downloaded.
function onReady () {
  //Setup Test Shader, Modal, Meshes
  gShader = new ShaderBuilder(gl, vShader, fShader)
    .prepareUniforms(
      'uPMatrix',
      'mat4',
      'uMVMatrix',
      'mat4',
      'uCameraMatrix',
      'mat4',
    )
    .prepareTextures('uTexture', 'tex001')
    .setUniforms('uPMatrix', gCamera.projectionMatrix);

  gModel = Cube.createModal(gl, 'Cube', true)
    .setPosition(0, 0.6, 0); //.setScale(0.7,0.7,0.7);

  //....................................
  gRLoop.start();
  //onRender(0);
}

//==================================================
//Main Render Loop
function onRender (dt) {
  //................................
  //Main Elements to draw to the frame
  gl.fClear();

  gCamera.updateViewMatrix();
  gGridFloor.render(gCamera);

  //................................
  //Draw Out models
  gShader.preRender('uCameraMatrix', gCamera.viewMatrix)
    .renderModel(gModel.preRender(), false);
}
