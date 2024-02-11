export class PersistentDataStore<TValue> {
  private store: Map<string, TValue>;

  constructor(
    readonly storeName: string,
    readonly keyGetter: (value: TValue) => string,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    readonly deserializer: (key: string, value: any) => any,
    readonly serializer: (key: string, value: any) => any,
    /* eslint-enable @typescript-eslint/no-explicit-any */
    initialValues?: Map<string, TValue
    >) {
    this.store = initialValues || this.loadStore();
  }

  entries() {
    return this.store.entries;
  }

  values() {
    return this.store.values();
  }

  keys() {
    return this.store.keys();
  }

  get(key: string) {
    return this.store.get(key);
  }

  save(value: TValue) {
    this.store.set(this.keyGetter(value), value);
    this.saveStore();
  }

  find(predicate: (value: TValue, key: string) => boolean): [key: string, value: TValue] | undefined {
    for (const [key, value] of this.store) {
      if (predicate(value, key))
        return [key, value];
    }
  }

  private loadStore(): Map<string, TValue> {
    const store = new Map<string, TValue>();

    const serializedData = localStorage.getItem(this.storeName + '.data');
    if (serializedData) {
      try {
        const data = JSON.parse(serializedData, this.deserializer);

        if (Array.isArray(data)) {
          for (const record of data) {
            store.set(this.keyGetter(record), record);
          }
        }
      }
      catch (error) {
        console.warn(error);
        // Ignore
      }
    }

    return store;
  }

  private saveStore() {
    const serializedRecords = [];
    for (const record of this.store.values()) {
      const serializedRecord = JSON.stringify(record, this.serializer);
      serializedRecords.push(serializedRecord);
    }

    try {
      const serializedData = JSON.stringify(serializedRecords);

      localStorage.setItem(this.storeName + '.data', serializedData);
    }
    catch (error) {
      // Ignore
    }
  }
}
