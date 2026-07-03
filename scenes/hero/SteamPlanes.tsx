"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./SteamMaterial";

type Props = {
  count: number;
  origin?: [number, number, number];
};

export default function SteamPlanes({ count, origin = [0, 0.9, 0] }: Props) {
  const materialRefs = useRef<THREE.ShaderMaterial[]>([]);

  useFrame((_, delta) => {
    for (const mat of materialRefs.current) {
      if (mat) mat.uniforms.uTime.value += delta;
    }
  });

  if (count === 0) return null;

  const planes = Array.from({ length: count }, (_, i) => i);

  return (
    <group position={origin}>
      {planes.map((i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = 0.06;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, 0.5, Math.sin(angle) * radius]}
            rotation={[0, angle, 0]}
          >
            <planeGeometry args={[0.5, 1.4, 1, 1]} />
            <steamMaterial
              ref={(el: THREE.ShaderMaterial) => {
                materialRefs.current[i] = el;
              }}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              uSpeed={0.12 + i * 0.02}
              uOpacity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}
