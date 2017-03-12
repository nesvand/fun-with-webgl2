const ONE_SECOND: number = 1000;

export class RenderLoop {
  msLastFrame: number | null;
  callback: RenderLoopCallback;
  isActive: boolean;
  fps: number;
  msFpsLimit: number;
  run: Function;

  constructor (cb: RenderLoopCallback, fps?: number) {
    const self = this;

    this.msLastFrame = null; // The time in ms of the last frame
    this.callback = cb; // Function to call each frame
    this.isActive = false; // Control the on/off state of the render loop
    this.fps = 0; // Save the value of how fast the loop is going

    if (fps !== undefined && fps > 0) { // Build a run method that limits the framerate
      this.msFpsLimit = ONE_SECOND / fps; // Calc ms per frame in one second of time

      this.run = limitedRun;
    }
    else { // Else build a run method that is optimised as much as possible
      this.run = optimisedRun;
    }

    function limitedRun () {
      // Calc deltatime between frames and the FPS currently
      const msCurrent = performance.now();
      const msDelta = (msCurrent - self.msLastFrame);
      const deltaTime = msDelta / ONE_SECOND; // What fraction of a single second has passed

      if (msDelta >= self.msFpsLimit) { // Now execute frame since the correct amount of time has elapsed
        self.fps = Math.floor(1 / deltaTime);
        self.msLastFrame = msCurrent;
        self.callback(deltaTime);
      }

      if (self.isActive) {
        window.requestAnimationFrame(<FrameRequestCallback>self.run);
      }
    }

    function optimisedRun () {
      // Calc deltatime between frames and the FPS currently
      const msCurrent = performance.now(); // gives you the whole number of ms since the dawn of time
      const deltaTime = (msCurrent - self.msLastFrame) / ONE_SECOND; // ms between frames as a fraction of a second

      // Now execute frame since the correct amount of time has elapsed
      self.fps = Math.floor(1 / deltaTime);
      self.msLastFrame = msCurrent;
      self.callback(deltaTime);

      if (self.isActive) {
        window.requestAnimationFrame(<FrameRequestCallback>self.run);
      }
    }
  }

  start (): RenderLoop {
    this.isActive = true;
    this.msLastFrame = performance.now();
    window.requestAnimationFrame(<FrameRequestCallback>this.run);
    return this;
  }

  stop () {
    this.isActive = false;
  }
}

export default {
  RenderLoop,
};
