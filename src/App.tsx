import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";

function App() {
  return (
    <Canvas id="root" camera={{ position: [0, 0, 5], fov: 30 }}>
      <color attach="background" args={["#201d24"]} />
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="white" />
      </mesh>
    </Canvas>
  );
}

export default App;
