import { Manifest, staticRegistryMap, type Registry } from '@/registries';

export class RegistryLoader {
  /**
   * Loads all registries registered in the manifest
   */
  static loadAll(): Record<string, Registry<any>> {
    const loaded: Record<string, Registry<any>> = {};

    for (const regMeta of Manifest.registries) {
      const reg = staticRegistryMap[regMeta.namespace];
      if (reg) {
        loaded[regMeta.namespace] = reg;
      }
    }

    return loaded;
  }

  /**
   * Simulates loading a dynamic external registry (plug-in system extension point)
   */
  static loadExternal(externalRegistry: Registry<any>): void {
    staticRegistryMap[externalRegistry.namespace] = externalRegistry;
  }
}
