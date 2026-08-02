'use client';

import { useToast } from '@/hooks/useToast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToastAction,
} from '@/components/ui/Toast';

export function Toaster() {
  const { toasts } = useToast();

  const getVariant = (type: 'success' | 'error' | 'warning' | 'info'): 'default' | 'destructive' | 'success' | 'warning' => {
    switch (type) {
      case 'error': return 'destructive';
      case 'info': return 'default';
      default: return type;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(({ id, type, title, message, action, ...props }) => (
        <Toast key={id} variant={getVariant(type)} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {message && <ToastDescription>{message}</ToastDescription>}
          </div>
          {action && (
            <ToastAction onClick={action.onClick} altText={action.label}>
              {action.label}
            </ToastAction>
          )}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}