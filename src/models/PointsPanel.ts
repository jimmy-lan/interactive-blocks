/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { Question, QuestionProps } from "./Question";
import { AttributeRegistry, Collection, BlockModel } from "./common";
import { ModelChangeEventOptions } from "../commonTypes";

interface PointsPanelPropsBlueprint {
  /**
   * Id of this points panel.
   */
  id?: string;
  /**
   * Indicates whether a percentage should be shown in this panel.
   * If false, a numeric value representing score would be shown.
   * Defaults to false.
   */
  displayPercentage?: boolean;
}

export interface PointsPanelAcceptedProps extends PointsPanelPropsBlueprint {
  questionCollection:
    | Collection<Question<QuestionProps>>
    | Question<QuestionProps>[];
}

export interface PointsPanelProps extends PointsPanelPropsBlueprint {
  questionCollection: Collection<Question<QuestionProps>>;
}

export class PointsPanel extends BlockModel<PointsPanelProps> {
  constructor(
    attributes: PointsPanelAcceptedProps,
    persistenceStorage?: Storage
  ) {
    super(
      new AttributeRegistry<PointsPanelProps>(parseProps(attributes)),
      persistenceStorage
    );

    function parseProps(
      acceptedProps: PointsPanelAcceptedProps
    ): PointsPanelProps {
      if (Array.isArray(acceptedProps.questionCollection)) {
        const questions = acceptedProps.questionCollection;
        const questionCollection = new Collection<Question<QuestionProps>>(
          questions
        );
        const otherData: any = { ...acceptedProps };
        delete otherData.questionCollection;
        return {
          questionCollection,
          ...otherData,
        };
      } else {
        return acceptedProps as PointsPanelProps;
      }
    }

    this.watchForQuestionsChange();
  }

  /**
   * Watch for changes in question models.
   */
  watchForQuestionsChange = () => {
    const questionCollection = this.get("questionCollection");
    const questions = questionCollection.getAll();
    questions.map((question) =>
      question.on("change", this.handleQuestionElementChange)
    );
    questionCollection.on("change", () => this.set({ questionCollection }));
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
    if (newData.questionCollection) {
      const questions = this.get("questionCollection").getAll();
      questions.map((question) =>
        question.unregister("change", this.handleQuestionElementChange)
      );
    }

    super.set(newData, options);

    // Add new listeners
    if (newData.questionCollection) {
      this.watchForQuestionsChange();
    }
  }

  serialize(): string {
    const props: Partial<PointsPanelProps> = this.getAll();
    delete props.questionCollection;
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
    const questions = this.get("questionCollection").getAll();
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
    const questions = this.get("questionCollection").getAll();
    return questions.reduce(
      (accumulatedPoints, question) =>
        accumulatedPoints + question.currentPoints,
      0
    );
  }
}
