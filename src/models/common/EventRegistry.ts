/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 * Description:
 *    Event registry class to persist and trigger a set of events.
 */

import { EventCallback, EventsRecord } from "../../commonTypes";

export class EventRegistry {
  constructor(public events: EventsRecord = {}) {}

  /**
   * Register event <eventType> with <callback>.
   * @param eventType type of event to register.
   * @param callback A Callback function to be invoked when event
   *    <eventType> is triggered.
   */
  register = (eventType: string, callback: EventCallback): void => {
    const eventCallbacks = this.events[eventType] || [];
    eventCallbacks.push(callback);
    this.events[eventType] = eventCallbacks;
  };

  /**
   * Trigger event <eventType>.
   * @param eventType Type of event to be triggered.
   * @param options Event options to be passed to the callback function.
   */
  trigger = (eventType: string, options?: unknown): void => {
    this.events[eventType]?.forEach((callback: EventCallback) =>
      callback(options)
    );
  };
}
