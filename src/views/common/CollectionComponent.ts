/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 * Description: A view containing a collection of components.
 */

import { Component } from "./Component";
import { Collection, BlockModel } from "../../models/common";

export abstract class CollectionComponent<T extends BlockModel<K>, K>
  implements Component {
  constructor(public parent: Element, public collection: Collection<T>) {}

  // Life cycle methods
  componentWillRender(): void {}
  componentDidRender(): void {}

  /**
   * Render one component based on the model given.
   * Append the component rendered to the parent element.
   * @param model Model to render
   */
  abstract appendComponent(model: T): void;

  /**
   * Render this collection component by appending to the parent element
   * @param disableClean Boolean value to indicate whether to clean all
   *    children elements of the parent before this component is
   *    appended. Defaults to false.
   */
  render = (disableClean: boolean = false): void => {
    // Check for cleaning
    if (!disableClean) {
      this.parent.innerHTML = "";
    }

    this.componentWillRender();

    for (let model of this.collection.getAll()) {
      this.appendComponent(model);
    }

    this.componentDidRender();
  };
}
