import * as React from 'react';
import { cn } from '@/lib/utils';

interface HoverProps {
  asChild?: boolean;
  scale?: number;
  rotate?: number;
  translateY?: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Hover = React.forwardRef<HTMLDivElement, HoverProps>(
  ({ asChild = false, scale = 1.05, rotate = 0, translateY = '0px', className, children, style, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'transition-transform duration-300 ease-in-out hover:scale-[var(--scale)] hover:rotate-[var(--rotate)] hover:translate-y-[var(--translate)]',
          className
        )}
        style={{
          '--scale': scale,
          '--rotate': `${rotate}deg`,
          '--translate': translateY,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Hover.displayName = 'Hover';

export { Hover }; 