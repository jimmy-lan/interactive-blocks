/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { BlockModel } from "./BlockModel";
import { EventRegistry } from "./EventRegistry";
import { Persistence, Serializable, StoragePersistence } from "./Persistence";

export class BlockCollection<T extends BlockModel> implements Serializable {
  events: EventRegistry;
  persistence: Persistence<this> | undefined;

  constructor(private elements: T[], persistenceStorage?: Storage) {
    this.events = new EventRegistry();
    if (persistenceStorage) {
      this.persistence = new StoragePersistence(this, persistenceStorage);
    }
  }

  get on() {
    return this.events.register;
  }

  get trigger() {
    return this.events.trigger;
  }

  get = (index: number) => {
    return this.elements[index];
  };

  getAll = () => {
    return [...this.elements];
  };

  set = (index: number, model: T) => {
    this.elements[index] = model;
    this.events.trigger("change");
  };

  replace = (models: T[]) => {
    this.elements = [...models];
    this.events.trigger("change");
  };

  save = (key: string) => {
    if (!this.persistence) {
      throw new Error("No persistence is specified for this model.");
    }
    this.persistence.save(key);
    this.events.trigger("save");
  };

  read = (key: string) => {
    if (!this.persistence) {
      throw new Error("No persistence is specified for this model.");
    }
    this.persistence.read(key);
    this.events.trigger("read");
  };

  deserialize = (raw: string): void => {
    let rawElements: string[];
    try {
      rawElements = JSON.parse(raw);
    } catch (error) {
      throw new Error(`Cannot parse from the parameter "raw". ${raw}`);
    }

    if (this.elements.length !== rawElements.length) {
      throw new Error(
        `Not Assignable: Read ${rawElements.length} entries from storage, but only ${this.elements.length} ` +
          "elements exist in the current collection."
      );
    }

    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].deserialize(rawElements[i]);
    }
  };

  serialize = (): string => {
    const toSerialize = [];
    for (let element of this.elements) {
      toSerialize.push(element.serialize());
    }
    return JSON.stringify(toSerialize);
  };
}
