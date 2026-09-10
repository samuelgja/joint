import type { dia } from '@joint/core';
import type { FitToContentOptions, FitToContentRefit } from '../components/paper/paper.types';

/**
 * A fully defaulted {@link FitToContentOptions}: `mode` and `refit` are always
 * present, so callers never re-apply defaults.
 * @internal
 */
export type ResolvedFitOptions =
  | (Readonly<dia.Paper.TransformToFitContentOptions> & {
      readonly mode: 'zoom';
      readonly refit: FitToContentRefit;
    })
  | (Readonly<dia.Paper.FitToContentOptions> & {
      readonly mode: 'resize';
      readonly refit: FitToContentRefit;
    });

const DEFAULT_REFIT: FitToContentRefit = 'resize';

/** Centred, model-geometry framing — what the effect this prop replaces did by hand. */
const ZOOM_DEFAULTS: Readonly<dia.Paper.TransformToFitContentOptions> = {
  useModelGeometry: true,
  verticalAlign: 'middle',
  horizontalAlign: 'middle',
};

const RESIZE_DEFAULTS: Readonly<dia.Paper.FitToContentOptions> = {
  useModelGeometry: true,
};

/**
 * Fills in the defaults for the `fitToContent` prop, turning its
 * `boolean | FitToContentOptions` shape into one resolved object.
 * @param input - The raw prop value.
 * @returns Resolved options, or `null` when fitting is switched off.
 * @internal
 */
export function normalizeFitOptions(
  input: boolean | FitToContentOptions | undefined
): ResolvedFitOptions | null {
  if (!input) return null;
  if (input === true) return { ...ZOOM_DEFAULTS, mode: 'zoom', refit: DEFAULT_REFIT };
  const refit = input.refit ?? DEFAULT_REFIT;
  // `mode` and `refit` are re-applied after the spread so an explicit
  // `undefined` from the caller cannot erase the default.
  if (input.mode === 'resize') {
    return { ...RESIZE_DEFAULTS, ...input, mode: 'resize', refit };
  }
  return { ...ZOOM_DEFAULTS, ...input, mode: 'zoom', refit };
}
