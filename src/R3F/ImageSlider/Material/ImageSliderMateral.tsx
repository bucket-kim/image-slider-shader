import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import fragmentShader from "./Shader/fragment.glsl?raw";
import vertexShader from "./Shader/vertex.glsl?raw";

const PUSH_FORCE = 1.4;

const ImageSliderMaterial = shaderMaterial(
  {
    uProgress: 1.0,
    uPushForce: PUSH_FORCE,
    uTexture: null,
    uPrevTexture: null,
    uDirection: 1,
    uMousePosition: [0, 0],
  },
  vertexShader,
  fragmentShader,
);

extend({ ImageSliderMaterial });

export default ImageSliderMaterial;
