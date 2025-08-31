import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(...classNames: string[]): R
      toHaveStyle(style: Record<string, unknown>): R
      toHaveAttribute(attr: string, value?: string): R
      toContainElement(element: HTMLElement | null): R
    }
  }
} 