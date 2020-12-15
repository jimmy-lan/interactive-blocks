/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */
import { BlockComponent } from "../common/BlockComponent";
import { PointsPanel, PointsPanelProps } from "../../models/PointsPanel";

export class PointsPanelComponent extends BlockComponent<
  PointsPanel,
  PointsPanelProps
> {
  get htmlStructure(): string {
    return "";
  }
}
