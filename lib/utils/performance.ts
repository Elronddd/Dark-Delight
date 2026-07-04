/** Throttles a callback to at most once per animation frame — used for
 * high-frequency DOM events (scroll, resize) that don't need to run more
 * often than the browser can paint. */
export function rafThrottle<Args extends unknown[]>(
  fn: (...args: Args) => void
): (...args: Args) => void {
  let scheduled = false;
  let lastArgs: Args;

  return (...args: Args) => {
    lastArgs = args;
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      fn(...lastArgs);
    });
  };
}
