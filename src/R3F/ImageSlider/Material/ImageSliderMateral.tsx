import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import fragmentShader from "./Shader/fragment.glsl?raw";
import vertexShader from "./Shader/vertex.glsl?raw";

const ImageSliderMaterial = shaderMaterial(
  {
    uProgress: 1.0,
    uTexture: null,
    uPrevTexture: null,
    uDirection: 1,
  },
  vertexShader,
  fragmentShader,
);

extend({ ImageSliderMaterial });

export default ImageSliderMaterial;
