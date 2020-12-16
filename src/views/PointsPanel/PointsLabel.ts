/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { BlockComponent } from "../common";
import { PointsPanel, PointsPanelProps } from "../../models";

export class PointsLabel extends BlockComponent<PointsPanel, PointsPanelProps> {
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
