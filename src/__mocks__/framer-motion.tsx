// This mock should only be used during testing
import React from 'react'

const mockMotionComponent = React.forwardRef<HTMLDivElement, any>((props, ref) => {
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
      style={style}
      {...rest}
    >
      {children}
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

export const useTransform = (scrollY: any, input: number[], output: any[]) => output[0]

export const useSpring = (value: number) => value
