import type { Registry } from './types';
import { defaultTemplates } from './defaultTemplates';

export const labelTemplateRegistry: Registry<any> = {
  id: 'label-template-registry',
  namespace: 'vonixx.templates',
  version: '1.0.0',
  items: defaultTemplates.reduce((acc, temp) => {
    acc[temp.id] = temp;
    return acc;
  }, {} as Record<string, any>),
};

export const documentTypeRegistry: Registry<any> = {
  id: 'document-type-registry',
  namespace: 'vonixx.document-types',
  version: '1.0.0',
  items: {
    label: { id: 'label', name: 'Shipping Label', template: '4x6' },
    invoice: { id: 'invoice', name: 'Commercial Invoice', template: 'letter' },
    'packing-slip': { id: 'packing-slip', name: 'Packing Slip', template: 'letter' },
    manifest: { id: 'manifest', name: 'Manifest', template: 'letter' },
  },
};

export const invoiceRegistry: Registry<any> = {
  id: 'invoice-registry',
  namespace: 'vonixx.invoices',
  version: '1.0.0',
  items: {
    standard: { id: 'standard', name: 'Standard Commercial Invoice' },
  },
};

export const packingSlipRegistry: Registry<any> = {
  id: 'packing-slip-registry',
  namespace: 'vonixx.packing-slips',
  version: '1.0.0',
  items: {
    standard: { id: 'standard', name: 'Standard Packing Slip' },
  },
};

export const manifestRegistry: Registry<any> = {
  id: 'manifest-registry',
  namespace: 'vonixx.manifests',
  version: '1.0.0',
  items: {
    standard: { id: 'standard', name: 'End-of-day Manifest' },
  },
};

export const customsDocumentRegistry: Registry<any> = {
  id: 'customs-document-registry',
  namespace: 'vonixx.customs',
  version: '1.0.0',
  items: {
    cn22: { id: 'cn22', name: 'CN22 Customs Declaration' },
    cn23: { id: 'cn23', name: 'CN23 Customs Declaration' },
  },
};

export const proofOfDeliveryRegistry: Registry<any> = {
  id: 'proof-of-delivery-registry',
  namespace: 'vonixx.pod',
  version: '1.0.0',
  items: {
    signature: { id: 'signature', name: 'Recipient Signature POD' },
    photo: { id: 'photo', name: 'Delivery Location Photo POD' },
  },
};

export const exportDocumentRegistry: Registry<any> = {
  id: 'export-document-registry',
  namespace: 'vonixx.export-docs',
  version: '1.0.0',
  items: {
    standard: { id: 'standard', name: 'Certificate of Origin' },
  },
};
