import { renderHook } from '@testing-library/react';
import { graphProviderWrapper } from '../../utils/test-wrappers';
import { useCell } from '../use-cell';
import { LABELED_CELLS_AB_LINK } from './__helpers__/cell-fixtures';
import { settle } from './__helpers__/cell-render';
import type { MyElement, MyLink } from './__helpers__/cell-type-fixtures';

const wrapper = graphProviderWrapper({ initialCells: LABELED_CELLS_AB_LINK });

describe('useCell — record-shaped generics', () => {
  it('selector annotation infers Cell type and returns selector return', async () => {
    const { result } = renderHook(() => useCell('a', (element: MyElement) => element.data.label), {
      wrapper,
    });
    await settle();
    expect(result.current).toBe('hi');
  });

  it('link selector annotation works the same', async () => {
    const { result } = renderHook(() => useCell('l1', (link: MyLink) => link.source.id), {
      wrapper,
    });
    await settle();
    expect(result.current).toBe('a');
  });

  it('explicit Cell generic narrows return type', async () => {
    const { result } = renderHook(() => useCell<MyElement>('a'), { wrapper });
    await settle();
    // TypeScript-side: result.current is MyElement | undefined
    expect(result.current?.data.label).toBe('hi');
  });
});
