/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { BlockComponent } from "./common/BlockComponent";
import {
  MultipleChoice,
  MultipleChoiceOption,
  MultipleChoiceProps,
} from "../models";

export class MultipleChoiceComponent extends BlockComponent<
  MultipleChoice,
  MultipleChoiceProps
> {
  get htmlStructure(): string {
    const renderCheckbox = true;

    return `
      <div class="ib-container">
        <div class="ib-question-left">
          <div class="ib-question-status"></div>
        </div>
        <div class="ib-question-right">
          <h3 class="ib-question-text">${this.model.get("question")}</h3>
          ${this.model
            .get("options")
            .map(({ id, text }: MultipleChoiceOption) =>
              renderCheckbox
                ? `<label class="ib-option-label">
                     <input type="checkbox" value=${id} />
                     <span class="ib-option-text">${text}</span>
                     <span class="ib-option-checkmark"></span>
                   </label>`
                : ""
            )
            .join("")}
          <button>Check Answer</button>
        </div>
      </div>
    `;
  }
}
