import type { Registry } from '@/registries';

export interface CompiledRegistryStore {
  [namespace: string]: Record<string, any> | undefined;
}

export class RegistryCompiler {
  /**
   * Compiles and expands metadata associations (e.g. validating fields against rules, layout constraints)
   */
  static compile(registries: Record<string, Registry<any>>): CompiledRegistryStore {
    const result: Record<string, any> = {};

    // 1. Load all registries items into the compiled store
    for (const [ns, registry] of Object.entries(registries)) {
      const shortKey = ns.replace('vonixx.', '');
      result[shortKey] = { ...registry.items };
    }

    // 2. Perform validation compiler expansions on fields
    const fields = result['fields'] || {};
    const validation = result['validation'] || {};

    for (const [key, field] of Object.entries(fields)) {
      const fieldConfig = field as any;
      fields[key] = {
        ...fieldConfig,
        resolvedValidation: (fieldConfig.validation || []).map((ruleId: string) => {
          const rule = validation[ruleId];
          return {
            ruleId,
            validate: rule?.validate || (() => true),
            message: rule?.message || 'Invalid format',
          };
        }),
      };
    }

    return result;
  }
}
