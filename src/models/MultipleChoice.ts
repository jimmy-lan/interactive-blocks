/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

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

export interface MultipleChoiceProps {
  /**
   * Id used to distinguish between different questions.
   * Please ensure that this field is unique.
   */
  id: string;
  question: string;
  options: MultipleChoiceOption[];
  /**
   * A list storing <id> of options chosen by the user.
   */
  userSelections?: string[];
  /**
   * If true, more than one option can be selected by the user.
   * This attribute will be guessed if not specified.
   */
  canSelectMany?: boolean;
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
   * Guess whether this multiple choice question accepts multiple
   * options to be selected. Should only be invoked when `canSelectMany`
   * attribute is not provided. Always return false if `getAnswer` functions is provided.
   */
  guessCanSelectMany = () => {
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
}
