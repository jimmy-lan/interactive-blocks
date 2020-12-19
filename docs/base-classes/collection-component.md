# Collection Component

A view containing a collection of components.

## Alias

* CollectionComponent\<T extends [BlockModel](base-classes/block-model.md)\<K\>, K\>
* *abstract* CollectionComponent\<T extends [BlockModel](base-classes/block-model.md)\<K\>, K\>

## Constructor

```constructor(public parent: Element, public collection: Collection<T>)```

## Methods

* *abstract* appendComponent(model: T): void
> Render one component based on the model given.
> Append the component rendered to the parent element.
* render(disableClean: boolean = false): void
> Render this collection component by appending to the parent element

## Life-Cycle Methods
 
 * componentDidRender(): void
 * componentWillRender(): void