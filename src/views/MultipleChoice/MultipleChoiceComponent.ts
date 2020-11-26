/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { MultipleChoice, MultipleChoiceProps } from "../../models";
import { ComponentsMap, EventsMap } from "../../commonTypes";
import { QuestionStatus } from "../../models/Question";
import { QuestionContainer } from "../common/QuestionContainer";
import { OptionsForm } from "./OptionsForm";

export class MultipleChoiceComponent extends QuestionContainer<
  MultipleChoice,
  MultipleChoiceProps
> {
  get eventsMap(): EventsMap {
    // Selectors
    const formButtonSelector = this.selectors.button;

    return {
      [`${formButtonSelector}:click`]: this.handleCheckAnswerClick,
    };
  }

  get componentsMap(): ComponentsMap {
    const childDivSelector = this.selectors.childDiv;
    return {
      optionsForm: childDivSelector,
    };
  }

  bindComponents = (): void => {
    new OptionsForm(this.components.optionsForm, this.model).render();
  };

  handleCheckAnswerClick = async (): Promise<void> => {
    // Determine the next state of the question component
    const isSelectionCorrect = await this.model.isUserSelectionsCorrect();
    const newStatusClassName = isSelectionCorrect ? "correct" : "warning";
    const newQuestionStatus = isSelectionCorrect
      ? QuestionStatus.correct
      : QuestionStatus.warning;

    // Update question status
    const statusContainer = document.querySelector<HTMLDivElement>(
      ".ib-status-container"
    );
    statusContainer?.classList.remove("correct", "warning");
    statusContainer?.classList.add(newStatusClassName);
    this.model.set(
      { questionStatus: newQuestionStatus },
      { shouldRerender: false }
    );
  };
}
