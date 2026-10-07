// Regression test for `types` path patterns in package.json `exports`.
// - Compiled with `moduleResolution: "bundler"` to force checking `exports`.
// - Relies on self-reference behavior which applies when `exports` are present.
// - If either path pattern stops working, this file will fail to type-check.
export type { Graph as DiaGraphExtensionless } from '@joint/core/types/dia';
export type { Graph as DiaGraphExplicit } from '@joint/core/types/dia.d.ts';

// Regression test for the namespace subpaths in package.json `exports`:
// each resolves to that namespace's own type file, so members import directly.
export type { Graph as DiaGraphSubpath } from '@joint/core/dia';
export type { Point as GeometryPointSubpath } from '@joint/core/g';
export type { Model as MvcModelSubpath } from '@joint/core/mvc';
export type { Router as RoutersRouterSubpath } from '@joint/core/routers';
