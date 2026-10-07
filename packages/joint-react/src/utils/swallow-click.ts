/**
 * Swallow the next native `click`, so a gesture that moved does not also click.
 *
 * joint-core already withholds its own `pointerclick` once the pointer travels past
 * `clickThreshold`, but the browser still fires a DOM `click` whenever press and release
 * share a target — which a drag does whenever the node follows the pointer, as when an
 * element is moved by a button inside it. Without this, dragging a node by its button
 * would run the button's `onClick` on release.
 *
 * Capture on `document` rather than `paper.el`: React attaches its listeners to the
 * portal container, so a listener on `paper.el` could be ordered behind them.
 */
function swallowClick(event: Event): void {
  event.stopPropagation();
  event.preventDefault();
}

/**
 * Withholds the next native `click` on the page, see {@link swallowClick}.
 */
export function swallowNextClick(): void {
  document.addEventListener('click', swallowClick, { capture: true, once: true });
  // A drag released off the pressed node fires no click at all; drop the listener so it
  // cannot eat an unrelated one later. Re-adding the same function is a no-op, so
  // overlapping gestures cannot stack listeners.
  setTimeout(() => document.removeEventListener('click', swallowClick, true), 0);
}
