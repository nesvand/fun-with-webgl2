#version 300 es
precision mediump float;

uniform sampler2D uMainTex;

uniform vec3 uLightPos;

in vec3 vPos;
in vec3 vNorm;

in highp vec2 vUV;

in vec3 vCamPos;

out vec4 outColor;

void main(void){
  vec4 cBase = texture(uMainTex, vUV);
  vec3 cLight = vec3(1.0,1.0,1.0);

  float ambientStrength = 0.15;
  vec3 cAmbient = ambientStrength * cLight;

  // Diffuse Lighting
  vec3 lightDir = normalize(uLightPos - vPos);
  float diffAngle = max(dot(vNorm, lightDir),0.0);

  float diffuseStrength = 0.3;
  vec3 cDiffuse = diffAngle * cLight * diffuseStrength;

  // Specular Lighting
  float specularStrength = 0.2f;
  float specularShininess = 1.0f;
  vec3 camDir = normalize(vCamPos - vPos);
  vec3 reflectDir = reflect(-lightDir, vNorm);
  float spec = pow(max(dot(reflectDir, camDir),0.0) ,specularShininess);
  vec3 cSpecular = specularStrength * spec * cLight;

  // Final Color
  vec3 finalColor = (cAmbient + cDiffuse + cSpecular) * cBase.rgb;
  outColor = vec4(finalColor,1.0);
}
