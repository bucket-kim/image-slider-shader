import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import fragmentShader from "./Shader/fragment.glsl?raw";
import vertexShader from "./Shader/vertex.glsl?raw";

const ImageSliderMaterial = shaderMaterial(
  {
    uTexture: null,
  },
  vertexShader,
  fragmentShader,
);

extend({ ImageSliderMaterial });

export default ImageSliderMaterial;
