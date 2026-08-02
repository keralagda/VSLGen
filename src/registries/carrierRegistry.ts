import { CARRIERS } from '@/constants';
import type { Carrier } from '@/types';
import type { Registry } from './types';

export const carrierRegistry: Registry<Carrier> = {
  id: 'carrier-registry',
  namespace: 'vonixx.carriers',
  version: '1.0.0',
  metadata: {
    description: 'Registry containing global carrier definitions, service levels, and packaging types',
  },
  items: CARRIERS.reduce((acc, carrier) => {
    acc[carrier.id] = carrier;
    return acc;
  }, {} as Record<string, Carrier>),
};
