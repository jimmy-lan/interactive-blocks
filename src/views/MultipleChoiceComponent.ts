/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { BlockComponent } from "./common/BlockComponent";
import {
  MultipleChoice,
  MultipleChoiceOption,
  MultipleChoiceProps,
} from "../models";
import { EventsMap } from "../commonTypes";

export class MultipleChoiceComponent extends BlockComponent<
  MultipleChoice,
  MultipleChoiceProps
> {
  get eventsMap(): EventsMap {
    return {
      "button:click": this.handleCheckAnswerClicked,
      ".ib-option-label input:change": this.handleOptionInputChange,
    };
  }

  handleCheckAnswerClicked = (): void => {
    const statusContainer = document.querySelector<HTMLDivElement>(
      ".ib-status-container"
    );
    statusContainer?.classList.add("checkmark");
  };

  handleOptionInputChange = (): void => {
    const optionInputs = document.querySelectorAll<HTMLInputElement>(
      ".ib-option-label input"
    );
    if (!optionInputs) {
      throw new Error(
        "Incomplete rendering of checkboxes in Multiple Choice component."
      );
    }

    const userSelections: string[] = [];
    optionInputs.forEach((input: HTMLInputElement) => {
      if (input.checked) {
        userSelections.push(input.value);
      }
    });

    // this.model.set({ userSelections });
  };

  /**
   * Return html structure in string of the options for this
   * multiple choice question.
   */
  renderOptions = (): string => {
    const renderCheckbox =
      this.model.get("allowMultipleSelect") ||
      this.model.guessAllowMultipleSelect();
    const optionInputType = renderCheckbox ? "checkbox" : "radio";
    const userSelections = this.model.get("userSelections") || [];

    return `${this.model
      .get("options")
      .map(
        ({ id, text }: MultipleChoiceOption) =>
          `<label class="ib-option-label">
             <input type="${optionInputType}" value=${id} name="${this.model.get(
            "id"
          )}" ${userSelections.includes(id) && "checked"} />
             <span class="ib-option-text">${text}</span>
             <span class="ib-option-checkmark ${optionInputType}"></span>
           </label>`
      )
      .join("")}`;
  };

  get htmlStructure(): string {
    return `
      <div class="ib-container">
        <div class="ib-question-left">
          <div class="ib-question-status">
            <div class="ib-status-container"></div>
          </div>
        </div>
        <div class="ib-question-right">
          <h3 class="ib-question-text">${this.model.get("question")}</h3>
          <form>${this.renderOptions()}</form>
          <button>Check Answer</button>
        </div>
      </div>
    `;
  }
}
