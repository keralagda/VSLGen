import * as React from 'react';
import { cn } from '@/utils/helpers';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={checkboxId}
          className={cn(
            'h-4 w-4 rounded border-input text-primary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="flex flex-col gap-0.5 pt-0.5">
          {label && (
            <label htmlFor={checkboxId} className="text-sm font-medium text-foreground cursor-pointer">
              {label}
            </label>
          )}
          {hint && (
            <p className="text-sm text-muted-foreground">{hint}</p>
          )}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };