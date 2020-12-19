# Persistence

General class to declare the required methods and/or attributes of a persistence object.

## Constructor

`protected constructor(protected model: T) {}`

## Methods

* *abstract* save(key: string): void
* *abstract* read(key: string): void

## Implementations
### StoragePersistence

Persistence implementation which saves data to local/session storage.

#### Constructor

```constructor(model: T extends Serializable, private storage: Storage)```

#### Types

```typescript
interface Serializable {
  serialize: () => string;
  deserialize: (raw: string) => void;
}
```