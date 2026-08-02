'use client';

import { createContext, useContext, useEffect, useMemo, ReactNode, KeyboardEvent } from 'react';
import type { KeyboardShortcut } from '@/types';
import { useAppStore } from '@/store/appStore';

interface KeyboardShortcutsContextType {
  shortcuts: KeyboardShortcut[];
  registerShortcut: (shortcut: KeyboardShortcut) => void;
  unregisterShortcut: (action: string) => void;
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined);

const defaultShortcuts: KeyboardShortcut[] = [
  { key: 'n', ctrlKey: true, action: 'new-label', description: 'Create new label', enabled: true },
  { key: 's', ctrlKey: true, action: 'save-label', description: 'Save current label', enabled: true },
  { key: 'p', ctrlKey: true, action: 'print-label', description: 'Print label', enabled: true },
  { key: 'e', ctrlKey: true, action: 'export-label', description: 'Export label', enabled: true },
  { key: 't', ctrlKey: true, action: 'templates', description: 'Open templates', enabled: true },
  { key: 'a', ctrlKey: true, action: 'address-book', description: 'Open address book', enabled: true },
  { key: 'h', ctrlKey: true, action: 'history', description: 'Open history', enabled: true },
  { key: ',', ctrlKey: true, action: 'settings', description: 'Open settings', enabled: true },
  { key: '/', action: 'search', description: 'Focus search', enabled: true },
  { key: 'z', ctrlKey: true, action: 'undo', description: 'Undo last action', enabled: true },
  { key: 'y', ctrlKey: true, action: 'redo', description: 'Redo last action', enabled: true },
  { key: 'Escape', action: 'close-dialog', description: 'Close dialog', enabled: true },
  { key: 'Enter', ctrlKey: true, action: 'generate-preview', description: 'Generate preview', enabled: true },
];

export function KeyboardShortcutsProvider({ children }: { children: ReactNode }) {
  const shortcuts = useAppStore(state => state.keyboardShortcuts);
  const updateShortcut = useAppStore(state => state.updateKeyboardShortcut);

  const allShortcuts = useMemo(() => {
    const merged = [...defaultShortcuts];
    shortcuts.forEach(custom => {
      const index = merged.findIndex(s => s.action === custom.action);
      if (index >= 0) {
        merged[index] = { ...merged[index], ...custom };
      } else {
        merged.push(custom);
      }
    });
    return merged.filter(s => s.enabled);
  }, [shortcuts]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement ||
          target?.getAttribute('contenteditable') === 'true') {
        return;
      }

      const matchingShortcut = allShortcuts.find(s => {
        if (event.key.toLowerCase() !== s.key.toLowerCase()) return false;
        if (!!event.ctrlKey !== !!s.ctrlKey) return false;
        if (!!event.shiftKey !== !!s.shiftKey) return false;
        if (!!event.altKey !== !!s.altKey) return false;
        if (!!event.metaKey !== !!s.metaKey) return false;
        return true;
      });

      if (matchingShortcut) {
        event.preventDefault();
        event.stopPropagation();
        window.dispatchEvent(new CustomEvent('keyboard-shortcut', {
          detail: { action: matchingShortcut.action }
        }));
      }
    };

    const listener = handleKeyDown as unknown as EventListener;
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [allShortcuts]);

  const registerShortcut = (shortcut: KeyboardShortcut) => {
    updateShortcut(shortcut.action, shortcut);
  };

  const unregisterShortcut = (action: string) => {
    updateShortcut(action, { enabled: false });
  };

  return (
    <KeyboardShortcutsContext.Provider value={{
      shortcuts: allShortcuts,
      registerShortcut,
      unregisterShortcut,
    }}>
      {children}
    </KeyboardShortcutsContext.Provider>
  );
}

export function useKeyboardShortcuts() {
  const context = useContext(KeyboardShortcutsContext);
  if (!context) {
    throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutsProvider');
  }
  return context;
}