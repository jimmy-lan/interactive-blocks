/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { BlockComponent } from "../common";
import { PointsPanel, PointsPanelProps } from "../../models";
import { EventsMap } from "../../commonTypes";

export interface PointsLabelSelectors {
  label: string;
  questionList: string;
}

export class PointsLabel extends BlockComponent<PointsPanel, PointsPanelProps> {
  selectors: PointsLabelSelectors = {
    label: `${this.model.idWithPrefix} .ib-points-label-panel`,
    questionList: `${this.model.idWithPrefix} .question.ib-points`,
  };

  eventsMap(): EventsMap {
    return {
      [`${this.selectors.label}:click`]: this.handleLabelClick,
    };
  }

  handleLabelClick = () => {
    const questionList = document.querySelector(this.selectors.questionList)!;
    if (!questionList.classList.contains("visible")) {
      questionList.classList.add("visible");
    }
  };

  get htmlStructure(): string {
    const worthPoints = this.model.totalWorthPoints;
    const earnedPoints = this.model.totalEarnedPoints;

    return `
      <div class="ib-points-label-panel">
        <h5 class="ib-points-score-label">${earnedPoints} / ${worthPoints}</h5>
      </div>
    `;
  }
}
