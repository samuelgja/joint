import { createContext } from 'react';
import type { DiagramStore } from '../data/create-diagram-store';
import type { dia } from '@joint/core';
import type { ViewConfig } from '../components/diagram/diagram.view.types';

export type StoreContext<Graph extends dia.Graph = dia.Graph> = DiagramStore<Graph>;
export const DiagramContext = createContext<DiagramStore | null>(null);
export const DiagramAreElementsMeasuredContext = createContext<boolean>(false);
export const DiagramViewContext = createContext<ViewConfig | null>(null);
export const CellIdContext = createContext<dia.Cell.ID | undefined>(undefined);
