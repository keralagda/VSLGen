import type { Registry } from './types';

export const validationRegistry: Registry<any> = {
  id: 'validation-registry',
  namespace: 'vonixx.validation',
  version: '1.0.0',
  items: {
    required: {
      validate: (v: any) => v !== undefined && v !== null && String(v).trim() !== '',
      message: 'This field is required',
    },
    email: {
      validate: (v: any) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'Invalid email address',
    },
    phone: {
      validate: (v: any) => !v || /^\+?[0-9\s\-()]{7,20}$/.test(v),
      message: 'Invalid phone number',
    },
    postalCode: {
      validate: (v: any) => !v || /^[a-zA-Z0-9\s\-]{3,10}$/.test(v),
      message: 'Invalid postal code',
    },
    gstin: {
      validate: (v: any) => !v || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v),
      message: 'Invalid GSTIN format',
    },
  },
};

export const variableRegistry: Registry<any> = {
  id: 'variable-registry',
  namespace: 'vonixx.variables',
  version: '1.0.0',
  items: {
    'shipper.name': { id: 'shipper.name', semanticType: 'name', tags: ['shipper'] },
    'consignee.name': { id: 'consignee.name', semanticType: 'name', tags: ['consignee'] },
  },
};

export const expressionRegistry: Registry<any> = {
  id: 'expression-registry',
  namespace: 'vonixx.expressions',
  version: '1.0.0',
  items: {
    isFreeShipping: { id: 'isFreeShipping', expression: '{{shipment.codAmount}} == 0' },
  },
};

export const formulaRegistry: Registry<any> = {
  id: 'formula-registry',
  namespace: 'vonixx.formulas',
  version: '1.0.0',
  items: {
    dimensionalWeight: { id: 'dimensionalWeight', formula: '({{length}} * {{width}} * {{height}}) / 139' },
  },
};

export const schemaRegistry: Registry<any> = {
  id: 'schema-registry',
  namespace: 'vonixx.schemas',
  version: '1.0.0',
  items: {
    shippingLabel: { id: 'shippingLabel', type: 'object', required: ['shipper', 'consignee'] },
  },
};

export const metadataRegistry: Registry<any> = {
  id: 'metadata-registry',
  namespace: 'vonixx.metadata',
  version: '1.0.0',
  items: {
    trackingNumber: { id: 'trackingNumber', purpose: 'Package tracking identification code' },
  },
};
