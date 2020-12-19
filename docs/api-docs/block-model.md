# Block Model
An interactive block model.

## Implements
* [Serializable](api-docs/persistence.md?id=types)

## Constructor
```
constructor(
    private attributes: AttributeRegistry<T>,
    persistenceStorage: Storage = localStorage
)
```

## Data
* attributes: [AttributeRegistry](api-docs/attribute-registry.md)\<T\>
* events: [EventRegistry](api-docs/event-registry.md)
* persistence: [Persistence](api-docs/persistence.md)\<this\>

## Methods from &nbsp;[Attribute Registry](api-docs/attribute-registry.md)

* get
* getAll
* set
* replace

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