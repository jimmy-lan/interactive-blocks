/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { BlockComponent } from "./common/BlockComponent";
import {
  MultipleChoice,
  MultipleChoiceOption,
  MultipleChoiceProps,
  QuestionStatus,
} from "../models";
import { EventsMap } from "../commonTypes";

export class MultipleChoiceComponent extends BlockComponent<
  MultipleChoice,
  MultipleChoiceProps
> {
  get eventsMap(): EventsMap {
    return {
      "button:click": this.handleCheckAnswerClick,
      ".ib-option-label input:change": this.handleOptionInputChange,
    };
  }

  handleCheckAnswerClick = async (): Promise<void> => {
    let newQuestionStatus: QuestionStatus;

    // Update question status
    const statusContainer = document.querySelector<HTMLDivElement>(
      ".ib-status-container"
    );
    statusContainer?.classList.add("warning");
    this.model.set(
      { questionStatus: QuestionStatus.warning },
      { shouldRerender: false }
    );
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

    this.model.set({ userSelections }, { shouldRerender: false });
  };

  /**
   * Return html structure in string of the options for this
   * multiple choice question.
   */
  renderOptions = (): string => {
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
  };

  get htmlStructure(): string {
    return `
      <div class="ib-container">
        <div class="ib-question-left">
          <div class="ib-question-status">
            <div class="ib-status-container ${this.model.get(
              "questionStatus"
            )}"></div>
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
