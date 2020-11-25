/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 * Description: A container component which hosts a question.
 */

import { BlockComponent } from "./common/BlockComponent";
import { Question, QuestionProps } from "../models/Question";

export interface QuestionRenderSettings {
  checkAnswerButtonText: string;
}

export class QuestionComponent<
  T extends Question<K>,
  K extends QuestionProps
> extends BlockComponent<T, K> {
  get settings(): QuestionRenderSettings {
    return { checkAnswerButtonText: "Check Answer" };
  }

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
