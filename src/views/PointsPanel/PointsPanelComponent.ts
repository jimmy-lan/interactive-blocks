/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */
import { BlockComponent } from "../common";
import { PointsPanel, PointsPanelProps } from "../../models";
import { ComponentsMap, EventsMap } from "../../commonTypes";
import { PointsLabelComponent } from "./PointsLabelComponent";
import { PointsListComponent } from "./PointsListComponent";

export class PointsPanelComponent extends BlockComponent<
  PointsPanel,
  PointsPanelProps
> {
  get selectors() {
    return {
      root: `${this.model.idSelector}.ib-points-panel`,
      pointsLabel: `${this.model.idSelector} .ib-points.label`,
      pointsList: `${this.model.idSelector} .ib-points.question`,
    };
  }

  componentDidRender() {
    this.model.on("question-change", () => {
      console.log("received question change event");
      this.rerender();
    });
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
    const pointsList = document.querySelector(this.selectors.pointsList)!;
    if (!pointsList.classList.contains("visible")) {
      pointsList.classList.add("visible");
    }
  };

  componentsMap(): ComponentsMap {
    return {
      pointsLabel: this.selectors.pointsLabel,
      pointsList: this.selectors.pointsList,
    };
  }

  bindComponents = () => {
    new PointsLabelComponent(this.components.pointsLabel, this.model).render();
    new PointsListComponent(this.components.pointsList, this.model).render();
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
