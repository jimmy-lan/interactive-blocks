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
    // Selectors
    const formButtonSelector = this.selectors.button;

    return {
      [`${formButtonSelector}:click`]: this.handleCheckAnswerButtonClick,
    };
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

  handleCheckAnswerButtonClick = async (): Promise<void> => {
    const isInputCorrect = await this.model.isUserInputCorrect();
    this.model.updateQuestionStatus(isInputCorrect);
  };
}
