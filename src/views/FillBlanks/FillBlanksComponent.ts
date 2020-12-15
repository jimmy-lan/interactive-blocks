/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 */

import { QuestionContainer } from "../common/QuestionContainer";
import { FillBlanks, FillBlanksProps } from "../../models";
import { ComponentsMap } from "../../commonTypes";
import { StringInput } from "./StringInput";

export class FillBlanksComponent extends QuestionContainer<
  FillBlanks,
  FillBlanksProps
> {
  private stringInput?: StringInput;

  componentsMap(): ComponentsMap {
    return {
      stringInput: this.selectors.childDiv,
    };
  }

  bindComponents() {
    this.stringInput = new StringInput(this.components.stringInput, this.model);
    this.stringInput.render();
  }

  onCheckAnswerClick = async (): Promise<void> => {
    // Compute if question needs to be disabled on the next state
    const shouldDisable = this.model.shouldDisable;

    // Select elements
    if (!this.stringInput) {
      throw Error("Cannot handle event because StringInput failed to render.");
    }
    const input = document.querySelector<HTMLInputElement>(
      this.stringInput.selectors.input
    );

    // Update component state
    input!.disabled = shouldDisable;
  };
}
