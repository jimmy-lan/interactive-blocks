/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 */

import { BlockModel } from "./common/BlockModel";

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
  question: string;
  /**
   * Status of this multiple choice question.
   * If not provided, the question is unanswered.
   * @see QuestionStatus
   */
  questionStatus?: QuestionStatus;
  /**
   * If true, multiple attempts to the question is allowed until
   * the question is correctly answered. Otherwise, the question
   * becomes disabled after one attempt. Defaults to false.
   */
  disableMultipleAttempts?: boolean;
}

export abstract class Question<T extends QuestionProps> extends BlockModel<T> {
  get idWithPrefix() {
    return `ib-question-${this.get("id")}`;
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
}
