# Block Model

An interactive block model.

## Alias

- BlockModel\<T = any\>

## Implements

- [Serializable](api-docs/base-classes/persistence.md?id=types)

## Constructor

```
constructor(
    private attributes: AttributeRegistry<T>,
    persistenceStorage: Storage = localStorage
)
```

## Data

- attributes: [AttributeRegistry](api-docs/base-classes/attribute-registry.md)\<T\>
- events: [EventRegistry](api-docs/base-classes/event-registry.md)
- persistence: [Persistence](api-docs/base-classes/persistence.md)\<this\>

## Events

You can listen to these events: "change" | "save" | "read".

## Methods from &nbsp;[Attribute Registry](api-docs/base-classes/attribute-registry.md)

- get
- getAll
- set
- replace

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
