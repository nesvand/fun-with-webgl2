#version 300 es
precision mediump float;

in vec2 uv;

out vec4 finalColor;

void main(void) {
  // Square Border
  // float c = (uv.x <= 0.1 || uv.x >= 0.9 || uv.y <= 0.1 || uv.y >= 0.9) ? 0.0 : 1.0;
  // finalColor = vec4(c, c, c, 1.0 - c);

  // Circle Border
  vec2 delta = uv - vec2(0.5, 0.5); // Position from center
  float outerDistanceFromEdge = 0.5 - sqrt(delta.x * delta.x + delta.y * delta.y);

  float oD = 0.0;
  float iD = 0.02;

  float aliasFactor = 0.01;

  float a = 0.0;

  // Outer Diameter with aliasing
  if (outerDistanceFromEdge > oD) a = (outerDistanceFromEdge - oD) / aliasFactor;
  // Inner Diameter with aliasing
  if (outerDistanceFromEdge > iD) a = 1.0 - (outerDistanceFromEdge - iD) / aliasFactor;

  finalColor = vec4(0.0, 0.0, 0.0, a);
}
