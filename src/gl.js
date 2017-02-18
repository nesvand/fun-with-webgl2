export default function GLInstance(canvasID) {
  const canvas = document.getElementById(canvasID);
  const gl = canvas.getContext('webgl');

  if (!gl) {
    console.error('WebGL context is not available.'); // eslint-disable-line
    return null;
  }

  // Setup GL - Set all the default configurations we need
  gl.clearColor(1.0, 1.0, 1.0, 1.0); // Set clear colour

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

  return gl;
}
