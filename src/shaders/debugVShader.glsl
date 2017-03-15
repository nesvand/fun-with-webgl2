#version 300 es

layout(location=0) in vec4 a_position;

uniform mat4 uPMatrix;
uniform mat4 uCameraMatrix;
uniform mat4 uMVMatrix;

uniform vec3 uColorAry[6];
uniform vec3 uCameraPos;

uniform float uPointSize;

out lowp vec4 color;

void main (void) {
  vec4 pos = uMVMatrix * vec4(a_position.xyz, 1.0);
  color = vec4(uColorAry[ int(a_position.w) ], 1.0);
  gl_PointSize = (1.0 - distance( uCameraPos, pos.xyz) / 10.0) * uPointSize;
  gl_Position = uPMatrix * uCameraMatrix * pos;
}
