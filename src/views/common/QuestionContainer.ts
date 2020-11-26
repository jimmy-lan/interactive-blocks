/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 * Description: A question container with status tab and content tab.
 */

import { Question, QuestionProps } from "../../models/Question";
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
  /**
   * A list of selectors corresponding to key child elements
   * in this question container.
   * @private
   */
  protected selectors: QuestionContainerSelectors = {
    childDiv: ".ib-question-child",
    statusDiv: ".ib-status-container",
    button: ".ib-question-right button",
  };

  protected settings: QuestionContainerSettings = {
    checkAnswerButtonText: "Check Answer",
  };

  get htmlStructure(): string {
    const { checkAnswerButtonText } = this.settings;

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
          <div class="ib-question-child"></div>
          <button>${checkAnswerButtonText}</button>
        </div>
      </div>
    `;
  }
}
