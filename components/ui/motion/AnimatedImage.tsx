"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_OUT_SOFT, EASE_IN_OUT_STRONG } from "@/lib/animations/easing";
import { DURATION } from "@/lib/constants";
import { SPRING_CARD_TILT } from "@/lib/animations/transitions";
import { hasFinePointer, prefersReducedMotion } from "@/lib/utils/viewport";
import { useParallaxScrub } from "@/lib/scroll/useParallaxScrub";
import { getPointerNormalized } from "@/lib/utils/mouse";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** Layout/sizing/overflow/rounding — goes on the outermost element. */
  className?: string;
  /** Background/gradient/image — goes on the inner element that Ken-Burns zooms. */
  innerClassName?: string;
  /** Stagger offset (seconds) when several panels reveal together. */
  delay?: number;
  children?: React.ReactNode;
  /** Adds a slow scroll-scrubbed vertical drift on top of the entrance reveal. */
  parallax?: boolean;
  /** Adds a subtle pointer-tilt + scale on hover (fine-pointer devices only). */
  hoverTilt?: boolean;
  /** Ambient sheen sweep across the placeholder gradient — off by default since
   * it's only meant for the styled gradient stand-ins, not real photography. */
  shimmer?: boolean;
};

/**
 * Wipes a panel into view via clip-path (curtain reveal) with a Ken-Burns
 * zoom-out — reads far more "designed" than an opacity fade. Currently used
 * with styled gradient placeholders (see content/business.ts notes on real
 * photography); when real photos land, swap the `innerClassName` gradient
 * div for a `next/image` `<Image fill>` here and set `sizes`/`priority`
 * appropriately for the slot (hero-adjacent panels should set `priority`,
 * below-the-fold gallery frames should not).
 *
 * The optional hover-tilt lives on the same node GSAP clip-path-masks (wrapRef)
 * — safe because GSAP only ever touches `clip-path` there while Framer only
 * ever touches `transform`, so the two never fight over one CSS property (the
 * bug that caused Hero's reported jank came from two systems both writing
 * `transform` on the same element). The optional scroll parallax and the
 * Ken-Burns zoom each get their own separate element for the same reason.
 */
export default function AnimatedImage({
  className = "",
  innerClassName = "",
  delay = 0,
  children,
  parallax = false,
  hoverTilt = false,
  shimmer = false,
}: Props) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [tiltEnabled, setTiltEnabled] = useState(false);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [6, -6]), SPRING_CARD_TILT);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-6, 6]), SPRING_CARD_TILT);

  useParallaxScrub(parallaxRef, 12, parallax);

  useEffect(() => {
    setTiltEnabled(hoverTilt && hasFinePointer() && !prefersReducedMotion());
  }, [hoverTilt]);

  useEffect(() => {
    if (!wrapRef.current || !innerRef.current) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: DURATION.slow,
          delay,
          ease: EASE_IN_OUT_STRONG,
          scrollTrigger: { trigger: wrapRef.current, start: "top 88%", once: true },
        }
      );
      gsap.fromTo(
        innerRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          duration: DURATION.slower,
          delay,
          ease: EASE_OUT_SOFT,
          scrollTrigger: { trigger: wrapRef.current, start: "top 88%", once: true },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={parallax ? parallaxRef : undefined} className={className}>
      <motion.div
        ref={wrapRef}
        data-cursor-hover={hoverTilt || undefined}
        onPointerMove={(e) => {
          if (!tiltEnabled || !wrapRef.current) return;
          const { x, y } = getPointerNormalized(e, wrapRef.current);
          tiltX.set(x);
          tiltY.set(y);
        }}
        onPointerLeave={() => {
          tiltX.set(0);
          tiltY.set(0);
        }}
        whileHover={tiltEnabled ? { scale: 1.04 } : undefined}
        transition={SPRING_CARD_TILT}
        style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
        className="h-full w-full overflow-hidden"
      >
        <div ref={innerRef} className={`relative h-full w-full ${shimmer ? "shimmer" : ""} ${innerClassName}`}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
