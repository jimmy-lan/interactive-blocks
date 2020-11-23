/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 * Description: Class holding attributes regarding a model.
 */

export class AttributeRegistry<T> {
  constructor(private data: T) {}

  /**
   * Get data corresponding to <key> from attributes.
   * To get all data, use getAll.
   * @param key A key used to get property.
   * @see getAll
   */
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  getAll = (): T => {
    return this.data;
  };

  /**
   * Set <newData> to attributes. Entries not included in
   * <newData> but in the previous state will be persisted.
   * Use replace function for data replacement.
   * @param newData
   * @see replace
   */
  set = (newData: T): void => {
    Object.assign(this.data, newData);
  };

  /**
   * Replace with <newData>. If you would like to keep some entries
   * from the previous state, use set function.
   * @param newData
   * @see set
   */
  replace = (newData: T): void => {
    this.data = newData;
  };
}
