import type { Registry } from './types';

export const aiPromptRegistry: Registry<any> = {
  id: 'ai-prompt-registry',
  namespace: 'vonixx.ai-prompts',
  version: '1.0.0',
  items: {
    optimizePackaging: { id: 'optimizePackaging', template: 'Optimize package dimensions for {{weight}} lb' },
  },
};

export const aiActionRegistry: Registry<any> = {
  id: 'ai-action-registry',
  namespace: 'vonixx.ai-actions',
  version: '1.0.0',
  items: {
    classifyHazmat: { id: 'classifyHazmat', model: 'gemini-pro' },
  },
};

export const aiAgentRegistry: Registry<any> = {
  id: 'ai-agent-registry',
  namespace: 'vonixx.ai-agents',
  version: '1.0.0',
  items: {
    customsAssistant: { id: 'customsAssistant', role: 'Customs Officer Agent' },
  },
};

export const aiWorkflowRegistry: Registry<any> = {
  id: 'ai-workflow-registry',
  namespace: 'vonixx.ai-workflows',
  version: '1.0.0',
  items: {
    auditRoute: { id: 'auditRoute', steps: ['verifyAddress', 'recommendCarrier'] },
  },
};

export const aiValidationRegistry: Registry<any> = {
  id: 'ai-validation-registry',
  namespace: 'vonixx.ai-validation',
  version: '1.0.0',
  items: {
    commercialInvoiceCheck: { id: 'commercialInvoiceCheck', rules: ['checkHarmonizedCode'] },
  },
};
