/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 * Description: A question container with status tab and content tab.
 */

import { Question, QuestionProps, QuestionStatus } from "../../models";
import { BlockComponent } from "./BlockComponent";

export interface QuestionContainerSettings {
  checkAnswerButtonText: string;
}

export interface QuestionContainerSelectors {
  childDiv: string;
  statusDiv: string;
  button: string;
}

export class QuestionContainer<
  T extends Question<K>,
  K extends QuestionProps
> extends BlockComponent<T, K> {
  // Selectors begin with `this.model.idWithPrefix` so that
  // they only select elements corresponding to this question.
  selectors: QuestionContainerSelectors = {
    childDiv: `#${this.model.idWithPrefix} .ib-question-child`,
    statusDiv: `#${this.model.idWithPrefix} .ib-status-container`,
    button: `#${this.model.idWithPrefix} .ib-question-right button`,
  };

  protected settings: QuestionContainerSettings = {
    checkAnswerButtonText: "Check Answer",
  };

  /**
   * Update question container based on the current question.
   */
  updateQuestionContainer = () => {
    // Select needed elements
    const statusContainer = document.querySelector<HTMLDivElement>(
      this.selectors.statusDiv
    );
    const submitButton = document.querySelector<HTMLButtonElement>(
      this.selectors.button
    );

    // Compute next state
    const questionStatus = this.model.get("questionStatus");
    const newStatusClassName =
      questionStatus === QuestionStatus.correct ? "correct" : "warning";
    const shouldDisable = this.model.shouldDisable;

    // Update component display
    statusContainer!.classList.remove("correct", "warning");
    statusContainer!.classList.add(newStatusClassName);
    submitButton!.disabled = shouldDisable;
  };

  get htmlStructure(): string {
    const { checkAnswerButtonText } = this.settings;

    return `
      <div id="${this.model.idWithPrefix}" class="ib-container">
        <div class="ib-question-left">
          <div class="ib-question-status">
            <div class="ib-status-container ${this.model.get(
              "questionStatus"
            )}"></div>
          </div>
        </div>
        <div class="ib-question-right">
          <h3 class="ib-question-text">${this.model.get("question")}</h3>
          <div class="ib-question-child"></div>
          <button class="ib-btn">${checkAnswerButtonText}</button>
        </div>
      </div>
    `;
  }
}
