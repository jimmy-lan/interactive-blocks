# Points Panel Model

## Alias

- PointsPanel
- PointsPanel extends [BlockModel](base-classes/block-model.md)\<PointsPanelProps\>

## Parent Class

- [BlockModel](base-classes/block-model.md)\<PointsPanelProps\>

## Points Panel Blueprint

Properties that exists on points panel.
These properties can be specified or obtained.

| Property          | default     | Type    | Description                                                                                                                |
| ----------------- | ----------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| id                | _undefined_ | String  | Id of this points panel. Optional.                                                                                         |
| displayPercentage | false       | Boolean | Indicates whether a percentage should be shown in this panel. If false, a numeric value representing score would be shown. |

## Points Panel (Accepted) Props

**Extends [Points Panel Blueprint](points-panel/points-panel-model.md?id=points-panel-blueprint)**.

Properties that points panel _accepts_ during initialization.

| Property             | default | Type                                                                                                                                                               | Description                                                                                                                |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| questionCollection\* | /       | [Collection](base-classes/collection.md)\<[Question](question/question-model.md)\<QuestionProps\>\> **or [Question](question/question-model.md)<QuestionProps>[]** | Indicates whether a percentage should be shown in this panel. If false, a numeric value representing score would be shown. |

?> **Tips:** A star (\*) beside the property name means that the property is required.

## Points Panel Props

**Extends [Points Panel Blueprint](points-panel/points-panel-model.md?id=points-panel-blueprint)**.

Properties that you can access from the points panel.

| Property             | default | Type                                                                                                | Description                                                                                                                |
| -------------------- | ------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| questionCollection\* | /       | [Collection](base-classes/collection.md)\<[Question](question/question-model.md)\<QuestionProps\>\> | Indicates whether a percentage should be shown in this panel. If false, a numeric value representing score would be shown. |

?> **Tips:** A star (\*) beside the property name means that the property will exist in a points panel.

## Constructor

The constructor for multiple choice model takes one or two arguments, and is slightly different from the constructor of its parent class, [BlockModel](base-classes/block-model.md).

<!-- tabs:start -->

#### **JS**

```javascript
// Some props for the points panel
const props = {
  // question1, question2, question3 are instances of Question
  questionCollection: new Collection([question1, question2, question3]),
  // optional property
  displayPercentage: true,
  // optional property
  id: "points-panel-example",
};

// One argument: attributes
const pointsPanel1 = new PointsPanel(props);

// Two arguments: attributes and storage
const storage = localStorage;
const pointsPanel2 = new PointsPanel(props, storage);

// Note that the two-argument constructor is equivalent to the following
const pointsPanel3 = new PointsPanel(props);
pointsPanel3.persistence = new StoragePersistence(pointsPanel3, storage);
```

#### **TS**

```typescript
// Some props for the points panel
const props: PointsPanelProps = {
  // question1, question2, question3 are instances of Question
  questionCollection: new Collection([question1, question2, question3]),
  // optional property
  displayPercentage: true,
  // optional property
  id: "points-panel-example",
};

// One argument: attributes
const pointsPanel1 = new PointsPanel(props);

// Two arguments: attributes and storage
const storage: Storage = localStorage;
const pointsPanel2 = new PointsPanel(props, storage);

// Note that the two-argument constructor is equivalent to the following
const pointsPanel3 = new PointsPanel(props);
pointsPanel3.persistence = new StoragePersistence(pointsPanel3, storage);
```

<!-- tabs:end -->

When the second argument is missing, `localStorage` is used by default.
Please also note the equivalent form of the two-argument constructor presented above.
Persistence on a block model can be freely substituted, which allows the development of plugins.

## Events

## Events

You can listen to these events: "change" | "save" | "read" | "question-change".

<!-- tabs:start -->

#### **JS**

```javascript
// Suppose `panel` is referring to a points panel instance.
panel.on("change", (changedProps) => {
  console.log(changedProps);
});
```

#### **TS**

```typescript
// Suppose `panel` is referring to a points panel instance.
panel.on("change", (changedProps: Partial<PointsPanelProps>) => {
  console.log(changedProps);
});
```

<!-- tabs:end -->

## Accessors

You can access these properties from a points panel model.

```javascript
// Actual id used for rendering this points panel
// Interactive Blocks append a prefix to the `id` that you
// specified to avoid id conflicts between different components.
panel.idWithPrefix;

// Id with "#" prepand to it
panel.idSelector;

// Total number of points that the questions in the panel are worth
panel.totalWorthPoints;

// Total number of points that the user has earned for answering the
// questions in this points panel
panel.totalEarnedPoints;
```

## Notes

When instantiating a points panel model, you may provide a question collection or an array of questions.
If a question collection is provided, the collection is stored in the points panel as it is.
However, if an array of questions is provided, the array will first be converted to a question collection, then stored in the points panel model.

This is done because the points panel concerns about changes on individual questions.
