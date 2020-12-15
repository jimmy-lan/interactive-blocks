/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */
import { BlockComponent } from "../common/BlockComponent";
import { PointsPanel, PointsPanelProps } from "../../models";

export class PointsPanelComponent extends BlockComponent<
  PointsPanel,
  PointsPanelProps
> {
  get htmlStructure(): string {
    return `
      <div class="ib-points-panel">
        <h5>1 / 2</h5>
      </div>
    `;
  }
}
