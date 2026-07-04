"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_OUT_STRONG } from "@/lib/animations/easing";
import { DURATION } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/utils/viewport";

gsap.registerPlugin(ScrollTrigger);

type Tag = "h1" | "h2" | "h3" | "p";

type Props = {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  /** "mount" animates immediately (e.g. the hero, which loads before any scrolling); "scroll" waits for the element to enter the viewport. */
  trigger?: "scroll" | "mount";
};

/**
 * Masks each word behind overflow-hidden and wipes it up into place with a
 * staggered, slightly-rotated entrance — reads as considerably more
 * "designed" than a single fade/translate block.
 */
export default function AnimatedHeading({
  text,
  as = "h2",
  className = "",
  delay = 0,
  trigger = "scroll",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const words = text.split(" ");
  const Tag = as;

  useEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = ref.current!.querySelectorAll("[data-word-inner]");
      gsap.fromTo(
        targets,
        { yPercent: 115, rotate: 6, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: DURATION.base,
          ease: EASE_OUT_STRONG,
          stagger: 0.045,
          delay,
          scrollTrigger:
            trigger === "scroll" ? { trigger: ref.current, start: "top 85%", once: true } : undefined,
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, trigger]);

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.15em] mb-[-0.15em] align-top">
            <span data-word-inner className="inline-block">
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
