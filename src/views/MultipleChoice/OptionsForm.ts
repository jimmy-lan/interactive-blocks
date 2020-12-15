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
import { EventsMap } from "../../commonTypes";

export interface OptionsFormSelectors {
  optionInputs: string;
  optionLabels: string;
}

export class OptionsForm extends BlockComponent<
  MultipleChoice,
  MultipleChoiceProps
> {
  // Selectors begin with `this.model.idWithPrefix` so that
  // they only select elements corresponding to this question.
  selectors: OptionsFormSelectors = {
    optionInputs: `#${this.model.idWithPrefix} .ib-option-label input`,
    optionLabels: `#${this.model.idWithPrefix} .ib-option-label`,
  };

  eventsMap(): EventsMap {
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
    const allowMultipleSelect = this.model.get("allowMultipleSelect");

    // Determine render method
    const renderCheckbox =
      allowMultipleSelect || this.model.guessAllowMultipleSelect();
    const optionInputType = renderCheckbox ? "checkbox" : "radio";
    const shouldDisable = this.model.shouldDisable;

    return `${this.model
      .get("options")
      .map(
        ({ id, text }: MultipleChoiceOption) =>
          `<label class="ib-option-label ${shouldDisable ? "disabled" : ""}">
             <input type="${optionInputType}" value=${id} name="${this.model.get(
            "id"
          )}" ${userSelections.includes(id) ? "checked" : ""} ${
            shouldDisable ? "disabled" : ""
          } />
             <span class="ib-option-text">${text}</span>
             <span class="ib-option-checkmark ${optionInputType}"></span>
           </label>`
      )
      .join("")}`;
  }
}
