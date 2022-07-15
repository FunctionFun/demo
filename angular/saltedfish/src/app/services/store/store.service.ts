import { Storage } from '@ionic/storage';

export class StoreService<T> {
  constructor(private storage: Storage, public storageKey: string = 'default') {}

  async load(): Promise<T> {
    try {
      const obj = await this.storage.get(this.storageKey);
      console.log(`[DataStore<${this.storageKey}>] loaded: ${JSON.stringify(obj)}`, obj);
      return obj;
    } catch (reason) {
      console.warn(`[DataStore<${this.storageKey}>] load error: ${JSON.stringify(reason)}`, reason);
      return null;
    }
  }

  save(obj: T) {
    this.storage
      .set(this.storageKey, obj)
      .then((value: T) => {
        console.log(`[DataStore<${this.storageKey}>] saved: ${JSON.stringify(value)}`, value);
      })
      .catch((reason: any) => {
        console.warn(
          `[DataStore<${this.storageKey}>] save error: ${JSON.stringify(reason)}`,
          reason
        );
      });
  }

  clear(): Promise<void> {
    return this.storage
      .remove(this.storageKey)
      .then((value: T) => {
        console.log(`[DataStore<${this.storageKey}>] removed: ${JSON.stringify(value)}`, value);
      })
      .catch((reason: any) => {
        console.warn(
          `[DataStore<${this.storageKey}>] remove error: ${JSON.stringify(reason)}`,
          reason
        );
      });
  }
}
