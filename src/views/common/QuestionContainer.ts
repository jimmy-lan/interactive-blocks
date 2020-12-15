/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 * Description: A question container with status tab and content tab.
 */

import { Question, QuestionProps, QuestionStatus } from "../../models";
import { BlockComponent } from "./BlockComponent";
import { EventsMap } from "../../commonTypes";

export interface QuestionContainerSettings {
  checkAnswerButtonText: string;
}

export interface QuestionContainerSelectors {
  childDiv: string;
  statusDiv: string;
  hintLabel: string;
  errorLabel: string;
  checkAnswerButton: string;
  hintButton: string;
}

export class QuestionContainer<
  T extends Question<K>,
  K extends QuestionProps
> extends BlockComponent<T, K> {
  // Selectors begin with `this.model.idWithPrefix` so that
  // they only select elements corresponding to this question.
  selectors: QuestionContainerSelectors = {
    childDiv: `#${this.model.idWithPrefix} .ib-question-child`,
    statusDiv: `#${this.model.idWithPrefix} .ib-status-container`,
    hintLabel: `#${this.model.idWithPrefix} .ib-question-hint`,
    errorLabel: `#${this.model.idWithPrefix} .ib-question-error`,
    checkAnswerButton: `#${this.model.idWithPrefix} .ib-question-right button.check-answer`,
    hintButton: `#${this.model.idWithPrefix} .ib-question-right button.hint`,
  };

  protected settings: QuestionContainerSettings = {
    checkAnswerButtonText: "Check Answer",
  };

  eventsMap(): EventsMap {
    // Selectors
    const hintButtonSelector = this.selectors.hintButton;
    const checkAnswerButtonSelector = this.selectors.checkAnswerButton;

    return {
      [`${checkAnswerButtonSelector}:click`]: this.handleCheckAnswerClick,
      [`${hintButtonSelector}:click`]: this.handleHintClick,
    };
  }

  /**
   * Update question container based on the current question.
   */
  updateQuestionContainer = (): void => {
    // Select needed elements
    const statusContainer = document.querySelector<HTMLDivElement>(
      this.selectors.statusDiv
    );
    const checkAnswerButton = document.querySelector<HTMLButtonElement>(
      this.selectors.checkAnswerButton
    );
    const hintButton = document.querySelector<HTMLButtonElement>(
      this.selectors.hintButton
    );
    console.log(hintButton);
    const errorLabel = document.querySelector<HTMLLabelElement>(
      this.selectors.errorLabel
    );

    // Compute next state
    const questionStatus = this.model.get("questionStatus");
    const newStatusClassName =
      questionStatus === QuestionStatus.correct ? "correct" : "warning";
    const shouldDisable = this.model.shouldDisable;

    // Update component display
    statusContainer!.classList.remove("correct", "warning");
    statusContainer!.classList.add(newStatusClassName);
    checkAnswerButton!.disabled = shouldDisable;
    if (hintButton) {
      hintButton.disabled = shouldDisable;
    }

    // Clear any errors that the hint label shows
    errorLabel!.classList.remove("visible");
  };

  /**
   * Update question container display to show an error informing
   * the user that this question is unanswered.
   */
  showEmptyError = (): void => {
    const errorLabel = document.querySelector<HTMLLabelElement>(
      this.selectors.errorLabel
    )!;
    if (!errorLabel.classList.contains("visible")) {
      errorLabel.classList.add("visible");
    }
  };

  protected onCheckAnswerClick() {}

  handleCheckAnswerClick = async (): Promise<void> => {
    // Display unanswered error if appropriate
    const shouldShowEmptyError = this.model.shouldShowEmptyError;
    if (shouldShowEmptyError) {
      return this.showEmptyError();
    }

    // Determine if question is answered correctly
    const isSelectionCorrect = await this.model.determineCorrectness();
    this.model.updateQuestionStatus(isSelectionCorrect);

    // Update question container display
    this.updateQuestionContainer();

    // Trigger event hook
    this.onCheckAnswerClick();
  };

  handleHintClick = async () => {
    const hintText = this.model.get("hint");
    const isShowingHint = this.model.get("isShowingHint");
    const hintLabel = document.querySelector(this.selectors.hintLabel)!;

    // Toggle hint display
    if (isShowingHint) {
      hintLabel.innerHTML = "";
    } else {
      hintLabel.innerHTML = hintText!;
    }

    this.model.set(
      // @ts-ignore
      { isShowingHint: !isShowingHint },
      { shouldRerender: false }
    );
  };

  get htmlStructure(): string {
    const { checkAnswerButtonText } = this.settings;

    const shouldDisable = this.model.shouldDisable;
    const disabledString = shouldDisable ? "disabled" : "";

    const hint = this.model.get("hint") || "";
    const isShowingHint = this.model.get("isShowingHint");

    return `
      <div id="${this.model.idWithPrefix}" class="ib-container">
        <div class="ib-question-left">
          <div class="ib-question-status">
            <div class="ib-status-container ${this.model.get(
              "questionStatus"
            )}"></div>
          </div>
        </div>
        <div class="ib-question-right">
          <h3 class="ib-question-text">${this.model.get("question")}</h3>
          <h4 class="ib-question-hint">${isShowingHint ? hint : ""}</h4>
          <div class="ib-question-child"></div>
          <div>
            <button class="ib-btn primary check-answer" ${disabledString}>${checkAnswerButtonText}</button>
            ${
              hint
                ? `<button class="ib-btn hint" ${disabledString}>Hint</button>`
                : ""
            }
          </div>
          <h4 class="ib-question-error">* Please provide a valid response to this question!</h4>
        </div>
      </div>
    `;
  }
}
