'use client';

import { cn } from '@/utils/helpers';
import { Skeleton } from './Skeleton';

interface LoadingSkeletonProps {
  variant?: 'card' | 'table' | 'form' | 'label';
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ variant = 'card', count = 3, className }: LoadingSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  switch (variant) {
    case 'card':
      return (
        <div className={cn('space-y-4', className)}>
          {items.map(i => (
            <div key={i} className="space-y-3 p-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      );

    case 'table':
      return (
        <div className={cn('space-y-3', className)}>
          <div className="flex gap-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
          {items.map(i => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-20" />
            </div>
          ))}
        </div>
      );

    case 'form':
      return (
        <div className={cn('space-y-4', className)}>
          {items.map(i => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-1/6" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      );

    case 'label':
      return (
        <div className={cn('flex items-center justify-center', className)}>
          <div className="relative w-[384px] h-[576px] border border-gray-300 bg-white">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="col-span-1 border-r border-gray-400" />
              ))}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="row-span-1 border-b border-gray-400" />
              ))}
            </div>
            <div className="absolute inset-0 p-4 space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-32 w-full rounded border border-gray-300" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}