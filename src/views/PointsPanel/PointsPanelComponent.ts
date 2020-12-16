/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */
import { BlockComponent } from "../common";
import { PointsPanel, PointsPanelProps } from "../../models";
import { ComponentsMap, EventsMap } from "../../commonTypes";
import { PointsLabel } from "./PointsLabel";
import { QuestionList } from "./QuestionList";

export class PointsPanelComponent extends BlockComponent<
  PointsPanel,
  PointsPanelProps
> {
  selectors = {
    pointsLabel: `${this.model.idWithPrefix} .ib-points.label`,
    questionList: `${this.model.idWithPrefix} .ib-points.question`,
  };

  eventsMap(): EventsMap {
    return {
      [`${this.selectors.pointsLabel}:click`]: this.handleLabelClick,
    };
  }

  handleLabelClick = (): void => {
    const questionList = document.querySelector(this.selectors.questionList)!;
    if (!questionList.classList.contains("visible")) {
      questionList.classList.add("visible");
    }
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
