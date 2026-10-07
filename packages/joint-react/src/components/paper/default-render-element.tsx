import { HTMLBox } from '../html-box';
import { isNumber, isRecord, isString } from '../../utils/is';

/**
 * The element renderer used when no `renderElement` is given: `data.label`
 * inside an {@link HTMLBox}.
 * @param data - The element's user data slice.
 * @returns The label inside an {@link HTMLBox} with default styling.
 */
export const defaultRenderElement = (data: unknown) => {
  const label = isRecord(data) ? data.label : undefined;
  return <HTMLBox>{isString(label) || isNumber(label) ? label : null}</HTMLBox>;
};
