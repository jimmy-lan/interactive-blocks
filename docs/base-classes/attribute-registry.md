# Attribute Registry

Class holding attributes regarding a model.

## Alias

* AttributeRegistry\<T\>

## Constructor

* `constructor(private data: T)`

## Methods

* get\<K extends keyof T\>(key: K): T[K]
* getAll(): T
* set(newData: Partial\<T\>): void
* replace(newData: T): void
