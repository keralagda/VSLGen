import type { Registry } from './types';

export interface SectionConfig {
  id: string;
  title: string;
  component: string;
  fields: string[];
}

export const sectionRegistry: Registry<SectionConfig> = {
  id: 'section-registry',
  namespace: 'vonixx.sections',
  version: '1.0.0',
  metadata: {
    description: 'Registry defining pages and panels mapping to sets of fields',
  },
  items: {
    shipper: {
      id: 'shipper',
      title: 'Shipper Details',
      component: 'shipper',
      fields: [
        'shipper.name',
        'shipper.company',
        'shipper.street1',
        'shipper.street2',
        'shipper.city',
        'shipper.state',
        'shipper.postalCode',
        'shipper.country',
        'shipper.phone',
        'shipper.email',
        'shipper.taxId',
        'shipper.accountNumber',
      ],
    },
    consignee: {
      id: 'consignee',
      title: 'Consignee Details',
      component: 'consignee',
      fields: [
        'consignee.name',
        'consignee.company',
        'consignee.street1',
        'consignee.street2',
        'consignee.city',
        'consignee.state',
        'consignee.postalCode',
        'consignee.country',
        'consignee.phone',
        'consignee.email',
        'consignee.attention',
        'consignee.instructions',
      ],
    },
    shipment: {
      id: 'shipment',
      title: 'Shipment Details',
      component: 'shipment',
      fields: [
        'shipment.serviceLevel',
        'shipment.packagingType',
        'shipment.paymentType',
        'shipment.paymentAccount',
        'shipment.codAmount',
      ],
    },
  },
};
