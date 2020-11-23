/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 * Description: File containing functionalities relating to persistence.
 */

interface Serializable<T> {
  serialize: () => string;
  deserialize: (raw: string) => T;
}

class LocalPersistence<T extends Serializable<T>> {
  constructor(public model: T) {}

  /**
   * Save model to local storage with <key> as the key.
   * @param key key to save model
   */
  save = (key: string): void => {
    localStorage.setItem(key, this.model.serialize());
  };

  /**
   * Read information from local storage with <key> and
   * deserialize raw input to model.
   * @param key key to access local storage
   */
  read = (key: string): void => {
    const raw = localStorage.getItem(key);
    this.model.deserialize(raw);
  };
}
