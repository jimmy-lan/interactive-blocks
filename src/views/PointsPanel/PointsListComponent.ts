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
import { EventsMap } from "../../commonTypes";

export class PointsListComponent extends BlockComponent<
  PointsPanel,
  PointsPanelProps
> {
  get selectors() {
    return {
      closeButton: `${this.model.idSelector} .ib-question-list-header .ib-btn`,
      pointsList: `${this.model.idSelector} .ib-points.question`,
    };
  }

  settings = {
    title: "Questions",
  };

  componentDidRender() {
    this.model.on("question-change", this.handleQuestionChange);
  }

  handleQuestionChange = () => {
    // Rerender the entire component
    this.render();
  };

  eventsMap(): EventsMap {
    return {
      [`.ib-question-list-header .ib-btn:click`]: this.handleCloseButtonClick,
    };
  }

  handleCloseButtonClick = (): void => {
    const pointsList = document.querySelector(this.selectors.pointsList)!;
    if (pointsList.classList.contains("visible")) {
      pointsList.classList.remove("visible");
    }
  };

  /**
   * Return html structure for a question list item
   */
  private getListItem = (question: Question<QuestionProps>): string => {
    // Obtain needed information
    const id = question.idWithPrefix;
    const title = question.get("title");
    const questionText = question.get("question");
    const worthPoints = question.get("worthPoints");
    const currentPoints = question.currentPoints;

    // Parse information
    const listItemTitle = title ? title : questionText;
    const listItemCurrentPoints = currentPoints === 0 ? null : currentPoints;
    const listItemWorthPoints = worthPoints || 1;

    return `
      <div class="ib-question-list-item">
        <p class="ib-question-list-item-title">${listItemTitle}</p>
        <div class="ib-question-list-item-panel">
          <a href="#${id}" class="ib-btn primary">Go to question</a>
          <p class="ib-question-score"><span class="score">${
            listItemCurrentPoints ? listItemCurrentPoints : ""
          }</span> / ${listItemWorthPoints}</p>
        </div>
      </div>
    `;
  };

  get htmlStructure(): string {
    const { title } = this.settings;
    const questions = this.model.get("questionCollection").getAll();

    return `
      <div class="ib-points-question-panel">
        <div class="ib-question-list-header">
          <h3 class="ib-question-list-title">${title}</h3>
          <button class="ib-btn white icon">
            <img src="${arrowRightIcon}" alt="close panel icon" />
          </button>
        </div>
        ${questions.map((question) => this.getListItem(question)).join("")}
      </div>
    `;
  }
}
