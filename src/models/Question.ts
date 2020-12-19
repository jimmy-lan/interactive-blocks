/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 */

import { BlockModel } from "./common";

export enum QuestionStatus {
  unanswered = "unanswered",
  correct = "correct",
  warning = "warning",
}

export interface QuestionProps {
  /**
   * Id used to distinguish between different questions.
   * Please ensure that this field is unique.
   */
  id: string;
  /**
   * Question text associating with this model. Supports html
   * elements.
   */
  question: string;
  /**
   * A hint string to be displayed below the question text.
   */
  hint?: string;
  /**
   * A boolean value indicating whether the question is currently
   * showing hint to the user. Users can toggle hint displays when a hint
   * text is provided. This attribute determines a state. Defaults to false.
   */
  isShowingHint?: boolean;
  /**
   * A short, descriptive title associating to this question.
   * Can be used to display a menu of questions.
   */
  title?: string;
  /**
   * Status of this question.
   * If not provided, the question is unanswered.
   * @see QuestionStatus
   */
  questionStatus?: QuestionStatus;
  /**
   * Number of points this question is worth. This can be displayed on
   * a score panel. If not provided, defaults to 1.
   */
  worthPoints?: number;
  /**
   * Partial points that the user obtains for this question.
   * By the definition of correctness, when a question has a correct
   * status, <partialPoints> is assumed to equal <worthPoints>.
   * You do not have to provide this value if the user currently has 0 points, or
   * the question has a correct status, or you do not plan to assign partial points.
   */
  partialPoints?: number;
  /**
   * If false, multiple attempts to the question is allowed until
   * the question is correctly answered. Otherwise, the question
   * becomes disabled after one attempt. Defaults to false.
   */
  disableMultipleAttempts?: boolean;
  /**
   * If true, this question accepts empty response.
   * Otherwise, this question prevents users from submitting an
   * empty answer to the question. Defaults to false.
   */
  allowEmptyResponse?: boolean;
  /**
   * Return a promise which resolves in a boolean value to indicate whether
   * <userResponse> is correct, or a number to indicate the number of marks that
   * the user gets with <userResponse>. This function is called when the user
   * clicks on the submit button in the form.
   * When this attribute is not specified, the question will determine whether
   * the user's answer is correct based on other attributes. Otherwise, only
   * the result from this function is used.
   */
  checkAnswer?: (userResponse: any) => Promise<boolean | number>;
}

export abstract class Question<T extends QuestionProps> extends BlockModel<T> {
  get idWithPrefix() {
    return `ib-question-${this.get("id")}`;
  }

  /**
   * Return a boolean value indicating whether the question has been
   * correctly answered using local checks.
   */
  protected abstract determineCorrectness(): Promise<boolean | number>;

  /**
   * Update question status based the current question attributes.
   */
  updateQuestionStatus = async () => {
    // Check if the question is answered correctly
    let isCorrect: boolean;
    let partialPoints: number;

    const result = await this.determineCorrectness();
    const worthPoints = this.getAll().worthPoints || 1;

    if (typeof result === "boolean") {
      isCorrect = result;
      partialPoints = worthPoints;
    } else {
      if (result > worthPoints) {
        throw new Error(
          `Question ${this.get(
            "id"
          )}: checkAnswer callback returns a number that is larger than ` +
            "the number of points this question is worth. " +
            `checkAnswer: ${result}, worthPoints: ${worthPoints}.`
        );
      }
      partialPoints = result;
      isCorrect = result === worthPoints;
    }

    // Update question status and current points
    const newQuestionStatus = isCorrect
      ? QuestionStatus.correct
      : QuestionStatus.warning;

    this.set(
      // @ts-ignore
      { questionStatus: newQuestionStatus, partialPoints },
      { shouldRerender: false }
    );
  };

  /**
   * Return whether this question has been answered by the user.
   */
  abstract get isAnswered(): boolean;

  /**
   * Return umber of points that the current user achieves in this question.
   */
  get currentPoints(): number {
    const questionStatus = this.get("questionStatus");
    const worthPoints = this.getAll().worthPoints || 1;
    const currentPoints = this.getAll().partialPoints || 0;

    if (questionStatus === QuestionStatus.correct) {
      return worthPoints;
    }
    return currentPoints;
  }

  /**
   * Determine whether this question should not accept further attempts.
   */
  get shouldDisable(): boolean {
    // Obtain needed information
    const questionStatus = this.get("questionStatus");
    const disableMultipleAttempts = this.get("disableMultipleAttempts");

    // If questionStatus is not defined, this question is unanswered,
    // so we do not disable question.
    let disabled: boolean = questionStatus !== undefined;
    if (disableMultipleAttempts) {
      // Disable as long as questionStatus is not unanswered
      disabled = disabled && questionStatus !== QuestionStatus.unanswered;
    } else {
      // Disable only when question is answered correctly
      disabled = disabled && questionStatus === QuestionStatus.correct;
    }

    return disabled;
  }

  /**
   * Determine whether an unanswered error should be shown based on
   * the current state of the question.
   */
  get shouldShowEmptyError(): boolean {
    const allowEmptyResponse = this.get("allowEmptyResponse");
    const isAnswered = this.isAnswered;

    // When question does not allow empty response and is not answered
    return !allowEmptyResponse && !isAnswered;
  }
}
