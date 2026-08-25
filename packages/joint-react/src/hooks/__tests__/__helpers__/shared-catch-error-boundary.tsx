import { Component, type ReactNode } from 'react';

/**
 * Surfaces an error thrown anywhere in its subtree so a test can assert on it
 * instead of the throw tearing down the whole test render.
 */
export class CatchErrorBoundary extends Component<
  Readonly<{ onCatch: (error: Error) => void; children: ReactNode }>,
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    this.props.onCatch(error);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
