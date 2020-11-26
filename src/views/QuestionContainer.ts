/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 * Description: A question container with status tab and content tab.
 */

import { Component } from "./common/Component";
import { QuestionProps } from "../models/Question";

export interface QuestionContainerSettings {
  checkAnswerButtonText: string;
}

export class QuestionContainer implements Component {
  constructor(
    public questionProps: QuestionProps,
    public _settings?: QuestionContainerSettings
  ) {}

  get settings(): QuestionContainerSettings {
    if (!this._settings) {
      return { checkAnswerButtonText: "Check Answer" };
    }
    return this._settings;
  }

  get htmlStructure(): string {
    const { checkAnswerButtonText } = this.settings;

    return `
      <div class="ib-container">
        <div class="ib-question-left">
          <div class="ib-question-status">
            <div class="ib-status-container ${this.questionProps.questionStatus}"></div>
          </div>
        </div>
        <div class="ib-question-right">
          <h3 class="ib-question-text">${this.questionProps.question}</h3>
          <div class="ib-question-child"></div>
          <button>${checkAnswerButtonText}</button>
        </div>
      </div>
    `;
  }
}
