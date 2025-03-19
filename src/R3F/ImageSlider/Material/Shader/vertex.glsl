  varying vec2 vUv;
  varying float vPushed;
    uniform float uPushForce;
  uniform vec2 uMousePosition;
  
  void main() {
    vUv = uv;

    vec2 centeredUV = (vUv - 0.5) * 2.0;
    float pushed = length(centeredUV - uMousePosition);
    pushed = 1.0 - smoothstep(0.0, 1.5,pushed);
    pushed = -uPushForce * pushed;
    vPushed= pushed;
    vec3 disPosition = position;
    disPosition.z = pushed;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(disPosition, 1.0);
  }