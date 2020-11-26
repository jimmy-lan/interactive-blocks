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
  acceptableAnswers: string[];
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
  }
}
