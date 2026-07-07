"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_OUT_VELVET, EASE_IN_OUT_SILK } from "@/lib/animations/easing";
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
  delay?: number;
  children?: React.ReactNode;
  /** Adds a slow scroll-scrubbed vertical drift on top of the entrance reveal. */
  parallax?: boolean;
  /** Adds a subtle pointer-tilt + scale on hover (fine-pointer devices only). */
  hoverTilt?: boolean;
  /** Real photo to fill the panel. When set, innerClassName should drop its gradient (keep "grain"). */
  src?: string;
  alt?: string;
  sizes?: string;
};

/**
 * Wipes a panel into view via clip-path (curtain reveal) with a Ken-Burns
 * zoom-out. The hover-tilt lives on the same node GSAP clip-path-masks —
 * safe because GSAP only ever touches `clip-path` there while Framer only
 * ever touches `transform`, so the two never fight over one CSS property.
 */
export default function AnimatedImage({
  className = "",
  innerClassName = "",
  delay = 0,
  children,
  parallax = false,
  hoverTilt = false,
  src,
  alt = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
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
          ease: EASE_IN_OUT_SILK,
          scrollTrigger: { trigger: wrapRef.current, start: "top 88%", once: true },
        }
      );
      gsap.fromTo(
        innerRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: DURATION.slower,
          delay,
          ease: EASE_OUT_VELVET,
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
        whileHover={tiltEnabled ? { scale: 1.03 } : undefined}
        transition={SPRING_CARD_TILT}
        style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
        className="h-full w-full overflow-hidden"
      >
        <div ref={innerRef} className={`relative h-full w-full ${innerClassName}`}>
          {src && (
            <>
              <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
            </>
          )}
          {children}
        </div>
      </motion.div>
    </div>
  );
}
