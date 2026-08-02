export interface RegistryMetadata {
  description?: string;
  author?: string;
  license?: string;
  [key: string]: any;
}

export interface Registry<T> {
  id: string;
  namespace: string;
  version: string;
  metadata?: RegistryMetadata;
  dependencies?: string[];
  items: Record<string, T>;
}

export interface RegistryManifest {
  name: string;
  version: string;
  registries: {
    id: string;
    namespace: string;
    version: string;
    modulePath?: string;
  }[];
}
