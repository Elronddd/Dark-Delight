"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils/viewport";

// Each clip is trimmed to ~4s (see scripts used to produce these under
// public/), except the cocktail garnish clip which runs ~4.7s — coffee pour,
// milk pour, wok fire, cocktail garnish — totalling ~16.7s before the
// sequence loops back to the first.
const SEQUENCE = ["/hero-1-coffee.mp4", "/hero-2-barista.mp4", "/hero-3-chef.mp4", "/hero-4-cocktail.mp4"];
const FADE_SECONDS = 0.7;

/**
 * Full-bleed looping video background that cycles through SEQUENCE with a
 * crossfade at each switch, using two stacked <video> elements (only one
 * visible at a time) so the next clip can start playing slightly before the
 * current one ends, giving a true overlap-fade rather than a cut-to-black.
 *
 * Browsers routinely pause a backgrounded <video> when the tab regains focus
 * (power-saving/autoplay policy) rather than resuming it, which reads as
 * "the hero animation vanished" — the visibilitychange listener below
 * explicitly resumes whichever clip should be playing. Any future looping
 * background video/canvas needs this same resume-on-visible handling.
 */
export default function HeroVideoBackground() {
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const activeSlotRef = useRef<0 | 1>(0);
  const indexRef = useRef(0);
  const transitioningRef = useRef(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const first = videoRefs[0].current;
    if (!first) return;
    first.src = SEQUENCE[0];
    first.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const handleTimeUpdate = () => {
      const slot = activeSlotRef.current;
      const active = videoRefs[slot].current;
      const next = videoRefs[slot === 0 ? 1 : 0].current;
      if (!active || !next || transitioningRef.current) return;
      if (!active.duration || active.duration - active.currentTime > FADE_SECONDS) return;

      transitioningRef.current = true;
      const nextIndex = (indexRef.current + 1) % SEQUENCE.length;
      next.src = SEQUENCE[nextIndex];
      next.currentTime = 0;
      next.play().catch(() => {});

      const newSlot = slot === 0 ? 1 : 0;
      activeSlotRef.current = newSlot;
      indexRef.current = nextIndex;
      setActiveSlot(newSlot);

      window.setTimeout(() => {
        transitioningRef.current = false;
      }, FADE_SECONDS * 1000);
    };

    const videos = videoRefs.map((r) => r.current).filter((v): v is HTMLVideoElement => Boolean(v));
    videos.forEach((v) => v.addEventListener("timeupdate", handleTimeUpdate));
    return () => videos.forEach((v) => v.removeEventListener("timeupdate", handleTimeUpdate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const resume = () => {
      if (document.visibilityState !== "visible") return;
      videoRefs.forEach((r) => {
        const v = r.current;
        if (v && v.src && v.paused) v.play().catch(() => {});
      });
    };

    document.addEventListener("visibilitychange", resume);
    const videos = videoRefs.map((r) => r.current).filter((v): v is HTMLVideoElement => Boolean(v));
    videos.forEach((v) => v.addEventListener("pause", resume));

    return () => {
      document.removeEventListener("visibilitychange", resume);
      videos.forEach((v) => v.removeEventListener("pause", resume));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-ink">
      {!reducedMotion && (
        <>
          <video
            ref={videoRefs[0]}
            className="absolute inset-0 h-full w-full object-cover transition-opacity ease-linear"
            style={{ opacity: activeSlot === 0 ? 0.3 : 0, transitionDuration: `${FADE_SECONDS}s` }}
            muted
            playsInline
            preload="auto"
          />
          <video
            ref={videoRefs[1]}
            className="absolute inset-0 h-full w-full object-cover transition-opacity ease-linear"
            style={{ opacity: activeSlot === 1 ? 0.3 : 0, transitionDuration: `${FADE_SECONDS}s` }}
            muted
            playsInline
            preload="auto"
          />
        </>
      )}
      {/* The source clips are bright — this scrim needs to stay strong and
          fairly uniform (not just a bottom-heavy fade) so the cream headline
          keeps AA-level contrast wherever it sits. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 60% 45%, rgba(148,75,75,0.22), transparent 70%), linear-gradient(180deg, rgba(18,8,10,0.72), rgba(18,8,10,0.88))",
        }}
      />
    </div>
  );
}
