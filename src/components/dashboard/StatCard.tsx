'use client';

import { cn } from '@/utils/helpers';
import { Card, CardContent } from '@/components/ui/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  trend = 'neutral',
  className,
}: StatCardProps) {
  const trendIcons = {
    up: <TrendingUp className="h-4 w-4 text-success" />,
    down: <TrendingDown className="h-4 w-4 text-error" />,
    neutral: <Minus className="h-4 w-4 text-muted-foreground" />,
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-muted-foreground',
  };

  return (
    <Card className={cn('transition-shadow hover:shadow-card-hover', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
            {(change !== undefined || changeLabel) && (
              <div className="flex items-center gap-1 mt-2">
                <span className={cn('text-sm font-medium', trendColors[trend])}>
                  {trendIcons[trend]}
                  {change !== undefined ? (change >= 0 ? '+' : '') + `${change.toFixed(1)}%` : ''}
                </span>
                {changeLabel && (
                  <span className="text-sm text-muted-foreground">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div className="text-muted-foreground/30 text-3xl" aria-hidden="true">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}