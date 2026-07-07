"use client";

import { useScrollReveal, type RevealVariant } from "@/lib/scroll/useScrollReveal";

type Props = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  y?: number;
  stagger?: number;
  as?: "div" | "section";
  variant?: RevealVariant;
  rotate?: number;
};

/**
 * Standard "reveal on scroll" wrapper. Mark the children that should
 * fade/slide in with `data-reveal`; if none are marked, the whole block
 * animates as one. Any standard HTML/ARIA attribute passes through.
 */
export default function AnimatedSection({
  children,
  y,
  stagger,
  as = "div",
  variant,
  rotate,
  ...rest
}: Props) {
  const ref = useScrollReveal<HTMLElement>({ y, stagger, variant, rotate });

  // Cast needed because a single ref (typed HTMLElement) is shared across two
  // possible tags — TypeScript's DOM ref types are invariant per-element.
  if (as === "section") {
    return (
      <section ref={ref as React.Ref<never>} {...rest}>
        {children}
      </section>
    );
  }

  return (
    <div ref={ref as React.Ref<never>} {...rest}>
      {children}
    </div>
  );
}
