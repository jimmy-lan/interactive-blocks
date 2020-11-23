/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { InteractiveBlockModel } from "./common/InteractiveBlockModel";
import { AttributeRegistry } from "./common/AttributeRegistry";

export interface MultipleChoiceProps {
  question: string;
  options: string[];
  /**
   * Index or indices in options that are correct
   */
  answerId: number | number[];
}

export class MultipleChoice extends InteractiveBlockModel<MultipleChoiceProps> {
  constructor(attributes: MultipleChoiceProps, persistenceStorage?: Storage) {
    super(
      new AttributeRegistry<MultipleChoiceProps>(attributes),
      persistenceStorage
    );
  }
}
