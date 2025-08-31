// This mock should only be used during testing
import React from 'react'

interface MockMotionProps {
  children?: React.ReactNode
  initial?: Record<string, unknown>
  animate?: Record<string, unknown>
  exit?: Record<string, unknown>
  transition?: Record<string, unknown>
  variants?: Record<string, unknown>
  whileHover?: Record<string, unknown>
  whileTap?: Record<string, unknown>
  whileInView?: Record<string, unknown>
  viewport?: Record<string, unknown>
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
  onMouseMove?: (e: React.MouseEvent) => void
  [key: string]: unknown
}

const mockMotionComponent = React.forwardRef<HTMLDivElement, MockMotionProps>((props, ref) => {
  const {
    children,
    initial,
    animate,
    exit,
    transition,
    variants,
    whileHover,
    whileTap,
    whileInView,
    viewport,
    style,
    ...rest
  } = props

  return (
    <div
      ref={ref}
      data-testid="motion-component"
      data-motion-props={JSON.stringify({
        initial,
        animate,
        exit,
        transition,
        variants,
        whileHover,
        whileTap,
        whileInView,
        viewport,
      })}
      style={style as React.CSSProperties}
      {...(rest as Record<string, unknown>)}
    >
      {children as React.ReactNode}
    </div>
  )
})

mockMotionComponent.displayName = 'MotionComponent'

export const motion = {
  div: mockMotionComponent,
  button: mockMotionComponent,
  span: mockMotionComponent,
  p: mockMotionComponent,
  a: mockMotionComponent,
  h1: mockMotionComponent,
  section: mockMotionComponent,
}

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>

export const useAnimation = () => ({
  start: jest.fn(),
  stop: jest.fn(),
  set: jest.fn(),
})

export const useInView = () => [true, { entry: null, ref: { current: null } }]

export const useScroll = () => ({
  scrollY: { get: () => 0, onChange: jest.fn() },
  scrollYProgress: { get: () => 0, onChange: jest.fn() },
})

export const useTransform = (scrollY: unknown, input: number[], output: unknown[]) => output[0]

export const useSpring = (value: number) => value
