import type { LabelTemplate, LabelField } from '@/types';

// Standard field configuration representing the VONIXX Shipping Label layout
const vonixxFields: LabelField[] = [
  // 1. BRAND LOGO
  {
    id: 'brand-logo',
    type: 'text',
    value: 'VONIXX',
    position: { x: 15, y: 15 },
    size: { width: 120, height: 35 },
    style: {
      fontSize: 28,
      fontWeight: 'bold',
      fontFamily: 'Inter, Arial, sans-serif',
      color: '#2563EB',
      textAlign: 'left',
      verticalAlign: 'middle',
    },
  },
  // LABEL TITLE
  {
    id: 'label-title',
    type: 'text',
    value: 'Shipping Label',
    position: { x: 220, y: 12 },
    size: { width: 165, height: 20 },
    style: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'right',
      verticalAlign: 'middle',
    },
  },
  // GENERATED DATE
  {
    id: 'generated-date',
    type: 'text',
    value: 'Generated on 24/05/2024',
    position: { x: 220, y: 32 },
    size: { width: 165, height: 20 },
    style: {
      fontSize: 10,
      color: '#555555',
      textAlign: 'right',
      verticalAlign: 'middle',
    },
  },
  // SEPARATOR 1 (HORIZONTAL)
  {
    id: 'sep-1',
    type: 'line',
    position: { x: 10, y: 60 },
    size: { width: 380, height: 0 },
    style: { borderWidth: 1, borderColor: '#C7C7C7', borderStyle: 'dashed' },
  },

  // 2. SHIPPER DETAILS
  {
    id: 'shipper-header',
    type: 'text',
    value: 'SHIPPER',
    position: { x: 15, y: 70 },
    size: { width: 170, height: 18 },
    style: { fontSize: 9, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'shipper-name',
    type: 'text',
    dataPath: 'shipper.name',
    position: { x: 15, y: 88 },
    size: { width: 170, height: 20 },
    style: { fontSize: 11, fontWeight: 'bold' },
  },
  {
    id: 'shipper-company',
    type: 'text',
    dataPath: 'shipper.company',
    position: { x: 15, y: 108 },
    size: { width: 170, height: 18 },
    style: { fontSize: 9 },
  },
  {
    id: 'shipper-address1',
    type: 'text',
    dataPath: 'shipper.street1',
    position: { x: 15, y: 126 },
    size: { width: 170, height: 18 },
    style: { fontSize: 9 },
  },
  {
    id: 'shipper-address2',
    type: 'text',
    dataPath: 'shipper.city',
    position: { x: 15, y: 144 },
    size: { width: 170, height: 18 },
    style: { fontSize: 9 },
  },
  {
    id: 'shipper-phone',
    type: 'text',
    dataPath: 'shipper.phone',
    position: { x: 15, y: 162 },
    size: { width: 170, height: 18 },
    style: { fontSize: 9 },
  },

  // VERTICAL DIVIDER (Shipper / Consignee)
  {
    id: 'divider-vertical-1',
    type: 'line',
    position: { x: 200, y: 70 },
    size: { width: 0, height: 130 },
    style: { borderWidth: 1, borderColor: '#C7C7C7', borderStyle: 'dashed' },
  },

  // CONSIGNEE DETAILS
  {
    id: 'consignee-header',
    type: 'text',
    value: 'CONSIGNEE',
    position: { x: 215, y: 70 },
    size: { width: 170, height: 18 },
    style: { fontSize: 9, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'consignee-name',
    type: 'text',
    dataPath: 'consignee.name',
    position: { x: 215, y: 88 },
    size: { width: 170, height: 20 },
    style: { fontSize: 11, fontWeight: 'bold' },
  },
  {
    id: 'consignee-company',
    type: 'text',
    dataPath: 'consignee.company',
    position: { x: 215, y: 108 },
    size: { width: 170, height: 18 },
    style: { fontSize: 9 },
  },
  {
    id: 'consignee-address1',
    type: 'text',
    dataPath: 'consignee.street1',
    position: { x: 215, y: 126 },
    size: { width: 170, height: 18 },
    style: { fontSize: 9 },
  },
  {
    id: 'consignee-address2',
    type: 'text',
    dataPath: 'consignee.city',
    position: { x: 215, y: 144 },
    size: { width: 170, height: 18 },
    style: { fontSize: 9 },
  },
  {
    id: 'consignee-phone',
    type: 'text',
    dataPath: 'consignee.phone',
    position: { x: 215, y: 162 },
    size: { width: 170, height: 18 },
    style: { fontSize: 9 },
  },

  // SEPARATOR 2 (HORIZONTAL)
  {
    id: 'sep-2',
    type: 'line',
    position: { x: 10, y: 210 },
    size: { width: 380, height: 0 },
    style: { borderWidth: 1, borderColor: '#C7C7C7', borderStyle: 'dashed' },
  },

  // 3. TRACKING SECTION
  {
    id: 'tracking-header',
    type: 'text',
    value: 'TRACKING NUMBER',
    position: { x: 15, y: 220 },
    size: { width: 230, height: 16 },
    style: { fontSize: 8, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'tracking-value',
    type: 'text',
    dataPath: 'trackingNumber',
    position: { x: 15, y: 236 },
    size: { width: 230, height: 32 },
    style: { fontSize: 20, fontWeight: 'bold' },
  },
  {
    id: 'barcode-element',
    type: 'barcode',
    dataPath: 'trackingNumber',
    position: { x: 15, y: 270 },
    size: { width: 230, height: 40 },
    style: {},
  },

  // VERTICAL DIVIDER (Tracking / QR)
  {
    id: 'divider-vertical-2',
    type: 'line',
    position: { x: 260, y: 210 },
    size: { width: 0, height: 110 },
    style: { borderWidth: 1, borderColor: '#C7C7C7', borderStyle: 'dashed' },
  },

  // QR CODE
  {
    id: 'qr-header',
    type: 'text',
    value: 'QR CODE',
    position: { x: 275, y: 220 },
    size: { width: 110, height: 16 },
    style: { fontSize: 8, fontWeight: 'bold', color: '#555555', textAlign: 'center' },
  },
  {
    id: 'qr-element',
    type: 'qr',
    dataPath: 'trackingNumber',
    position: { x: 292, y: 238 },
    size: { width: 75, height: 75 },
    style: {},
  },

  // SEPARATOR 3 (HORIZONTAL)
  {
    id: 'sep-3',
    type: 'line',
    position: { x: 10, y: 320 },
    size: { width: 380, height: 0 },
    style: { borderWidth: 1, borderColor: '#C7C7C7', borderStyle: 'dashed' },
  },

  // 4. SHIPMENT DETAILS MATRIX
  // COURIER
  {
    id: 'lbl-courier',
    type: 'text',
    value: 'COURIER',
    position: { x: 15, y: 330 },
    size: { width: 70, height: 18 },
    style: { fontSize: 8, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'val-courier',
    type: 'text',
    value: 'Blue Dart',
    position: { x: 95, y: 330 },
    size: { width: 95, height: 18 },
    style: { fontSize: 9, fontWeight: 'bold' },
  },
  // SERVICE
  {
    id: 'lbl-service',
    type: 'text',
    value: 'SERVICE',
    position: { x: 15, y: 355 },
    size: { width: 70, height: 18 },
    style: { fontSize: 8, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'val-service',
    type: 'text',
    dataPath: 'shipment.serviceLevelName',
    position: { x: 95, y: 355 },
    size: { width: 95, height: 18 },
    style: { fontSize: 9, fontWeight: 'bold' },
  },
  // WEIGHT
  {
    id: 'lbl-weight',
    type: 'text',
    value: 'WEIGHT',
    position: { x: 15, y: 380 },
    size: { width: 70, height: 18 },
    style: { fontSize: 8, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'val-weight',
    type: 'text',
    dataPath: 'shipment.totalWeight',
    position: { x: 95, y: 380 },
    size: { width: 95, height: 18 },
    style: { fontSize: 9, fontWeight: 'bold' },
  },
  // PIECES
  {
    id: 'lbl-pieces',
    type: 'text',
    value: 'PIECES',
    position: { x: 15, y: 405 },
    size: { width: 70, height: 18 },
    style: { fontSize: 8, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'val-pieces',
    type: 'text',
    value: '2',
    position: { x: 95, y: 405 },
    size: { width: 95, height: 18 },
    style: { fontSize: 9, fontWeight: 'bold' },
  },

  // VERTICAL DIVIDER (Shipment Details)
  {
    id: 'divider-vertical-3',
    type: 'line',
    position: { x: 200, y: 320 },
    size: { width: 0, height: 120 },
    style: { borderWidth: 1, borderColor: '#C7C7C7', borderStyle: 'dashed' },
  },

  // ORDER NO
  {
    id: 'lbl-order',
    type: 'text',
    value: 'ORDER NO.',
    position: { x: 215, y: 330 },
    size: { width: 75, height: 18 },
    style: { fontSize: 8, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'val-order',
    type: 'text',
    value: 'ORD-2024-000567',
    position: { x: 295, y: 330 },
    size: { width: 90, height: 18 },
    style: { fontSize: 9, fontWeight: 'bold' },
  },
  // INVOICE NO
  {
    id: 'lbl-invoice',
    type: 'text',
    value: 'INVOICE NO.',
    position: { x: 215, y: 355 },
    size: { width: 75, height: 18 },
    style: { fontSize: 8, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'val-invoice',
    type: 'text',
    value: 'INV-2024-000567',
    position: { x: 295, y: 355 },
    size: { width: 90, height: 18 },
    style: { fontSize: 9, fontWeight: 'bold' },
  },
  // REFERENCE NO
  {
    id: 'lbl-ref',
    type: 'text',
    value: 'REFERENCE NO.',
    position: { x: 215, y: 380 },
    size: { width: 75, height: 18 },
    style: { fontSize: 8, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'val-ref',
    type: 'text',
    value: 'REF-2024-5678',
    position: { x: 295, y: 380 },
    size: { width: 90, height: 18 },
    style: { fontSize: 9, fontWeight: 'bold' },
  },
  // SHIPPING DATE
  {
    id: 'lbl-ship-date',
    type: 'text',
    value: 'SHIPPING DATE',
    position: { x: 215, y: 405 },
    size: { width: 75, height: 18 },
    style: { fontSize: 8, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'val-ship-date',
    type: 'text',
    value: '24/05/2024',
    position: { x: 295, y: 405 },
    size: { width: 90, height: 18 },
    style: { fontSize: 9, fontWeight: 'bold' },
  },

  // SEPARATOR 4 (HORIZONTAL)
  {
    id: 'sep-4',
    type: 'line',
    position: { x: 10, y: 440 },
    size: { width: 380, height: 0 },
    style: { borderWidth: 1, borderColor: '#C7C7C7', borderStyle: 'dashed' },
  },

  // 5. SPECIAL INSTRUCTIONS
  {
    id: 'instructions-header',
    type: 'text',
    value: 'SPECIAL INSTRUCTIONS',
    position: { x: 15, y: 450 },
    size: { width: 370, height: 16 },
    style: { fontSize: 8, fontWeight: 'bold', color: '#555555' },
  },
  {
    id: 'instructions-value',
    type: 'text',
    dataPath: 'consignee.instructions',
    position: { x: 15, y: 468 },
    size: { width: 370, height: 32 },
    style: { fontSize: 10, color: '#222222' },
  },

  // SEPARATOR 5 (HORIZONTAL)
  {
    id: 'sep-5',
    type: 'line',
    position: { x: 10, y: 510 },
    size: { width: 380, height: 0 },
    style: { borderWidth: 1, borderColor: '#C7C7C7', borderStyle: 'dashed' },
  },

  // 6. FOOTER BRANDING SECTION
  {
    id: 'footer-bg',
    type: 'box',
    position: { x: 10, y: 510 },
    size: { width: 380, height: 75 },
    style: { backgroundColor: '#000000', borderWidth: 0 },
  },
  {
    id: 'footer-thanks',
    type: 'text',
    value: 'Thank you for shipping with VONIXX',
    position: { x: 20, y: 522 },
    size: { width: 360, height: 18 },
    style: { fontSize: 10, fontWeight: 'bold', color: '#ffffff', textAlign: 'center' },
  },
  {
    id: 'footer-generator',
    type: 'text',
    value: 'Generated using VONIXX Shipping Label Generator',
    position: { x: 20, y: 542 },
    size: { width: 360, height: 16 },
    style: { fontSize: 8, color: '#cccccc', textAlign: 'center' },
  },
  {
    id: 'footer-links',
    type: 'text',
    value: 'www.vonixx.com | support@vonixx.com',
    position: { x: 20, y: 560 },
    size: { width: 360, height: 16 },
    style: { fontSize: 8, color: '#cccccc', textAlign: 'center' },
  },
];

export const defaultTemplates: LabelTemplate[] = [
  {
    id: 'ups-standard',
    name: 'UPS Standard 4x6',
    description: 'Standard UPS shipping label format',
    carrier: 'ups',
    format: '4x6',
    width: 4,
    height: 6,
    unit: 'in',
    orientation: 'portrait',
    margins: { top: 10, right: 10, bottom: 10, left: 10 },
    fields: vonixxFields,
    barcodes: [],
    qrCodes: [],
    isDefault: true,
    isCustom: false,
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-08-01T00:00:00.000Z',
  },
  {
    id: 'fedex-standard',
    name: 'FedEx Standard 4x6',
    description: 'Standard FedEx shipping label format',
    carrier: 'fedex',
    format: '4x6',
    width: 4,
    height: 6,
    unit: 'in',
    orientation: 'portrait',
    margins: { top: 10, right: 10, bottom: 10, left: 10 },
    fields: vonixxFields,
    barcodes: [],
    qrCodes: [],
    isDefault: true,
    isCustom: false,
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-08-01T00:00:00.000Z',
  },
  {
    id: 'usps-standard',
    name: 'USPS Standard 4x6',
    description: 'Standard USPS shipping label format',
    carrier: 'usps',
    format: '4x6',
    width: 4,
    height: 6,
    unit: 'in',
    orientation: 'portrait',
    margins: { top: 10, right: 10, bottom: 10, left: 10 },
    fields: vonixxFields,
    barcodes: [],
    qrCodes: [],
    isDefault: true,
    isCustom: false,
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-08-01T00:00:00.000Z',
  },
];
