import type { Registry } from './types';
import type { Carrier } from '@/types';
import { CARRIERS } from '@/constants';

export const serviceTypeRegistry: Registry<any> = {
  id: 'service-type-registry',
  namespace: 'vonixx.services',
  version: '1.0.0',
  items: {
    preload: { id: 'preload', name: 'Preload', code: 'PRL' },
    standard: { id: 'standard', name: 'Standard', code: 'STD' },
    economy: { id: 'economy', name: 'Economy', code: 'ECO' },
    express: { id: 'express', name: 'Express', code: 'EXP' },
    priority: { id: 'priority', name: 'Priority', code: 'PRI' },
    'next-day': { id: 'next-day', name: 'Next Day', code: 'NDY' },
    'same-day': { id: 'same-day', name: 'Same Day', code: 'SDY' },
    overnight: { id: 'overnight', name: 'Overnight', code: 'OVN' },
    'two-day': { id: 'two-day', name: 'Two Day', code: '2DY' },
    ground: { id: 'ground', name: 'Ground', code: 'GRD' },
  },
};

export const packageTypeRegistry: Registry<any> = {
  id: 'package-type-registry',
  namespace: 'vonixx.packages',
  version: '1.0.0',
  items: {
    preload: { id: 'preload', name: 'Preload', code: 'PRL' },
    box: { id: 'box', name: 'Box', code: 'BOX' },
    'small-box': { id: 'small-box', name: 'Small Box', code: 'BOX_S' },
    'medium-box': { id: 'medium-box', name: 'Medium Box', code: 'BOX_M' },
    'large-box': { id: 'large-box', name: 'Large Box', code: 'BOX_L' },
    envelope: { id: 'envelope', name: 'Envelope', code: 'ENV' },
    'padded-envelope': { id: 'padded-envelope', name: 'Padded Envelope', code: 'ENV_P' },
    tube: { id: 'tube', name: 'Tube', code: 'TUBE' },
    crate: { id: 'crate', name: 'Crate', code: 'CRATE' },
    pallet: { id: 'pallet', name: 'Pallet', code: 'PALLET' },
  },
};

export const carrierRegistry: Registry<Carrier> = {
  id: 'carrier-registry',
  namespace: 'vonixx.carriers',
  version: '1.0.0',
  items: CARRIERS.reduce((acc, carrier) => {
    acc[carrier.id] = {
      ...carrier,
      metadata: {
        brandColor: carrier.id === 'ups' ? '#351C15' : carrier.id === 'fedex' ? '#4D148C' : '#FFCC00',
        supportedServices: carrier.serviceLevels.map(s => s.id),
        supportedPackageTypes: carrier.packagingTypes.map(p => p.id),
      },
    };
    return acc;
  }, {} as Record<string, any>),
};

export const shippingMethodRegistry: Registry<any> = {
  id: 'shipping-method-registry',
  namespace: 'vonixx.shipping-methods',
  version: '1.0.0',
  items: {
    land: { id: 'land', name: 'Land Transport' },
    air: { id: 'air', name: 'Air Transport' },
    ocean: { id: 'ocean', name: 'Ocean Freight' },
  },
};

export const shipmentStatusRegistry: Registry<any> = {
  id: 'shipment-status-registry',
  namespace: 'vonixx.shipment-statuses',
  version: '1.0.0',
  items: {
    draft: { id: 'draft', name: 'Draft' },
    generated: { id: 'generated', name: 'Generated' },
    printed: { id: 'printed', name: 'Printed' },
    voided: { id: 'voided', name: 'Voided' },
  },
};

export const shipmentPriorityRegistry: Registry<any> = {
  id: 'shipment-priority-registry',
  namespace: 'vonixx.shipment-priorities',
  version: '1.0.0',
  items: {
    low: { id: 'low', name: 'Low' },
    medium: { id: 'medium', name: 'Medium' },
    high: { id: 'high', name: 'High' },
    critical: { id: 'critical', name: 'Critical' },
  },
};

export const shipmentStageRegistry: Registry<any> = {
  id: 'shipment-stage-registry',
  namespace: 'vonixx.shipment-stages',
  version: '1.0.0',
  items: {
    creation: { id: 'creation', name: 'Creation' },
    verification: { id: 'verification', name: 'Verification' },
    sorting: { id: 'sorting', name: 'Sorting' },
    dispatch: { id: 'dispatch', name: 'Dispatch' },
  },
};

export const deliveryOptionRegistry: Registry<any> = {
  id: 'delivery-option-registry',
  namespace: 'vonixx.delivery-options',
  version: '1.0.0',
  items: {
    'leave-at-door': { id: 'leave-at-door', name: 'Leave at Door' },
    'signature-required': { id: 'signature-required', name: 'Signature Required' },
    'adult-signature': { id: 'adult-signature', name: 'Adult Signature 21+' },
  },
};

export const deliveryAttemptRegistry: Registry<any> = {
  id: 'delivery-attempt-registry',
  namespace: 'vonixx.delivery-attempts',
  version: '1.0.0',
  items: {
    first: { id: 'first', attempt: 1 },
    second: { id: 'second', attempt: 2 },
    third: { id: 'third', attempt: 3 },
  },
};

export const returnReasonRegistry: Registry<any> = {
  id: 'return-reason-registry',
  namespace: 'vonixx.return-reasons',
  version: '1.0.0',
  items: {
    damaged: { id: 'damaged', name: 'Damaged Goods' },
    'wrong-item': { id: 'wrong-item', name: 'Wrong Item Sent' },
    unsatisfied: { id: 'unsatisfied', name: 'Buyer Unsatisfied' },
  },
};
