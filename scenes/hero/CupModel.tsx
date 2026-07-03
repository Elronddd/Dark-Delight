"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group } from "three";

/**
 * A procedurally-built cup (cylinder body + torus handle + saucer), not a
 * sourced glTF — avoids licensing/hotlinking an external model and keeps the
 * hero asset weight at zero. Stylised low-poly forms read as premium/minimal
 * rather than photoreal, which suits the brand.
 */
export default function CupModel() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.6) * 0.04;
    group.current.rotation.y = Math.sin(t * 0.25) * 0.15;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* Saucer */}
      <mesh position={[0, -0.18, 0]} receiveShadow>
        <cylinderGeometry args={[0.95, 1, 0.05, 48]} />
        <meshPhysicalMaterial color="#F5EDE0" roughness={0.45} clearcoat={0.4} envMapIntensity={0.5} />
      </mesh>

      {/* Cup body (tapered cylinder) */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.5, 0.85, 48, 1, true]} />
        <meshPhysicalMaterial
          color="#F5EDE0"
          roughness={0.4}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
          envMapIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cup base cap */}
      <mesh position={[0, -0.175, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 48]} />
        <meshPhysicalMaterial color="#F5EDE0" roughness={0.4} clearcoat={0.4} envMapIntensity={0.5} />
      </mesh>

      {/* Gold rim accent */}
      <mesh position={[0, 0.675, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.615, 0.012, 16, 48]} />
        <meshStandardMaterial color="#C9A463" roughness={0.25} metalness={0.7} />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.66, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.58, 48]} />
        <meshPhysicalMaterial
          color="#2A1710"
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[0.62, 0.3, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.22, 0.055, 16, 32, Math.PI * 1.4]} />
        <meshPhysicalMaterial color="#F5EDE0" roughness={0.4} clearcoat={0.4} envMapIntensity={0.5} />
      </mesh>
    </group>
  );
}
