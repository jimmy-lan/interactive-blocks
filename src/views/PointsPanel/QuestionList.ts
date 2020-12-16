/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { BlockComponent } from "../common";
import {
  PointsPanel,
  PointsPanelProps,
  Question,
  QuestionProps,
} from "../../models";
// @ts-ignore
import arrowRightIcon from "../../graphics/arrow-right.svg";

export class QuestionList extends BlockComponent<
  PointsPanel,
  PointsPanelProps
> {
  /**
   * Return html structure for a question list item
   */
  private getListItem = (question: Question<QuestionProps>): string => {
    // Obtain needed information
    const id = question.idWithPrefix;
    const title = question.get("title");
    const questionText = question.get("question");
    const questionStatus = question.get("questionStatus");
    const worthPoints = question.get("worthPoints");
    const currentPoints = question.get("currentPoints");

    return `
      <div class="ib-question-list-item">
        <p class="ib-question-list-item-title">${
          title ? title : questionText
        }</p>
        <div class="ib-question-list-item-panel">
          <a href="#${id}" class="ib-btn primary">Go to question</a>
          <p class="ib-question-score"><span class="score">25</span> / ${worthPoints}</p>
        </div>
      </div>
    `;
  };

  get htmlStructure(): string {
    const questions = this.model.get("questions");

    return `
      <div class="ib-question-list-header">
        <h3 class="ib-question-list-title">Questions</h3>
        <button class="ib-btn white icon">
          <img src="${arrowRightIcon}" alt="close panel icon" />
        </button>
      </div>
      ${questions.map((question) => this.getListItem(question))}
    `;
  }
}
