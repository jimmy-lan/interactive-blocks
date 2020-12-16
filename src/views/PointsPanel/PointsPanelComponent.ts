/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */
import { BlockComponent } from "../common";
import { PointsPanel, PointsPanelProps } from "../../models";
import { ComponentsMap } from "../../commonTypes";
import { PointsLabel } from "./PointsLabel";
import { QuestionList } from "./QuestionList";

export interface PointsPanelSelectors {
  pointsLabel: string;
  questionList: string;
}

export class PointsPanelComponent extends BlockComponent<
  PointsPanel,
  PointsPanelProps
> {
  selectors: PointsPanelSelectors = {
    pointsLabel: `.ib-points-panel.label`,
    questionList: `.ib-points-panel.question`,
  };

  componentsMap(): ComponentsMap {
    return {
      pointsLabel: this.selectors.pointsLabel,
      questionList: this.selectors.questionList,
    };
  }

  bindComponents = () => {
    new PointsLabel(this.components.pointsLabel, this.model).render();
    new QuestionList(this.components.questionList, this.model).render();
  };

  get htmlStructure(): string {
    return `
      <div class="ib-points-panel label"></div>
      <div class="ib-points-panel question"></div>
    `;
  }
}
