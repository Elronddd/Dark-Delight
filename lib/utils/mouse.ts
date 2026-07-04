/** Shared pointer-position math, factored out of the several components that
 * were each hand-rolling `getBoundingClientRect()` + subtraction. Each helper
 * matches the exact normalization a given interaction already used, so
 * refactoring call sites to these produces identical numbers. */

type PointerLike = { clientX: number; clientY: number };

/** Raw pixel offset of the pointer from the element's top-left corner. */
export function getPointerOffset(e: PointerLike, el: Element) {
  const rect = el.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top, rect };
}

/** Pointer position as a 0-100 percentage of the element's size (used for glow/shine gradients). */
export function getPointerPercent(e: PointerLike, el: Element) {
  const { x, y, rect } = getPointerOffset(e, el);
  return { x: (x / rect.width) * 100, y: (y / rect.height) * 100 };
}

/** Pointer position normalized to -0.5..0.5 across the element (used for tilt effects). */
export function getPointerNormalized(e: PointerLike, el: Element) {
  const { x, y, rect } = getPointerOffset(e, el);
  return { x: x / rect.width - 0.5, y: y / rect.height - 0.5 };
}

/** Raw pixel offset of the pointer from the element's center (used for magnetic pull). */
export function getPointerFromCenter(e: PointerLike, el: Element) {
  const rect = el.getBoundingClientRect();
  return { x: e.clientX - (rect.left + rect.width / 2), y: e.clientY - (rect.top + rect.height / 2) };
}
