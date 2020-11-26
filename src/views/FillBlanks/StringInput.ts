/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 */

import { BlockComponent } from "../common/BlockComponent";
import { FillBlanks, FillBlanksProps } from "../../models";

export class StringInput extends BlockComponent<FillBlanks, FillBlanksProps> {
  get htmlStructure(): string {
    // Information needed to render
    const hintNumChars = this.model.get("hintNumChars");

    // Styles require calculation
    let style = "";

    return `
      <input class="ib-fb-input" style="width: calc(1.5ch * ${9})" maxlength="${9}" value="forty two" />
    `;
  }
}
