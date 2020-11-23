/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 * Description: An interactive block model.
 */

import { AttributeRegistry } from "./AttributeRegistry";
import { EventRegistry } from "./EventRegistry";
import { Persistence, Serializable } from "./Persistence";

export class InteractiveBlockModel<T = any> implements Serializable {
  constructor(
    private attributes: AttributeRegistry<T>,
    private events: EventRegistry,
    private persistence: Persistence<T>
  ) {}

  get get() {
    return this.attributes.get;
  }

  get getAll() {
    return this.attributes.getAll;
  }

  get on() {
    return this.events.register;
  }

  get trigger() {
    return this.events.trigger;
  }

  /**
   * Save current model as value to <key> in persistence.
   * @param key A string key to save model
   */
  save = (key: string) => {
    this.events.trigger("save");
    this.persistence.save(key);
  };

  /**
   * Read model from persistence in location <key>.
   * @param key A string key to access information relating to the model
   */
  read = (key: string) => {
    this.events.trigger("read");
    this.persistence.read(key);
  };

  /**
   * @param newData
   * @see AttributeRegistry.set
   */
  set = (newData: T) => {
    this.events.trigger("change");
    this.attributes.set(newData);
  };

  /**
   * @param newData
   * @see AttributeRegistry.replace
   */
  replace = (newData: T) => {
    this.events.trigger("change");
    this.attributes.replace(newData);
  };

  /**
   * Serialize current attributes.
   */
  serialize(): string {
    return JSON.stringify(this.attributes);
  }

  /**
   * Replace current attributes with result from deserializing <raw>.
   * @param raw A string to be deserialized.
   */
  deserialize(raw: string): void {
    try {
      this.attributes.replace(JSON.parse(raw));
    } catch (e: any) {
      throw new Error(`Cannot deserialize from value ${raw}`);
    }
  }
}
