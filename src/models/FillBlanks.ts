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
   */
  hintNumChars?: boolean | number;
  /**
   * A string storing the current user response to this fill in the blanks
   * question.
   */
  userInput?: string;
  /**
   * @see QuestionProps.checkAnswer
   */
  checkAnswer?: (p: string) => Promise<boolean>;
}

export class FillBlanks extends Question<FillBlanksProps> {
  constructor(attributes: FillBlanksProps, persistenceStorage?: Storage) {
    super(
      new AttributeRegistry<FillBlanksProps>(attributes),
      persistenceStorage
    );
    this.validateAttributes();
  }

  static fromStorage(key: string): FillBlanks {
    // @ts-ignore
    const instance = new FillBlanks({});
    instance.read(key);
    return instance;
  }

  get isAnswered(): boolean {
    const userInput = this.get("userInput") || "";
    return userInput.length !== 0;
  }

  /**
   * Check validity of attributes in this question model.
   * Can change attributes as long as the meaning does not change.
   * Post-condition: After validation, 'hintNumChars' attribute will
   *  become a number if it is specified. Or, an error will be thrown,
   *  pausing execution.
   */
  private validateAttributes = (): void => {
    const { acceptableAnswers, hintNumChars, checkAnswer } = this.getAll();

    if (!acceptableAnswers && !checkAnswer) {
      throw new Error(
        "FillBlanks must contain one of the attributes: 'acceptableAnswers' | 'checkAnswer'"
      );
    }

    if (
      acceptableAnswers !== undefined &&
      !checkAnswer &&
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
      this.set(
        { hintNumChars: acceptableAnswerLength },
        { shouldRerender: false }
      );
    }

    if (checkAnswer !== undefined && typeof hintNumChars === "boolean") {
      throw new Error(
        "FillBlanks '" +
          this.get("id") +
          "': When using 'hintNumChars' and a callback function to check answers, " +
          "please pass in the number of characters to hint to 'hintNumChars' attribute."
      );
    }
  };

  /**
   * Return whether the user input is correct with respect to this
   * question.
   */
  determineCorrectness = async (): Promise<boolean> => {
    // Obtain required information
    const userInput = this.get("userInput") || "";
    const acceptableAnswers = this.get("acceptableAnswers");
    const checkAnswer = this.get("checkAnswer");

    if (checkAnswer) {
      return await checkAnswer(userInput);
    }

    const correctAnswers = acceptableAnswers || [];

    return correctAnswers.includes(userInput);
  };
}
