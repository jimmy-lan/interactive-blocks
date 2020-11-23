/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { BlockComponent } from "./common/BlockComponent";
import { MultipleChoice, MultipleChoiceProps } from "../models/MultipleChoice";

export class MultipleChoiceComponent extends BlockComponent<
  MultipleChoice,
  MultipleChoiceProps
> {
  get htmlStructure(): string {
    return `
      <div>
        <h5>${this.model.get("question")}</h5>
        <p>Multiple Choice*</p>
        <ul>
          ${this.model
            .get("options")
            .forEach((option: string) => `<li>${option}</li>`)}
        </ul>
      </div>
    `;
  }
}
