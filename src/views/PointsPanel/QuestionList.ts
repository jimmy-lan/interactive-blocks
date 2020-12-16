/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { BlockComponent } from "../common";
import { PointsPanel, PointsPanelProps } from "../../models";
// @ts-ignore
import arrowRightIcon from "../../graphics/arrow-right.svg";

export class QuestionList extends BlockComponent<
  PointsPanel,
  PointsPanelProps
> {
  get htmlStructure(): string {
    return `
      <div class=".ib-question-list-header">
        <h4 class=".ib-question-list-title">Questions</h4>
        <button class="ib-btn icon">
          <img class="icon" src="${arrowRightIcon}" alt="close panel icon" />
        </button>
      </div>
    `;
  }
}
