import type { Country, Carrier, KeyboardShortcut } from '@/types';

export type { KeyboardShortcut } from '@/types';

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', phoneCode: '+1', postalCodeFormat: '#####-####', states: [
    { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }, { code: 'DC', name: 'District of Columbia' },
  ]},
  { code: 'CA', name: 'Canada', phoneCode: '+1', postalCodeFormat: 'A#A #A#', states: [
    { code: 'AB', name: 'Alberta' }, { code: 'BC', name: 'British Columbia' }, { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' }, { code: 'NL', name: 'Newfoundland and Labrador' }, { code: 'NS', name: 'Nova Scotia' },
    { code: 'ON', name: 'Ontario' }, { code: 'PE', name: 'Prince Edward Island' }, { code: 'QC', name: 'Quebec' },
    { code: 'SK', name: 'Saskatchewan' }, { code: 'NT', name: 'Northwest Territories' }, { code: 'NU', name: 'Nunavut' },
    { code: 'YT', name: 'Yukon' },
  ]},
  { code: 'GB', name: 'United Kingdom', phoneCode: '+44', postalCodeFormat: 'A# #AA' },
  { code: 'DE', name: 'Germany', phoneCode: '+49', postalCodeFormat: '#####' },
  { code: 'FR', name: 'France', phoneCode: '+33', postalCodeFormat: '#####' },
  { code: 'AU', name: 'Australia', phoneCode: '+61', postalCodeFormat: '####' },
  { code: 'JP', name: 'Japan', phoneCode: '+81', postalCodeFormat: '###-####' },
  { code: 'CN', name: 'China', phoneCode: '+86', postalCodeFormat: '######' },
  { code: 'BR', name: 'Brazil', phoneCode: '+55', postalCodeFormat: '#####-###' },
  { code: 'MX', name: 'Mexico', phoneCode: '+52', postalCodeFormat: '#####' },
  { code: 'IN', name: 'India', phoneCode: '+91', postalCodeFormat: '######' },
  { code: 'SG', name: 'Singapore', phoneCode: '+65', postalCodeFormat: '######' },
  { code: 'HK', name: 'Hong Kong', phoneCode: '+852' },
  { code: 'AE', name: 'United Arab Emirates', phoneCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', phoneCode: '+966', postalCodeFormat: '#####' },
  { code: 'ZA', name: 'South Africa', phoneCode: '+27', postalCodeFormat: '####' },
  { code: 'NL', name: 'Netherlands', phoneCode: '+31', postalCodeFormat: '#### AA' },
  { code: 'BE', name: 'Belgium', phoneCode: '+32', postalCodeFormat: '####' },
  { code: 'CH', name: 'Switzerland', phoneCode: '+41', postalCodeFormat: '####' },
  { code: 'AT', name: 'Austria', phoneCode: '+43', postalCodeFormat: '####' },
  { code: 'ES', name: 'Spain', phoneCode: '+34', postalCodeFormat: '#####' },
  { code: 'IT', name: 'Italy', phoneCode: '+39', postalCodeFormat: '#####' },
  { code: 'PT', name: 'Portugal', phoneCode: '+351', postalCodeFormat: '####-###' },
  { code: 'SE', name: 'Sweden', phoneCode: '+46', postalCodeFormat: '### ##' },
  { code: 'NO', name: 'Norway', phoneCode: '+47', postalCodeFormat: '####' },
  { code: 'DK', name: 'Denmark', phoneCode: '+45', postalCodeFormat: '####' },
  { code: 'FI', name: 'Finland', phoneCode: '+358', postalCodeFormat: '#####' },
  { code: 'PL', name: 'Poland', phoneCode: '+48', postalCodeFormat: '##-###' },
  { code: 'CZ', name: 'Czech Republic', phoneCode: '+420', postalCodeFormat: '### ##' },
  { code: 'HU', name: 'Hungary', phoneCode: '+36', postalCodeFormat: '####' },
  { code: 'RO', name: 'Romania', phoneCode: '+40', postalCodeFormat: '######' },
  { code: 'TR', name: 'Turkey', phoneCode: '+90', postalCodeFormat: '#####' },
  { code: 'IL', name: 'Israel', phoneCode: '+972', postalCodeFormat: '#######' },
  { code: 'KR', name: 'South Korea', phoneCode: '+82', postalCodeFormat: '#####' },
  { code: 'TW', name: 'Taiwan', phoneCode: '+886', postalCodeFormat: '###' },
  { code: 'TH', name: 'Thailand', phoneCode: '+66', postalCodeFormat: '#####' },
  { code: 'MY', name: 'Malaysia', phoneCode: '+60', postalCodeFormat: '#####' },
  { code: 'PH', name: 'Philippines', phoneCode: '+63', postalCodeFormat: '####' },
  { code: 'ID', name: 'Indonesia', phoneCode: '+62', postalCodeFormat: '#####' },
  { code: 'VN', name: 'Vietnam', phoneCode: '+84', postalCodeFormat: '######' },
  { code: 'NZ', name: 'New Zealand', phoneCode: '+64', postalCodeFormat: '####' },
  { code: 'AR', name: 'Argentina', phoneCode: '+54', postalCodeFormat: '####' },
  { code: 'CL', name: 'Chile', phoneCode: '+56', postalCodeFormat: '#######' },
  { code: 'CO', name: 'Colombia', phoneCode: '+57', postalCodeFormat: '######' },
  { code: 'PE', name: 'Peru', phoneCode: '+51', postalCodeFormat: '#####' },
  { code: 'VE', name: 'Venezuela', phoneCode: '+58', postalCodeFormat: '####' },
];

export const CARRIERS: Carrier[] = [
  {
    id: 'ups',
    name: 'UPS',
    code: 'ups',
    logo: '/carriers/ups.svg',
    requiresAccount: true,
    trackingUrl: 'https://www.ups.com/track?loc=en_US&tracknum=',
    serviceLevels: [
      { id: 'ups_next_day_air', name: 'UPS Next Day Air', code: '01', description: 'Next business day delivery', estimatedDays: '1' },
      { id: 'ups_2nd_day_air', name: 'UPS 2nd Day Air', code: '02', description: 'Second business day delivery', estimatedDays: '2' },
      { id: 'ups_ground', name: 'UPS Ground', code: '03', description: '1-5 business days', estimatedDays: '1-5' },
      { id: 'ups_3_day_select', name: 'UPS 3 Day Select', code: '12', description: 'Three business days', estimatedDays: '3' },
      { id: 'ups_worldwide_express', name: 'UPS Worldwide Express', code: '07', description: 'International express', estimatedDays: '1-3' },
      { id: 'ups_worldwide_saver', name: 'UPS Worldwide Saver', code: '13', description: 'International expedited', estimatedDays: '2-4' },
      { id: 'ups_worldwide_expedited', name: 'UPS Worldwide Expedited', code: '08', description: 'International economy', estimatedDays: '2-5' },
    ],
    packagingTypes: [
      { id: 'ups_letter', name: 'UPS Letter', code: '01', description: 'Document shipment' },
      { id: 'ups_package', name: 'UPS Package', code: '02', description: 'Custom packaging' },
      { id: 'ups_tube', name: 'UPS Tube', code: '03', description: 'Tube packaging' },
      { id: 'ups_pak', name: 'UPS Pak', code: '04', description: 'UPS branded pak' },
      { id: 'ups_express_box', name: 'UPS Express Box', code: '21', description: 'UPS Express Box' },
      { id: 'ups_25kg_box', name: 'UPS 25kg Box', code: '24', description: 'UPS 25kg Box' },
      { id: 'ups_10kg_box', name: 'UPS 10kg Box', code: '25', description: 'UPS 10kg Box' },
    ],
  },
  {
    id: 'fedex',
    name: 'FedEx',
    code: 'fedex',
    logo: '/carriers/fedex.svg',
    requiresAccount: true,
    trackingUrl: 'https://www.fedex.com/fedextrack/?trknbr=',
    serviceLevels: [
      { id: 'fedex_first_overnight', name: 'FedEx First Overnight', code: '01', description: 'Earliest next business day', estimatedDays: '1' },
      { id: 'fedex_priority_overnight', name: 'FedEx Priority Overnight', code: '02', description: 'Next business day by 10:30 AM', estimatedDays: '1' },
      { id: 'fedex_standard_overnight', name: 'FedEx Standard Overnight', code: '03', description: 'Next business day by 3:00 PM', estimatedDays: '1' },
      { id: 'fedex_2day', name: 'FedEx 2Day', code: '04', description: 'Second business day by 4:30 PM', estimatedDays: '2' },
      { id: 'fedex_express_saver', name: 'FedEx Express Saver', code: '05', description: 'Third business day', estimatedDays: '3' },
      { id: 'fedex_ground', name: 'FedEx Ground', code: '06', description: '1-5 business days', estimatedDays: '1-5' },
      { id: 'fedex_international_first', name: 'FedEx International First', code: '07', description: 'International earliest', estimatedDays: '1-3' },
      { id: 'fedex_international_priority', name: 'FedEx International Priority', code: '08', description: 'International priority', estimatedDays: '1-3' },
      { id: 'fedex_international_economy', name: 'FedEx International Economy', code: '09', description: 'International economy', estimatedDays: '4-6' },
    ],
    packagingTypes: [
      { id: 'fedex_envelope', name: 'FedEx Envelope', code: '01', description: 'Document envelope' },
      { id: 'fedex_pak', name: 'FedEx Pak', code: '02', description: 'FedEx branded pak' },
      { id: 'fedex_box', name: 'FedEx Box', code: '03', description: 'FedEx branded box' },
      { id: 'fedex_tube', name: 'FedEx Tube', code: '04', description: 'Tube packaging' },
      { id: 'fedex_10kg_box', name: 'FedEx 10kg Box', code: '05', description: 'FedEx 10kg Box' },
      { id: 'fedex_25kg_box', name: 'FedEx 25kg Box', code: '06', description: 'FedEx 25kg Box' },
      { id: 'your_packaging', name: 'Your Packaging', code: '07', description: 'Custom packaging' },
    ],
  },
  {
    id: 'usps',
    name: 'USPS',
    code: 'usps',
    logo: '/carriers/usps.svg',
    requiresAccount: false,
    trackingUrl: 'https://tools.usps.com/go/TrackConfirmAction?tLabels=',
    serviceLevels: [
      { id: 'usps_priority_mail_express', name: 'Priority Mail Express', code: 'EXPRESS', description: 'Next day to 2-day', estimatedDays: '1-2' },
      { id: 'usps_priority_mail', name: 'Priority Mail', code: 'PRIORITY', description: '1-3 business days', estimatedDays: '1-3' },
      { id: 'usps_first_class', name: 'First Class Package', code: 'FIRST_CLASS', description: '2-5 business days', estimatedDays: '2-5' },
      { id: 'usps_ground_advantage', name: 'Ground Advantage', code: 'GROUND', description: '2-5 business days', estimatedDays: '2-5' },
      { id: 'usps_media_mail', name: 'Media Mail', code: 'MEDIA', description: '2-8 business days', estimatedDays: '2-8' },
      { id: 'usps_international', name: 'International', code: 'INTL', description: 'Varies by destination', estimatedDays: '6-10' },
    ],
    packagingTypes: [
      { id: 'usps_flat_rate_envelope', name: 'Flat Rate Envelope', code: 'FR_ENV', description: 'USPS Flat Rate Envelope' },
      { id: 'usps_flat_rate_box_s', name: 'Flat Rate Box - Small', code: 'FR_BOX_S', description: '8-5/8" x 5-3/8" x 1-5/8"' },
      { id: 'usps_flat_rate_box_m', name: 'Flat Rate Box - Medium', code: 'FR_BOX_M', description: '13-5/8" x 11-7/8" x 3-3/8"' },
      { id: 'usps_flat_rate_box_l', name: 'Flat Rate Box - Large', code: 'FR_BOX_L', description: '12" x 12" x 5-1/2"' },
      { id: 'usps_regional_rate_box_a', name: 'Regional Rate Box A', code: 'RR_BOX_A', description: 'Regional Rate Box A' },
      { id: 'usps_regional_rate_box_b', name: 'Regional Rate Box B', code: 'RR_BOX_B', description: 'Regional Rate Box B' },
      { id: 'your_packaging', name: 'Your Packaging', code: 'YOUR', description: 'Custom packaging' },
    ],
  },
  {
    id: 'dhl',
    name: 'DHL',
    code: 'dhl',
    logo: '/carriers/dhl.svg',
    requiresAccount: true,
    trackingUrl: 'https://www.dhl.com/tracking?tracking-id=',
    serviceLevels: [
      { id: 'dhl_express_worldwide', name: 'DHL Express Worldwide', code: 'WX', description: 'International express', estimatedDays: '1-3' },
      { id: 'dhl_express_9', name: 'DHL Express 9:00', code: '90', description: 'Delivery by 9:00 AM', estimatedDays: '1' },
      { id: 'dhl_express_10', name: 'DHL Express 10:30', code: '10', description: 'Delivery by 10:30 AM', estimatedDays: '1' },
      { id: 'dhl_express_12', name: 'DHL Express 12:00', code: '12', description: 'Delivery by 12:00 PM', estimatedDays: '1' },
      { id: 'dhl_economy_select', name: 'DHL Economy Select', code: 'ES', description: 'International economy', estimatedDays: '4-8' },
      { id: 'dhl_domestic', name: 'DHL Domestic', code: 'DOM', description: 'Domestic delivery', estimatedDays: '1-3' },
    ],
    packagingTypes: [
      { id: 'dhl_express_envelope', name: 'DHL Express Envelope', code: 'ENV', description: 'Document envelope' },
      { id: 'dhl_express_pak', name: 'DHL Express Pak', code: 'PAK', description: 'DHL branded pak' },
      { id: 'dhl_box', name: 'DHL Box', code: 'BOX', description: 'DHL branded box' },
      { id: 'your_packaging', name: 'Your Packaging', code: 'YOUR', description: 'Custom packaging' },
    ],
  },
];

export const SPECIAL_SERVICES = [
  { id: 'signature_required', name: 'Signature Required', description: 'Adult signature required on delivery' },
  { id: 'adult_signature', name: 'Adult Signature Required', description: 'Signature from someone 21+ required' },
  { id: 'direct_signature', name: 'Direct Signature Required', description: 'Signature from recipient only' },
  { id: 'insurance', name: 'Declared Value / Insurance', description: 'Additional coverage for package value' },
  { id: 'cod', name: 'Collect on Delivery (COD)', description: 'Collect payment upon delivery' },
  { id: 'delivery_confirmation', name: 'Delivery Confirmation', description: 'Proof of delivery' },
  { id: 'return_receipt', name: 'Return Receipt', description: 'Signed return receipt mailed back' },
  { id: 'hold_at_location', name: 'Hold at Location', description: 'Hold for pickup at carrier facility' },
  { id: 'delivery_instructions', name: 'Delivery Instructions', description: 'Special handling instructions' },
  { id: 'saturday_delivery', name: 'Saturday Delivery', description: 'Deliver on Saturday' },
  { id: 'dry_ice', name: 'Dry Ice', description: 'Package contains dry ice' },
  { id: 'hazardous_materials', name: 'Hazardous Materials', description: 'Package contains hazmat' },
];

export const INCO_TERMS = [
  { code: 'EXW', name: 'Ex Works', description: 'Seller makes goods available at their premises' },
  { code: 'FCA', name: 'Free Carrier', description: 'Seller delivers to carrier at named place' },
  { code: 'CPT', name: 'Carriage Paid To', description: 'Seller pays carriage to named destination' },
  { code: 'CIP', name: 'Carriage and Insurance Paid To', description: 'Seller pays carriage and insurance to named destination' },
  { code: 'DAP', name: 'Delivered At Place', description: 'Seller delivers when goods placed at buyer disposal' },
  { code: 'DPU', name: 'Delivered At Place Unloaded', description: 'Seller delivers and unloads at named place' },
  { code: 'DDP', name: 'Delivered Duty Paid', description: 'Seller delivers cleared for import at named place' },
  { code: 'FAS', name: 'Free Alongside Ship', description: 'Seller delivers alongside vessel at named port' },
  { code: 'FOB', name: 'Free On Board', description: 'Seller delivers on board vessel at named port' },
  { code: 'CFR', name: 'Cost and Freight', description: 'Seller pays freight to named port' },
  { code: 'CIF', name: 'Cost, Insurance and Freight', description: 'Seller pays cost, insurance, freight to named port' },
];

export const PAYMENT_TYPES = [
  { value: 'prepaid', label: 'Prepaid (Sender Pays)', description: 'Shipper pays all charges' },
  { value: 'collect', label: 'Collect (Receiver Pays)', description: 'Consignee pays all charges' },
  { value: 'third-party', label: 'Third Party', description: 'Third party pays charges' },
];

export const DEFAULT_KEYBOARD_SHORTCUTS: KeyboardShortcut[] = [
  { key: 'n', ctrlKey: true, action: 'new-label', description: 'Create new label', enabled: true },
  { key: 's', ctrlKey: true, action: 'save-label', description: 'Save current label', enabled: true },
  { key: 'p', ctrlKey: true, action: 'print-label', description: 'Print label', enabled: true },
  { key: 'e', ctrlKey: true, action: 'export-label', description: 'Export label', enabled: true },
  { key: 't', ctrlKey: true, action: 'templates', description: 'Open templates', enabled: true },
  { key: 'a', ctrlKey: true, action: 'address-book', description: 'Open address book', enabled: true },
  { key: 'h', ctrlKey: true, action: 'history', description: 'Open history', enabled: true },
  { key: ',', ctrlKey: true, action: 'settings', description: 'Open settings', enabled: true },
  { key: '/', ctrlKey: false, action: 'search', description: 'Focus search', enabled: true },
  { key: 'z', ctrlKey: true, action: 'undo', description: 'Undo last action', enabled: true },
  { key: 'y', ctrlKey: true, action: 'redo', description: 'Redo last action', enabled: true },
  { key: 'Escape', ctrlKey: false, action: 'close-dialog', description: 'Close dialog', enabled: true },
  { key: 'Enter', ctrlKey: true, action: 'generate-preview', description: 'Generate preview', enabled: true },
];

export const LABEL_SIZES = [
  { id: '4x6', name: '4" x 6"', width: 4, height: 6, unit: 'in', carrier: 'UPS/FedEx/USPS/DHL' },
  { id: '4x8', name: '4" x 8"', width: 4, height: 8, unit: 'in', carrier: 'UPS/FedEx' },
  { id: 'a6', name: 'A6 (105 x 148 mm)', width: 105, height: 148, unit: 'mm', carrier: 'International' },
  { id: 'a5', name: 'A5 (148 x 210 mm)', width: 148, height: 210, unit: 'mm', carrier: 'International' },
  { id: 'letter', name: 'Letter (8.5" x 11")', width: 8.5, height: 11, unit: 'in', carrier: 'USPS/Document' },
  { id: 'custom', name: 'Custom Size', width: 4, height: 6, unit: 'in', carrier: 'Any' },
];

export const BARCODE_TYPES = [
  { value: 'code128', label: 'Code 128', description: 'High-density alphanumeric', maxLength: 48 },
  { value: 'code39', label: 'Code 39', description: 'Alphanumeric with start/stop chars', maxLength: 43 },
  { value: 'ean13', label: 'EAN-13', description: '13-digit retail barcode', maxLength: 12 },
  { value: 'upc-a', label: 'UPC-A', description: '12-digit retail barcode', maxLength: 11 },
  { value: 'qr', label: 'QR Code', description: '2D matrix barcode', maxLength: 2953 },
  { value: 'datamatrix', label: 'Data Matrix', description: '2D matrix barcode', maxLength: 2335 },
];

export const QR_ERROR_LEVELS = [
  { value: 'L', label: 'Low (7%)', description: '~7% error correction' },
  { value: 'M', label: 'Medium (15%)', description: '~15% error correction' },
  { value: 'Q', label: 'Quartile (25%)', description: '~25% error correction' },
  { value: 'H', label: 'High (30%)', description: '~30% error correction' },
];

export const THEMES = [
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
  { value: 'system', label: 'System', icon: 'monitor' },
];

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
];

export const DATE_FORMATS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)', example: '01/15/2024' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (UK/EU)', example: '15/01/2024' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)', example: '2024-01-15' },
  { value: 'MMM DD, YYYY', label: 'MMM DD, YYYY', example: 'Jan 15, 2024' },
  { value: 'DD MMM YYYY', label: 'DD MMM YYYY', example: '15 Jan 2024' },
];

export const NUMBER_FORMATS = [
  { value: 'en-US', label: '1,234.56 (US/UK)', example: '1,234.56' },
  { value: 'de-DE', label: '1.234,56 (DE/EU)', example: '1.234,56' },
  { value: 'fr-FR', label: '1 234,56 (FR)', example: '1 234,56' },
  { value: 'ja-JP', label: '1,234.56 (JP)', example: '1,234.56' },
];

export const DEFAULT_PREFERENCES = {
  theme: 'system' as const,
  defaultPaperSize: '4x6' as const,
  autoPrint: false,
  showGridLines: false,
  keyboardShortcuts: true,
  animations: true,
  language: 'en',
  dateFormat: 'MM/DD/YYYY',
  numberFormat: 'en-US',
  savedShippers: [],
  savedConsignees: [],
  recentTemplates: [],
};

export const STORAGE_KEYS = {
  PREFERENCES: 'vonixx_preferences',
  SHIPPERS: 'vonixx_shippers',
  CONSIGNEES: 'vonixx_consignees',
  TEMPLATES: 'vonixx_templates',
  HISTORY: 'vonixx_history',
  DRAFTS: 'vonixx_drafts',
  FORM_STATE: 'vonixx_form_state',
  UNDO_STACK: 'vonixx_undo_stack',
  REDO_STACK: 'vonixx_redo_stack',
};

export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/,
  postalCodeUS: /^\d{5}(-\d{4})?$/,
  postalCodeCA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
  trackingNumber: /^[A-Z0-9]{10,}$/,
  weight: /^\d+(\.\d+)?$/,
  dimensions: /^\d+(\.\d+)?$/,
};

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 200,
  slow: 300,
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const MAX_HISTORY_ITEMS = 1000;
export const MAX_DRAFTS = 50;
export const AUTO_SAVE_DELAY = 1000;
export const DEBOUNCE_DELAY = 300;