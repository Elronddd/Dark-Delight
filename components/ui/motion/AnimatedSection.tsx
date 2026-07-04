"use client";

import { useScrollReveal } from "@/lib/scroll/useScrollReveal";

type Props = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  /** Slide-up distance in px for the reveal (default matches useScrollReveal's own default of 32). */
  y?: number;
  /** Delay between each `data-reveal` child's entrance. */
  stagger?: number;
  /** Element tag to render — "section" when this wrapper IS the landmark
   * (e.g. an anchor-jump target that also needs the reveal). */
  as?: "div" | "section";
};

/**
 * Standard "reveal on scroll" wrapper — replaces the repeated
 * `const ref = useScrollReveal(...); <div ref={ref}>` pattern that was
 * copy-pasted into every section. Mark the children that should fade/slide
 * in with `data-reveal`; if none are marked, the whole block animates as one.
 * Any standard HTML/ARIA attribute (id, aria-labelledby, etc.) passes through.
 */
export default function AnimatedSection({ children, y, stagger, as = "div", ...rest }: Props) {
  const ref = useScrollReveal<HTMLElement>({ y, stagger });

  // Cast needed because a single ref (typed HTMLElement, the common
  // supertype) is shared across two possible tags — TypeScript's DOM ref
  // types are invariant per-element, so no single ref type satisfies both
  // <div> and <section> without this, same as the equivalent cast in
  // AnimatedHeading's polymorphic `as` prop.
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
