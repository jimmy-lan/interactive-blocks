/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { Question, QuestionProps } from "./Question";
import { AttributeRegistry, BlockModel } from "./common";
import { ModelChangeEventOptions } from "../commonTypes";

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
    this.watchForQuestionsChange();
  }

  /**
   * Watch for changes in question models.
   */
  watchForQuestionsChange = () => {
    const questions = this.get("questions");
    questions.map((question) =>
      question.on("change", this.handleQuestionElementChange)
    );
  };

  handleQuestionElementChange = (changedProps: unknown) => {
    const {
      question,
      questionStatus,
      worthPoints,
      partialPoints,
    } = changedProps as Partial<QuestionProps>;

    // Trigger change event if attributes relating
    // to PointsPanel were changed
    if (question || questionStatus || worthPoints || partialPoints) {
      this.trigger("question-change", changedProps);
    }
  };

  set(newData: Partial<PointsPanelProps>, options?: ModelChangeEventOptions) {
    // Remove old listeners
    if (newData.questions) {
      const questions = this.get("questions");
      questions.map((question) =>
        question.unregister("change", this.handleQuestionElementChange)
      );
    }

    super.set(newData, options);

    // Add new listeners
    if (newData.questions) {
      this.watchForQuestionsChange();
    }
  }

  serialize(): string {
    const props: Partial<PointsPanelProps> = this.getAll();
    delete props.questions;
    return JSON.stringify(props);
  }

  deserialize(raw: string) {
    let parsedObject;
    try {
      parsedObject = JSON.parse(raw);
    } catch (error) {
      throw new Error(`Cannot deserialize from value ${raw}`);
    }

    // Questions attribute should not be serialized
    if (parsedObject?.questions) {
      throw new Error(
        `Illegal questions attribute from ${raw}. Questions attribute should ` +
          "not be serialized."
      );
    }

    this.set(parsedObject);
  }

  get idWithPrefix(): string {
    const id = this.get("id");
    return id ? `ib-points-${id}` : "";
  }

  get idSelector(): string {
    const id = this.get("id");
    return id ? `#ib-points-${id}` : "";
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
