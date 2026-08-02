'use client';

import * as React from 'react';
import { cn } from '@/utils/helpers';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  title?: string;
  description?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, description, children, ...props }, ref) => {
    const variants = {
      default: 'bg-muted text-muted-foreground border-border',
      destructive: 'bg-error/10 text-error border-error/20',
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      info: 'bg-primary/10 text-primary border-primary/20',
    };

    const icons = {
      default: <AlertCircle className="h-4 w-4" />,
      destructive: <AlertCircle className="h-4 w-4" />,
      success: <CheckCircle className="h-4 w-4" />,
      warning: <AlertTriangle className="h-4 w-4" />,
      info: <Info className="h-4 w-4" />,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-lg border p-4',
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0" aria-hidden="true">
            {icons[variant]}
          </div>
          <div className="flex-1 min-w-0">
            {title && (
              <h5 className="mb-1 font-medium leading-6">{title}</h5>
            )}
            {description && (
              <div className="text-sm [&_p]:leading-relaxed">{description}</div>
            )}
            {children && !title && !description && (
              <div className="text-sm [&_p]:leading-relaxed">{children}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export { Alert };