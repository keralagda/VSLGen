import type { Registry } from './types';

export const uiLayoutRegistry: Registry<any> = {
  id: 'ui-layout-registry',
  namespace: 'vonixx.ui-layouts',
  version: '1.0.0',
  items: {
    sidebar: { id: 'sidebar', type: 'bento-grid' },
  },
};

export const themeRegistry: Registry<any> = {
  id: 'theme-registry',
  namespace: 'vonixx.themes',
  version: '1.0.0',
  items: {
    light: { id: 'light', brand: 'vonixx-blue' },
    dark: { id: 'dark', brand: 'vonixx-dark' },
  },
};

export const iconRegistry: Registry<any> = {
  id: 'icon-registry',
  namespace: 'vonixx.icons',
  version: '1.0.0',
  items: {
    print: { id: 'print', name: 'Printer' },
    save: { id: 'save', name: 'Save' },
  },
};

export const colorRegistry: Registry<any> = {
  id: 'color-registry',
  namespace: 'vonixx.colors',
  version: '1.0.0',
  items: {
    primary: { id: 'primary', hex: '#4D148C' },
  },
};

export const typographyRegistry: Registry<any> = {
  id: 'typography-registry',
  namespace: 'vonixx.typography',
  version: '1.0.0',
  items: {
    heading: { id: 'heading', font: 'Inter', size: '2rem' },
  },
};

export const animationRegistry: Registry<any> = {
  id: 'animation-registry',
  namespace: 'vonixx.animations',
  version: '1.0.0',
  items: {
    fade: { id: 'fade', duration: 150 },
  },
};
