/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 */

import { QuestionContainer } from "../common/QuestionContainer";
import { FillBlanks, FillBlanksProps } from "../../models";
import { ComponentsMap, EventsMap } from "../../commonTypes";
import { StringInput } from "./StringInput";

export class FillBlanksComponent extends QuestionContainer<
  FillBlanks,
  FillBlanksProps
> {
  private stringInput?: StringInput;

  get eventsMap(): EventsMap {
    return {};
  }

  get componentsMap(): ComponentsMap {
    return {
      stringInput: this.selectors.childDiv,
    };
  }

  bindComponents() {
    this.stringInput = new StringInput(this.components.stringInput, this.model);
    this.stringInput.render();
  }
}
