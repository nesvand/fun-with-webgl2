// Assets
import './assets/app.css';

// Libs
import GLInstance from './lib/gl.js';
import ShaderUtil from './lib/Shader.js';

// Shaders
import vertexShader from './shaders/vertex_shader.glsl';
import fragmentShader from './shaders/fragment_shader.glsl';

window.addEventListener('load', () => {
  // Get our extended GL Context Object
  let gl = GLInstance('glcanvas')
    .fSetSize(500, 500)
    .fClear();

  // SHADER STEPS
  // 1. Get Vertex and Fragment Shader Text
  // const vertexShader = ShaderUtil.domShaderSrc('vertex_shader');
  // const fragmentShader = ShaderUtil.domShaderSrc('fragment_shader');
  // 2. Compile text and validate
  const vShader = ShaderUtil.createShader(gl, vertexShader, gl.VERTEX_SHADER);
  const fShader = ShaderUtil.createShader(gl, fragmentShader, gl.FRAGMENT_SHADER);
  // 3. Link the Shaders together as a program
  const shaderProg = ShaderUtil.createProgram(gl, vShader, fShader, true);
  // 4. Get Location of Uniforms and Attributes
  gl.useProgram(shaderProg);
  const aPositionLoc = gl.getAttribLocation(shaderProg, 'a_position');
  const uPointSizeLoc = gl.getUniformLocation(shaderProg, 'uPointSize');
  gl.useProgram(null);

  // Set up data buffers
  const aryVerts = new Float32Array([0, 0, 0, 0.5, 0.5, 0]);
  const bufVerts = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, bufVerts);
  gl.bufferData(gl.ARRAY_BUFFER, aryVerts, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Set up for drawing
  gl.useProgram(shaderProg); // Activate the shader
  gl.uniform1f(uPointSizeLoc, 50.0); // Store data to the shader's uniform variable uPointSize

  // how it's done without VAOs
  gl.bindBuffer(gl.ARRAY_BUFFER, bufVerts); // Tell gl which buffer we want to use at the moment
  gl.enableVertexAttribArray(aPositionLoc); // Enable the position attribute in the shader
  gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0); // Set which buffer the attribute will pull its data from
  gl.bindBuffer(gl.ARRAY_BUFFER, null); // Done setting up the buffer

  gl.drawArrays(gl.POINTS, 0, aryVerts.length / 3); // positions are Vec3, so number of verts is buffer length / 3
});
