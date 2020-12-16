/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { Question, QuestionProps } from "./Question";
import { AttributeRegistry, BlockModel } from "./common";

export interface PointsPanelProps {
  /**
   * Id of this points panel.
   */
  id?: string;
  questions: Question<QuestionProps>[];
  /**
   * Indicates whether a percentage should be shown in this panel.
   * If false, a numeric value representing score would be shown.
   * Defaults to false.
   */
  displayPercentage?: boolean;
}

export class PointsPanel extends BlockModel<PointsPanelProps> {
  constructor(attributes: PointsPanelProps, persistenceStorage?: Storage) {
    super(
      new AttributeRegistry<PointsPanelProps>(attributes),
      persistenceStorage
    );
  }

  get idWithPrefix(): string {
    const id = this.get("id");
    return id ? `ib-points-${id}` : "";
  }

  /**
   * Return total number of points of that the questions in the array are worth.
   */
  get totalWorthPoints(): number {
    const questions = this.get("questions");
    return questions.reduce(
      (accumulatedPoints, question) =>
        accumulatedPoints + (question.get("worthPoints") || 1),
      0
    );
  }

  /**
   * Return total number of points that the user has earned for answering the questions
   * in the list.
   */
  get totalEarnedPoints(): number {
    const questions = this.get("questions");
    return questions.reduce(
      (accumulatedPoints, question) =>
        accumulatedPoints + question.currentPoints,
      0
    );
  }
}
