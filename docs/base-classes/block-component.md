# Block Component

An abstract representation of an interactive block component.

## Constructor

```constructor(public parent: Element, public model: T)```

## Data

* selectors
> An object mapping name to component selector for key elements in this BlockComponent.

* htmlStructure
> A string with html syntax that represents this view component.

## Types

```typescript
/**
 * A map of events, where events are registered using a one-to-one relationship.
 * Descriptor (i.e. p, object key) must follow some special syntax so that it only describes one event.
 */
type EventsMap = { [descriptor: string]: EventCallback };

/**
 * A map of components with object key being the name of the component and
 * object value being the selector of the component on the DOM.
 */
type ComponentsMap = { [key: string]: string };
```

## Methods to Override (Optional)

* eventsMap(): [EventsMap](base-classes/block-component?id=types)
```
/**
   * Obtain a map of events in this view component.
   * Descriptor (i.e. p, object key) of event maps in view components must
   * follow the following syntax:
   * - Begin with a selector to an HTMLElement.
   * - Follow by a column (:).
   * - End by the event type to register. The event type to register is one of the DOM events.
   */
```
* componentsMap(): [ComponentsMap](base-classes/block-component?id=types)
```
/**
   * A map of child components in the view component.
   * A ComponentsMap must follow the following format:
   * - Keys correspond to names of child components
   * - Values correspond to selectors of child components
   */
```
* bindComponents(): void
* rerender(changedProps: Partial\<K\>): void
```
/**
   * Method triggered when the model changes.
   * @param changedProps
   */
```

## Other Methods

* bindModel(): void
* bindEvents(fragment: DocumentFragment): void
* mapComponents(fragment: DocumentFragment): void
* render(disableClean: boolean = false): void

## Life-Cycle Methods

* componentDidRender(): void
* componentWillRender(): void