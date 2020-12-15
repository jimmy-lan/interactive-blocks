/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-15
 */

import { Question, QuestionProps } from "./Question";
import { AttributeRegistry, BlockModel } from "./common";

export interface PointsPanelProps {
  questions: Question<QuestionProps>[];
  /**
   * Indicates whether a percentage should be shown in this panel.
   * If false, a numeric value representing score would be shown.
   * Defaults to false.
   */
  displayPercentage?: boolean;
}

export class PointsPanel extends BlockModel<PointsPanelProps> {
  constructor(attributes: PointsPanelProps, persistenceStorage?: Storage) {
    super(
      new AttributeRegistry<PointsPanelProps>(attributes),
      persistenceStorage
    );
  }
}
