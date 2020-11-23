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
   * itself whenever the model changes.
   */
  bindModel = (): void => {
    this.model.on("change", () => {
      this.render();
    });
  };

  /**
   * Return a string with html syntax that represents this view component.
   */
  abstract get htmlStructure(): string;

  /**
   * Render the component by appending it to the parent component.
   * @param disableClean Boolean value to indicate whether to clean all
   *    children elements of the parent before this component is
   *    appended. Defaults to false.
   */
  render = (disableClean: boolean = false) => {
    // Clean up parent area
    if (!disableClean) {
      this.parent.innerHTML = "";
    }

    // Create template element to host html for this component
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.htmlStructure;

    // Append template element to parent
    this.parent.appendChild(templateElement.content);
  };
}
