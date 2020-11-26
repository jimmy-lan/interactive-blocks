/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { isArrayEqual } from "../utils";
import { QuestionProps } from "./Question";
import { BlockModel } from "./common/BlockModel";
import { AttributeRegistry } from "./common/AttributeRegistry";

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
   * If true, multiple attempts to the question is allowed until
   * the question is correctly answered. Otherwise, the question
   * becomes disabled after one attempt. Defaults to false.
   */
  disableMultipleAttempts?: boolean;
  /**
   * Callback function to obtain a list of option <id> which corresponds to
   * the correct answer. When this attribute is not specified, the `isAnswer`
   * property in `options` is used. Otherwise, `isAnswer` in `options`
   * is ignored.
   */
  getAnswer?: () => Promise<string[]>;
}

export class MultipleChoice extends BlockModel<MultipleChoiceProps> {
  constructor(attributes: MultipleChoiceProps, persistenceStorage?: Storage) {
    super(
      new AttributeRegistry<MultipleChoiceProps>(attributes),
      persistenceStorage
    );
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
   * attribute is not provided. Always return false if `getAnswer` functions is provided.
   */
  guessAllowMultipleSelect = () => {
    // Always return false if `getAnswer` functions is provided.
    if (this.get("getAnswer")) {
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
  isUserSelectionsCorrect = async (): Promise<boolean> => {
    const userSelections = this.get("userSelections") || [];
    const getAnswer = this.get("getAnswer");

    let correctSelections: string[];
    if (getAnswer) {
      correctSelections = await getAnswer();
    } else {
      correctSelections = this.extractCorrectSelectionsFromOptions();
    }

    return isArrayEqual(userSelections, correctSelections);
  };
}
