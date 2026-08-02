import type { Registry } from './types';

export interface LayoutConfig {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: 'in' | 'mm' | 'cm';
  grid: number;
}

export const layoutRegistry: Registry<LayoutConfig> = {
  id: 'layout-registry',
  namespace: 'vonixx.layouts',
  version: '1.0.0',
  metadata: {
    description: 'Registry for shipping document sizing and grid parameters',
  },
  items: {
    'thermal-4x6': {
      id: 'thermal-4x6',
      name: 'Thermal 4" x 6"',
      width: 4,
      height: 6,
      unit: 'in',
      grid: 12,
    },
    'thermal-4x8': {
      id: 'thermal-4x8',
      name: 'Thermal 4" x 8"',
      width: 4,
      height: 8,
      unit: 'in',
      grid: 12,
    },
    'a6': {
      id: 'a6',
      name: 'A6 (105 x 148 mm)',
      width: 105,
      height: 148,
      unit: 'mm',
      grid: 12,
    },
    'a5': {
      id: 'a5',
      name: 'A5 (148 x 210 mm)',
      width: 148,
      height: 210,
      unit: 'mm',
      grid: 12,
    },
    'letter': {
      id: 'letter',
      name: 'Letter (8.5" x 11")',
      width: 8.5,
      height: 11,
      unit: 'in',
      grid: 12,
    },
  },
};
