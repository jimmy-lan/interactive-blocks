/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 * Description: An abstract representation of a component.
 */

import { InteractiveBlockModel } from "../models/common/InteractiveBlockModel";

export abstract class InteractiveBlockComponent<
  T extends InteractiveBlockModel<K>,
  K
> {
  constructor(public parent: Element, public ibModel: T) {
    this.bindModel();
  }

  bindModel = (): void => {
    this.ibModel.on("change", () => {
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
