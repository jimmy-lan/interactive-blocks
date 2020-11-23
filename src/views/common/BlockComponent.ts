/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 * Description: An abstract representation of an interactive block component.
 */

import { BlockModel } from "../../models/common/BlockModel";

export abstract class BlockComponent<T extends BlockModel<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  /**
   * Bind model to this view component so that the view component rerender
   * whenever the model changes.
   */
  bindModel = (): void => {
    this.model.on("change", () => {
      this.render();
    });
  };

  abstract get htmlStructure(): string;

  render = (disableClean: boolean = false) => {
    // Clean up parent area
    if (!disableClean) {
      this.parent.innerHTML = "";
    }

    // Create template element to host html for this component
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.htmlStructure;

    // Append template element to parent
    this.parent.appendChild(templateElement);
  };
}
