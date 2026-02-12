import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function FloatingShape({ position, color, scale, speed, distort }: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  distort: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.4}
          metalness={0.1}
          distort={distort}
          speed={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFF0EB" />
      <pointLight position={[-3, 2, 4]} intensity={0.4} color="#FF6B35" />

      <FloatingShape position={[-3.5, 1.5, 0]} color="#FF6B35" scale={0.8} speed={1.5} distort={0.3} />
      <FloatingShape position={[3.2, -1, 1]} color="#FF8B5E" scale={0.6} speed={2} distort={0.4} />
      <FloatingShape position={[-1.5, -2, -1]} color="#4A6CF7" scale={0.5} speed={1.8} distort={0.25} />
      <FloatingShape position={[2, 2.5, -0.5]} color="#9B6CF7" scale={0.45} speed={1.2} distort={0.35} />
      <FloatingShape position={[0, 0, 2]} color="#FFB08A" scale={0.35} speed={2.2} distort={0.2} />
    </Canvas>
  );
}
