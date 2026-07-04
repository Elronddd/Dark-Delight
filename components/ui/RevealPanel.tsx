"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

/** Wipes a panel into view via clip-path (curtain reveal) with a Ken-Burns zoom-out — reads far more "designed" than an opacity fade. */
export default function RevealPanel({ className = "", innerClassName = "", delay = 0, children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !innerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          delay,
          ease: "power4.inOut",
          scrollTrigger: { trigger: wrapRef.current, start: "top 88%", once: true },
        }
      );
      gsap.fromTo(
        innerRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.6,
          delay,
          ease: "power3.out",
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
