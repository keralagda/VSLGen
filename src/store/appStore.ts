import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type {
  Shipper,
  Consignee,
  ShippingLabel,
  LabelTemplate,
  UserPreferences,
  LabelHistory,
  Toast,
  KeyboardShortcut,
} from '@/types';
import { DEFAULT_PREFERENCES, DEFAULT_KEYBOARD_SHORTCUTS, STORAGE_KEYS, MAX_HISTORY_ITEMS } from '@/constants';
import { generateId } from '@/utils/helpers';
import { defaultTemplates } from '@/registries';

interface AppState {
  // UI State
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  activePage: string;
  isLoading: boolean;
  toasts: Toast[];

  // Form State
  currentLabel: Partial<ShippingLabel> | null;
  formDirty: boolean;
  undoStack: Partial<ShippingLabel>[];
  redoStack: Partial<ShippingLabel>[];

  // Data
  shippers: Shipper[];
  consignees: Consignee[];
  templates: LabelTemplate[];
  history: LabelHistory[];
  preferences: UserPreferences;
  keyboardShortcuts: KeyboardShortcut[];

  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActivePage: (page: string) => void;
  setLoading: (loading: boolean) => void;

  // Toast actions
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Form actions
  setCurrentLabel: (label: Partial<ShippingLabel>) => void;
  updateCurrentLabel: (updates: Partial<ShippingLabel>) => void;
  setFormDirty: (dirty: boolean) => void;
  pushUndo: (state: Partial<ShippingLabel>) => void;
  undo: () => Partial<ShippingLabel> | null;
  redo: () => Partial<ShippingLabel> | null;
  clearForm: () => void;

  // Shipper actions
  addShipper: (shipper: Omit<Shipper, 'id' | 'createdAt' | 'updatedAt'>) => Shipper;
  updateShipper: (id: string, updates: Partial<Shipper>) => void;
  deleteShipper: (id: string) => void;
  setDefaultShipper: (id: string) => void;

  // Consignee actions
  addConsignee: (consignee: Omit<Consignee, 'id' | 'createdAt' | 'updatedAt'>) => Consignee;
  updateConsignee: (id: string, updates: Partial<Consignee>) => void;
  deleteConsignee: (id: string) => void;
  setDefaultConsignee: (id: string) => void;

  // Template actions
  addTemplate: (template: Omit<LabelTemplate, 'id' | 'createdAt' | 'updatedAt'>) => LabelTemplate;
  updateTemplate: (id: string, updates: Partial<LabelTemplate>) => void;
  deleteTemplate: (id: string) => void;
  setRecentTemplate: (templateId: string) => void;

  // History actions
  addToHistory: (label: Omit<LabelHistory, 'id' | 'templateName' | 'carrierName'> & { templateName: string; carrierName: string }) => void;
  deleteFromHistory: (id: string) => void;
  clearHistory: () => void;
  voidLabel: (id: string, reason: string) => void;
  printLabel: (id: string) => void;

  // Preferences actions
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetPreferences: () => void;

  // Keyboard shortcuts
  updateKeyboardShortcut: (action: string, shortcut: Partial<KeyboardShortcut>) => void;
  resetKeyboardShortcuts: () => void;
}

const initialPreferences: UserPreferences = DEFAULT_PREFERENCES;

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        theme: 'system',
        sidebarOpen: true,
        sidebarCollapsed: false,
        activePage: '/generate',
        isLoading: false,
        toasts: [],
        currentLabel: null,
        formDirty: false,
        undoStack: [],
        redoStack: [],
        shippers: [],
        consignees: [],
        templates: defaultTemplates,
        history: [],
        preferences: initialPreferences,
        keyboardShortcuts: DEFAULT_KEYBOARD_SHORTCUTS,

        // UI Actions
        setTheme: (theme) => set({ theme }),
        toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
        setActivePage: (page) => set({ activePage: page }),
        setLoading: (loading) => set({ isLoading: loading }),

        // Toast Actions
        addToast: (toast) => {
          const id = generateId('toast');
          const newToast = { ...toast, id, duration: toast.duration ?? 5000 };
          set(state => ({ toasts: [...state.toasts, newToast] }));
          if (newToast.duration && newToast.duration > 0) {
            setTimeout(() => {
              get().removeToast(id);
            }, newToast.duration);
          }
        },
        removeToast: (id) => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),
        clearToasts: () => set({ toasts: [] }),

        // Form Actions
        setCurrentLabel: (label) => set({ currentLabel: label, formDirty: false, undoStack: [], redoStack: [] }),
        updateCurrentLabel: (updates) => set(state => {
          const newLabel = { ...state.currentLabel, ...updates };
          return { currentLabel: newLabel, formDirty: true };
        }),
        setFormDirty: (dirty) => set({ formDirty: dirty }),

        pushUndo: (state) => set(current => {
          if (!current.currentLabel) return current;
          const newUndoStack = [...current.undoStack, current.currentLabel].slice(-50);
          return {
            undoStack: newUndoStack,
            redoStack: [],
            currentLabel: state,
            formDirty: true,
          };
        }),

        undo: () => {
          const { undoStack, redoStack, currentLabel } = get();
          if (undoStack.length === 0) return null;
          const previousState = undoStack[undoStack.length - 1];
          set({
            undoStack: undoStack.slice(0, -1),
            redoStack: [...redoStack, currentLabel!],
            currentLabel: previousState,
          });
          return previousState;
        },

        redo: () => {
          const { undoStack, redoStack, currentLabel } = get();
          if (redoStack.length === 0) return null;
          const nextState = redoStack[redoStack.length - 1];
          set({
            redoStack: redoStack.slice(0, -1),
            undoStack: [...undoStack, currentLabel!],
            currentLabel: nextState,
          });
          return nextState;
        },

        clearForm: () => set({
          currentLabel: null,
          formDirty: false,
          undoStack: [],
          redoStack: [],
        }),

        // Shipper Actions
        addShipper: (shipper) => {
          const now = new Date().toISOString();
          const newShipper: Shipper = {
            ...shipper,
            id: generateId('shipper'),
            createdAt: now,
            updatedAt: now,
            isDefault: shipper.isDefault ?? false,
          };
          set(state => ({
            shippers: shipper.isDefault
              ? [...state.shippers.map(s => ({ ...s, isDefault: false } as Shipper)), newShipper]
              : [...state.shippers, newShipper],
          }));
          return newShipper;
        },

        updateShipper: (id, updates) => set(state => ({
          shippers: state.shippers.map(s =>
            s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
          ),
        })),

        deleteShipper: (id) => set(state => ({
          shippers: state.shippers.filter(s => s.id !== id),
        })),

        setDefaultShipper: (id) => set(state => ({
          shippers: state.shippers.map(s => ({ ...s, isDefault: s.id === id })),
        })),

        // Consignee Actions
        addConsignee: (consignee) => {
          const now = new Date().toISOString();
          const newConsignee: Consignee = {
            ...consignee,
            id: generateId('consignee'),
            createdAt: now,
            updatedAt: now,
            isDefault: consignee.isDefault ?? false,
          };
          set(state => ({
            consignees: consignee.isDefault
              ? [...state.consignees.map(c => ({ ...c, isDefault: false } as Consignee)), newConsignee]
              : [...state.consignees, newConsignee],
          }));
          return newConsignee;
        },

        updateConsignee: (id, updates) => set(state => ({
          consignees: state.consignees.map(c =>
            c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
          ),
        })),

        deleteConsignee: (id) => set(state => ({
          consignees: state.consignees.filter(c => c.id !== id),
        })),

        setDefaultConsignee: (id) => set(state => ({
          consignees: state.consignees.map(c => ({ ...c, isDefault: c.id === id })),
        })),

        // Template Actions
        addTemplate: (template) => {
          const now = new Date().toISOString();
          const newTemplate: LabelTemplate = {
            ...template,
            id: generateId('template'),
            createdAt: now,
            updatedAt: now,
          };
          set(state => ({ templates: [...state.templates, newTemplate] }));
          return newTemplate;
        },

        updateTemplate: (id, updates) => set(state => ({
          templates: state.templates.map(t =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        })),

        deleteTemplate: (id) => set(state => ({
          templates: state.templates.filter(t => t.id !== id),
          preferences: {
            ...state.preferences,
            recentTemplates: state.preferences.recentTemplates.filter(t => t !== id),
          },
        })),

        setRecentTemplate: (templateId) => set(state => ({
          preferences: {
            ...state.preferences,
            recentTemplates: [templateId, ...state.preferences.recentTemplates.filter(t => t !== templateId)].slice(0, 10),
          },
        })),

        // History Actions
        addToHistory: (label) => set(state => {
          const newHistory: LabelHistory = {
            ...label,
            id: generateId('history'),
            templateName: label.templateName,
            carrierName: label.carrierName,
          };
          return {
            history: [newHistory, ...state.history].slice(0, MAX_HISTORY_ITEMS),
          };
        }),

        deleteFromHistory: (id) => set(state => ({
          history: state.history.filter(h => h.id !== id),
        })),

        clearHistory: () => set({ history: [] }),

        voidLabel: (id, reason) => set(state => ({
          history: state.history.map(h =>
            h.id === id
              ? { ...h, status: 'voided' as const, voidedAt: new Date().toISOString(), voidReason: reason }
              : h
          ),
        })),

        printLabel: (id) => set(state => ({
          history: state.history.map(h =>
            h.id === id
              ? { ...h, status: 'printed' as const, printedAt: new Date().toISOString() }
              : h
          ),
        })),

        // Preferences Actions
        updatePreferences: (preferences) => set(state => ({
          preferences: { ...state.preferences, ...preferences },
        })),

        resetPreferences: () => set({ preferences: initialPreferences }),

        // Keyboard Shortcuts
        updateKeyboardShortcut: (action, shortcut) => set(state => ({
          keyboardShortcuts: state.keyboardShortcuts.map(s =>
            s.action === action ? { ...s, ...shortcut } : s
          ),
        })),

        resetKeyboardShortcuts: () => set({ keyboardShortcuts: DEFAULT_KEYBOARD_SHORTCUTS }),
      }),
      {
        name: STORAGE_KEYS.PREFERENCES,
        partialize: (state) => ({
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
          shippers: state.shippers,
          consignees: state.consignees,
          templates: state.templates,
          history: state.history,
          preferences: state.preferences,
          keyboardShortcuts: state.keyboardShortcuts,
        }),
        version: 1,
      }
    ),
    { name: 'AppStore' }
  )
);

// Selectors
export const useTheme = () => useAppStore(state => state.theme);
export const useSidebarOpen = () => useAppStore(state => state.sidebarOpen);
export const useSidebarCollapsed = () => useAppStore(state => state.sidebarCollapsed);
export const useActivePage = () => useAppStore(state => state.activePage);
export const useIsLoading = () => useAppStore(state => state.isLoading);
export const useToasts = () => useAppStore(state => state.toasts);
export const useCurrentLabel = () => useAppStore(state => state.currentLabel);
export const useFormDirty = () => useAppStore(state => state.formDirty);
export const useCanUndo = () => useAppStore(state => state.undoStack.length > 0);
export const useCanRedo = () => useAppStore(state => state.redoStack.length > 0);
export const useShippers = () => useAppStore(state => state.shippers);
export const useConsignees = () => useAppStore(state => state.consignees);
export const useTemplates = () => useAppStore(state => state.templates);
export const useHistory = () => useAppStore(state => state.history);
export const usePreferences = () => useAppStore(state => state.preferences);
export const useKeyboardShortcuts = () => useAppStore(state => state.keyboardShortcuts);