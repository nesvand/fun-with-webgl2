// Assets
import './assets/app.css';

// Libs
import GLInstance from './lib/gl';
import ShaderUtil from './lib/Shader';
import RenderLoop from './lib/RenderLoop';

// Shaders
import vertexShader from './shaders/vertex_shader.glsl';
import fragmentShader from './shaders/fragment_shader.glsl';

window.addEventListener('load', () => {
  let gl: ExtendedWebGLContextLike;
  let gVertCount = 0;
  let uPointSizeLoc: WebGLUniformLocation | null = -1;
  let uAngle = 0;
  let gRLoop: RenderLoop;

  // Get our extended GL Context Object
  gl = GLInstance('glcanvas');
  if (gl) {
    gl.fSetSize(500, 500)
      .fClear();

    // SHADER STEPS
    // 1. Get Vertex and Fragment Shader Text
    // see imports
    // 2. Compile text and validate
    const vShader = ShaderUtil.createShader(gl, vertexShader, gl.VERTEX_SHADER);
    const fShader = ShaderUtil.createShader(gl, fragmentShader, gl.FRAGMENT_SHADER);
    // 3. Link the Shaders together as a program
    if (vShader && fShader) {
      const shaderProg = ShaderUtil.createProgram(gl, vShader, fShader, true);

      // 4. Get Location of Uniforms and Attributes
      gl.useProgram(shaderProg);
      const aPositionLoc = gl.getAttribLocation(shaderProg, 'a_position');
      uPointSizeLoc = gl.getUniformLocation(shaderProg, 'uPointSize');
      gl.useProgram(null);

      // Set up data buffers
      const aVerts = new Float32Array([0, 0, 0]);
      const vertBuf = gl.fCreateArrayBuffer(aVerts);

      gVertCount = aVerts.length / 3; // positions are Vec3, so number of verts is buffer length / 3

      // Set up for drawing
      gl.useProgram(shaderProg); // Activate the shader

      // how it's done without VAOs
      gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf); // Tell gl which buffer we want to use at the moment
      gl.enableVertexAttribArray(aPositionLoc); // Enable the position attribute in the shader
      gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0); // Set which buffer the attribute will pull its data from
      gl.bindBuffer(gl.ARRAY_BUFFER, null); // Done setting up the buffer

      gRLoop = new RenderLoop(onRender).start();
    }
  }

  function onRender(dt: number) {
    if (gl) {
      gl.uniform1f(uPointSizeLoc, 50.0); // Store data to the shader's uniform variable uPointSize
      gl.fClear();
      gl.drawArrays(gl.POINTS, 0, gVertCount); // Draw the points
    }
  }
});
