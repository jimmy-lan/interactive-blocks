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
  get selectors() {
    return {
      root: `${this.model.idSelector}.ib-points-panel`,
      pointsLabel: `${this.model.idSelector} .ib-points.label`,
      questionList: `${this.model.idSelector} .ib-points.question`,
    };
  }

  componentDidRender() {
    this.model.on("question-change", this.rerender);
  }

  rerender = (): void => {
    const earnedPoints = this.model.totalEarnedPoints;
    const worthPoints = this.model.totalWorthPoints;

    const root = document.querySelector(this.selectors.root)!;
    if (earnedPoints === worthPoints) {
      root.classList.add("correct");
    } else {
      root.classList.remove("correct");
    }
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
      <div ${idAttr} class="ib-points-panel">
        <div class="ib-points label"></div>
        <div class="ib-points question"></div>
      </div>
    `;
  }
}
