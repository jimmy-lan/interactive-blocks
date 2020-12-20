# Collection Component

A view containing a collection of components.

## Alias

- CollectionComponent\<T extends [BlockModel](api-docs/base-classes/block-model.md)\<K\>, K\>
- _abstract_ CollectionComponent\<T extends [BlockModel](api-docs/base-classes/block-model.md)\<K\>, K\>

## Constructor

`constructor(public parent: Element, public collection: Collection<T>)`

## Methods

- _abstract_ appendComponent(model: T): void
  > Render one component based on the model given.
  > Append the component rendered to the parent element.
- render(disableClean: boolean = false): void
  > Render this collection component by appending to the parent element

## Life-Cycle Methods

- componentDidRender(): void
- componentWillRender(): void
