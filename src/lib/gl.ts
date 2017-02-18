export default function GLInstance(canvasID: string): ExtendedWebGLContext | null {
  const canvas = <HTMLCanvasElement>document.getElementById(canvasID);
  const gl = <ExtendedWebGLContext>canvas.getContext('webgl2');

  if (!gl) {
    console.error('WebGL context is not available.'); // eslint-disable-line
    return null;
  }

  // Setup GL - Set all the default configurations we need
  gl.clearColor(1, 1, 1, 1); // Set clear colour

  // Methods
  gl.fClear = function () {
    this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
    return this;
  }

  // Setters/Getters

  // Set the size of the canvas html element and the rendering view port
  gl.fSetSize = function (w, h) {
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.canvas.width = w;
    this.canvas.height = h;

    // when updating the canvas size we must reset the viewport of the canvas
    // else the reoslution webgl renders at will not change
    this.viewport(0, 0, w, h);

    return this;
  }

  gl.fCreateArrayBuffer = function (floatArray, isStatic = true) {
    const buffer = <WebGLBuffer>this.createBuffer();
    this.bindBuffer(this.ARRAY_BUFFER, buffer);
    this.bufferData(this.ARRAY_BUFFER, floatArray, isStatic ? this.STATIC_DRAW : this.DYNAMIC_DRAW);
    this.bindBuffer(this.ARRAY_BUFFER, null);

    return buffer;
  }

  return gl;
}
