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
      <div>
        <h3>${this.model.get("question")}</h3>
        <p>Multiple Choice*</p>
        <ul>
          ${this.model
            .get("options")
            .map((option: string) => `<li>${option}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  }
}
