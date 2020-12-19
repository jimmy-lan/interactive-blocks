# Collection Component

A view containing a collection of components.

## Constructor

```constructor(public parent: Element, public collection: Collection<T>)```

## Methods

* *abstract* appendComponent(model: T): void
> Render one component based on the model given.
> Append the component rendered to the parent element.
* render(disableClean: boolean = false): void
> Render this collection component by appending to the parent element