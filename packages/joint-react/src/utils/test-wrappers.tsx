import { useCallback } from 'react';
import { Diagram, type DiagramProps, type DiagramViewProps } from '../components';

/**
 * Testing helper to render a `Diagram` provider.
 * @param props - Props forwarded to the `Diagram` root component.
 * @returns A component that wraps children with `Diagram`.
 * @internal
 * @group utils
 */
export function diagramProviderWrapper(props: DiagramProps): React.JSXElementConstructor<{
  children: React.ReactNode;
}> {
  return function DiagramProviderWrapper({ children }) {
    return <Diagram {...props}>{children}</Diagram>;
  };
}

interface Options {
  diagramViewProps?: DiagramViewProps;
  diagramProps?: DiagramProps;
}
/**
 * Testing helper to render a `Diagram.View` inside a `Diagram` provider.
 * @param options - Wrapper options.
 * @param options.paperProps - Props for `Diagram.View`.
 * @param options.graphProps - Props for the `Diagram` root.
 * @returns A component that wraps children inside `Diagram` + `Diagram.View`.
 * @internal
 * @group utils
 */
export function paperRenderElementWrapper(options: Options): React.JSXElementConstructor<{
  children: React.ReactNode;
}> {
  const { diagramViewProps, diagramProps } = options;
  return function GraphProviderWrapper({ children }) {
    const renderElement = useCallback(() => {
      return children;
    }, [children]);
    return (
      <Diagram {...diagramProps}>
        <Diagram.View
          {...diagramViewProps}
          width={100}
          height={100}
          renderElement={renderElement}
        ></Diagram.View>
      </Diagram>
    );
  };
}

export const simpleRenderElementWrapper = paperRenderElementWrapper({
  diagramProps: {
    elements: [
      {
        id: '1',
        width: 97,
        height: 99,
      },
    ],
    links: [
      {
        id: '3',
        source: '1',
        target: '2',
      },
    ],
  },
});
