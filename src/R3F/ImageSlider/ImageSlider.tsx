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

  const { items, currSlide, direction } = sliderState();

  const image = items[currSlide].image;
  const texture = useTexture(image);

  const [lastImage, setLastImage] = useState(image);
  const [transition, setTransition] = useState(false);

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

    materialRef.current.uniforms.uMousePosition.value = [
      direction === "prev" ? -1 : 1,
      0,
    ];
    setTransition(true);

    const timeout = setTimeout(() => {
      setTransition(false);
    }, 1600);

    return () => {
      setLastImage(newImage);
      clearTimeout(timeout);
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
      transition
        ? -1.4 *
            1.52 *
            Math.sin(materialRef.current.uniforms.uProgress.value * 3.14)
        : hovered.current
          ? 1.4
          : 0,
      0.05,
    );

    materialRef.current.uniforms.uMousePosition.value = [
      THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMousePosition.value[0],
        transition
          ? (direction === "prev" ? 1.0 : -1.0) *
              materialRef.current.uniforms.uProgress.value
          : mouse.x,
        0.05,
      ),
      THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMousePosition.value[1],
        transition
          ? -1 * materialRef.current.uniforms.uProgress.value
          : mouse.y,
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
        uPushForce={1.4}
        uMousePosition={[0, 0]}
      />
    </mesh>
  );
};

export default ImageSlider;
