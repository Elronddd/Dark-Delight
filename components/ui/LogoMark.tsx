/**
 * Original abstract mark — a single droplet/petal form inside a thin ring,
 * evoking a pour caught mid-motion. Restrained on purpose: a busy icon would
 * fight the bold Unbounded wordmark it sits beside.
 */
export default function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#DDBABA" strokeWidth="1.5" opacity="0.5" />
      <path
        d="M50 24C50 24 70 52 70 66C70 77 61 85 50 85C39 85 30 77 30 66C30 52 50 24 50 24Z"
        fill="#944B4B"
      />
      <path
        d="M50 24C50 24 70 52 70 66C70 77 61 85 50 85"
        fill="none"
        stroke="#DDBABA"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  );
}
