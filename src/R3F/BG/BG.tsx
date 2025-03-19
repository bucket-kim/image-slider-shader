import { useFrame } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { sliderState } from "../../States/sliderState";

const BG = () => {
  const bgColorRef = useRef<THREE.Color>(null);
  const { currSlide, items } = sliderState();

  const initColor = new THREE.Color(items[currSlide].color);

  const r = useSpring(initColor.r);
  const g = useSpring(initColor.g);
  const b = useSpring(initColor.b);
  useEffect(() => {
    const targetColor = new THREE.Color(items[currSlide].color);
    r.set(targetColor.r);
    g.set(targetColor.g);
    b.set(targetColor.b);
  }, [currSlide, items]);

  useFrame(() => {
    if (bgColorRef.current) {
      bgColorRef.current.set(r.get(), g.get(), b.get());
    }
  });
  return <color attach="background" args={[items[0].color]} ref={bgColorRef} />;
};

export default BG;
