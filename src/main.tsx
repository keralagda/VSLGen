import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/Toaster';
import { ToastProvider } from '@/hooks/useToast';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { KeyboardShortcutsProvider } from '@/components/providers/KeyboardShortcutsProvider';
import { App } from '@/App';
import { RegistryStore } from '@/runtime/RegistryStore';
import { RegistryValidator } from '@/runtime/RegistryValidator';
import { useAppStore } from '@/store/appStore';
import { defaultTemplates } from '@/registries';
import './index.css';

RegistryStore.initialize();
const validationErrors = RegistryValidator.validate();
if (validationErrors.length > 0) {
  console.warn('[VONIXX VRA] Schema Validation Errors Found:', validationErrors);
}

// Seed/Heal templates state in app store to resolve blank state & duplicate keys
const storeState = useAppStore.getState();
const existingTemplates = storeState.templates || [];
const healedTemplates = [...defaultTemplates];

// Merge any custom templates the user created
for (const temp of existingTemplates) {
  if (temp.isCustom) {
    if (!healedTemplates.some(t => t.id === temp.id)) {
      healedTemplates.push(temp);
    }
  }
}
useAppStore.setState({ templates: healedTemplates });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <TooltipProvider>
            <KeyboardShortcutsProvider>
              <App />
              <Toaster />
            </KeyboardShortcutsProvider>
          </TooltipProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);