/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 * Description: A question container with status tab and content tab.
 */

import { Component } from "./Component";
import { QuestionProps } from "../../models/Question";

export interface QuestionContainerSettings {
  checkAnswerButtonText: string;
}

export interface QuestionContainerSelectors {
  childDiv: string;
  statusDiv: string;
  button: string;
}

export class QuestionContainer implements Component {
  /**
   * A list of selectors corresponding to key child elements
   * in this question container.
   * @private
   */
  private selectors: QuestionContainerSelectors = {
    childDiv: ".ib-question-child",
    statusDiv: ".ib-status-container",
    button: ".ib-question-right button",
  };

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

  /**
   * Get selector of a key element in question container.
   * @param key A string used to access the selector.
   * @see selectors
   */
  getSelector(key: keyof QuestionContainerSelectors) {
    return this.selectors[key];
  }

  /**
   * Get all selectors of key elements in this question container.
   * @see selectors
   */
  getAllSelectors() {
    return this.selectors;
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
