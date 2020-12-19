# Event Registry

Event registry class to persist and trigger a set of events.

## Constructor

* `constructor(public events: EventsRecord = {})`

## Types

```typescript
/**
 * A callback function type when an event is triggered.
 */
type EventCallback = (...args: unknown[]) => void;
/**
 * A record of events, where multiple callbacks can be added for one event.
 */
type EventsRecord = { [eventType: string]: EventCallback[] };
```

## Methods

* register(eventType: string, callback: EventCallback): void
* unregister(eventType: string, callback: EventCallback): void
* trigger(eventType: string, ...args: unknown[]): void