import type {
  CellId,
  CellRecord,
  Computed,
  ElementJSONInit,
  ElementRecord,
  LinkRecord,
} from '../../../types/cell.types';

interface ElementUserData {
  readonly label: string;
}

/** Link user-data payload used by the typed cell fixtures. */
export interface LinkUserData {
  readonly kind: string;
}

/** Resolved element record with a `label` data payload. */
export type MyElement = Computed<ElementRecord<ElementUserData>>;

/** Resolved link record with a `kind` data payload. */
export type MyLink = Computed<LinkRecord<LinkUserData>>;

/** Bare (write-shape) element record; hooks must resolve it to its `Computed` form. */
export type MyElementRecord = ElementRecord<ElementUserData>;

interface MyCustomNode extends ElementJSONInit {
  readonly id: CellId;
  readonly type: 'my-custom';
  readonly data: { readonly foo: string };
}

interface MyCustomEdge extends ElementJSONInit {
  readonly id: CellId;
  readonly type: 'my-edge';
  readonly data: { readonly weight: number };
}

/** Default cell union extended with a user-defined literal-typed node. */
export type AppCell = Computed<CellRecord> | MyCustomNode;

/** {@link AppCell} further extended with a custom edge-flavoured record. */
export type AppCellWithEdge = AppCell | MyCustomEdge;

/**
 * Compile-time assertion that `actual` is assignable to `Expected`.
 * @param _actual - value whose type is checked (never used at runtime)
 */
export const expectType = <Expected>(_actual: Expected): void => {
  /* type-only check */
};
