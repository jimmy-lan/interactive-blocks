/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { BlockComponent } from "../common";
import { PointsPanel, PointsPanelProps } from "../../models";

export class PointsLabelComponent extends BlockComponent<
  PointsPanel,
  PointsPanelProps
> {
  get selectors() {
    return {
      label: `${this.model.idSelector} .ib-points-score-label`,
    };
  }

  componentDidRender() {
    this.model.on("question-change", this.rerender);
  }

  get display(): string {
    // Obtain needed information
    const displayPercentage = this.model.get("displayPercentage");
    const worthPoints = this.model.totalWorthPoints;
    const earnedPoints = this.model.totalEarnedPoints;

    // Parse info
    let display: string;

    if (displayPercentage) {
      const percentage = (earnedPoints / worthPoints) * 100;
      display = `${percentage.toFixed(2)} %`;
    } else {
      display = `${earnedPoints} / ${worthPoints}`;
    }

    return display;
  }

  /**
   * Update points label display based on current state.
   */
  rerender = (): void => {
    const label = document.querySelector(this.selectors.label)!;
    label.textContent = this.display;
  };

  get htmlStructure(): string {
    return `
      <div class="ib-points-label-panel">
        <h5 class="ib-points-score-label">${this.display}</h5>
      </div>
    `;
  }
}
