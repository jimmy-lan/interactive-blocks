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
    };
  }

  handleCheckAnswerClicked = (): void => {
    const statusDiv = document.querySelector(".ib-question-status > div");
    statusDiv?.classList.add("warning");
  };

  /**
   * Return html structure in string of the options for this
   * multiple choice question.
   */
  renderOptions = (): string => {
    const renderCheckbox =
      this.model.get("canSelectMany") || this.model.guessCanSelectMany();
    const optionInputType = renderCheckbox ? "checkbox" : "radio";

    return `${this.model
      .get("options")
      .map(
        ({ id, text }: MultipleChoiceOption) =>
          `<label class="ib-option-label">
             <input type="${optionInputType}" value=${id} name="${this.model.get(
            "id"
          )}" />
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
