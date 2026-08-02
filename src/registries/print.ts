import type { Registry } from './types';
import { LABEL_SIZES, BARCODE_TYPES } from '@/constants';

export const printProfileRegistry: Registry<any> = {
  id: 'print-profile-registry',
  namespace: 'vonixx.print-profiles',
  version: '1.0.0',
  items: {
    laser: { id: 'laser', dpi: 300, format: 'PDF', color: 'monochrome' },
    thermal: { id: 'thermal', dpi: 203, format: 'ZPL', color: 'monochrome' },
  },
};

export const paperRegistry: Registry<any> = {
  id: 'paper-registry',
  namespace: 'vonixx.papers',
  version: '1.0.0',
  items: {
    roll: { id: 'roll', name: 'Continuous Roll Paper' },
    sheet: { id: 'sheet', name: 'Individual Sheet Paper' },
  },
};

export const labelSizeRegistry: Registry<any> = {
  id: 'label-size-registry',
  namespace: 'vonixx.layouts',
  version: '1.0.0',
  items: LABEL_SIZES.reduce((acc, size) => {
    acc[size.id] = size;
    return acc;
  }, {} as Record<string, any>),
};

export const printerRegistry: Registry<any> = {
  id: 'printer-registry',
  namespace: 'vonixx.printers',
  version: '1.0.0',
  items: {
    system: { id: 'system', name: 'System Default Printer', driver: 'generic' },
    zebra: { id: 'zebra', name: 'Zebra ZP 450 thermal', driver: 'zpl' },
    dymo: { id: 'dymo', name: 'Dymo LabelWriter 4XL', driver: 'dpl' },
  },
};

export const thermalPrinterRegistry: Registry<any> = {
  id: 'thermal-printer-registry',
  namespace: 'vonixx.thermal-printers',
  version: '1.0.0',
  items: {
    zpl: { id: 'zpl', dpi: 203, emulation: 'zpl-ii' },
  },
};

export const barcodeRegistry: Registry<any> = {
  id: 'barcode-registry',
  namespace: 'vonixx.barcodes',
  version: '1.0.0',
  items: BARCODE_TYPES.reduce((acc, code) => {
    acc[code.value] = code;
    return acc;
  }, {} as Record<string, any>),
};

export const qrRegistry: Registry<any> = {
  id: 'qr-registry',
  namespace: 'vonixx.qrs',
  version: '1.0.0',
  items: {
    tracking: { id: 'tracking', value: '{{trackingNumber}}', size: 100 },
    invoice: { id: 'invoice', value: 'https://vonixx.com/invoice/{{id}}', size: 120 },
  },
};

export const watermarkRegistry: Registry<any> = {
  id: 'watermark-registry',
  namespace: 'vonixx.watermarks',
  version: '1.0.0',
  items: {
    draft: { id: 'draft', text: 'DRAFT', opacity: 0.1 },
    void: { id: 'void', text: 'VOIDED', opacity: 0.15 },
  },
};
