import type { Registry } from './types';
import { COUNTRIES } from '@/constants';

export const countryRegistry: Registry<any> = {
  id: 'country-registry',
  namespace: 'vonixx.countries',
  version: '1.0.0',
  items: COUNTRIES.reduce((acc, c) => {
    acc[c.code] = c;
    return acc;
  }, {} as Record<string, any>),
};

export const stateRegistry: Registry<any> = {
  id: 'state-registry',
  namespace: 'vonixx.states',
  version: '1.0.0',
  items: {
    // US States
    CA: { id: 'CA', name: 'California', country: 'US' },
    NY: { id: 'NY', name: 'New York', country: 'US' },
    TX: { id: 'TX', name: 'Texas', country: 'US' },
    WA: { id: 'WA', name: 'Washington', country: 'US' },
    IL: { id: 'IL', name: 'Illinois', country: 'US' },

    // India States
    MH: { id: 'MH', name: 'Maharashtra', country: 'IN' },
    DL: { id: 'DL', name: 'Delhi', country: 'IN' },
    KA: { id: 'KA', name: 'Karnataka', country: 'IN' },
    TN: { id: 'TN', name: 'Tamil Nadu', country: 'IN' },
    TS: { id: 'TS', name: 'Telangana', country: 'IN' },

    // Canada Provinces
    ON: { id: 'ON', name: 'Ontario', country: 'CA' },
    QC: { id: 'QC', name: 'Quebec', country: 'CA' },
    BC: { id: 'BC', name: 'British Columbia', country: 'CA' },
    AB: { id: 'AB', name: 'Alberta', country: 'CA' },
  },
};

export const cityRegistry: Registry<any> = {
  id: 'city-registry',
  namespace: 'vonixx.cities',
  version: '1.0.0',
  items: {
    // US Cities
    sf: { id: 'sf', name: 'San Francisco', state: 'CA', country: 'US' },
    la: { id: 'la', name: 'Los Angeles', state: 'CA', country: 'US' },
    nyc: { id: 'nyc', name: 'New York City', state: 'NY', country: 'US' },
    buf: { id: 'buf', name: 'Buffalo', state: 'NY', country: 'US' },
    aus: { id: 'aus', name: 'Austin', state: 'TX', country: 'US' },
    hou: { id: 'hou', name: 'Houston', state: 'TX', country: 'US' },
    sea: { id: 'sea', name: 'Seattle', state: 'WA', country: 'US' },
    chi: { id: 'chi', name: 'Chicago', state: 'IL', country: 'US' },

    // India Cities
    mum: { id: 'mum', name: 'Mumbai', state: 'MH', country: 'IN' },
    pun: { id: 'pun', name: 'Pune', state: 'MH', country: 'IN' },
    del: { id: 'del', name: 'New Delhi', state: 'DL', country: 'IN' },
    blr: { id: 'blr', name: 'Bengaluru', state: 'KA', country: 'IN' },
    chn: { id: 'chn', name: 'Chennai', state: 'TN', country: 'IN' },
    hyd: { id: 'hyd', name: 'Hyderabad', state: 'TS', country: 'IN' },

    // Canada Cities
    tor: { id: 'tor', name: 'Toronto', state: 'ON', country: 'CA' },
    ott: { id: 'ott', name: 'Ottawa', state: 'ON', country: 'CA' },
    mtl: { id: 'mtl', name: 'Montreal', state: 'QC', country: 'CA' },
    van: { id: 'van', name: 'Vancouver', state: 'BC', country: 'CA' },
    cal: { id: 'cal', name: 'Calgary', state: 'AB', country: 'CA' },
  },
};

export const postalCodeRegistry: Registry<any> = {
  id: 'postal-code-registry',
  namespace: 'vonixx.postal-codes',
  version: '1.0.0',
  items: {
    // US Postal Codes
    '94107': { id: '94107', city: 'San Francisco', state: 'CA', country: 'US' },
    '90210': { id: '90210', city: 'Los Angeles', state: 'CA', country: 'US' },
    '10001': { id: '10001', city: 'New York City', state: 'NY', country: 'US' },
    '14201': { id: '14201', city: 'Buffalo', state: 'NY', country: 'US' },
    '78701': { id: '78701', city: 'Austin', state: 'TX', country: 'US' },
    '77001': { id: '77001', city: 'Houston', state: 'TX', country: 'US' },
    '98101': { id: '98101', city: 'Seattle', state: 'WA', country: 'US' },
    '60601': { id: '60601', city: 'Chicago', state: 'IL', country: 'US' },

    // India Postal Codes
    '400001': { id: '400001', city: 'Mumbai', state: 'MH', country: 'IN' },
    '411001': { id: '411001', city: 'Pune', state: 'MH', country: 'IN' },
    '110001': { id: '110001', city: 'New Delhi', state: 'DL', country: 'IN' },
    '560001': { id: '560001', city: 'Bengaluru', state: 'KA', country: 'IN' },
    '600001': { id: '600001', city: 'Chennai', state: 'TN', country: 'IN' },
    '500001': { id: '500001', city: 'Hyderabad', state: 'TS', country: 'IN' },

    // Canada Postal Codes
    'M5V 2T6': { id: 'M5V 2T6', city: 'Toronto', state: 'ON', country: 'CA' },
    'K1P 1J1': { id: 'K1P 1J1', city: 'Ottawa', state: 'ON', country: 'CA' },
    'H2W 1Y4': { id: 'H2W 1Y4', city: 'Montreal', state: 'QC', country: 'CA' },
    'V6B 4Y8': { id: 'V6B 4Y8', city: 'Vancouver', state: 'BC', country: 'CA' },
    'T2P 1J9': { id: 'T2P 1J9', city: 'Calgary', state: 'AB', country: 'CA' },
  },
};

export const currencyRegistry: Registry<any> = {
  id: 'currency-registry',
  namespace: 'vonixx.currencies',
  version: '1.0.0',
  items: {
    USD: { id: 'USD', name: 'US Dollar', symbol: '$' },
    CAD: { id: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    EUR: { id: 'EUR', name: 'Euro', symbol: '€' },
    INR: { id: 'INR', name: 'Indian Rupee', symbol: '₹' },
  },
};

export const languageRegistry: Registry<any> = {
  id: 'language-registry',
  namespace: 'vonixx.languages',
  version: '1.0.0',
  items: {
    en: { id: 'en', name: 'English', nativeName: 'English' },
    es: { id: 'es', name: 'Spanish', nativeName: 'Español' },
    hi: { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  },
};

export const timezoneRegistry: Registry<any> = {
  id: 'timezone-registry',
  namespace: 'vonixx.timezones',
  version: '1.0.0',
  items: {
    est: { id: 'est', name: 'Eastern Standard Time', offset: -5 },
    pst: { id: 'pst', name: 'Pacific Standard Time', offset: -8 },
    ist: { id: 'ist', name: 'Indian Standard Time', offset: 5.5 },
  },
};
