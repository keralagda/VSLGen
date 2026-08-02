import type { Registry } from './types';

export const addressBookRegistry: Registry<any> = {
  id: 'address-book-registry',
  namespace: 'vonixx.addresses',
  version: '1.0.0',
  items: {
    hq: { id: 'hq', name: 'Corporate Headquarters', street1: '100 Main St', city: 'Austin', state: 'TX', country: 'US' },
  },
};

export const customerRegistry: Registry<any> = {
  id: 'customer-registry',
  namespace: 'vonixx.customers',
  version: '1.0.0',
  items: {
    cust001: { id: 'cust001', name: 'John Doe Enterprise', tier: 'premium' },
  },
};

export const supplierRegistry: Registry<any> = {
  id: 'supplier-registry',
  namespace: 'vonixx.suppliers',
  version: '1.0.0',
  items: {
    supp001: { id: 'supp001', name: 'Zenith Logistics Suppliers' },
  },
};

export const vendorRegistry: Registry<any> = {
  id: 'vendor-registry',
  namespace: 'vonixx.vendors',
  version: '1.0.0',
  items: {
    vend001: { id: 'vend001', name: 'Acme Packing Materials' },
  },
};

export const organizationRegistry: Registry<any> = {
  id: 'organization-registry',
  namespace: 'vonixx.organizations',
  version: '1.0.0',
  items: {
    org1: { id: 'org1', name: 'VONIXX Global Logistics' },
  },
};
