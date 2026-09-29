'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const liquidButtonVariants = cva('liquid-button', {
  variants: {
    tone: {
      red: 'liquid-button--red',
      neutral: 'liquid-button--neutral',
    },
    size: {
      sm: 'liquid-button--sm',
      md: 'liquid-button--md',
      lg: 'liquid-button--lg',
    },
  },
  defaultVariants: {
    tone: 'red',
    size: 'md',
  },
});

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ asChild = false, className, tone, size, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={liquidButtonVariants({ tone, size, className })}
        {...(!asChild ? { type } : {})}
        {...props}
      />
    );
  },
);

LiquidButton.displayName = 'LiquidButton';

export { liquidButtonVariants };
