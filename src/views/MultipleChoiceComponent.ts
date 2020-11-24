/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { BlockComponent } from "./common/BlockComponent";
import { MultipleChoice, MultipleChoiceProps } from "../models";

export class MultipleChoiceComponent extends BlockComponent<
  MultipleChoice,
  MultipleChoiceProps
> {
  get htmlStructure(): string {
    return `
      <div class="ib-container">
        <div class="ib-question-left">
          <div class="ib-question-status"></div>
        </div>
        <div class="ib-question-right">
          <h3>${this.model.get("question")}</h3>
          <p>Multiple Choice*</p>
          <ul>
            ${this.model
              .get("options")
              .map((option: string) => `<li>${option}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
    `;
  }
}
