/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { BlockComponent } from "../common";
import { PointsPanel, PointsPanelProps } from "../../models";

export class PointsLabel extends BlockComponent<PointsPanel, PointsPanelProps> {
  get htmlStructure(): string {
    return `<h5 class="ib-points-score-label">0 / 100</h5>`;
  }
}
