"use client";

import { useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sparkles, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, DepthOfField } from "@react-three/postprocessing";
import CupModel from "./CupModel";
import SteamPlanes from "./SteamPlanes";
import { useAppStore } from "@/lib/store/useAppStore";
import { detectStaticTier } from "@/lib/quality/detectTier";
import { tierConfig } from "@/lib/quality/tiers";
import { useAutoDowngrade } from "@/lib/quality/useAutoDowngrade";

function CameraParallax() {
  const { camera } = useThree();
  const base = { x: 0, y: 0.4 };
  useFrame((state) => {
    const targetX = base.x + state.pointer.x * 0.25;
    const targetY = base.y + state.pointer.y * 0.12;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0.4, 0, 0);
  });
  return null;
}

function SceneContents() {
  useAutoDowngrade();
  const tier = useAppStore((s) => s.qualityTier) ?? "medium";
  const config = tierConfig[tier];

  return (
    <>
      <CameraParallax />
      <ambientLight intensity={0.35} />
      <spotLight position={[2, 3, 2]} angle={0.35} penumbra={0.6} intensity={1.1} color="#F2B15A" />
      <pointLight position={[-2, 1, -1]} intensity={0.3} color="#E8821E" />

      <group position={[1.1, -0.1, 0]} scale={0.62}>
        <CupModel />
        <SteamPlanes count={config.steamPlanes} />
        {config.sparkles > 0 && (
          <Sparkles count={config.sparkles} scale={[3, 2, 3]} size={2} speed={0.3} color="#F2B15A" opacity={0.5} />
        )}
        {/* Baked once (frames=1) — a real-time contact shadow re-render every
            frame was a major, unnecessary cost for a cup that barely moves. */}
        <ContactShadows frames={1} position={[0, -0.42, 0]} opacity={0.4} scale={4} blur={2} far={1} resolution={256} />
      </group>

      {tier !== "low" && <Environment preset="apartment" resolution={16} />}

      {(config.postprocessing.bloom || config.postprocessing.dof || config.postprocessing.vignette) && (
        <EffectComposer multisampling={0}>
          {config.postprocessing.bloom ? (
            <Bloom luminanceThreshold={0.75} intensity={0.35} mipmapBlur={false} />
          ) : (
            <></>
          )}
          {config.postprocessing.dof ? (
            <DepthOfField focusDistance={0.01} focalLength={0.05} bokehScale={3} />
          ) : (
            <></>
          )}
          {config.postprocessing.vignette ? (
            <Vignette eskil={false} offset={0.2} darkness={0.6} />
          ) : (
            <></>
          )}
        </EffectComposer>
      )}
    </>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  const qualityTier = useAppStore((s) => s.qualityTier);
  const setQualityTier = useAppStore((s) => s.setQualityTier);

  useEffect(() => {
    if (!qualityTier) setQualityTier(detectStaticTier());
  }, [qualityTier, setQualityTier]);

  const dpr = qualityTier ? tierConfig[qualityTier].dpr : ([1, 1.5] as [number, number]);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0.4, 3.2], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={active ? "always" : "never"}
    >
      <SceneContents />
    </Canvas>
  );
}
