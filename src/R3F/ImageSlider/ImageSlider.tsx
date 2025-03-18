import { useTexture } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
import { FC } from "react";
import ImageSliderMaterial from "./Material/ImageSliderMateral";

interface ImageSliderProps {
  width: number;
  height: number;
  fillPercent: number;
}

extend({ ImageSliderMaterial });

const ImageSlider: FC<ImageSliderProps> = ({ width, height, fillPercent }) => {
  // viewport response
  const viewPort = useThree((state) => state.viewport);
  const ratio = viewPort.height / (height / fillPercent);

  //   load images
  const image =
    "textures/optimized/Default_authentic_futuristic_cottage_with_garden_outside_0.jpg";

  const texture = useTexture(image);

  return (
    <mesh>
      <planeGeometry args={[width * ratio, height * ratio]} />
      <imageSliderMaterial uTexture={texture} />
    </mesh>
  );
};

export default ImageSlider;
