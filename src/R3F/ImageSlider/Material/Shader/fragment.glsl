 varying vec2 vUv;
 varying float vPushed;
  uniform sampler2D uTexture;
  uniform sampler2D uPrevTexture;
  uniform float uProgress;
  uniform float uDirection;

  float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u*u*(3.0-2.0*u);

  float res = mix(
    mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
    mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
  return res*res;
}

  void main() {
    vec2 uv = vUv;

    // noise effect
    float noiseFactor = noise(gl_FragCoord.xy * .05);

    vec2 distortedPosition = vec2(uv.x - float(uDirection) * (1.0 - uProgress) * noiseFactor, uv.y);
    // vec4 curTexture = texture2D(uTexture, distortedPosition);

    vec2 distortedPositionPrev = vec2(uv.x + float(uDirection) *  uProgress * noiseFactor, uv.y);
    vec4 prevTexture = texture2D(uPrevTexture, distortedPositionPrev);

    // distorted effect 
    float currTextureR = texture2D(uTexture, distortedPosition + vec2(vPushed * 0.062)).r;
    float currTextureG = texture2D(uTexture, distortedPosition + vec2(vPushed * 0.042)).g;
    float currTextureB = texture2D(uTexture, distortedPosition + vec2(vPushed * -0.032)).b;
    float currTextureA = texture2D(uTexture, distortedPosition).a;

    vec4 currTexture = vec4(currTextureR, currTextureG, currTextureB, currTextureA);


    vec4 finalTexture = mix(prevTexture, currTexture, uProgress);          
    gl_FragColor = finalTexture;

  }