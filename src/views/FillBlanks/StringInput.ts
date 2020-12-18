/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 */

import { BlockComponent } from "../common";
import { FillBlanks, FillBlanksProps } from "../../models";
import { EventsMap } from "../../commonTypes";

interface StringInputSelectors {
  input: string;
}

export class StringInput extends BlockComponent<FillBlanks, FillBlanksProps> {
  get selectors(): StringInputSelectors {
    return {
      input: `#${this.model.idWithPrefix} input.ib-fb-input`,
    };
  }

  eventsMap(): EventsMap {
    return {
      [`.ib-fb-input:input`]: this.handleInputChange,
    };
  }

  handleInputChange = () => {
    const inputText =
      document.querySelector<HTMLInputElement>(this.selectors.input)!.value ||
      "";

    this.model.set({ userInput: inputText }, { shouldRerender: false });
  };

  get htmlStructure(): string {
    // Information needed to render
    const hintNumChars = this.model.get("hintNumChars");
    const userInput = this.model.get("userInput") || "";

    // Props require calculation
    let styleProp = "";
    let maxLengthProp = "";
    let additionalClassNames;
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
      additionalClassNames = "hint-num-chars";
    } else {
      additionalClassNames = "normal";
    }

    return `
      <input class="ib-fb-input ${additionalClassNames}" ${styleProp} ${maxLengthProp} value="${userInput}" />
    `;
  }
}
