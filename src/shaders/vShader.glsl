#version 300 es
in vec4 a_position;
in vec3 a_norm;

in vec2 a_uv;

uniform mat4 uPMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uCameraMatrix;

uniform mat3 uNormMatrix;

uniform vec3 uCamPos;

out vec3 vPos;
out vec3 vNorm;
out vec3 vCamPos;
out highp vec2 vUV;

void main(void){
  vec4 pos = uMVMatrix * vec4(a_position.xyz, 1.0);
  vPos = pos.xyz;
  vNorm =  uNormMatrix * a_norm;
  vUV = a_uv;
  vCamPos = (inverse(uCameraMatrix) * vec4(uCamPos,1.0)).xyz;

  gl_Position = uPMatrix * uCameraMatrix * pos;
}
