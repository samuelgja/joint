import { dia, mvc, shapes } from '@joint/core';
import { useElementViews } from '../../hooks/use-element-views';
import { useDiagramStore } from '../../hooks/use-diagram-store';
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { useAreElementMeasured, useElements, useImperativeApi } from '../../hooks';
import { createPortsStore } from '../../data/create-ports-store';
import type { PortElementsCacheEntry } from '../../data/create-ports-data';
import type { DiagramElement } from '../../types/element-types';
import type { DiagramViewProps } from './diagram.view.types';
import { assignOptions, dependencyExtract } from '../../utils/object-utilities';
import { noopSelector } from '../../utils/noop-selector';
import { PaperHTMLContainer } from './render-element/paper-html-container';
import { CellIdContext, DiagramConfigContext, DiagramViewContext } from '../../context';
import { HTMLElementItem, SVGElementItem } from './render-element/paper-element-item';
import { REACT_TYPE } from '../../models/react-element';
import { handlePaperEvents } from '../../utils/handle-paper-events';

const DEFAULT_CLICK_THRESHOLD = 10;

const EMPTY_OBJECT = {} as Record<dia.Cell.ID, dia.ElementView>;

/**
 * DiagramView component renders the visual representation of the graph using JointJS Paper.
 * This component is responsible for managing the rendering of elements and links, handling events, and providing customization options for the graph view.
 * @param props - The properties for the DiagramView component.
 * @param forwardedRef - A reference to the DiagramViewContext instance.
 * @returns The DiagramView component.
 * @example
 * Using the DiagramView component:
 * ```tsx
 * import { DiagramView } from '@joint/react';
 * function App() {
 *   return (
 *     <DiagramView
 *       renderElement={(element) => <rect width={element.width} height={element.height} />}
 *       defaultLink={(cellView, magnet) => new dia.Link()}
 *     >
 *       <MyGraph />
 *     </DiagramView>
 *   );
 * }
 * ```
 */
function DiagramViewBase<ElementItem extends DiagramElement = DiagramElement>(
  props: DiagramViewProps<DiagramElement>,
  forwardedRef: React.ForwardedRef<DiagramViewContext | null>
) {
  const {
    renderElement,
    defaultLink,
    style,
    className,
    elementSelector = noopSelector as (item: DiagramElement) => ElementItem,
    onElementsSizeReady,
    onElementsSizeChange,
    useHTMLOverlay,
    children,
    scale,
    ...paperOptions
  } = props;

  const { graph, setView } = useDiagramStore();
  const areElementsMeasured = useAreElementMeasured();
  const { onRenderElement, elementViews } = useElementViews();
  const elements = useElements((items) => items.map(elementSelector));
  const reactId = useId();
  const { overWrite } = useContext(DiagramConfigContext) ?? {};

  const paperHTMLElement = useRef<HTMLDivElement | null>(null);
  const measured = useRef(false);
  const previousSizesRef = useRef<number[][]>([]);

  const [HTMLRendererContainer, setHTMLRendererContainer] = useState<HTMLElement | null>(null);
  const id = props.id ?? `diagram-${reactId}`;
  const hasRenderElement = !!renderElement;

  const defaultLinkJointJS = useCallback(
    (cellView: dia.CellView, magnet: SVGElement) => {
      const link = typeof defaultLink === 'function' ? defaultLink(cellView, magnet) : defaultLink;
      if (!link) {
        return new shapes.standard.Link();
      }
      if (link instanceof dia.Link) {
        return link;
      }
      return new shapes.standard.Link(link as dia.Link.EndJSON);
    },
    [defaultLink]
  );
  const isReactId = !props.id;

  const { ref: DiagramViewContextRef, isReady } = useImperativeApi(
    {
      onLoad() {
        const portsStore = createPortsStore();
        const elementView = dia.ElementView.extend({
          // Render element using react, `elementView.el` is used as portal gate for react (createPortal)
          onRender() {
            // eslint-disable-next-line unicorn/no-this-assignment, @typescript-eslint/no-this-alias, no-shadow, @typescript-eslint/no-shadow
            const elementView: dia.ElementView = this;
            onRenderElement(elementView);
          },
          // Render port using react, `portData.portElement.node` is used as portal gate for react (createPortal)
          _renderPorts() {
            // This is firing when the ports are rendered (updated, inserted, removed)
            // @ts-expect-error we use private jointjs api method, it throw error here.
            dia.ElementView.prototype._renderPorts.call(this);
            // eslint-disable-next-line unicorn/no-this-assignment, @typescript-eslint/no-this-alias, no-shadow, @typescript-eslint/no-shadow
            const elementView: dia.ElementView = this;

            const portElementsCache: Record<string, PortElementsCacheEntry> =
              this._portElementsCache;
            portsStore.onRenderPorts(elementView.model.id, portElementsCache);
          },
        });
        // Create a new JointJS Paper with the provided options
        const paper = new dia.Paper({
          async: true,
          sorting: dia.Paper.sorting.APPROX,
          preventDefaultBlankAction: false,
          frozen: true,
          defaultLink: defaultLinkJointJS,
          model: graph,
          elementView,
          ...paperOptions,
          clickThreshold: paperOptions.clickThreshold ?? DEFAULT_CLICK_THRESHOLD,
        });

        /**
         * Render paper utility - is called when html element is bind to the react paper component
         * @param element - The HTML element to render the paper into
         * @returns - Context update if any
         */
        function renderPaper(element: HTMLElement | SVGElement) {
          if (!paper) {
            throw new Error('Paper is not created');
          }

          let elementToRender: HTMLElement | SVGElement = paper.el;
          let contextUpdate: Record<string, unknown> | undefined;
          if (overWrite) {
            const result = overWrite(instance);
            elementToRender = result.element;
            contextUpdate = result.contextUpdate ?? undefined;
          }

          if (!elementToRender) {
            throw new Error('overwriteDefaultPaperElement must return a valid HTML or SVG element');
          }

          element.replaceChildren(elementToRender);
          paper.unfreeze();
          return contextUpdate;
        }
        if (!paperHTMLElement.current) {
          throw new Error('Paper HTML element is not available');
        }

        if (scale !== undefined) {
          paper.scale(scale);
        }

        const instance: DiagramViewContext = {
          paper,
          portsStore,
          elementViews: EMPTY_OBJECT,
          id,
          isReactId,
          renderElement,
        };

        const contextUpdate = renderPaper(paperHTMLElement.current);
        if (contextUpdate) {
          Object.assign(instance, contextUpdate);
        }

        const removeView = setView(id, instance);

        return {
          instance,
          cleanup() {
            paper.remove();
            removeView();
            portsStore.destroy();
          },
        };
      },
      onUpdate(instance, reset) {
        if (instance.id !== id) {
          reset();
        }
        const { paper } = instance;
        assignOptions(paper.options, {
          defaultLink: defaultLinkJointJS,
          ...paperOptions,
        });
        const { drawGrid, height, width, theme, gridSize } = paperOptions;
        if (width !== undefined && height !== undefined) {
          paper.setDimensions(width, height);
        }
        if (drawGrid) {
          paper.setGrid(drawGrid);
        }
        if (gridSize !== undefined) {
          paper.setGridSize(gridSize);
        }
        if (theme) {
          paper.setTheme(theme);
        }
        if (scale !== undefined) {
          paper.scale(scale);
        }
      },
    },
    [defaultLinkJointJS, id, scale, isReactId, ...dependencyExtract(paperOptions)]
  );

  useImperativeHandle(forwardedRef, () => {
    if (!isReady) {
      return null as unknown as DiagramViewContext;
    }
    return DiagramViewContextRef.current;
  }, [isReady, DiagramViewContextRef]);

  useEffect(() => {
    if (!isReady) return;
    if (measured.current) return;
    const { paper } = DiagramViewContextRef.current ?? {};
    if (!paper) return;
    if (areElementsMeasured) {
      measured.current = true;
      return onElementsSizeReady?.({ paper, graph: paper.model });
    }

    // Handling dev warning check
    if (process.env.NODE_ENV !== 'production') {
      const timeout = setTimeout(() => {
        if (!areElementsMeasured) {
          // eslint-disable-next-line no-console
          console.error(
            'The elements are not measured yet, please check if elements has defined width and height inside the nodes or using `MeasuredNode` component.'
          );
        }
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [areElementsMeasured, isReady, onElementsSizeReady, DiagramViewContextRef]);

  // Whenever elements change (or we’ve just become measured) compare old ↔ new
  useEffect(() => {
    if (!isReady) return;
    if (!onElementsSizeChange) return;
    if (!areElementsMeasured) return;
    const { paper } = DiagramViewContextRef.current ?? {};
    if (!paper) return;

    // Build current list of [width, height]
    const currentSizes = elements.map(({ width = 0, height = 0 }) => [width, height]);
    const previousSizes = previousSizesRef.current;
    let changed = false;

    // Quick bail-out on length mismatch
    if (previousSizes.length === currentSizes.length) {
      // Otherwise scan for any width/height diff
      for (const [index, currentSize] of currentSizes.entries()) {
        if (
          previousSizes[index][0] !== currentSize[0] ||
          previousSizes[index][1] !== currentSize[1]
        ) {
          changed = true;
          break;
        }
      }
    } else {
      changed = true;
    }

    if (!changed) {
      return;
    }
    // store for next time
    previousSizesRef.current = currentSizes;
    onElementsSizeChange({ paper, graph: paper.model });
  }, [areElementsMeasured, elements, isReady, onElementsSizeChange, DiagramViewContextRef]);

  useLayoutEffect(() => {
    if (!isReady) return;
    if (measured.current) return;
    const { paper } = DiagramViewContextRef.current ?? {};
    if (!paper) {
      return;
    }
    /**
     * Resize the paper container element to match the paper size.
     * @param jointPaper - The paper instance.
     */
    function resizePaperContainer(jointPaper: dia.Paper) {
      if (paperHTMLElement.current && jointPaper.el) {
        paperHTMLElement.current.style.width = jointPaper.el.style.width;
        paperHTMLElement.current.style.height = jointPaper.el.style.height;
      }
    }
    // An object to keep track of the listeners. It's not exposed, so the users
    const controller = new mvc.Listener();
    controller.listenTo(paper, 'resize', resizePaperContainer);
    const stopListening = handlePaperEvents(graph, paper, paperOptions);
    return () => {
      controller.stopListening();
      stopListening();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, isReady, DiagramViewContextRef, ...dependencyExtract(paperOptions)]);

  const content = (
    <>
      {hasRenderElement && useHTMLOverlay && (
        <PaperHTMLContainer onSetElement={setHTMLRendererContainer} />
      )}
      {hasRenderElement &&
        elements.map((cell) => {
          if (!cell.id) {
            return null;
          }
          const elementView = elementViews[cell.id];
          if (!elementView) {
            return null;
          }

          const SVG = elementView.el;
          if (!SVG) {
            return null;
          }

          if (!elementView) {
            return null;
          }
          if (cell.type !== REACT_TYPE) {
            return null;
          }

          return (
            <CellIdContext.Provider key={cell.id} value={cell.id}>
              {useHTMLOverlay && HTMLRendererContainer ? (
                <HTMLElementItem
                  {...cell}
                  portalElement={HTMLRendererContainer}
                  renderElement={renderElement}
                />
              ) : (
                <SVGElementItem {...cell} portalElement={SVG} renderElement={renderElement} />
              )}
            </CellIdContext.Provider>
          );
        })}
    </>
  );

  const defaultStyle = useMemo((): CSSProperties => {
    if (style) {
      return style;
    }
    return {
      width: paperOptions.width ?? '100%',
      height: paperOptions.height ?? '100%',
    };
  }, [paperOptions.height, paperOptions.width, style]);

  const paperContainerStyle = useMemo(
    (): CSSProperties => ({
      opacity: areElementsMeasured ? 1 : 0,
      pointerEvents: areElementsMeasured ? 'all' : 'none',
      position: 'relative',
      ...defaultStyle,
    }),
    [areElementsMeasured, defaultStyle]
  );

  return (
    <DiagramViewContext.Provider value={DiagramViewContextRef.current}>
      <div className={className} ref={paperHTMLElement} style={paperContainerStyle}>
        {isReady && content}
      </div>
      {isReady && children}
    </DiagramViewContext.Provider>
  );
}

/**
 * DiagramView component renders the visual representation of the graph using JointJS Paper.
 * This component is responsible for managing the rendering of elements and links, handling events, and providing customization options for the graph view.
 * @param props - The properties for the DiagramView component.
 * @param forwardedRef - A reference to the DiagramViewContext instance.
 * @returns The DiagramView component.
 * @example
 * Using the DiagramView component:
 * ```tsx
 * import { DiagramView } from '@joint/react';
 * function App() {
 *   return (
 *     <DiagramView
 *       renderElement={(element) => <rect width={element.width} height={element.height} />}
 *       defaultLink={(cellView, magnet) => new dia.Link()}
 *     >
 *       <MyGraph />
 *     </DiagramView>
 *   );
 * }
 * ```
 */
export const DiagramView = forwardRef(DiagramViewBase) as <
  ElementItem extends DiagramElement = DiagramElement,
>(
  props: Readonly<DiagramViewProps<ElementItem>> & { ref?: React.Ref<DiagramViewContext | null> }
) => ReturnType<typeof DiagramViewBase>;
