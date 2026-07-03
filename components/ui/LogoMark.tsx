/**
 * Original SVG recreation of the radial flower/mandala medallion from the
 * restaurant's physical signage photo (not traced from the photo itself —
 * that file isn't saved to disk; see plan notes). Swap for a real vector
 * logo file if the client provides one.
 */
export default function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <g fill="#C9A463">
        {petals.map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="28"
            rx="7"
            ry="20"
            transform={`rotate(${angle} 50 50)`}
            opacity="0.9"
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="9" fill="#17110C" stroke="#C9A463" strokeWidth="2" />
    </svg>
  );
}
