import { RegistryLoader } from './RegistryLoader';
import { RegistryCompiler, type CompiledRegistryStore } from './RegistryCompiler';
import type { Registry } from '@/registries';

export class RegistryStore {
  private static instance: CompiledRegistryStore | null = null;

  /**
   * Initializes the registry loader and compiler lifecycle
   */
  static initialize(): void {
    if (this.instance) return;
    const loaded = RegistryLoader.loadAll();
    this.instance = RegistryCompiler.compile(loaded);
  }

  /**
   * Registers a plugin's custom registry config dynamically at runtime
   */
  static registerPluginRegistry(registry: Registry<any>): void {
    RegistryLoader.loadExternal(registry);
    const loaded = RegistryLoader.loadAll();
    this.instance = RegistryCompiler.compile(loaded);
  }

  /**
   * Get an item from a compiled registry namespace
   */
  static get(registryKey: string, itemKey: string): any {
    if (!this.instance) {
      this.initialize();
    }
    return this.instance?.[registryKey]?.[itemKey];
  }

  /**
   * Retrieve all items within a registry namespace
   */
  static getAll(registryKey: string): Record<string, any> {
    if (!this.instance) {
      this.initialize();
    }
    return this.instance?.[registryKey] || {};
  }
}
