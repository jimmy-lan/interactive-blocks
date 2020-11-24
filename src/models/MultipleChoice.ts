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
  selectMany?: boolean;
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
   */
  static parseOptions = (optionTexts: string[]): MultipleChoiceOption[] => {
    return optionTexts.map(
      (text: string, index: number): MultipleChoiceOption => ({
        id: String(index),
        text,
      })
    );
  };
}
