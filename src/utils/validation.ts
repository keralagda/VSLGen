import { z } from 'zod';

export const addressSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  company: z.string().max(100, 'Company name too long').optional(),
  street1: z.string().min(1, 'Street address is required').max(100, 'Street address too long'),
  street2: z.string().max(100, 'Street address too long').optional(),
  city: z.string().min(1, 'City is required').max(50, 'City name too long'),
  state: z.string().min(1, 'State/Province is required').max(50, 'State name too long'),
  postalCode: z.string().min(1, 'Postal code is required').max(20, 'Postal code too long'),
  country: z.string().min(2, 'Country is required').max(2, 'Invalid country code'),
  phone: z.string().max(20, 'Phone number too long').optional(),
  email: z.string().email('Invalid email address').max(100, 'Email too long').optional().or(z.literal('')),
  isDefault: z.boolean().optional(),
});

export const shipperSchema = addressSchema.extend({
  taxId: z.string().max(50, 'Tax ID too long').optional(),
  accountNumber: z.string().max(50, 'Account number too long').optional(),
});

export const consigneeSchema = addressSchema.extend({
  attention: z.string().max(100, 'Attention too long').optional(),
  instructions: z.string().max(500, 'Instructions too long').optional(),
});

export const packageSchema = z.object({
  id: z.string(),
  length: z.number().positive('Length must be positive'),
  width: z.number().positive('Width must be positive'),
  height: z.number().positive('Height must be positive'),
  weight: z.number().positive('Weight must be positive'),
  weightUnit: z.enum(['kg', 'lb']),
  dimensionUnit: z.enum(['cm', 'in']),
  description: z.string().max(200, 'Description too long').optional(),
  reference: z.string().max(50, 'Reference too long').optional(),
  declaredValue: z.number().min(0, 'Declared value cannot be negative').optional(),
  currency: z.string().length(3, 'Currency must be 3 characters').optional(),
});

export const shipmentSchema = z.object({
  serviceLevel: z.string().min(1, 'Service level is required'),
  serviceLevelName: z.string().min(1, 'Service level name is required'),
  packagingType: z.string().min(1, 'Packaging type is required'),
  packagingTypeName: z.string().min(1, 'Packaging type name is required'),
  packages: z.array(packageSchema).min(1, 'At least one package is required'),
  totalWeight: z.number().positive('Total weight must be positive'),
  totalWeightUnit: z.enum(['kg', 'lb']),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
    unit: z.enum(['cm', 'in']),
  }).optional(),
  specialServices: z.array(z.string()).optional(),
  reference1: z.string().max(50, 'Reference too long').optional(),
  reference2: z.string().max(50, 'Reference too long').optional(),
  reference3: z.string().max(50, 'Reference too long').optional(),
  customsValue: z.number().min(0, 'Customs value cannot be negative').optional(),
  customsCurrency: z.string().length(3, 'Currency must be 3 characters').optional(),
  customsDescription: z.string().max(200, 'Customs description too long').optional(),
  harmonizedCode: z.string().max(20, 'HS code too long').optional(),
  countryOfOrigin: z.string().length(2, 'Country code must be 2 characters').optional(),
  incoterm: z.string().max(10, 'Incoterm too long').optional(),
  paymentType: z.enum(['prepaid', 'collect', 'third-party']),
  paymentAccount: z.string().max(50, 'Account number too long').optional(),
  codAmount: z.number().min(0, 'COD amount cannot be negative').optional(),
  codCurrency: z.string().length(3, 'Currency must be 3 characters').optional(),
});

export const barcodeConfigSchema = z.object({
  type: z.enum(['code128', 'code39', 'ean13', 'upc-a', 'qr', 'datamatrix']),
  value: z.string().min(1, 'Barcode value is required'),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  displayValue: z.boolean().optional(),
  fontSize: z.number().positive().optional(),
  margin: z.number().min(0).optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  size: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
  }),
});

export const qrCodeConfigSchema = z.object({
  value: z.string().min(1, 'QR code value is required'),
  size: z.number().positive(),
  errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']),
  margin: z.number().min(0),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  includeLogo: z.boolean().optional(),
  logoUrl: z.string().url('Invalid logo URL').optional(),
});

export const labelFieldSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'barcode', 'qr', 'line', 'box', 'image']),
  label: z.string().optional(),
  value: z.string().optional(),
  dataPath: z.string().optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  size: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  style: z.object({
    fontSize: z.number().positive().optional(),
    fontWeight: z.string().optional(),
    fontFamily: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    borderColor: z.string().optional(),
    borderWidth: z.number().min(0).optional(),
    borderStyle: z.string().optional(),
    textAlign: z.enum(['left', 'center', 'right']).optional(),
    verticalAlign: z.enum(['top', 'middle', 'bottom']).optional(),
    rotation: z.number().optional(),
  }),
  condition: z.string().optional(),
});

export const labelTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Template name is required').max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  carrier: z.string().min(1, 'Carrier is required'),
  format: z.enum(['4x6', '4x8', 'a5', 'a6', 'letter', 'custom']),
  width: z.number().positive('Width must be positive'),
  height: z.number().positive('Height must be positive'),
  unit: z.enum(['in', 'mm', 'cm']),
  orientation: z.enum(['portrait', 'landscape']),
  margins: z.object({
    top: z.number().min(0),
    right: z.number().min(0),
    bottom: z.number().min(0),
    left: z.number().min(0),
  }),
  fields: z.array(labelFieldSchema),
  barcodes: z.array(barcodeConfigSchema),
  qrCodes: z.array(qrCodeConfigSchema),
  isDefault: z.boolean().optional(),
  isCustom: z.boolean().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const shippingLabelSchema = z.object({
  id: z.string(),
  shipper: shipperSchema,
  consignee: consigneeSchema,
  shipment: shipmentSchema,
  templateId: z.string().min(1, 'Template is required'),
  barcode: barcodeConfigSchema,
  qrCode: qrCodeConfigSchema.optional(),
  trackingNumber: z.string().optional(),
  status: z.enum(['draft', 'generated', 'printed', 'voided']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  printedAt: z.string().datetime().optional(),
  voidedAt: z.string().datetime().optional(),
  voidReason: z.string().optional(),
});

export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  defaultPrinter: z.string().optional(),
  defaultPaperSize: z.enum(['4x6', '4x8', 'a5', 'a6', 'letter']),
  autoPrint: z.boolean(),
  showGridLines: z.boolean(),
  defaultCarrier: z.string().optional(),
  defaultServiceLevel: z.string().optional(),
  defaultPackagingType: z.string().optional(),
  savedShippers: z.array(shipperSchema),
  savedConsignees: z.array(consigneeSchema),
  recentTemplates: z.array(z.string()),
  keyboardShortcuts: z.boolean(),
  animations: z.boolean(),
  language: z.string().length(2),
  dateFormat: z.string(),
  numberFormat: z.string(),
});

export type AddressFormData = z.infer<typeof addressSchema>;
export type ShipperFormData = z.infer<typeof shipperSchema>;
export type ConsigneeFormData = z.infer<typeof consigneeSchema>;
export type PackageFormData = z.infer<typeof packageSchema>;
export type ShipmentFormData = z.infer<typeof shipmentSchema>;
export type BarcodeConfigData = z.infer<typeof barcodeConfigSchema>;
export type QRCodeConfigData = z.infer<typeof qrCodeConfigSchema>;
export type LabelFieldData = z.infer<typeof labelFieldSchema>;
export type LabelTemplateData = z.infer<typeof labelTemplateSchema>;
export type ShippingLabelData = z.infer<typeof shippingLabelSchema>;
export type UserPreferencesData = z.infer<typeof userPreferencesSchema>;

export const fullShippingFormSchema = z.object({
  shipper: shipperSchema,
  consignee: consigneeSchema,
  shipment: shipmentSchema,
  templateId: z.string().min(1, 'Please select a template'),
  trackingNumber: z.string().optional(),
});

export type FullShippingFormData = z.infer<typeof fullShippingFormSchema>;