/* eslint-disable sonarjs/no-redundant-jump */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Type-only tests for `useCell` (the `useCells` surface is locked in
 * `use-cells.type.test.ts`). The shared `expectType` helper forces TypeScript
 * to check structural assignability at compile time — if the file compiles,
 * the contract holds. There is no runtime behavior being tested here; the
 * dummy `describe`/`it` exists only so Jest does not error on a test file
 * with no test cases.
 *
 * Locked patterns (DX contract):
 * - `useCell()` → `Computed<CellRecord>` (union)
 * - `useCell<MyElement>()` → `MyElement`
 * - `useCell((el: MyElement) => el.data.foo)` → typeof `data.foo`
 * - `useCell((cell) => cell.id)` → `cell` is `Computed<CellRecord>`, `cell.id` is `CellId`
 * - `useCell<MyElement, MyReturn>(selector)` — both generics explicit, Cell narrow
 *
 * Anti-patterns NOT to lock — `Computed<CellRecord>` is a union, so accessing
 * record-specific fields like `.position` directly returns `unknown` due to
 * the index signatures on `LinkAttributes` / `CustomRecord`. Always annotate
 * the selector parameter as `Computed<ElementRecord<…>>` or
 * `Computed<LinkRecord<…>>` when reading record-specific fields.
 */
import { useCell } from '../use-cell';
import type { CellId, CellRecord, Computed, ElementPosition } from '../../types/cell.types';
import {
  expectType,
  type AppCell,
  type AppCellWithEdge,
  type LinkUserData,
  type MyElement,
  type MyElementRecord,
  type MyLink,
} from './__helpers__/cell-type-fixtures';

// All hook calls below are wrapped in `if (false)` so TypeScript still
// type-checks them, but Jest never executes them — these are pure
// compile-time assertions and the hooks would throw at module scope.

if (false as boolean) {
  // no args, no generic — defaults to Internal
  expectType<Computed<CellRecord>>(useCell());

  // explicit Cell generic — narrows return
  expectType<MyElement>(useCell<MyElement>());

  // selector annotated as element — Cell inferred from annotation, returns data field
  expectType<string>(useCell((element: MyElement) => element.data.label));

  // selector annotated as link — Cell inferred to MyLink
  expectType<LinkUserData>(useCell((link: MyLink) => link.data));

  // selector returning required position field on element record
  expectType<{ x: number; y: number }>(useCell((el: MyElement) => el.position));

  // selector returning required size field on element record
  expectType<{ width: number; height: number }>(useCell((el: MyElement) => el.size));

  // untyped selector — Cell defaults to Computed<CellRecord>; .id required on Resolved variants
  expectType<CellId>(useCell((cell) => cell.id));

  // id-targeted, no selector — defaults to Internal
  expectType<Computed<CellRecord>>(useCell('some-id'));

  // id-targeted with explicit Cell generic
  expectType<MyElement>(useCell<MyElement>('some-id'));

  // The generic is the INPUT record; the read resolves to Computed. Passing a
  // bare record (optional position/size/data) must return the required-field
  // shape — fails under a signature that returns the record unchanged.
  expectType<MyElement>(useCell<MyElementRecord>());
  expectType<MyElement>(useCell<MyElementRecord>('some-id'));
  expectType<number>(useCell<MyElementRecord, number>((el) => el.position.x));

  // id-targeted with selector annotated
  expectType<string>(useCell('some-id', (el: MyElement) => el.data.label));

  // both generics explicit
  expectType<{ x: number; y: number }>(
    useCell<MyElement, { x: number; y: number }>((el) => el.position)
  );

  // Discriminant narrowing on default Computed<CellRecord> (no annotation)
  expectType<Required<ElementPosition>>(
    useCell((cell) => {
      if (cell.type === 'element') {
        return cell.position;
      }
      return { x: 0, y: 0 };
    })
  );

  // User-defined custom cell with literal type — narrowing works
  expectType<string | undefined>(
    useCell((cell: AppCell) => {
      if (cell.type === 'my-custom') return cell.data.foo;
      return;
    })
  );

  // Custom link-flavoured record narrows from union
  expectType<number | undefined>(
    useCell((cell: AppCellWithEdge) => {
      if (cell.type === 'my-edge') return cell.data.weight;
      return;
    })
  );
} // close if (false) compile-only block

// runtime no-op so Jest accepts the file
describe('useCell type contract', () => {
  it('compiles', () => {
    expect(true).toBe(true);
  });
});
