/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 * Description: A form with radio buttons or checkboxes.
 */

import { BlockComponent } from "../common/BlockComponent";
import {
  MultipleChoice,
  MultipleChoiceOption,
  MultipleChoiceProps,
} from "../../models";
import { QuestionStatus } from "../../models/Question";
import { EventsMap } from "../../commonTypes";

export interface OptionsFormSelectors {
  optionInputs: string;
}

export class OptionsForm extends BlockComponent<
  MultipleChoice,
  MultipleChoiceProps
> {
  // Selectors begin with `this.model.idWithPrefix` so that
  // they only select elements corresponding to this question.
  protected selectors: OptionsFormSelectors = {
    optionInputs: `#${this.model.idWithPrefix} .ib-option-label input`,
  };

  get eventsMap(): EventsMap {
    return { ".ib-option-label input:change": this.handleOptionInputChange };
  }

  handleOptionInputChange = (): void => {
    const optionInputs = document.querySelectorAll<HTMLInputElement>(
      this.selectors.optionInputs
    );
    if (!optionInputs) {
      throw new Error(
        "Incomplete rendering of checkboxes in OptionsForm component."
      );
    }

    const userSelections: string[] = [];
    optionInputs.forEach((input: HTMLInputElement) => {
      if (input.checked) {
        userSelections.push(input.value);
      }
    });

    this.model.set({ userSelections }, { shouldRerender: false });
  };

  get htmlStructure(): string {
    // Obtain needed information from model
    const userSelections = this.model.get("userSelections") || [];
    const questionStatus = this.model.get("questionStatus");
    const allowMultipleSelect = this.model.get("allowMultipleSelect");
    const disableMultipleAttempts = this.model.get("disableMultipleAttempts");

    // Determine render method
    const renderCheckbox =
      allowMultipleSelect || this.model.guessAllowMultipleSelect();
    const optionInputType = renderCheckbox ? "checkbox" : "radio";

    // If questionStatus is not defined, this question is unanswered,
    // so we do not disable question.
    let disabled: boolean = questionStatus !== undefined;
    if (disableMultipleAttempts) {
      // Disable as long as questionStatus is not unanswered
      disabled = disabled && questionStatus !== QuestionStatus.unanswered;
    } else {
      // Disable only when question is answered correctly
      disabled = disabled && questionStatus === QuestionStatus.correct;
    }

    return `${this.model
      .get("options")
      .map(
        ({ id, text }: MultipleChoiceOption) =>
          `<label class="ib-option-label ${disabled && "disabled"}">
             <input type="${optionInputType}" value=${id} name="${this.model.get(
            "id"
          )}" ${userSelections.includes(id) && "checked"} ${
            disabled && "disabled"
          } />
             <span class="ib-option-text">${text}</span>
             <span class="ib-option-checkmark ${optionInputType}"></span>
           </label>`
      )
      .join("")}`;
  }
}
