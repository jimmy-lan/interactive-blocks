/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { isArrayEqual } from "../utils";
import { Question, QuestionProps } from "./Question";
import { AttributeRegistry, Persistence } from "./common";

export interface MultipleChoiceOption {
  id: string;
  text: string;
  /**
   * Indicate whether this option is included in the answer.
   * Defaults to false.
   */
  isAnswer?: boolean;
}

export interface MultipleChoiceProps extends QuestionProps {
  options: MultipleChoiceOption[];
  /**
   * A list storing <id> of options chosen by the user.
   */
  userSelections?: string[];
  /**
   * If true, more than one option can be selected by the user.
   * This attribute will be guessed if not specified.
   */
  allowMultipleSelect?: boolean;
  /**
   * @see QuestionProps.checkAnswer
   */
  checkAnswer?: (p: string[]) => Promise<boolean>;
}

export class MultipleChoice extends Question<MultipleChoiceProps> {
  constructor(
    attributes: MultipleChoiceProps,
    persistence?: Storage | Persistence
  ) {
    super(new AttributeRegistry<MultipleChoiceProps>(attributes), persistence);
  }

  /**
   * Return a list of options in the correct format.
   * @param optionTexts A list of texts corresponding to the texts displayed
   *    for multiple choice options.
   * @param answerIndices A list of indices in <optionTexts> that corresponds
   *    to the correct answer.
   */
  static parseOptions = (
    optionTexts: string[],
    answerIndices?: number[]
  ): MultipleChoiceOption[] => {
    return optionTexts.map(
      (text: string, index: number): MultipleChoiceOption => ({
        id: String(index),
        text,
        isAnswer: answerIndices?.includes(index),
      })
    );
  };

  get isAnswered(): boolean {
    const userSelections = this.get("userSelections") || [];
    return userSelections.length !== 0;
  }

  /**
   * Extract correct selections from options prop.
   */
  private extractCorrectSelectionsFromOptions = (): string[] => {
    const options = this.get("options");
    return options
      .filter((option: MultipleChoiceOption) => option.isAnswer)
      .map((option: MultipleChoiceOption) => option.id);
  };

  /**
   * Guess whether this multiple choice question accepts multiple
   * options to be selected. Should only be invoked when `allowMultipleSelect`
   * attribute is not provided. Always return false if `checkAnswer` function is provided.
   */
  guessAllowMultipleSelect = () => {
    // Always return false if `checkAnswer` function is provided.
    if (this.get("checkAnswer")) {
      return false;
    }

    // Guess based on number of `isAnswer` set to true. If there is only one `isAnswer` attr
    // set to true, return false. Otherwise, return true.
    const count = this.get("options").reduce(
      (previousState: number, option: MultipleChoiceOption) => {
        if (option.isAnswer) {
          return previousState + 1;
        }
        return previousState;
      },
      0
    );

    return count !== 1;
  };

  /**
   * Return whether the user selected the correct response.
   */
  determineCorrectness = async (): Promise<boolean> => {
    // Obtain needed attributes
    const userSelections = this.get("userSelections") || [];
    const checkAnswer = this.get("checkAnswer");
    const allowEmptyResponse = this.get("allowEmptyResponse");

    // Notify user for empty response
    if (!allowEmptyResponse && !userSelections.length) {
    }

    if (checkAnswer) {
      return await checkAnswer(userSelections);
    }

    const correctSelections = this.extractCorrectSelectionsFromOptions();

    return isArrayEqual(userSelections, correctSelections);
  };
}
