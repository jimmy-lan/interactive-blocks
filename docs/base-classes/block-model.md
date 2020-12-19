# Block Model
An interactive block model.

## Alias

* BlockModel\<T = any\>

## Implements
* [Serializable](base-classes/persistence.md?id=types)

## Constructor
```
constructor(
    private attributes: AttributeRegistry<T>,
    persistenceStorage: Storage = localStorage
)
```

## Data
* attributes: [AttributeRegistry](base-classes/attribute-registry.md)\<T\>
* events: [EventRegistry](base-classes/event-registry.md)
* persistence: [Persistence](base-classes/persistence.md)\<this\>

## Methods from &nbsp;[Attribute Registry](base-classes/attribute-registry.md)

* get
* getAll
* set
* replace

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