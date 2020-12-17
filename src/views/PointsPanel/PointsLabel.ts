/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { BlockComponent } from "../common";
import { PointsPanel, PointsPanelProps } from "../../models";

export class PointsLabel extends BlockComponent<PointsPanel, PointsPanelProps> {
  selectors = {
    label: `${this.model.idWithPrefix} .ib-points-score-label`,
  };

  componentDidRender() {
    this.model.on("question-change", this.updatePointsLabel);
  }

  /**
   * Update points label display based on current state.
   */
  updatePointsLabel = () => {
    // Needed information
    const worthPoints = this.model.totalWorthPoints;
    const earnedPoints = this.model.totalEarnedPoints;

    // Change label display
    const label = document.querySelector(this.selectors.label)!;
    label.textContent = `${earnedPoints} / ${worthPoints}`;
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
