# Collection

A collection of models.

## Alias

* Collection\<T extends BlockModel\>

## Implements
* [Serializable](base-classes/persistence.md?id=types)

## Constructor

```constructor(elements: T[], persistenceStorage?: Storage)```

## Data

* *private* elements: T[]
* events: [EventRegistry](base-classes/event-registry.md)
* persistence: [Persistence](base-classes/persistence.md)\<this\> | undefined

## Methods

* get(index: number): T
* getAll(): T[]
* set(index: number, model: T): void
* remove(model: T): T
* removeAt(index: number): T
* replace(models: T[]): void

## Methods from &nbsp;[Event Registry](base-classes/event-registry.md)

* on (alias: register)
* unregister
* trigger

## Methods from &nbsp;[Persistence](base-classes/persistence.md)

* save
* read

## Implementation of Serializable

* serialize
* deserialize