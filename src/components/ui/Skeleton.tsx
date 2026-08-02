'use client';

import * as React from 'react';
import { cn } from '@/utils/helpers';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', ...props }, ref) => {
    const variants = {
      text: 'h-4 w-full animate-pulse rounded',
      circular: 'h-10 w-10 animate-pulse rounded-full',
      rectangular: 'animate-pulse rounded-lg',
    };

    return (
      <div
        ref={ref}
        className={cn('bg-muted', variants[variant], className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };