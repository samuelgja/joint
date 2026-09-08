import { normalizeFitOptions } from '../fit-to-content';

describe('normalizeFitOptions', () => {
  it('returns null when the prop is absent or false', () => {
    expect(normalizeFitOptions(undefined)).toBeNull();
    expect(normalizeFitOptions(false)).toBeNull();
  });

  it('maps `true` to centred zoom defaults refitting on resize', () => {
    expect(normalizeFitOptions(true)).toEqual({
      mode: 'zoom',
      refit: 'resize',
      useModelGeometry: true,
      verticalAlign: 'middle',
      horizontalAlign: 'middle',
    });
  });

  it('keeps caller options and fills only the missing defaults', () => {
    expect(normalizeFitOptions({ padding: 40, refit: 'once', verticalAlign: 'top' })).toEqual({
      mode: 'zoom',
      refit: 'once',
      padding: 40,
      useModelGeometry: true,
      verticalAlign: 'top',
      horizontalAlign: 'middle',
    });
  });

  it('normalizes the resize arm without zoom-only defaults', () => {
    expect(normalizeFitOptions({ mode: 'resize', allowNewOrigin: 'any' })).toEqual({
      mode: 'resize',
      refit: 'resize',
      useModelGeometry: true,
      allowNewOrigin: 'any',
    });
  });

  it('does not let an explicit undefined refit erase the default', () => {
    expect(normalizeFitOptions({ refit: undefined })?.refit).toBe('resize');
  });
});
