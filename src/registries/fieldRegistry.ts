import type { Registry } from './types';

export interface FieldConfig {
  id: string;
  type: 'text' | 'select' | 'checkbox' | 'textarea' | 'number';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: string[];
  options?: { value: string; label: string }[];
  defaultValue?: any;
}

export const fieldRegistry: Registry<FieldConfig> = {
  id: 'field-registry',
  namespace: 'vonixx.fields',
  version: '1.0.0',
  metadata: {
    description: 'Registry for shipping form field metadata configurations',
  },
  items: {
    // Shipper fields
    'shipper.name': { id: 'shipper.name', type: 'text', label: 'Name', required: true, validation: ['required'] },
    'shipper.company': { id: 'shipper.company', type: 'text', label: 'Company' },
    'shipper.street1': { id: 'shipper.street1', type: 'text', label: 'Street Address', required: true, validation: ['required'] },
    'shipper.street2': { id: 'shipper.street2', type: 'text', label: 'Apartment, Suite, Unit, etc.' },
    'shipper.city': { id: 'shipper.city', type: 'text', label: 'City', required: true, validation: ['required'] },
    'shipper.state': { id: 'shipper.state', type: 'text', label: 'State / Province', required: true, validation: ['required'] },
    'shipper.postalCode': { id: 'shipper.postalCode', type: 'text', label: 'Postal Code', required: true, validation: ['required', 'postalCode'] },
    'shipper.country': { id: 'shipper.country', type: 'select', label: 'Country', required: true, defaultValue: 'US' },
    'shipper.phone': { id: 'shipper.phone', type: 'text', label: 'Phone', validation: ['phone'] },
    'shipper.email': { id: 'shipper.email', type: 'text', label: 'Email', validation: ['email'] },
    'shipper.taxId': { id: 'shipper.taxId', type: 'text', label: 'Tax ID / EIN' },
    'shipper.accountNumber': { id: 'shipper.accountNumber', type: 'text', label: 'Carrier Account Number' },

    // Consignee fields
    'consignee.name': { id: 'consignee.name', type: 'text', label: 'Name', required: true, validation: ['required'] },
    'consignee.company': { id: 'consignee.company', type: 'text', label: 'Company' },
    'consignee.street1': { id: 'consignee.street1', type: 'text', label: 'Street Address', required: true, validation: ['required'] },
    'consignee.street2': { id: 'consignee.street2', type: 'text', label: 'Apartment, Suite, Unit, etc.' },
    'consignee.city': { id: 'consignee.city', type: 'text', label: 'City', required: true, validation: ['required'] },
    'consignee.state': { id: 'consignee.state', type: 'text', label: 'State / Province', required: true, validation: ['required'] },
    'consignee.postalCode': { id: 'consignee.postalCode', type: 'text', label: 'Postal Code', required: true, validation: ['required', 'postalCode'] },
    'consignee.country': { id: 'consignee.country', type: 'select', label: 'Country', required: true, defaultValue: 'US' },
    'consignee.phone': { id: 'consignee.phone', type: 'text', label: 'Phone', validation: ['phone'] },
    'consignee.email': { id: 'consignee.email', type: 'text', label: 'Email', validation: ['email'] },
    'consignee.attention': { id: 'consignee.attention', type: 'text', label: 'Attention' },
    'consignee.instructions': { id: 'consignee.instructions', type: 'text', label: 'Delivery Instructions' },

    // Shipment fields
    'shipment.serviceLevel': { id: 'shipment.serviceLevel', type: 'select', label: 'Service Level', required: true },
    'shipment.packagingType': { id: 'shipment.packagingType', type: 'select', label: 'Packaging Type', required: true },
    'shipment.paymentType': {
      id: 'shipment.paymentType',
      type: 'select',
      label: 'Payment Terms',
      defaultValue: 'prepaid',
      options: [
        { value: 'prepaid', label: 'Prepaid (Sender Pays)' },
        { value: 'collect', label: 'Collect (Receiver Pays)' },
        { value: 'third-party', label: 'Third Party' },
      ],
    },
    'shipment.paymentAccount': { id: 'shipment.paymentAccount', type: 'text', label: 'Payment Account Number' },
    'shipment.codAmount': { id: 'shipment.codAmount', type: 'number', label: 'COD Amount', defaultValue: 0 },
  },
};
