#version 300 es
precision mediump float;
uniform sampler2D uTexture;
in highp vec2 vUV;
out vec4 outColor;

void main(void){
  outColor = texture(uTexture,vUV*1.5);
}
