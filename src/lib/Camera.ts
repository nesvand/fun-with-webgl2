import { Matrix4 } from "./Math";
import { Transform } from "./Transform";
import { mustIndexArray } from "./util";
import type { ExtendedWebGLContext } from "./webgl2-types";

const CameraModesEnum = {
	FREE: 0,
	ORBIT: 1 << 0,
};
type CameraModes = (typeof CameraModesEnum)[keyof typeof CameraModesEnum];

export class Camera {
	projectionMatrix: Float32Array;
	viewMatrix: Float32Array;
	transform: Transform;
	mode: CameraModes;

	constructor(gl: ExtendedWebGLContext, fov = 45, near = 0.1, far = 100) {
		const ratio = gl.canvas.width / gl.canvas.height;

		// Setup the perspective matrix
		this.projectionMatrix = new Float32Array(16);
		Matrix4.perspective(this.projectionMatrix, fov, ratio, near, far);

		this.transform = new Transform(); // Setup transform to control the position of the camera
		this.viewMatrix = new Float32Array(16); // Cache the matrix that will hold the inverse of the transform

		this.mode = CameraModesEnum.ORBIT; // Set what sort of control mode to use
	}

	panX(v: number) {
		if (this.mode === CameraModesEnum.ORBIT) {
			return;
		}

		this.updateViewMatrix();
		this.transform.position.x += mustIndexArray(this.transform.right, 0) * v;
		this.transform.position.y += mustIndexArray(this.transform.right, 1) * v;
		this.transform.position.z += mustIndexArray(this.transform.right, 2) * v;
	}

	panY(v: number) {
		this.updateViewMatrix();
		this.transform.position.y += mustIndexArray(this.transform.up, 1) * v;

		if (this.mode === CameraModesEnum.ORBIT) {
			return;
		}

		this.transform.position.x += mustIndexArray(this.transform.up, 0) * v;
		this.transform.position.z += mustIndexArray(this.transform.up, 2) * v;
	}

	panZ(v: number) {
		this.updateViewMatrix();

		if (this.mode === CameraModesEnum.ORBIT) {
			this.transform.position.z += v;
		} else {
			this.transform.position.x +=
				mustIndexArray(this.transform.forward, 0) * v;
			this.transform.position.y +=
				mustIndexArray(this.transform.forward, 1) * v;
			this.transform.position.z +=
				mustIndexArray(this.transform.forward, 2) * v;
		}
	}

	updateViewMatrix() {
		// Optimise camera transform update because we have no need for scale or rotateZ

		if (this.mode === CameraModesEnum.FREE) {
			this.transform.matView
				.reset()
				.vtranslate(this.transform.position)
				.rotateX(this.transform.rotation.x * Transform.deg2Rad)
				.rotateY(this.transform.rotation.y * Transform.deg2Rad);
		} else {
			this.transform.matView
				.reset()
				.rotateX(this.transform.rotation.x * Transform.deg2Rad)
				.rotateY(this.transform.rotation.y * Transform.deg2Rad)
				.vtranslate(this.transform.position);
		}

		this.transform.updateDirection();

		// Cameras work by doing the inverse transformation on all meshes - the camera is a lie
		Matrix4.invert(this.viewMatrix, this.transform.matView.raw);

		return this.viewMatrix;
	}

	getMatrix(translate: boolean) {
		if (!translate) {
			const matrix = new Float32Array(this.viewMatrix);
			matrix[12] = matrix[13] = matrix[14] = 0;

			return matrix;
		}
		return this.viewMatrix;
	}
}

export class CameraController {
	canvas: HTMLCanvasElement;
	camera: Camera;
	offsetX: number;
	offsetY: number;
	onUpHandler: (e: MouseEvent) => void;
	onMoveHandler: (e: MouseEvent) => void;

	rotationRate = -300; // How fast to rotate, degrees per delta of dragging
	panRate = 5; // How fast to pan, max unit per delta of dragging
	zoomRate = 200; // How fast to zoom - can be viewed as back/forward movement
	initX = 0; // Starting x,y position on mouse down
	initY = 0;
	prevX = 0; // Previous x,y position on mouse down
	prevY = 0;

	constructor(gl: ExtendedWebGLContext, camera: Camera) {
		if (!("getBoundingClientRect" in gl.canvas))
			throw new Error("Incorrect canvas type");

		const box = gl.canvas.getBoundingClientRect();

		this.canvas = gl.canvas; // To bind to canvas events
		this.camera = camera; // Camera control reference

		this.offsetX = box.left; // Help calc global x,y coords
		this.offsetY = box.top;

		this.onUpHandler = (e) => this.onMouseUp(e);
		this.onMoveHandler = (e) => this.onMouseMove(e);

		this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
		this.canvas.addEventListener("wheel", (e) => this.onMouseWheel(e));
	}

	getMouseVec2(e: MouseEvent) {
		return {
			x: e.pageX - this.offsetX,
			y: e.pageY - this.offsetY,
		};
	}

	onMouseDown(e: MouseEvent) {
		this.initX = this.prevX = e.pageX - this.offsetX;
		this.initY = this.prevY = e.pageY - this.offsetY;

		this.canvas.addEventListener("mouseup", this.onUpHandler);
		this.canvas.addEventListener("mousemove", this.onMoveHandler);
	}

	onMouseUp(_: MouseEvent) {
		this.canvas.removeEventListener("mouseup", this.onUpHandler);
		this.canvas.removeEventListener("mousemove", this.onMoveHandler);
	}

	onMouseWheel(e: WheelEvent) {
		const delta = Math.max(-1, Math.min(1, -e.deltaY)); // Try to map wheel movement to a number between -1 and 1

		this.camera.panZ((-delta * this.zoomRate) / this.canvas.height); // Keep the movement speed the same, no matter the height difference
	}

	onMouseMove(e: MouseEvent) {
		const x = e.pageX - this.offsetX;
		const y = e.pageY - this.offsetY;
		const dx = x - this.prevX;
		const dy = y - this.prevY;

		// When shift is being held down we pan around - else we rotate
		if (e.shiftKey) {
			this.camera.panX((-dx * this.panRate) / this.canvas.width);
			this.camera.panY((-dy * this.panRate) / this.canvas.height);
		} else {
			this.camera.transform.rotation.y +=
				(dx * this.rotationRate) / this.canvas.width;
			this.camera.transform.rotation.x +=
				(dy * this.rotationRate) / this.canvas.height;
		}

		this.prevX = x;
		this.prevY = y;
	}
}
