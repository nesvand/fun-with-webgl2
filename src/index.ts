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

// Libs
import GLInstance from './lib/gl';
import { GLUtil } from './lib/gl';
import { Shader } from './lib/Shader';
import RenderLoop from './lib/RenderLoop';
import Model from './lib/Model';
import { Camera, CameraController } from './lib/Camera';

// Shaders
import GridAxisShader from './shaders/GridAxisShader';
import skyVShader from './shaders/skyVShader.glsl';
import skyFShader from './shaders/skyFShader.glsl';
import vShader from './shaders/vShader.glsl';
import fShader from './shaders/fShader.glsl';

// Models
import { GridAxis, Quad, MultiQuad, Cube } from './lib/Primatives';

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

  // Skymap
  let gSkymapShader: SkymapShader;
  let gSkymapModel: Model;

  let testShader: TestShader;
  let gModel: Model;
  let gModel2: Model;

  gl = GLInstance('glcanvas');

  if (gl) {
    gl.fFitScreen(0.95, 0.95).fClear();

    gCamera = new Camera(gl);
    gCamera.transform.position.set(0, 0, 3);
    gCameraCtrl = new CameraController(gl, gCamera);

    // Load up resources
    gl.fLoadTexture('tex001', <HTMLImageElement>document.getElementById('imgTex'));
    gl.fLoadCubeMap('skybox01', [
      <HTMLImageElement>document.getElementById('imgDay01'),
      <HTMLImageElement>document.getElementById('imgDay02'),
      <HTMLImageElement>document.getElementById('imgDay03'),
      <HTMLImageElement>document.getElementById('imgDay04'),
      <HTMLImageElement>document.getElementById('imgDay05'),
      <HTMLImageElement>document.getElementById('imgDay06'),
    ]);

    gl.fLoadCubeMap('skybox02', [
      <HTMLImageElement>document.getElementById('imgSpace01'),
      <HTMLImageElement>document.getElementById('imgSpace02'),
      <HTMLImageElement>document.getElementById('imgSpace03'),
      <HTMLImageElement>document.getElementById('imgSpace04'),
      <HTMLImageElement>document.getElementById('imgSpace05'),
      <HTMLImageElement>document.getElementById('imgSpace06'),
    ]);

    // Setup Grid
    gGridShader = new GridAxisShader(gl, gCamera.projectionMatrix);
    gGridModel = GridAxis.createModel(gl, true);

    // Custom models
    testShader = new TestShader(gl, gCamera.projectionMatrix)
      .setTexture(gl.mTextureCache['tex001']);

    gModel = Cube.createModel(gl);
    gModel.setPosition(0, 0, 0);

    gSkymapModel = new Model(Cube.createMesh(gl, 'Skymap', 100, 100, 100, 0, 0, 0));
    gSkymapShader = new SkymapShader(
      gl, gCamera.projectionMatrix,
      gl.mTextureCache['skybox01'],
      gl.mTextureCache['skybox02'],
    );

    new RenderLoop(onRender).start();
  }

  function onRender () {
    if (gl) {
      gCamera.updateViewMatrix();
      gl.fClear();

      gSkymapShader.activate().preRender()
        .setCameraMatrix(gCamera.getMatrix(false))
        .setTime(performance.now())
        .renderModel(gSkymapModel);

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
  uniformLoc: TestUniformLocations;

  constructor (gl: ExtendedWebGLContext, projectionMatrix: MixedFloat32Array) {
    super(gl, vShader, fShader);

    this.uniformLoc.time = gl.getUniformLocation(this.program, 'uTime');

    const uColor = gl.getUniformLocation(this.program, 'uColor');
    const colorArray = GLUtil.rgbArray(
      0xFF0000,
      0x00FF00,
      0x0000FF,
      0xFFFF00,
      0x00FFFF,
      0xFF00FF,
    );

    if (colorArray) {
      gl.uniform3fv(
        uColor,
        new Float32Array(colorArray),
      );
    }
    else {
      throw TypeError(`[TestShader][constructor] colorArray cannot be empty`);
    }

    this.setPerspective(projectionMatrix);

    this.mainTexture = -1;
    gl.useProgram(null);
  }

  setTime (t: number) {
    this.gl.uniform1f(this.uniformLoc.time, t);
    return this;
  }

  setTexture (textureID: WebGLTexture | null) {
    if (textureID) {
      this.mainTexture = textureID;
    }

    return this;
  }

  preRender () {
    // Setup Texture
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.mainTexture);
    this.gl.uniform1i(this.uniformLoc.mainTexture, 0);

    return this;
  }
}

class SkymapShader extends Shader {
  texDay: WebGLTexture | null;
  texNight: WebGLTexture | null;
  uniformLoc: SkymapUniformLocations;

  constructor (
    gl: ExtendedWebGLContext,
    projectionMatrix: MixedFloat32Array,
    dayTexture: WebGLTexture | null,
    nightTexture: WebGLTexture | null,
  ) {
    super(gl, skyVShader, skyFShader);

    // Custom Uniforms
    this.uniformLoc.time = gl.getUniformLocation(this.program, 'uTime');
    this.uniformLoc.dayTex = gl.getUniformLocation(this.program, 'uDayTex');
    this.uniformLoc.nightTex = gl.getUniformLocation(this.program, 'uNightTex');

    // Standard Uniforms
    this.setPerspective(projectionMatrix);
    this.texDay = dayTexture;
    this.texNight = nightTexture;

    gl.useProgram(null);
  }

  setTime (t: number) {
    this.gl.uniform1f(this.uniformLoc.time, t);
    return this;
  }

  preRender () {
    // Setup Textures
    // Day
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texDay);
    this.gl.uniform1i(this.uniformLoc.dayTex, 0);

    // Night
    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texNight);
    this.gl.uniform1i(this.uniformLoc.nightTex, 1);

    return this;
  }
}
