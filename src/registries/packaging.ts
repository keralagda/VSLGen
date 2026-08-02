import type { Registry } from './types';

export const packagingMaterialRegistry: Registry<any> = {
  id: 'packaging-material-registry',
  namespace: 'vonixx.materials',
  version: '1.0.0',
  items: {
    cardboard: { id: 'cardboard', name: 'Corrugated Cardboard Box' },
    plastic: { id: 'plastic', name: 'Polyethylene Bag' },
    wood: { id: 'wood', name: 'Wooden Crate' },
  },
};

export const boxSizeRegistry: Registry<any> = {
  id: 'box-size-registry',
  namespace: 'vonixx.box-sizes',
  version: '1.0.0',
  items: {
    small: { id: 'small', name: 'Small Box', length: 8, width: 6, height: 4, unit: 'in' },
    medium: { id: 'medium', name: 'Medium Box', length: 12, width: 10, height: 8, unit: 'in' },
    large: { id: 'large', name: 'Large Box', length: 18, width: 14, height: 12, unit: 'in' },
  },
};

export const dimensionPresetRegistry: Registry<any> = {
  id: 'dimension-preset-registry',
  namespace: 'vonixx.dimension-presets',
  version: '1.0.0',
  items: {
    standard: { id: 'standard', name: 'Standard Parcel Box', length: 10, width: 8, height: 6 },
    long: { id: 'long', name: 'Poster/Rug Tube', length: 36, width: 4, height: 4 },
  },
};

export const weightClassRegistry: Registry<any> = {
  id: 'weight-class-registry',
  namespace: 'vonixx.weight-classes',
  version: '1.0.0',
  items: {
    light: { id: 'light', name: 'Lightweight (0 - 5 lbs)' },
    heavy: { id: 'heavy', name: 'Heavy Cargo (70 - 150 lbs)' },
    oversized: { id: 'oversized', name: 'LTL Freight (> 150 lbs)' },
  },
};

export const unitRegistry: Registry<any> = {
  id: 'unit-registry',
  namespace: 'vonixx.units',
  version: '1.0.0',
  items: {
    in: { id: 'in', name: 'Inches', type: 'dimension' },
    cm: { id: 'cm', name: 'Centimeters', type: 'dimension' },
    lb: { id: 'lb', name: 'Pounds', type: 'weight' },
    kg: { id: 'kg', name: 'Kilograms', type: 'weight' },
  },
};

export const hazardousMaterialRegistry: Registry<any> = {
  id: 'hazardous-material-registry',
  namespace: 'vonixx.hazmat',
  version: '1.0.0',
  items: {
    class9: { id: 'class9', name: 'Lithium Ion Batteries (Class 9)' },
    dryice: { id: 'dryice', name: 'Dry Ice Carbon Dioxide (Class 9)' },
  },
};

export const fragileHandlingRegistry: Registry<any> = {
  id: 'fragile-handling-registry',
  namespace: 'vonixx.fragile-handling',
  version: '1.0.0',
  items: {
    glass: { id: 'glass', instruction: 'Fragile: Handle with Care' },
    upright: { id: 'upright', instruction: 'Keep Upright: This Side Up' },
  },
};
