import type { Registry } from './types';

export const warehouseRegistry: Registry<any> = {
  id: 'warehouse-registry',
  namespace: 'vonixx.warehouses',
  version: '1.0.0',
  items: {
    'wh-001': { id: 'wh-001', name: 'Silicon Valley Fulfillment Center', code: 'SVFC-1' },
    'wh-002': { id: 'wh-002', name: 'Texas Central Warehouse', code: 'TXCW-2' },
  },
};

export const distributionCenterRegistry: Registry<any> = {
  id: 'distribution-center-registry',
  namespace: 'vonixx.dc',
  version: '1.0.0',
  items: {
    'dc-east': { id: 'dc-east', name: 'East Coast DC', region: 'East' },
    'dc-west': { id: 'dc-west', name: 'West Coast DC', region: 'West' },
  },
};

export const pickupLocationRegistry: Registry<any> = {
  id: 'pickup-location-registry',
  namespace: 'vonixx.pickup-locations',
  version: '1.0.0',
  items: {
    front: { id: 'front', description: 'Warehouse Front Office' },
    dock3: { id: 'dock3', description: 'Loading Dock 3' },
  },
};

export const dropoffLocationRegistry: Registry<any> = {
  id: 'dropoff-location-registry',
  namespace: 'vonixx.dropoff-locations',
  version: '1.0.0',
  items: {
    reception: { id: 'reception', description: 'Consignee Main Reception' },
    backdoor: { id: 'backdoor', description: 'Deliver to backdoor, ring bell' },
  },
};

export const routeRegistry: Registry<any> = {
  id: 'route-registry',
  namespace: 'vonixx.routes',
  version: '1.0.0',
  items: {
    expedited: { id: 'expedited', transitPoints: ['SVFC-1', 'LAX-Hub', 'TXCW-2'] },
  },
};

export const zoneRegistry: Registry<any> = {
  id: 'zone-registry',
  namespace: 'vonixx.zones',
  version: '1.0.0',
  items: {
    zone1: { id: 'zone1', minMiles: 0, maxMiles: 150 },
    zone2: { id: 'zone2', minMiles: 151, maxMiles: 300 },
  },
};

export const transitHubRegistry: Registry<any> = {
  id: 'transit-hub-registry',
  namespace: 'vonixx.transit-hubs',
  version: '1.0.0',
  items: {
    lax: { id: 'lax', name: 'Los Angeles Logistics Hub', code: 'LAX-Hub' },
    ord: { id: 'ord', name: 'Chicago O\'Hare Hub', code: 'ORD-Hub' },
  },
};
