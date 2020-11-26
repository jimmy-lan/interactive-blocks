/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-25
 */
import { Question, QuestionProps } from "./Question";
import { AttributeRegistry } from "./common/AttributeRegistry";

export interface FillBlanksProps extends QuestionProps {
  /**
   * A list of correct answers. If the user's response is included in this list,
   * the user is considered to answer the question correctly.
   */
  acceptableAnswers?: string[];
  /**
   * A boolean value deciding whether to hint the user on the number of
   * characters in the correct answer. If this option is provided and
   * set to a number (or true), all answers in <acceptableAnswers> must have
   * the same length, or <acceptableAnswers> should only contain one string.
   * If you are checking answers using <getAnswer> function, make sure
   * to return a list of string in the required format. Otherwise, the
   * feature will fail to work.
   */
  hintNumChars?: boolean | number;
  /**
   * Callback function to obtain a list of option <id> which corresponds to
   * the correct answer. When this attribute is not specified, the
   * `acceptableAnswers` property is used. Otherwise, `acceptableAnswers is
   * ignored.
   */
  getAnswer?: () => Promise<string[]>;
}

export class FillBlanks extends Question<FillBlanksProps> {
  constructor(attributes: FillBlanksProps, persistenceStorage?: Storage) {
    super(
      new AttributeRegistry<FillBlanksProps>(attributes),
      persistenceStorage
    );
    this.validateAttributes();
  }

  /**
   * Check validity of attributes in this question model.
   * Can change the current attributes so that the meaning of them stay the same.
   */
  private validateAttributes = (): void => {
    const { acceptableAnswers, hintNumChars, getAnswer } = this.getAll();

    if (!acceptableAnswers && !getAnswer) {
      throw new Error(
        "FillBlanks must contain one of the attributes: 'acceptableAnswers' | 'getAnswer'"
      );
    }

    if (
      acceptableAnswers !== undefined &&
      !getAnswer &&
      !acceptableAnswers.length
    ) {
      console.warn(
        `No answer to FillBlank question '${this.get(
          "id"
        )}' will be marked correct.`
      );
    }

    if (hintNumChars !== undefined && acceptableAnswers !== undefined) {
      if (!acceptableAnswers.length) {
        throw new Error(
          `At lease one element in 'acceptableAnswers' of FillBlank question '${this.get(
            "id"
          )}' ` + `should exist.`
        );
      }
      const acceptableAnswerLength = acceptableAnswers[0].length;
      acceptableAnswers.forEach((acceptableAnswer: string) => {
        if (acceptableAnswer.length !== acceptableAnswerLength) {
          throw new Error(
            "If attribute 'hintNumChars' is provided and " +
              "set to a number (or true), all answers in 'acceptableAnswers' must have " +
              "the same length, or 'acceptableAnswers' should only contain one string."
          );
        }
      });
    }
  };
}
