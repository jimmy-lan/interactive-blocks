/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { BlockComponent } from "../common";
import { PointsPanel, PointsPanelProps } from "../../models";

export class PointsLabel extends BlockComponent<PointsPanel, PointsPanelProps> {
  selectors = {
    label: `${this.model.idSelector} .ib-points-score-label`,
  };

  componentDidRender() {
    this.model.on("question-change", this.updatePointsLabel);
  }

  get display(): string {
    const displayPercentage = this.model.get("displayPercentage");
    const worthPoints = this.model.totalWorthPoints;
    const earnedPoints = this.model.totalEarnedPoints;

    return displayPercentage
      ? `${(earnedPoints / worthPoints).toFixed(2)} %`
      : `${earnedPoints} / ${worthPoints}`;
  }

  /**
   * Update points label display based on current state.
   */
  updatePointsLabel = () => {
    // Change label display
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
