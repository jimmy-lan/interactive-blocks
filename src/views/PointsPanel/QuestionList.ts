/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { BlockComponent } from "../common";
import { PointsPanel, PointsPanelProps } from "../../models";

export class QuestionList extends BlockComponent<
  PointsPanel,
  PointsPanelProps
> {
  get htmlStructure(): string {
    return `
      <div class=".ib-question-list-header">
        <h4 class=".ib-question-list-title">Questions</h4>
        <button class="ib-btn">
          <img class="icon" src="/src/graphics/arrow-right.svg" alt="right arrow icon" />
        </button>
      </div>
    `;
  }
}
