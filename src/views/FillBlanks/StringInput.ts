/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 */

import { BlockComponent } from "../common/BlockComponent";
import { FillBlanks, FillBlanksProps } from "../../models";

export class StringInput extends BlockComponent<FillBlanks, FillBlanksProps> {
  get htmlStructure(): string {
    return `
      <input class="ib-fb-input" style="calc(1ch * ${
        this.model.get("acceptableAnswers")[0].length
      })" maxlength="${this.model.get("acceptableAnswers")[0].length}" value="${
      this.model.get("acceptableAnswers")[0]
    }" />
    `;
  }
}
