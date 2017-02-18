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
  // Global Context
  let gl: ExtendedWebGLContextLike;

  // Render Loop
  let gRLoop: RenderLoop;

  // Global Variables
  let gVertCount = 0;
  let aVerts: Float32Array;
  let gBuffer: WebGLBuffer;
  let uPointSizeLoc: WebGLUniformLocation | null = -1;
  let uAngleLoc: WebGLUniformLocation | null = 0;
  let uRadiusLoc: WebGLUniformLocation | null = 0;

  // Animation globals
  let gPointSize = 0;
  let gPointSizeStep = 3;
  let gAngle = 0;
  let gAngleStep = (Math.PI / 180) * 90; // 90 degrees in Radians
  let gRadius = 0;
  let gRadiusStep = 10;

  // Get our extended GL Context Object
  gl = GLInstance('glcanvas');
  if (gl) {
    gl.fSetSize(500, 500)
      .fClear();

    const shaderProg = ShaderUtil.shaderProgram(gl, vertexShader, fragmentShader, true);

    // Set up data buffers
    aVerts = new Float32Array([0, 0, 0,]);
    gBuffer = gl.fCreateArrayBuffer(aVerts);
    gVertCount = aVerts.length / 3; // positions are Vec3, so number of verts is buffer length / 3

    // Set up for drawing
    gl.useProgram(shaderProg); // Activate the shader
    uPointSizeLoc = gl.getUniformLocation(shaderProg, 'uPointSize');
    uAngleLoc = gl.getUniformLocation(shaderProg, 'uAngle');
    uRadiusLoc = gl.getUniformLocation(shaderProg, 'uRadius');

    gRLoop = new RenderLoop(onRender).start();
  }

  function onRender(dt: number) {
    if (gl) {
      let size;
      let radius;

      // Pulsate Point
      gPointSize += gPointSizeStep * dt;
      size = (Math.sin(gPointSize) * 25) + 30;
      gl.uniform1f(uPointSizeLoc, size); // Store vert size data to the shader's uniform variable uPointSize

      // Move point
      gAngle += gAngleStep * dt;
      gl.uniform1f(uAngleLoc, gAngle);
      gRadius += gRadiusStep * dt;
      radius = (Math.sin(gRadius) * 0.3) + 0.5;
      gl.uniform1f(uRadiusLoc, radius);

      gl.fClear();
      gl.drawArrays(gl.POINTS, 0, gVertCount); // Draw the points
    }
  }
});
