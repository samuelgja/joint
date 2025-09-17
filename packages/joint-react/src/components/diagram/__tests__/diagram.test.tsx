import React, { createRef, useState } from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { DiagramContext } from '../../../context/diagram-context';
import { createStore, type DiagramStore } from '../../../data/create-diagram-store';
import { dia } from '@joint/core';
import { useElements, useLinks } from '../../../hooks';
import { createElements } from '../../../utils/create';
import type { DiagramElement } from '../../../types/element-types';
import { Diagram } from '..';

describe('diagram', () => {
  it('should render children and match snapshot', () => {
    const { asFragment, getByText } = render(
      <Diagram>
        <div>Child Content</div>
      </Diagram>
    );
    expect(getByText('Child Content')).toMatchSnapshot();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should provide a graph instance in context', () => {
    let contextGraph: DiagramStore | null = null;
    function TestComponent() {
      contextGraph = React.useContext(DiagramContext);
      return null;
    }
    render(
      <Diagram>
        <TestComponent />
      </Diagram>
    );

    if (!contextGraph) {
      throw new Error('contextGraph is not defined');
    }
    expect(contextGraph).toBeDefined();
  });

  it('should render graph provider with links and elements', async () => {
    const elements = createElements([
      {
        width: 100,
        height: 100,
        id: 'element1',
      },
    ]);
    const link = new dia.Link({ id: 'link1', type: 'standard.Link', source: { id: 'element1' } });
    let linkCount = 0;
    let elementCount = 0;
    function TestComponent() {
      linkCount = useElements((items) => items.size);
      elementCount = useLinks((items) => {
        return items.size;
      });
      return null;
    }
    render(
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      <Diagram elements={elements} links={[link]}>
        <TestComponent />
      </Diagram>
    );

    await waitFor(() => {
      expect(linkCount).toBe(1);
      expect(elementCount).toBe(1);
    });
  });
  it('should add elements and links after initial load and useElements and useLinks should catch them', async () => {
    const graph = new dia.Graph();
    let linkCount = 0;
    let elementCount = 0;
    // eslint-disable-next-line sonarjs/no-identical-functions
    function TestComponent() {
      linkCount = useElements((items) => items.size);
      elementCount = useLinks((items) => {
        return items.size;
      });
      return null;
    }
    render(
      <Diagram graph={graph}>
        <TestComponent />
      </Diagram>
    );

    await waitFor(() => {
      expect(linkCount).toBe(0);
      expect(elementCount).toBe(0);
    });

    act(() => {
      graph.addCells([
        new dia.Element({ id: 'element1', type: 'standard.Rectangle' }),
        new dia.Link({ id: 'link1', type: 'standard.Link', source: { id: 'element1' } }),
      ]);
    });

    await waitFor(() => {
      expect(linkCount).toBe(1);
      expect(elementCount).toBe(1);
    });
  });

  it('should initialize with default elements', async () => {
    const elements = createElements([
      { width: 100, height: 100, id: 'element1' },
      { width: 200, height: 200, id: 'element2' },
    ]);
    let elementCount = 0;
    function TestComponent() {
      elementCount = useElements((items) => items.size);
      return null;
    }
    render(
      <Diagram elements={elements}>
        <TestComponent />
      </Diagram>
    );

    await waitFor(() => {
      expect(elementCount).toBe(2);
    });
  });

  it('should use provided store and clean up on unmount', () => {
    const mockDestroy = jest.fn();
    const mockStore = createStore({});
    // @ts-expect-error its just unit test, readonly is not needed
    mockStore.destroy = mockDestroy;

    const { unmount } = render(
      <Diagram store={mockStore}>
        <div>Test</div>
      </Diagram>
    );

    expect(mockDestroy).not.toHaveBeenCalled();
    unmount();
    expect(mockDestroy).toHaveBeenCalled();
  });

  it('should use graph provided by PaperOptions', async () => {
    const graph = new dia.Graph();
    const cell = new dia.Element({ id: 'element1', type: 'standard.Rectangle' });
    graph.addCell(cell);
    let currentElements: DiagramElement[] = [];
    function Elements() {
      const elements = useElements();
      currentElements = elements;
      return null;
    }

    const { unmount } = render(
      <Diagram graph={graph}>
        <Elements />
        <div>Test</div>
      </Diagram>
    );

    expect(graph.getCell('element1')).toBe(cell);

    await waitFor(() => {
      expect(graph.getCells()).toHaveLength(1);
      expect(currentElements).toHaveLength(1);
    });

    act(() => {
      graph.addCell(new dia.Element({ id: 'element2', type: 'standard.Rectangle' }));
    });

    await waitFor(() => {
      expect(graph.getCell('element2')).toBeDefined();
      expect(graph.getCells()).toHaveLength(2);
      expect(currentElements).toHaveLength(2);
    });

    // its external graph, so we do not destroy it
    unmount();
    await waitFor(() => {
      expect(graph.getCells()).toHaveLength(2);
      expect(currentElements).toHaveLength(2);
    });
  });

  it('should use store provided by PaperOptions', async () => {
    const graph = new dia.Graph();
    const store = createStore({ graph });
    const cell = new dia.Element({ id: 'element1', type: 'standard.Rectangle' });
    graph.addCell(cell);
    let currentElements: DiagramElement[] = [];
    // eslint-disable-next-line sonarjs/no-identical-functions
    function Elements() {
      const elements = useElements();
      currentElements = elements;
      return null;
    }

    const { unmount } = render(
      <Diagram store={store}>
        <Elements />
        <div>Test</div>
      </Diagram>
    );

    expect(graph.getCell('element1')).toBe(cell);

    await waitFor(() => {
      expect(graph.getCells()).toHaveLength(1);
      expect(currentElements).toHaveLength(1);
    });

    act(() => {
      graph.addCell(new dia.Element({ id: 'element2', type: 'standard.Rectangle' }));
    });

    await waitFor(() => {
      expect(graph.getCell('element2')).toBeDefined();
      expect(graph.getCells()).toHaveLength(2);
      expect(currentElements).toHaveLength(2);
    });

    // its external graph, so we do not destroy it
    unmount();
    await waitFor(() => {
      expect(graph.getCells()).toHaveLength(2);
      expect(currentElements).toHaveLength(2);
    });
  });

  it('should render graph provider with links and elements - with explicit react type', async () => {
    const elements = createElements([
      {
        width: 100,
        height: 100,
        id: 'element1',
        type: 'ReactElement',
      },
    ]);
    const link = new dia.Link({ id: 'link1', type: 'standard.Link', source: { id: 'element1' } });
    let linkCount = 0;
    let elementCount = 0;
    // eslint-disable-next-line sonarjs/no-identical-functions
    function TestComponent() {
      linkCount = useElements((items) => items.size);
      elementCount = useLinks((items) => {
        return items.size;
      });
      return null;
    }
    render(
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      <Diagram elements={elements} links={[link]}>
        <TestComponent />
      </Diagram>
    );

    await waitFor(() => {
      expect(linkCount).toBe(1);
      expect(elementCount).toBe(1);
    });
  });

  it('should update graph in controlled mode', async () => {
    const initialElements = createElements([
      {
        width: 100,
        height: 100,
        id: 'element1',
        type: 'ReactElement',
      },
    ]);
    const initialLink = new dia.Link({
      id: 'link1',
      type: 'standard.Link',
      source: { id: 'element1' },
    });
    let linkCount = 0;
    let elementCount = 0;
    function TestComponent() {
      linkCount = useLinks((items) => {
        return items.size;
      });
      elementCount = useElements((items) => {
        return items.size;
      });
      return null;
    }

    // eslint-disable-next-line unicorn/consistent-function-scoping
    let setElementsOutside = (_: DiagramElement[]) => {};
    let setLinksOutside = (_: dia.Link[]) => {};

    function Graph() {
      const [elements, setElements] = useState(initialElements);
      const [links, setLinks] = useState([initialLink]);
      setElementsOutside = setElements as unknown as (elements: DiagramElement[]) => void;
      setLinksOutside = setLinks as unknown as (links: dia.Link[]) => void;
      return (
        <Diagram
          elements={elements}
          onElementsChange={setElements}
          links={links}
          onLinksChange={setLinks}
        >
          <TestComponent />
        </Diagram>
      );
    }
    render(<Graph />);

    await waitFor(() => {
      expect(linkCount).toBe(1);
      expect(elementCount).toBe(1);
    });

    act(() => {
      setElementsOutside(
        createElements([
          {
            width: 100,
            height: 100,
            id: 'element1',
            type: 'ReactElement',
          },
          {
            width: 10,
            height: 10,
            id: 'element2',
            type: 'ReactElement',
          },
        ])
      );
    });

    await waitFor(() => {
      expect(linkCount).toBe(1);
      expect(elementCount).toBe(2);
    });

    // add link
    act(() => {
      setLinksOutside([
        new dia.Link({
          id: 'link2',
          type: 'standard.Link',
          source: { id: 'element1' },
          target: { id: 'element2' },
        }),
        new dia.Link({
          id: 'link3',
          type: 'standard.Link',
          source: { id: 'element1' },
          target: { id: 'element2' },
        }),
      ]);
    });

    await waitFor(() => {
      expect(linkCount).toBe(2);
      expect(elementCount).toBe(2);
    });
  });

  it('should pass ref instance to the Diagram component', () => {
    // eslint-disable-next-line @eslint-react/no-create-ref
    const diagramRef = createRef<DiagramStore>();
    render(<Diagram ref={diagramRef} />);
    expect(diagramRef.current).not.toBeNull();
    expect(diagramRef.current?.destroy).toBeDefined();
  });
});
