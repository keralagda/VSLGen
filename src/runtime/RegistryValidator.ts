import { RegistryStore } from './RegistryStore';

export interface IntegrityError {
  type: 'duplicate_id' | 'broken_reference' | 'missing_metadata';
  message: string;
  namespace: string;
  key?: string;
}

export class RegistryValidator {
  /**
   * Scans all loaded registries for integrity checks
   */
  static validate(): IntegrityError[] {
    const errors: IntegrityError[] = [];

    // 1. Verify fields registry references inside section registry
    const sections = RegistryStore.getAll('sections') || {};
    const fields = RegistryStore.getAll('fields') || {};

    for (const [sectionId, section] of Object.entries(sections)) {
      const sec = section as any;
      if (!sec.fields || !Array.isArray(sec.fields)) {
        errors.push({
          type: 'missing_metadata',
          namespace: 'vonixx.sections',
          key: sectionId,
          message: `Section "${sectionId}" is missing its fields declaration array`,
        });
        continue;
      }

      for (const fieldId of sec.fields) {
        if (!fields[fieldId]) {
          errors.push({
            type: 'broken_reference',
            namespace: 'vonixx.sections',
            key: sectionId,
            message: `Section "${sectionId}" references unknown field "${fieldId}"`,
          });
        }
      }
    }

    return errors;
  }
}
