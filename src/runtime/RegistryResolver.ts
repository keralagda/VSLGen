import { RegistryStore } from './RegistryStore';

export class RegistryResolver {
  /**
   * Resolves a key within a specific registry namespace
   */
  static resolve(namespace: string, key: string): any {
    return RegistryStore.get(namespace as any, key);
  }

  /**
   * Resolves options for dropdown selection list, supporting filters like carrierId
   */
  static resolveOptions(namespace: string, filter?: Record<string, any>): { value: string; label: string }[] {
    const items = RegistryStore.getAll(namespace as any);
    let values = Object.values(items);

    if (filter) {
      values = values.filter((item: any) => {
        return Object.entries(filter).every(([fk, fv]) => {
          return item[fk] === fv || (item.metadata && item.metadata[fk] === fv);
        });
      });
    }

    return values.map((item: any) => ({
      value: item.id || item.code || '',
      label: item.name || item.description || item.id || '',
    }));
  }
}
