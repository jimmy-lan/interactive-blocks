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

    // Props require calculation
    let styleProp = "";
    let maxLengthProp = "";
    if (hintNumChars) {
      // As FillBlanks object validates all input attributes,
      // <hintNumChars> is a number after validation.
      const numChars = <number>hintNumChars;
      const width = `calc(1.5ch * ${numChars})`;
      const background =
        "repeating-linear-gradient(90deg, dimgrey 0, dimgrey 1ch, transparent 0" +
        `, transparent 1.5ch) 0 100%/ calc(1.5ch * ${numChars} - 0.5ch) 2px no-repeat;`;
      styleProp = `style="width: ${width}; background: ${background};"`;
      maxLengthProp = `maxlength="${numChars}"`;
    }

    return `
      <input class="ib-fb-input" ${styleProp} ${maxLengthProp} />
    `;
  }
}
