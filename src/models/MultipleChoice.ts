/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { InteractiveBlock } from "./common/InteractiveBlock";
import { AttributeRegistry } from "./common/AttributeRegistry";

export interface MultipleChoiceProps {
  question: string;
  options: string[];
  answer: number;
}

export class MultipleChoice extends InteractiveBlock<MultipleChoiceProps> {
  constructor(attributes: MultipleChoiceProps) {
    super(new AttributeRegistry<MultipleChoiceProps>(attributes));
  }
}
