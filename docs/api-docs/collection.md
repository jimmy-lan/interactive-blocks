# Collection

A collection of models.

## Implements
* [Serializable](api-docs/persistence.md?id=types)

## Constructor

```constructor(elements: T[], persistenceStorage?: Storage)```

## Data

* *private* elements: T[]
* events: [EventRegistry](api-docs/event-registry.md)
* persistence: [Persistence](api-docs/persistence.md)\<this\> | undefined

## Methods

* get(index: number): T
* getAll(): T[]
* set(index: number, model: T): void
* remove(model: T): T
* removeAt(index: number): T
* replace(models: T[]): void

## Methods from &nbsp;[Event Registry](api-docs/event-registry.md)

* on (alias: register)
* unregister
* trigger

## Methods from &nbsp;[Persistence](api-docs/persistence.md)

* save
* read

## Implementation of Serializable

* serialize
* deserialize