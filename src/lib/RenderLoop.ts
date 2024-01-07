const ONE_SECOND_IN_MS: number = 1000;

export class RenderLoop {
	msFpsLimit: number | undefined;
	run: FrameRequestCallback;

	msLastFrame: number | null = null; // The time in ms of the last frame
	isActive = false; // Control the on/off state of the render loop
	fps = 0; // Save the value of how fast the loop is going

	constructor(public callback: FrameRequestCallback, fixedFPS?: number) {
		if (fixedFPS !== undefined && fixedFPS > 0) {
			// Build a run method that limits the framerate
			this.msFpsLimit = ONE_SECOND_IN_MS / fixedFPS; // Calc ms per frame in one second of time

			this.run = this.limitedRun.bind(this);
		} else {
			// Else build a run method that is optimised as much as possible
			this.run = this.optimisedRun.bind(this);
		}
	}

	optimisedRun() {
		// Calc deltatime between frames and the FPS currently
		const msCurrent = performance.now(); // gives you the whole number of ms since the dawn of time
		if (this.msLastFrame === null) throw Error("msLastFrame is null");
		const deltaTime = (msCurrent - this.msLastFrame) / ONE_SECOND_IN_MS; // ms between frames as a fraction of a second

		// Now execute frame since the correct amount of time has elapsed
		this.fps = Math.floor(1 / deltaTime);
		this.msLastFrame = msCurrent;
		this.callback(deltaTime);

		if (this.isActive) {
			window.requestAnimationFrame(this.run);
		}
	}

	limitedRun() {
		// Calc deltatime between frames and the FPS currently
		const msCurrent = performance.now();
		if (this.msLastFrame === null) throw Error("msLastFrame is null");
		const msDelta = msCurrent - this.msLastFrame;
		const deltaTime = msDelta / ONE_SECOND_IN_MS; // What fraction of a single second has passed

		if (typeof this.msFpsLimit !== "number")
			throw Error("msFpsLimit is not a number");
		if (msDelta >= this.msFpsLimit) {
			// Now execute frame since the correct amount of time has elapsed
			this.fps = Math.floor(1 / deltaTime);
			this.msLastFrame = msCurrent;
			this.callback(deltaTime);
		}

		if (this.isActive) {
			window.requestAnimationFrame(this.run);
		}
	}

	start() {
		this.isActive = true;
		this.msLastFrame = performance.now();
		window.requestAnimationFrame(this.run);
		return this;
	}

	stop() {
		this.isActive = false;
	}
}
