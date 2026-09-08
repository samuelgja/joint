import { mvc } from '@joint/core';
import { useLayoutEffect, useRef } from 'react';
import type { PaperStore } from '../store/paper-store';
import type { FitToContentOptions } from '../components/paper/paper.types';
import { normalizeFitOptions, resolveFitHost, runFit } from '../utils/fit-to-content';
import { warnFitToContentWithTransform } from '../utils/dev-warnings';
import { simpleScheduler } from '../utils/scheduler';
import { useGraphStore } from './use-graph-store';
import { useLatestRef } from './use-latest-ref';

/** Graph events that change the content bounds, for `refit: 'always'`. */
const CONTENT_EVENTS = ['add', 'remove', 'reset', 'change:position', 'change:size'];

/**
 * Runs the `<Paper>` `fitToContent` prop: frames the diagram once elements are
 * measured, and again according to `refit`.
 *
 * Splitting the wiring by trigger keeps each subscription keyed on primitives
 * (`refit`), so changing an unrelated fit option never re-subscribes.
 * @param paperStore - Store of the paper to fit, `undefined` before it mounts.
 * @param input - The raw `fitToContent` prop value.
 * @param hasTransform - Whether the `transform` prop is also set; the fit then
 *   stands down, since both write the viewport matrix.
 * @internal
 */
export function useFitToContent(
  paperStore: PaperStore | undefined,
  input: boolean | FitToContentOptions | undefined,
  hasTransform: boolean
): void {
  const normalized = normalizeFitOptions(input);
  const isRequested = normalized !== null;
  const isEnabled = isRequested && !hasTransform;
  const refit = normalized?.refit ?? null;

  // Declared before the effects below so its layout effect commits the latest
  // options first; the effects then read fresh values without depending on them.
  const optionsRef = useLatestRef(normalized);
  const { measureState, graph } = useGraphStore();
  const hasFittedRef = useRef(false);
  // Host size at the last fit, as `${width}x${height}`. Only `mode: 'resize'`
  // changes the paper's own size, so only it can feed the ResizeObserver below
  // with the echo of its own fit; comparing sizes drops exactly those callbacks
  // while letting a real resize through. A timer-based guard would not:
  // `requestAnimationFrame` never runs in a background tab, which would latch
  // the guard on forever.
  const fittedSizeRef = useRef<string | null>(null);

  const readHostSize = (host: Element) => `${host.clientWidth}x${host.clientHeight}`;

  const fitRef = useLatestRef(() => {
    const options = optionsRef.current;
    if (!options || !paperStore) return;
    runFit(paperStore, options);
    hasFittedRef.current = true;
    fittedSizeRef.current = readHostSize(resolveFitHost(paperStore));
  });
  // Stable identity, so `simpleScheduler` coalesces a burst of triggers into
  // one fit instead of queueing a fresh closure per call.
  const dispatchRef = useRef(() => fitRef.current());

  useLayoutEffect(() => {
    if (isRequested && hasTransform && paperStore) {
      warnFitToContentWithTransform(paperStore.paperId);
    }
  }, [isRequested, hasTransform, paperStore]);

  // Initial fit: the first measurement pass, for every refit policy.
  useLayoutEffect(() => {
    if (!isEnabled || !paperStore) return;
    hasFittedRef.current = false;

    const handleMeasure = () => {
      if (measureState.get() === 0) return;
      // Later passes only matter to 'always'; 'once' and 'resize' fit one time.
      if (hasFittedRef.current && refit !== 'always') return;
      simpleScheduler(dispatchRef.current);
    };

    handleMeasure();
    return measureState.subscribe(handleMeasure);
  }, [isEnabled, paperStore, measureState, refit]);

  // Host resize, for 'resize' and 'always'.
  useLayoutEffect(() => {
    if (!isEnabled || !paperStore || refit === 'once') return;
    const host = resolveFitHost(paperStore);
    const observer = new ResizeObserver(() => {
      if (!hasFittedRef.current) return;
      // In resize mode an unchanged size means this callback is our own echo.
      if (optionsRef.current?.mode === 'resize' && readHostSize(host) === fittedSizeRef.current) {
        return;
      }
      simpleScheduler(dispatchRef.current);
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, [isEnabled, paperStore, refit]);

  // Content changes, for 'always' only.
  useLayoutEffect(() => {
    if (!isEnabled || !paperStore || refit !== 'always') return;
    const listener = new mvc.Listener();
    for (const eventName of CONTENT_EVENTS) {
      listener.listenTo(graph, eventName, () => simpleScheduler(dispatchRef.current));
    }
    return () => listener.stopListening();
  }, [isEnabled, paperStore, refit, graph]);
}
