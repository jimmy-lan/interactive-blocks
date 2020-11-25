/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 */

import { BlockModel } from "./common/BlockModel";
import { AttributeRegistry } from "./common/AttributeRegistry";

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
}

export class Question<T extends QuestionProps> extends BlockModel<T> {
  constructor(attributes: T, persistenceStorage?: Storage) {
    super(new AttributeRegistry<T>(attributes), persistenceStorage);
  }
}
