import { createContext } from 'react';
import type { DiagramStore } from '../data/create-diagram-store';
import type { dia } from '@joint/core';
import type { RenderElement } from '../components';
import type { DiagramElement } from '../types/element-types';
import type { PortsStore } from '../data/create-ports-store';
export interface DiagramViewContext {
  readonly id: string;
  readonly paper: dia.Paper;
  readonly portsStore: PortsStore;
  readonly elementViews: Record<dia.Cell.ID, dia.ElementView>;
  renderElement?: RenderElement<DiagramElement>;
  readonly isReactId: boolean;
}

export type StoreContext<Graph extends dia.Graph = dia.Graph> = DiagramStore<Graph>;
export const DiagramContext = createContext<DiagramStore | null>(null);
export const DiagramAreElementsMeasuredContext = createContext<boolean>(false);
export const DiagramViewContext = createContext<DiagramViewContext | null>(null);
export const CellIdContext = createContext<dia.Cell.ID | undefined>(undefined);

export interface OverWriteResult {
  readonly element: HTMLElement | SVGElement;
  readonly contextUpdate: Record<string, unknown>;
}
export interface DiagramConfigContext {
  /**
   * On load custom element.
   * If provided, it must return valid HTML or SVG element and it will be replaced with the default paper element.
   * So it overwrite default paper rendering.
   * It is used internally for example to render `PaperScroller` from [joint plus](https://www.jointjs.com/jointjs-plus) package.
   * @param ctx - The paper context
   * @returns
   */
  overWrite?: (ctx: DiagramViewContext) => OverWriteResult;
}

export const DiagramConfigContext = createContext<DiagramConfigContext | null>(null);
