# Collection

A collection of models.

## Alias

- Collection\<T extends BlockModel\>

## Implements

- [Serializable](api-docs/base-classes/persistence.md?id=types)

## Constructor

`constructor(elements: T[], persistenceStorage?: Storage)`

## Data

- _private_ elements: T[]
- events: [EventRegistry](api-docs/base-classes/event-registry.md)
- persistence: [Persistence](api-docs/base-classes/persistence.md)\<this\> | undefined

## Methods

- get(index: number): T
- getAll(): T[]
- set(index: number, model: T): void
- remove(model: T): T
- removeAt(index: number): T
- replace(models: T[]): void

## Methods from &nbsp;[Event Registry](api-docs/base-classes/event-registry.md)

- on (alias: register)
- unregister
- trigger

## Methods from &nbsp;[Persistence](api-docs/base-classes/persistence.md)

- save
- read

## Implementation of Serializable

- serialize
- deserialize
