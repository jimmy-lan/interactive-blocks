# Build an API Sync Plugin

InteractiveBlocks.js is a scalable and highly flexible library.
Parts of components in InteractiveBlocks.js can be substituted to trigger different behaviours.
To demonstrate this point to you, we will substitute the `persistence` part of components so that they save data to an API endpoint in this guide.

Learn more about the library: [BlockModel](api-docs/base-classes/block-model.md), [BlockComponent](/api-docs/base-classes/block-component.md), [Attribute Registry](api-docs/base-classes/attribute-registry.md), [Event Registry](api-docs/base-classes/event-registry.md), [Persistence](api-docs/base-classes/persistence.md), [Collection](api-docs/base-classes/collection.md), [Collection Component](api-docs/base-classes/collection-component.md).

## Create `ApiSyncPersistence` Class

We begin by initializing our plugin. Because we are creating a persistence class, we want to extend `Persistence` abstract class. Read more about this class: [Persistence](api-docs/base-classes/persistence.md).

<!-- tabs:start -->

#### **TS**

```typescript
class ApiSyncPersistence<T extends Serializable> extends Persistence<T> {
  read(uri: string): void {}
  save(uri: string): void {}
}
```

#### **JS**

```javascript
class ApiSyncPersistence extends Persistence {
  read(uri) {}
  save(uri) {}
}
```

<!-- tabs:end -->

## Add Constructor

We will need a root url to determine where to send our api request to.

<!-- tabs:start -->

#### **TS**

```typescript
class ApiSyncPersistence<T extends Serializable> extends Persistence<T> {
  constructor(model: T, public rootUrl: string) {
    super(model);
  }
  // ...
}
```

#### **JS**

```javascript
class ApiSyncPersistence extends Persistence {
  constructor(model, rootUrl) {
    super(model);
    this.rootUrl = rootUrl;
  }
  // ...
}
```

<!-- tabs:end -->

## Install Axios

To simplify this tutorial, we will use `axios` to make our requests.

```bash
npm install axios
```

or include the following script tag in the html:

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## Implement Read Method

We want to simplify things, and so we assume that the server returns a string on `GET` request to a `uri` corresponding to a question.
The string is simply a string version of JSON object representing the model (produced by `JSON.stringify`).
Therefore, the default implementation of `serialize` and `deserialize` on our models can work with this data type.

<!-- tabs:start -->

#### **TS**

```typescript
// The actual definition may differ
type ModelString = string;

class ApiSyncPersistence<T extends Serializable> extends Persistence<T> {
  // ...
  async read(uri: string): Promise<void> {
    const response = await axios.get<ModelString>(`${this.rootUrl}/${uri}`);
    this.model.deserialize(response.data);
  }
  // ...
}
```

#### **JS**

```javascript
class ApiSyncPersistence extends Persistence {
  // ...
  async read(uri) {
    const response = await axios.get(`${this.rootUrl}/${uri}`);
    this.model.deserialize(response.data);
  }
  // ...
}
```

<!-- tabs:end -->

## Implement Save Method

Similarly, we implement the save method as follows:

<!-- tabs:start -->

#### **TS**

```typescript
class ApiSyncPersistence<T extends Serializable> extends Persistence<T> {
  // ...
  async save(uri: string): Promise<void> {
    await axios.post(`${this.rootUrl}/${uri}`, {
      model: this.model.serialize(),
    });
  }
}
```

#### **JS**

```javascript
class ApiSyncPersistence extends Persistence {
  // ...
  async save(uri) {
    await axios.post(`${this.rootUrl}/${uri}`, {
      model: this.model.serialize(),
    });
  }
}
```

<!-- tabs:end -->

## Using Our Plugin

Now our plugin has been completed. We can begin using it.

Import the plugin or include a script tag with source pointing to the plugin file that we just wrote.
Then, we can do the following:

```javascript
const mc = new MultipleChoice({
  id: "multiple-choice-1",
  question: "Which of the following is a valid React hook?",
  options: [
    { id: "option-1", text: "useReact" },
    { id: "option-2", text: "useComponent" },
    { id: "option-3", text: "useEffect", isAnswer: true },
    { id: "option-4", text: "useHtmlAndJavascript" },
  ],
});
// Assign our plugin
mc.persistence = new ApiSyncPersistence(mc, "http://your-url-here.com");

// Try to read previously saved data, if any, from the persistence
try {
  // Sends a GET request to "http://your-url-here.com/multiple-choice-1"
  mc.read(mc.get("id"));
} catch (error) {}

new MultipleChoiceComponent(document.getElementById("mc"), mc).render();

// Here we sync the multiple choice with the server when the question
// status updates. However, when to call the `save` method is up to you.
mc.on("change", (changedProps) => {
  if (changedProps.questionStatus) {
    // Sends a POST request to "http://your-url-here.com/multiple-choice-1"
    mc.save(mc.get("id"));
  }
});
```

## Summary

Thanks to the flexible structure that InteractiveBlocks.js has, we were able to build a custom plugin very easily. Since people have different needs, and different projects might want to sync data differently (e.g. sync to API / save to file / save to database), it doesn't make sense to make these features built-in. However, hopefully you find how easy it can be to create your own plugin after this guide.
