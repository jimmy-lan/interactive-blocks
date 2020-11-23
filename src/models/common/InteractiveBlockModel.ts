/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

import { AttributeRegistry } from "./AttributeRegistry";
import { EventRegistry } from "./EventRegistry";
import { Persistence } from "./Persistence";

export class InteractiveBlockModel<T = any> {
  constructor(
    private attributes: AttributeRegistry<T>,
    private events: EventRegistry,
    private persistence: Persistence<T>
  ) {}
}
