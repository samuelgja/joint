import type { dia } from '@joint/core';
import type { DiagramLink } from '../../types/link-types';
import type { DiagramElement } from '../../types/element-types';
import { Diagram as RawDiagram, type DiagramProps } from './diagram';
import type { DiagramStore } from '../../data/create-diagram-store';
import { DiagramView } from './diagram.view';
import type { DiagramViewProps } from './diagram.view.types';
import type { DiagramViewContext } from '../../context';

type View = <ElementItem extends DiagramElement = DiagramElement>(
  props: Readonly<DiagramViewProps<ElementItem>> & { ref?: React.Ref<DiagramViewContext | null> }
) => ReturnType<typeof DiagramView>;

type Diagram = <
  Element extends dia.Element | DiagramElement = dia.Element,
  Link extends dia.Link | DiagramLink = dia.Link,
>(
  props: Readonly<DiagramProps<dia.Graph, Element, Link>> & { ref?: React.Ref<DiagramStore | null> }
) => ReturnType<typeof RawDiagram>;

export const Diagram = Object.assign(RawDiagram, {
  View: DiagramView,
}) as Diagram & { View: View };

export type * from './diagram.view.types';
export type { DiagramProps } from './diagram';
export { DiagramProviderHandler } from './diagram';
