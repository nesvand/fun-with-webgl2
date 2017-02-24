#version 300 es
in vec3 a_position; // Standard position data
in vec2 a_uv;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uCameraMatrix;

out highp vec2 texCoord;

void main(void) {
  texCoord = a_uv;
  gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vec4(a_position, 1.0);
}
