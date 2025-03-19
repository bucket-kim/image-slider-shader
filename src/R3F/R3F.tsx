import { Canvas } from "@react-three/fiber";
import BG from "./BG/BG";
import ImageSlider from "./ImageSlider/ImageSlider";

const R3F = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 30 }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
      }}
    >
      <BG />
      {/* <OrbitControls /> */}
      <ImageSlider width={3} height={4} fillPercent={0.75} />
    </Canvas>
  );
};

export default R3F;
