#version 300 es
precision mediump float;

// in vec4 color;
in highp vec2 texCoord;
uniform sampler2D uMainTex;

out vec4 finalColor;

void main(void) {
  // finalColor = color;
  finalColor = texture(uMainTex, texCoord);
  // finalColor = mix(color, texture(uMainTex, texCoord), 0.8f);
}
