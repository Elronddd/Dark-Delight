/** Lightweight, no-WebGL stand-in for the hero scene on Low quality-tier devices. */
export default function HeroFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(60% 50% at 50% 60%, rgba(232,130,30,0.35), transparent 70%), radial-gradient(80% 60% at 50% 100%, rgba(196,101,15,0.25), transparent 70%)",
      }}
    />
  );
}
