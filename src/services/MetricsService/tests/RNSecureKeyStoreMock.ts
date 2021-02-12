import {KeyValueStore} from 'services/StorageService/KeyValueStore';

export class RNSecureKeyStoreMock implements KeyValueStore {
  private store: Map<string, string>;

  constructor() {
    this.store = new Map();
  }

  retrieve(key: string): Promise<string | null> {
    const result = this.store.get(key);
    if (result) {
      return Promise.resolve(result);
    } else {
      return Promise.resolve(null);
    }
  }

  save(key: string, value: string): Promise<void> {
    this.store.set(key, value);
    return Promise.resolve();
  }

  delete(key: string): Promise<void> {
    this.store.delete(key);
    return Promise.resolve();
  }
}
