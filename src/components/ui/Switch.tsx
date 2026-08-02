import * as React from 'react';
import { cn } from '@/utils/helpers';

export interface SwitchProps {
  label?: string;
  hint?: string;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, label, hint, id, onCheckedChange, checked = false, disabled = false }, _ref) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;

    const handleClick = () => {
      if (disabled) return;
      const newChecked = !checked;
      onCheckedChange?.(newChecked);
    };

    return (
      <div className="flex items-center gap-3">
        <button
          role="switch"
          type="button"
          id={switchId}
          className={cn(
            'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full',
            'border-2 border-transparent transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            checked ? 'bg-primary' : 'bg-input',
            className
          )}
          aria-checked={checked}
          aria-disabled={disabled}
          onClick={handleClick}
        >
          <span
            className={cn(
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow',
              'transition-transform duration-200',
              checked ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </button>
        <div className="flex flex-col gap-0.5">
          {label && (
            <label htmlFor={switchId} className="text-sm font-medium text-foreground cursor-pointer">
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
Switch.displayName = 'Switch';

export { Switch };