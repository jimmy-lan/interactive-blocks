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
    const renderCheckbox = typeof this.model.get("answerId") === "object";

    return `
      <div class="ib-container">
        <div class="ib-question-left">
          <div class="ib-question-status"></div>
        </div>
        <div class="ib-question-right">
          <h3 class="ib-question-text">${this.model.get("question")}</h3>
          <p>Multiple Choice*</p>
          ${this.model
            .get("options")
            .map((option: string) =>
              renderCheckbox
                ? `<label class="ib-option-label">
                     <input type="checkbox" />
                     <span class="ib-option-text">${option}</span>
                     <span class="ib-option-checkmark"></span>
                   </label>`
                : ""
            )
            .join("")}
        </div>
      </div>
    `;
  }
}
