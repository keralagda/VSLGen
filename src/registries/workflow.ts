import type { Registry } from './types';

export const workflowRegistry: Registry<any> = {
  id: 'workflow-registry',
  namespace: 'vonixx.workflows',
  version: '1.0.0',
  items: {
    labelGeneration: {
      id: 'labelGeneration',
      steps: ['Draft', 'Verified', 'Printed', 'Packed', 'Shipped', 'Delivered', 'Archived'],
    },
  },
};

export const actionRegistry: Registry<any> = {
  id: 'action-registry',
  namespace: 'vonixx.actions',
  version: '1.0.0',
  items: {
    generate: { id: 'generate', name: 'Generate Label', handler: 'GenerateHandler' },
    preview: { id: 'preview', name: 'Preview Document', handler: 'PreviewHandler' },
    print: { id: 'print', name: 'Print Output', handler: 'PrintHandler' },
  },
};

export const ruleRegistry: Registry<any> = {
  id: 'rule-registry',
  namespace: 'vonixx.rules',
  version: '1.0.0',
  items: {
    weightLimit: { id: 'weightLimit', param: 'weight', max: 150 },
  },
};

export const automationRegistry: Registry<any> = {
  id: 'automation-registry',
  namespace: 'vonixx.automations',
  version: '1.0.0',
  items: {
    autoPrint: { id: 'autoPrint', trigger: 'label-generated', action: 'print' },
  },
};

export const notificationRegistry: Registry<any> = {
  id: 'notification-registry',
  namespace: 'vonixx.notifications',
  version: '1.0.0',
  items: {
    emailAlert: { id: 'emailAlert', channel: 'email', template: 'AlertTemplate' },
  },
};

export const approvalRegistry: Registry<any> = {
  id: 'approval-registry',
  namespace: 'vonixx.approvals',
  version: '1.0.0',
  items: {
    hazmat: { id: 'hazmat', requiredRole: 'compliance-officer' },
  },
};

export const permissionRegistry: Registry<any> = {
  id: 'permission-registry',
  namespace: 'vonixx.permissions',
  version: '1.0.0',
  items: {
    admin: { id: 'admin', canDelete: true, canPrint: true },
    staff: { id: 'staff', canDelete: false, canPrint: true },
  },
};

export const auditRegistry: Registry<any> = {
  id: 'audit-registry',
  namespace: 'vonixx.audit',
  version: '1.0.0',
  items: {
    telemetry: { id: 'telemetry', enabled: true },
  },
};
