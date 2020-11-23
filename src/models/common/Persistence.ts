/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 * Description: File containing functionalities relating to persistence.
 */

/**
 * General class to declare the required methods and/or
 * attributes on a Persistence class.
 */
export abstract class Persistence<T> {
  protected constructor(public model: T) {}

  abstract save(key: string): void;
  abstract read(key: string): void;
}

export interface Serializable<T> {
  serialize: () => string;
  deserialize: (raw: string) => T;
}

/**
 * Persistence class implementation that uses storage.
 */
export class StoragePersistence<T extends Serializable<T>> extends Persistence<
  T
> {
  constructor(model: T, private storage: Storage) {
    super(model);
  }

  /**
   * Save model to storage with <key> as the key.
   * @param key key to save model
   */
  save = (key: string): void => {
    this.storage.setItem(key, this.model.serialize());
  };

  /**
   * Read information from storage with <key> and
   * deserialize raw input to model.
   * @param key key to access storage
   */
  read = (key: string): void => {
    const raw = this.storage.getItem(key);
    this.model.deserialize(raw);
  };
}
