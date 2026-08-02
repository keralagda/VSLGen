export interface Address {
  id?: string;
  name: string;
  company?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Shipper extends Address {
  taxId?: string;
  accountNumber?: string;
}

export interface Consignee extends Address {
  attention?: string;
  instructions?: string;
}

export interface Package {
  id: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  weightUnit: 'kg' | 'lb';
  dimensionUnit: 'cm' | 'in';
  description?: string;
  reference?: string;
  declaredValue?: number;
  currency?: string;
}

export interface Shipment {
  id?: string;
  serviceLevel: string;
  serviceLevelName: string;
  packagingType: string;
  packagingTypeName: string;
  packages: Package[];
  totalWeight: number;
  totalWeightUnit: 'kg' | 'lb';
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  specialServices?: string[];
  reference1?: string;
  reference2?: string;
  reference3?: string;
  customsValue?: number;
  customsCurrency?: string;
  customsDescription?: string;
  harmonizedCode?: string;
  countryOfOrigin?: string;
  incoterm?: string;
  paymentType: 'prepaid' | 'collect' | 'third-party';
  paymentAccount?: string;
  codAmount?: number;
  codCurrency?: string;
}

export interface BarcodeConfig {
  type: 'code128' | 'code39' | 'ean13' | 'upc-a' | 'qr' | 'datamatrix';
  value: string;
  width?: number;
  height?: number;
  displayValue?: boolean;
  fontSize?: number;
  margin?: number;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

export interface QRCodeConfig {
  value: string;
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  position: {
    x: number;
    y: number;
  };
  includeLogo?: boolean;
  logoUrl?: string;
}

export interface LabelTemplate {
  id: string;
  name: string;
  description?: string;
  carrier: string;
  format: '4x6' | '4x8' | 'a5' | 'a6' | 'letter' | 'custom';
  width: number;
  height: number;
  unit: 'in' | 'mm' | 'cm';
  orientation: 'portrait' | 'landscape';
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  fields: LabelField[];
  barcodes: BarcodeConfig[];
  qrCodes: QRCodeConfig[];
  isDefault?: boolean;
  isCustom?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LabelField {
  id: string;
  type: 'text' | 'barcode' | 'qr' | 'line' | 'box' | 'image';
  label?: string;
  value?: string;
  dataPath?: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  style: {
    fontSize?: number;
    fontWeight?: string;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: string;
    textAlign?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'middle' | 'bottom';
    rotation?: number;
  };
  condition?: string;
}

export interface ShippingLabel {
  id: string;
  shipper: Shipper;
  consignee: Consignee;
  shipment: Shipment;
  templateId: string;
  barcode: BarcodeConfig;
  qrCode?: QRCodeConfig;
  trackingNumber?: string;
  status: 'draft' | 'generated' | 'printed' | 'voided';
  createdAt: string;
  updatedAt: string;
  printedAt?: string;
  voidedAt?: string;
  voidReason?: string;
}

export interface LabelHistory extends ShippingLabel {
  templateName: string;
  carrierName: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultPrinter?: string;
  defaultPaperSize: '4x6' | '4x8' | 'a5' | 'a6' | 'letter';
  autoPrint: boolean;
  showGridLines: boolean;
  defaultCarrier?: string;
  defaultServiceLevel?: string;
  defaultPackagingType?: string;
  savedShippers: Shipper[];
  savedConsignees: Consignee[];
  recentTemplates: string[];
  keyboardShortcuts: boolean;
  animations: boolean;
  language: string;
  dateFormat: string;
  numberFormat: string;
}

export interface Carrier {
  id: string;
  name: string;
  code: string;
  logo?: string;
  serviceLevels: ServiceLevel[];
  packagingTypes: PackagingType[];
  trackingUrl?: string;
  apiEndpoint?: string;
  requiresAccount: boolean;
}

export interface ServiceLevel {
  id: string;
  name: string;
  code: string;
  description?: string;
  estimatedDays?: string;
  maxWeight?: number;
  maxDimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

export interface PackagingType {
  id: string;
  name: string;
  code: string;
  description?: string;
  maxWeight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

export interface Country {
  code: string;
  name: string;
  phoneCode: string;
  postalCodeFormat?: string;
  states?: State[];
}

export interface State {
  code: string;
  name: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  dirty: boolean;
  isSubmitting: boolean;
  isValidating: boolean;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  action: string;
  description: string;
  enabled: boolean;
}

export interface PrintSettings {
  printerName?: string;
  paperSize: string;
  orientation: 'portrait' | 'landscape';
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  copies: number;
  quality: 'draft' | 'normal' | 'high';
  scaling: 'fit' | 'actual' | 'custom';
  customScale?: number;
}

export interface ExportSettings {
  format: 'pdf' | 'png' | 'svg';
  quality: number;
  includeBackground: boolean;
  filename: string;
}