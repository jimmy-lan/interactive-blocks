/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { MultipleChoice, MultipleChoiceProps } from "../../models";
import { ComponentsMap } from "../../commonTypes";
import { QuestionContainer } from "../common/QuestionContainer";
import { OptionsForm } from "./OptionsForm";

export class MultipleChoiceComponent extends QuestionContainer<
  MultipleChoice,
  MultipleChoiceProps
> {
  private optionsForm?: OptionsForm;

  componentsMap(): ComponentsMap {
    const childDivSelector = this.selectors.childDiv;
    return {
      optionsForm: childDivSelector,
    };
  }

  bindComponents = (): void => {
    this.optionsForm = new OptionsForm(this.components.optionsForm, this.model);
    this.optionsForm.render();
  };

  onCheckAnswerClick = async (): Promise<void> => {
    // Compute if question needs to be disabled on the next state
    const shouldDisable = this.model.shouldDisable;

    // Select elements
    if (!this.optionsForm) {
      throw new Error(
        "Cannot handle event because OptionsForm failed to render."
      );
    }
    const optionInputs = document.querySelectorAll<HTMLInputElement>(
      this.optionsForm.selectors.optionInputs
    );
    const optionLabels = document.querySelectorAll<HTMLLabelElement>(
      this.optionsForm.selectors.optionLabels
    );

    // Update state of the question
    if (shouldDisable) {
      optionInputs.forEach(
        (input: HTMLInputElement) => (input.disabled = true)
      );
      optionLabels.forEach((label: HTMLLabelElement) =>
        label.classList.add("disabled")
      );
    }
  };
}
