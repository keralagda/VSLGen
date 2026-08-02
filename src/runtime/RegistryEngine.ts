import { RegistryStore } from './RegistryStore';
import { ExpressionEngine } from './ExpressionEngine';

export interface CompiledSchema {
  fields: Record<string, any>;
  validationRules: Record<string, any>;
}

export class RegistryEngine {
  /**
   * Compiles the registry schemas and validation descriptors dynamically
   */
  static compileFormSchema(sectionIds: string[]): CompiledSchema {
    const fields: Record<string, any> = {};
    const validationRules: Record<string, any> = {};

    for (const sectionId of sectionIds) {
      const section = RegistryStore.get('sections', sectionId) as any;
      if (!section) continue;

      for (const fieldId of section.fields) {
        const field = RegistryStore.get('fields', fieldId) as any;
        if (!field) continue;

        fields[fieldId] = field;
      }
    }

    return { fields, validationRules };
  }

  /**
   * Evaluates variable templates e.g. "{{shipper.name}}" against the form state
   */
  static resolveTemplateVariables(template: string, data: Record<string, any>): string {
    return ExpressionEngine.evaluate(template, data);
  }
}
