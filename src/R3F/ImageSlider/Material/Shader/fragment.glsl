 varying vec2 vUv;
  uniform sampler2D uTexture;

  void main() {
    vec2 uv = vUv;
    vec4 curTexture = texture2D(uTexture, vUv);
          
    gl_FragColor = curTexture;

  }