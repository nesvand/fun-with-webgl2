// Libs
import { GLInstance, GLUtil } from "./lib/gl";
import { Shader } from "./lib/Shader";
import { RenderLoop } from "./lib/RenderLoop";
import { Model } from "./lib/Model";
import { Camera, CameraController } from "./lib/Camera";
import { ObjLoader } from "./lib/ObjLoader";

// Shaders
import { GridAxisShader } from "./lib/GridAxisShader";
import skyVShader from "./shaders/skyVShader.glsl";
import skyFShader from "./shaders/skyFShader.glsl";
import vShader from "./shaders/vShader.glsl";
import fShader from "./shaders/fShader.glsl";

// Models
import * as PRIMITIVES from "./lib/Primatives";
// Model Courtesy of @Enthymeme - http://www.blendswap.com/blends/view/73788
import pirateObjFile from "bundle-text:./assets/pirate_girl.obj";
import {
	ExtendedWebGLContext,
	ExtendedWebGLContextLike,
	MixedFloat32Array,
} from "./lib/webgl2-types";

const { GridAxis, Quad, MultiQuad, Cube } = PRIMITIVES;

window.addEventListener("load", () => {
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

	let cubeShader: TestShader;
	let pirateShader: TestShader;
	let gModel: Model;
	let gModel2: Model;

	// Global Context
	const gl = GLInstance("glcanvas");

	if (gl) {
		gl.fFitScreen(0.95, 0.95).fClear();

		gCamera = new Camera(gl);
		gCamera.transform.position.set(0, 1, 3);
		gCameraCtrl = new CameraController(gl, gCamera);

		// Load up resources
		gl.fLoadTexture(
			"tex001",
			<HTMLImageElement>document.getElementById("imgTex"),
		);
		gl.fLoadTexture(
			"tex002",
			<HTMLImageElement>document.getElementById("pirateGirl"),
		);
		gl.fLoadCubeMap("skybox01", [
			<HTMLImageElement>document.getElementById("imgDay01"),
			<HTMLImageElement>document.getElementById("imgDay02"),
			<HTMLImageElement>document.getElementById("imgDay03"),
			<HTMLImageElement>document.getElementById("imgDay04"),
			<HTMLImageElement>document.getElementById("imgDay05"),
			<HTMLImageElement>document.getElementById("imgDay06"),
		]);

		gl.fLoadCubeMap("skybox02", [
			<HTMLImageElement>document.getElementById("imgSpace01"),
			<HTMLImageElement>document.getElementById("imgSpace02"),
			<HTMLImageElement>document.getElementById("imgSpace03"),
			<HTMLImageElement>document.getElementById("imgSpace04"),
			<HTMLImageElement>document.getElementById("imgSpace05"),
			<HTMLImageElement>document.getElementById("imgSpace06"),
		]);

		// Setup Grid
		gGridShader = new GridAxisShader(gl, gCamera.projectionMatrix);
		gGridModel = GridAxis.createModel(gl, false);

		// Custom models
		const cubeTexture = gl.mTextureCache.get("tex001");
		const pirateTexture = gl.mTextureCache.get("tex002");
		const skyboxTextureA = gl.mTextureCache.get("skybox01");
		const skyboxTextureB = gl.mTextureCache.get("skybox02");

		cubeShader = new TestShader(gl, gCamera.projectionMatrix).setTexture(
			cubeTexture ? cubeTexture : null,
		);
		pirateShader = new TestShader(gl, gCamera.projectionMatrix).setTexture(
			pirateTexture ? pirateTexture : null,
		);

		gModel = Cube.createModel(gl);
		gModel.setPosition(-0.1, 0.15, 0.3).setScale(0.3, 0.3, 0.3);

		gModel2 = new Model(
			ObjLoader.stringToMesh(gl, "PirateGirl", pirateObjFile, true),
		);
		gModel2.setPosition(0, 0, 0).setScale(0.5, 0.5, 0.5);

		gSkymapModel = new Model(
			Cube.createMesh(gl, "Skymap", 100, 100, 100, 0, 0, 0),
		);
		gSkymapShader = new SkymapShader(
			gl,
			gCamera.projectionMatrix,
			skyboxTextureA ? skyboxTextureA : null,
			skyboxTextureB ? skyboxTextureB : null,
		);

		new RenderLoop(onRender).start();
	}

	function onRender() {
		if (gl) {
			gCamera.updateViewMatrix();
			gl.fClear();

			gSkymapShader
				.activate()
				.preRender()
				.setCameraMatrix(gCamera.getMatrix(false))
				// .setTime(performance.now())
				.renderModel(gSkymapModel);

			gGridShader
				.activate()
				.setCameraMatrix(gCamera.viewMatrix)
				.renderModel(gGridModel.preRender());

			cubeShader
				.activate()
				.preRender()
				.setCameraMatrix(gCamera.viewMatrix)
				// .setTime(performance.now())
				.renderModel(gModel.preRender());

			pirateShader
				.activate()
				.preRender()
				.setCameraMatrix(gCamera.viewMatrix)
				// .setTime(performance.now())
				.renderModel(gModel2.preRender());
		}
	}
});

class TestShader extends Shader {
	mainTexture: WebGLTexture;
	// uniformLoc: TestUniformLocations;

	constructor(gl: ExtendedWebGLContext, projectionMatrix: MixedFloat32Array) {
		super(gl, vShader, fShader);

		// this.uniformLoc.time = gl.getUniformLocation(this.program, 'uTime');

		// Standard Uniforms
		this.setPerspective(projectionMatrix);
		this.mainTexture = -1;
		gl.useProgram(null);
	}

	// setTime (t: number) {
	//   this.gl.uniform1f(this.uniformLoc.time, t);
	//   return this;
	// }

	setTexture(textureID: WebGLTexture | null) {
		if (textureID) {
			this.mainTexture = textureID;
		}

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

class SkymapShader extends Shader {
	texDay: WebGLTexture | null;
	texNight: WebGLTexture | null;
	// uniformLoc: SkymapUniformLocations;

	constructor(
		gl: ExtendedWebGLContext,
		projectionMatrix: MixedFloat32Array,
		dayTexture: WebGLTexture | null,
		nightTexture: WebGLTexture | null,
	) {
		super(gl, skyVShader, skyFShader);

		// Custom Uniforms
		// this.uniformLoc.time = gl.getUniformLocation(this.program, 'uTime');
		// this.uniformLoc.dayTex = gl.getUniformLocation(this.program, 'uDayTex');
		// this.uniformLoc.nightTex = gl.getUniformLocation(this.program, 'uNightTex');

		// Standard Uniforms
		this.setPerspective(projectionMatrix);
		this.texDay = dayTexture;
		this.texNight = nightTexture;

		gl.useProgram(null);
	}

	// setTime (t: number) {
	//   this.gl.uniform1f(this.uniformLoc.time, t);
	//   return this;
	// }

	preRender() {
		// Setup Textures
		// Day
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texDay);
		// this.gl.uniform1i(this.uniformLoc.dayTex, 0);

		// Night
		this.gl.activeTexture(this.gl.TEXTURE1);
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texNight);
		// this.gl.uniform1i(this.uniformLoc.nightTex, 1);

		return this;
	}
}
