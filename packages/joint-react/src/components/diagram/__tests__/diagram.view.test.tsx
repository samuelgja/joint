/* eslint-disable sonarjs/no-nested-functions */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createElements, type InferElement } from '../../../utils/create';
import { MeasuredNode } from '../../measured-node/measured-node';
import { act, useEffect, useState, type RefObject } from 'react';
import { useDiagramView } from '../../../hooks/use-diagram-view';
import { Diagram } from '..';
import type { ViewConfig } from '../diagram.view.types';

const elements = createElements([
  { id: '1', label: 'Node 1', width: 10, height: 10 },
  { id: '2', label: 'Node 2', width: 10, height: 10 },
]);

type Element = InferElement<typeof elements>;
const WIDTH = 200;

// we need to mock `new ResizeObserver`, to return the size width 50 and height 50 for test purposes
// Mock ResizeObserver to return a size with width 50 and height 50
jest.mock('../../../utils/create-element-size-observer', () => ({
  createElementSizeObserver: jest.fn((element, onResize) => {
    // Simulate a resize event with specific width and height
    onResize({ width: 50, height: 50 });
    // Return a cleanup function that just calls `disconnect` (this is just a placeholder)
    return () => {};
  }),
}));

// Mock `useAreElementMeasured` to simulate elements being measured
jest.mock('../../../hooks/use-are-elements-measured', () => ({
  useAreElementMeasured: jest.fn(() => true),
}));

describe('DiagramView Component', () => {
  it('renders elements correctly with correct measured node and onMeasured event', async () => {
    const onMeasuredMock = jest.fn();
    let size = { width: 0, height: 0 };

    const renderElement = ({ label, width, height }: Element) => {
      size = { width, height };
      return (
        <foreignObject width={width} height={height}>
          <MeasuredNode>
            <div className="node">{label}</div>
          </MeasuredNode>
        </foreignObject>
      );
    };

    render(
      <Diagram elements={elements}>
        <Diagram.View
          width={WIDTH}
          height={150}
          onElementsSizeReady={onMeasuredMock}
          renderElement={renderElement}
        />
      </Diagram>
    );
    await waitFor(() => {
      expect(screen.getByText('Node 1')).toBeInTheDocument();
      expect(screen.getByText('Node 2')).toBeInTheDocument();
      expect(onMeasuredMock).toHaveBeenCalledTimes(1);
      expect(size).toEqual({ width: 50, height: 50 });
    });
  });

  it('renders elements correctly with useHTMLOverlay enabled', async () => {
    render(
      <Diagram elements={elements}>
        <Diagram.View<Element>
          useHTMLOverlay
          renderElement={({ label }) => {
            return <div className="html-node">{label}</div>;
          }}
        />
      </Diagram>
    );
    await waitFor(() => {
      expect(screen.getByText('Node 1')).toBeInTheDocument();
      expect(screen.getByText('Node 2')).toBeInTheDocument();
      expect(screen.getByText('Node 1').closest('.html-node')).toBeTruthy();
    });
  });

  it('calls onElementsSizeChange when element sizes change', async () => {
    const onElementsSizeChangeMock = jest.fn();
    const updatedElements = createElements([
      { id: '1', label: 'Node 1', width: 100, height: 50 },
      { id: '2', label: 'Node 2', width: 150, height: 75 },
    ]);

    const { rerender } = render(
      <Diagram elements={elements}>
        <Diagram.View<Element>
          onElementsSizeChange={onElementsSizeChangeMock}
          renderElement={({ label }) => <div className="node">{label}</div>}
        />
      </Diagram>
    );

    // Simulate element size change by rerendering with updated elements
    rerender(
      <Diagram elements={updatedElements}>
        <Diagram.View<Element>
          onElementsSizeChange={onElementsSizeChangeMock}
          renderElement={({ label }) => <div className="node">{label}</div>}
        />
      </Diagram>
    );

    await waitFor(() => {
      expect(onElementsSizeChangeMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should fire custom event on the DiagramView', async () => {
    const handleCustomEvent = jest.fn();

    // eslint-disable-next-line unicorn/consistent-function-scoping
    function FireEvent() {
      const { paper } = useDiagramView() ?? {};
      useEffect(() => {
        paper?.trigger('MyCustomEventOnClick', { message: 'Hello from custom event!' });
      }, [paper]);
      return null;
    }

    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const customEvents = { MyCustomEventOnClick: handleCustomEvent };
    render(
      <Diagram elements={elements}>
        <Diagram.View<Element> customEvents={customEvents}>
          <FireEvent />
        </Diagram.View>
      </Diagram>
    );

    await waitFor(() => {
      expect(handleCustomEvent).toHaveBeenCalledTimes(1);
    });
  });

  it('applies default clickThreshold and custom clickThreshold', () => {
    render(
      <Diagram elements={elements}>
        <Diagram.View<Element> />
      </Diagram>
    );
    const DiagramViewElement = document.querySelector('.joint-paper');
    expect(DiagramViewElement).toBeInTheDocument();

    render(
      <Diagram elements={elements}>
        <Diagram.View<Element> clickThreshold={20} />
      </Diagram>
    );
    // Ensure no errors occur when custom clickThreshold is applied
    expect(DiagramViewElement).toBeInTheDocument();
  });

  it('applies scale to the DiagramView', async () => {
    render(
      <Diagram elements={elements}>
        <Diagram.View<Element> scale={2} />
      </Diagram>
    );

    await waitFor(() => {
      const layersGroup = document.querySelector('.joint-layers');
      expect(layersGroup).toHaveAttribute('transform', 'matrix(2,0,0,2,0,0)');
    });
  });

  it('uses default elementSelector and custom elementSelector', async () => {
    const customSelector = jest.fn((item) => ({ ...item, custom: true }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function RenderElement({ custom }: any) {
      return <rect id={custom ? 'isCustom' : 'nope'} width={50} height={50} fill="blue" />;
    }
    render(
      <Diagram elements={elements}>
        <Diagram.View<Element> elementSelector={customSelector} renderElement={RenderElement} />
      </Diagram>
    );

    await waitFor(() => {
      // Validate that the elements are rendered correctly
      const element = document.querySelector('#isCustom');
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('width', '50');
    });
  });

  it('calls onElementsSizeReady when elements are measured', async () => {
    const onElementsSizeReadyMock = jest.fn();
    render(
      <Diagram elements={elements}>
        <Diagram.View<Element> onElementsSizeReady={onElementsSizeReadyMock} />
      </Diagram>
    );
    await waitFor(() => {
      expect(onElementsSizeReadyMock).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onElementsSizeReady when elements are measured - conditional render', async () => {
    const RenderElement = jest.fn(({ label }) => <div className="node">{label}</div>);
    function Content() {
      const [isReady, setIsReady] = useState(false);
      useEffect(() => {
        // eslint-disable-next-line @eslint-react/web-api/no-leaked-timeout, sonarjs/no-nested-functions
        setTimeout(() => {
          setIsReady(true);
        }, 100);
      }, []);
      return (
        <Diagram elements={elements}>
          {isReady && (
            <Diagram.View<Element>
              renderElement={RenderElement}
              onElementsSizeReady={onElementsSizeReadyMock}
            />
          )}
        </Diagram>
      );
    }
    const onElementsSizeReadyMock = jest.fn();
    render(<Content />);
    await waitFor(() => {
      expect(RenderElement).toHaveBeenCalledTimes(2); // Called for each element
      expect(onElementsSizeReadyMock).toHaveBeenCalledTimes(1);
    });
  });

  it('handles ref from DiagramView correctly', () => {
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const ref = { current: null };

    render(
      <Diagram elements={elements}>
        <Diagram.View<Element> ref={ref} />
      </Diagram>
    );
    expect(ref.current).not.toBeNull();
  });
  it('should access paper via context and change scale', async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    function ChangeScale() {
      const { paper } = useDiagramView() ?? {};
      useEffect(() => {
        paper?.scale(2, 2);
      }, [paper]);
      return null;
    }

    render(
      <Diagram elements={elements}>
        <Diagram.View<Element> />
        <ChangeScale />
      </Diagram>
    );

    await waitFor(() => {
      const layersGroup = document.querySelector('.joint-layers');
      expect(layersGroup).toHaveAttribute('transform', 'matrix(2,0,0,2,0,0)');
    });
  });
  it('should access paper via ref and change scale', async () => {
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const ref: RefObject<ViewConfig | null> = { current: null };
    function ChangeScale() {
      const { paper } = ref.current ?? {};
      useEffect(() => {
        paper?.scale(2, 2);
      }, [paper]);
      return null;
    }

    render(
      <Diagram elements={elements}>
        <Diagram.View<Element> ref={ref} />
        <ChangeScale />
      </Diagram>
    );
  });

  it('should set elements and positions via react state, when change it via paper api', async () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    function UpdatePosition() {
      const { paper } = useDiagramView() ?? {};
      useEffect(() => {
        const element = paper?.model.getCell('1');
        // @ts-expect-error we know it's element
        element?.position(100, 100);
      }, [paper]);
      return null;
    }
    let currentOutsideElements: Element[] = [];
    function Content() {
      const [currentElements, setCurrentElements] = useState(elements);
      currentOutsideElements = currentElements;
      return (
        <Diagram elements={currentElements} onElementsChange={setCurrentElements}>
          <Diagram.View<Element> />
          <UpdatePosition />
        </Diagram>
      );
    }
    render(<Content />);
    await waitFor(() => {
      const element1 = currentOutsideElements.find((element) => element.id === '1');
      expect(element1).toBeDefined();
      // @ts-expect-error we know it's element
      expect(element1.x).toBe(100);
      // @ts-expect-error we know it's element
      expect(element1.y).toBe(100);
    });
  });
  it('should update elements via react state, and then reflect the changes in the paper', async () => {
    function Content() {
      const [currentElements, setCurrentElements] = useState(elements);

      return (
        <Diagram elements={currentElements} onElementsChange={setCurrentElements}>
          <Diagram.View<Element>
            renderElement={({ width, height, id }) => {
              return (
                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                <div id={`node-${id}`} style={{ width, height }} className="test-node">
                  {id}
                </div>
              );
            }}
          />
          <button
            type="button"
            onClick={() => {
              setCurrentElements((els) =>
                els.map((element) =>
                  element.id === '1' ? { ...element, width: 200, height: 200 } : element
                )
              );
            }}
          >
            Update Element 1
          </button>
        </Diagram>
      );
    }
    render(<Content />);
    const button = screen.getByRole('button', { name: 'Update Element 1' });
    expect(button).toBeInTheDocument();
    act(() => {
      button.click();
    });
    await waitFor(() => {
      const element = document.querySelector('#node-1');
      expect(element).toBeDefined();
      expect(element).toHaveStyle({ width: '200px', height: '200px' });
    });
  });
  it('should test two separate DiagramView with same diagram, and get their data via id and hooks', async () => {
    let view1Ref: ViewConfig | null = null;
    let view2Ref: ViewConfig | null = null;

    function UserPaper1() {
      const viewConfig = useDiagramView('view1');
      view1Ref = viewConfig ?? null;
      return null;
    }
    function UserPaper2() {
      const viewConfig = useDiagramView('view2');
      view2Ref = viewConfig ?? null;
      return null;
    }

    render(
      <Diagram elements={elements}>
        {/* We can use it above */}
        <UserPaper1 />
        <Diagram.View<Element> id="view1" />
        <Diagram.View<Element> id="view2" />
        {/* We can use it below */}
        <UserPaper2 />
      </Diagram>
    );
    await waitFor(() => {
      expect(view1Ref).not.toBeNull();
      expect(view2Ref).not.toBeNull();
      expect(view1Ref).not.toBe(view2Ref);
      expect(view1Ref?.paper).not.toBe(view2Ref?.paper);
    });
  });
});
