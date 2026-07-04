"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_OUT_SOFT, EASE_IN_OUT_STRONG } from "@/lib/animations/easing";
import { DURATION } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/utils/viewport";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** Layout/sizing/overflow/rounding — goes on the clipped outer wrapper. */
  className?: string;
  /** Background/gradient/image — goes on the inner element that Ken-Burns zooms. */
  innerClassName?: string;
  /** Stagger offset (seconds) when several panels reveal together. */
  delay?: number;
  children?: React.ReactNode;
};

/**
 * Wipes a panel into view via clip-path (curtain reveal) with a Ken-Burns
 * zoom-out — reads far more "designed" than an opacity fade. Currently used
 * with styled gradient placeholders (see content/business.ts notes on real
 * photography); when real photos land, swap the `innerClassName` gradient
 * div for a `next/image` `<Image fill>` here and set `sizes`/`priority`
 * appropriately for the slot (hero-adjacent panels should set `priority`,
 * below-the-fold gallery frames should not).
 */
export default function AnimatedImage({ className = "", innerClassName = "", delay = 0, children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

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
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className={`relative h-full w-full ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
