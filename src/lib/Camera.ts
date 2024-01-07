import { Transform } from "./Transform";
import { Matrix4 } from "./Math";
import type { ExtendedWebGLContext } from "./webgl2-types";

enum CameraModes {
	FREE = 0,
	ORBIT = 1 << 0,
}

export class Camera {
	projectionMatrix: Float32Array;
	viewMatrix: Float32Array;
	transform: Transform;
	mode: CameraModes;

	public static MODE_FREE = CameraModes.FREE;
	public static MODE_ORBIT = CameraModes.ORBIT;

	constructor(
		gl: ExtendedWebGLContext,
		fov?: number,
		near?: number,
		far?: number,
	) {
		const ratio = gl.canvas.width / gl.canvas.height;

		// Setup the perspective matrix
		this.projectionMatrix = new Float32Array(16);
		Matrix4.perspective(
			this.projectionMatrix,
			fov || 45,
			ratio,
			near || 0.1,
			far || 100,
		);

		this.transform = new Transform(); // Setup transform to control the position of the camera
		this.viewMatrix = new Float32Array(16); // Cache the matrix that will hold the inverse of the transform

		this.mode = Camera.MODE_ORBIT; // Set what sort of control mode to use
	}

	panX(v: number) {
		if (this.mode === Camera.MODE_ORBIT) {
			return;
		}

		this.updateViewMatrix();
		this.transform.position.x += this.transform.right[0] * v;
		this.transform.position.y += this.transform.right[1] * v;
		this.transform.position.z += this.transform.right[2] * v;
	}

	panY(v: number) {
		this.updateViewMatrix();
		this.transform.position.y += this.transform.up[1] * v;

		if (this.mode === Camera.MODE_ORBIT) {
			return;
		}

		this.transform.position.x += this.transform.up[0] * v;
		this.transform.position.z += this.transform.up[2] * v;
	}

	panZ(v: number) {
		this.updateViewMatrix();

		if (this.mode === Camera.MODE_ORBIT) {
			this.transform.position.z += v;
		} else {
			this.transform.position.x += this.transform.forward[0] * v;
			this.transform.position.y += this.transform.forward[1] * v;
			this.transform.position.z += this.transform.forward[2] * v;
		}
	}

	updateViewMatrix() {
		// Optimise camera transform update because we have no need for scale or rotateZ

		if (this.mode === Camera.MODE_FREE) {
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
	rotationRate: number;
	panRate: number;
	zoomRate: number;
	offsetX: number;
	offsetY: number;
	initX: number;
	initY: number;
	prevX: number;
	prevY: number;
	onUpHandler: (e: MouseEvent) => void;
	onMoveHandler: (e: MouseEvent) => void;

	constructor(gl: ExtendedWebGLContext, camera: Camera) {
		const self = this;
		const box = gl.canvas.getBoundingClientRect();

		this.canvas = gl.canvas; // To bind to canvas events
		this.camera = camera; // Camera control reference

		this.rotationRate = -300; // How fast to rotate, degrees per delta of dragging
		this.panRate = 5; // How fast to pan, max unit per delta of dragging
		this.zoomRate = 200; // How fast to zoom - can be viewed as back/forward movement

		this.offsetX = box.left; // Help calc global x,y coords
		this.offsetY = box.top;

		this.initX = 0; // Starting x,y position on mouse down
		this.initY = 0;
		this.prevX = 0; // Previous x,y position on mouse down
		this.prevY = 0;

		this.onUpHandler = (e) => self.onMouseUp(e);
		this.onMoveHandler = (e) => self.onMouseMove(e);

		this.canvas.addEventListener("mousedown", (e) => self.onMouseDown(e));
		this.canvas.addEventListener("mousewheel", (e) => self.onMouseWheel(e)); // Everything BUT Firefox
		this.canvas.addEventListener("DOMMouseScroll", (e) =>
			self.onMouseWheel(<WheelEvent>e),
		); // Firefox (derp)
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

	onMouseUp(e: MouseEvent) {
		this.canvas.removeEventListener("mouseup", this.onUpHandler);
		this.canvas.removeEventListener("mousemove", this.onMoveHandler);
	}

	onMouseWheel(e: WheelEvent) {
		const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)); // Try to map wheel movement to a number between -1 and 1

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
