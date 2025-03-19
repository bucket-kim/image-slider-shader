import { useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { FC, JSX, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MirroredRepeatWrapping } from "three";
import { sliderState } from "../../States/sliderState";
import ImageSliderMaterial from "./Material/ImageSliderMateral";

declare module "@react-three/fiber" {
  interface ThreeElements {
    imageSliderMaterial: JSX.IntrinsicElements["meshStandardMaterial"] & {
      uTexture: THREE.Texture | null;
      uPrevTexture: THREE.Texture | null;
      uProgress: number;
      uPushForce: number;
      uDirection: number;
      uMousePosition: number[];
    };
  }
}

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

  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const hovered = useRef(false);

  const { items, currSlide } = sliderState();

  const image = items[currSlide].image;
  const texture = useTexture(image);

  const [lastImage, setLastImage] = useState(image);
  const prevTexture = useTexture(lastImage);
  texture.wrapS =
    texture.wrapT =
    prevTexture.wrapS =
    prevTexture.wrapT =
      MirroredRepeatWrapping;

  useEffect(() => {
    if (!materialRef.current) return;

    const newImage = image;
    materialRef.current.uniforms.uProgress.value = 0;

    return () => {
      setLastImage(newImage);
    };
  }, [image]);

  useEffect(() => {
    sliderState.getState().items.forEach((item) => {
      useTexture.preload(item.image);
    });
  }, []);

  useFrame(({ mouse }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uProgress.value,
      1,
      0.05,
    );

    materialRef.current.uniforms.uPushForce.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uPushForce.value,
      hovered.current ? 1.4 : 0,
      0.05,
    );

    materialRef.current.uniforms.uMousePosition.value = [
      THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMousePosition.value[0],
        mouse.x,
        0.05,
      ),
      THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMousePosition.value[1],
        mouse.y,
        0.05,
      ),
    ];
  });

  return (
    <mesh
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <planeGeometry args={[width * ratio, height * ratio, 32, 32]} />
      <imageSliderMaterial
        // wireframe
        ref={materialRef}
        uTexture={texture}
        uPrevTexture={prevTexture}
        uProgress={0.5}
        uDirection={1}
        uPushForce={0.4}
        uMousePosition={[0, 0]}
      />
    </mesh>
  );
};

export default ImageSlider;
