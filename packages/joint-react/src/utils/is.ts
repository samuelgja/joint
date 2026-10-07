/* eslint-disable jsdoc/require-jsdoc */
import type { dia, mvc } from '@joint/core';
import { Collection } from '@joint/core/mvc';
import {
  isBoolean as isBooleanValue,
  isNumber as isNumberValue,
  isObject,
  isString as isStringValue,
} from '@joint/core/util';
import type { FunctionComponent, JSX } from 'react';

export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return value instanceof Promise || (isRecord(value) && typeof value.then === 'function');
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return isObject(value);
}

function hasChildren(props: Record<string, unknown>) {
  return 'children' in props;
}
export function isString(value: unknown): value is string {
  return isStringValue(value);
}

export function isNumber(value: unknown): value is number {
  return isNumberValue(value);
}
export function isBoolean(value: unknown): value is boolean {
  return isBooleanValue(value);
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isReactComponentFunction(value: unknown): value is FunctionComponent {
  return typeof value === 'function';
}

export function isWithChildren(value: unknown): value is { children: JSX.Element[] } {
  return isRecord(value) && hasChildren(value);
}

export function isUpdater<T>(updater: ((previous: T) => T) | T): updater is (previous: T) => T {
  return typeof updater === 'function' && 'call' in updater;
}

export function isRef<T>(value: unknown): value is React.RefObject<T> {
  return isRecord(value) && 'current' in value;
}

export function isCollection(value: unknown): value is mvc.Collection<dia.Cell> {
  return value instanceof Collection;
}


/**
 * Returns `true` when the element has a defined `size` with numeric `width` and `height`.
 * When `false`, the element is considered auto-sized (size determined by {@link useMeasureElement}).
 * @param data - The element data record to check for size
 * @returns Whether size is defined with numeric width and height
 */
export function hasDefinedSize(data: Record<string, unknown>): boolean {
  const size = data.size as Record<string, unknown> | undefined;
  return isRecord(size) && isNumber(size.width) && isNumber(size.height);
}

export function hasProperty<T extends Record<string, unknown>>(
  object?: T,
  property?: string
): object is T {
  if (!object || !property) {
    return false;
  }
  return property in object;
}
