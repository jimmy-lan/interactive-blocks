/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

/**
 * A callback function type when an event is triggered.
 */
export type EventCallback = (...args: unknown[]) => void;
/**
 * A record of events, where multiple callbacks can be added for one event.
 */
export type EventsRecord = { [eventType: string]: EventCallback[] };
/**
 * A map of events, where events are registered using a one-to-one relationship.
 * Descriptor (i.e. p, object key) must follow some special syntax so that it only describes one event.
 */
export type EventsMap = { [descriptor: string]: EventCallback };

/**
 * A map of components with object key being the name of the component and
 * object value being the selector of the component on the DOM.
 */
export type ComponentsMap = { [key: string]: string };

// Event options

export interface ModelChangeEventOptions {
  shouldRerender: boolean;
}
