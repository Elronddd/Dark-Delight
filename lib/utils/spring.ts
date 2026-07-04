/**
 * Per-frame damped approach toward a target value — the same "exponential
 * smoothing" used for manual R3F useFrame lerps (camera parallax, idle model
 * rotation) where Framer Motion's spring system doesn't apply. Not a true
 * mass-spring-damper; just a named, reusable version of `current +=
 * (target - current) * factor` so the same tuned feel isn't hand-rolled in
 * multiple places.
 */
export function approach(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}
