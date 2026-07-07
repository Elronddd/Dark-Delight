type Props = {
  children: React.ReactNode;
  className?: string;
  /** Marks this element as a target for the nearest parent AnimatedSection's
   * stagger reveal. Defaults to true — pass false to render a plain,
   * non-animated wrapper. */
  reveal?: boolean;
};

/** Thin semantic wrapper for a single "revealable" child inside an AnimatedSection. */
export default function AnimatedContainer({ children, className = "", reveal = true }: Props) {
  return (
    <div className={className} data-reveal={reveal || undefined}>
      {children}
    </div>
  );
}
