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
    pointsLabel: `${this.model.idWithPrefix} .ib-points.label`,
    questionList: `${this.model.idWithPrefix} .ib-points.question`,
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
    const idAttr = this.model.idWithPrefix
      ? `id="${this.model.idWithPrefix}"`
      : "";

    return `
      <div ${idAttr}>
        <div class="ib-points label"></div>
        <div class="ib-points question"></div>
      </div>
    `;
  }
}
