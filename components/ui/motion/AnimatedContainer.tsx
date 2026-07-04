type Props = {
  children: React.ReactNode;
  className?: string;
  /** Marks this element as a target for the nearest parent AnimatedSection's
   * stagger reveal. Defaults to true — pass false to render a plain,
   * non-animated wrapper. */
  reveal?: boolean;
};

/**
 * Thin semantic wrapper for a single "revealable" child inside an
 * AnimatedSection — sugar for `<div data-reveal>`, so call sites read as
 * intent ("this fades in") rather than a bare data attribute.
 */
export default function AnimatedContainer({ children, className = "", reveal = true }: Props) {
  return (
    <div className={className} data-reveal={reveal || undefined}>
      {children}
    </div>
  );
}
