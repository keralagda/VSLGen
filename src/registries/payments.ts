import type { Registry } from './types';
import { INCO_TERMS } from '@/constants';

export const paymentMethodRegistry: Registry<any> = {
  id: 'payment-method-registry',
  namespace: 'vonixx.payment-methods',
  version: '1.0.0',
  items: {
    'credit-card': { id: 'credit-card', name: 'Credit Card' },
    paypal: { id: 'paypal', name: 'PayPal Account' },
    wire: { id: 'wire', name: 'Bank Wire Transfer' },
  },
};

export const codRegistry: Registry<any> = {
  id: 'cod-registry',
  namespace: 'vonixx.cod',
  version: '1.0.0',
  items: {
    cash: { id: 'cash', name: 'COD Cash Collection' },
    check: { id: 'check', name: 'COD Cashier\'s Check' },
  },
};

export const taxRegistry: Registry<any> = {
  id: 'tax-registry',
  namespace: 'vonixx.taxes',
  version: '1.0.0',
  items: {
    sales: { id: 'sales', rate: 0.0825, name: 'Standard Sales Tax' },
    vat: { id: 'vat', rate: 0.19, name: 'Value Added Tax (VAT)' },
  },
};

export const gstRegistry: Registry<any> = {
  id: 'gst-registry',
  namespace: 'vonixx.gst',
  version: '1.0.0',
  items: {
    standard: { id: 'standard', name: 'Goods and Services Tax (GST)' },
  },
};

export const incotermRegistry: Registry<any> = {
  id: 'incoterm-registry',
  namespace: 'vonixx.incoterms',
  version: '1.0.0',
  items: INCO_TERMS.reduce((acc, term) => {
    acc[term.code] = term;
    return acc;
  }, {} as Record<string, any>),
};

export const insuranceRegistry: Registry<any> = {
  id: 'insurance-registry',
  namespace: 'vonixx.insurance',
  version: '1.0.0',
  items: {
    basic: { id: 'basic', coverageLimit: 100, surcharge: 0 },
    premium: { id: 'premium', coverageLimit: 5000, surcharge: 15 },
  },
};
