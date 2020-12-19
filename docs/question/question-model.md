# Question Model

## Alias

- Question\<T extends QuestionProps\>
- _abstract_ Question\<T extends QuestionProps\>

## Parent Class

- [BlockModel](/base-classes/block-model.md)\<T extends QuestionProps\>

## Question Props

Properties that you can specify for any question model.

| Property                | default      | Type                                                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id\*                    | /            | String                                              | Id used to distinguish between different questions. Please ensure that this field is unique.                                                                                                                                                                                                                                                                                                                                                                  |
| question\*              | /            | String                                              | Question text associating with this model. Supports html elements.                                                                                                                                                                                                                                                                                                                                                                                            |
| hint                    | _undefined_  | String                                              | A hint string to be displayed below the question text.                                                                                                                                                                                                                                                                                                                                                                                                        |
| isShowingHint           | false        | Boolean                                             | A boolean value indicating whether the question is currently showing hint to the user. Users can toggle hint displays when a hint text is provided. This attribute determines a state. Defaults to false.                                                                                                                                                                                                                                                     |
| title                   | _undefined_  | String                                              | A short, descriptive title associating to this question. Can be used to display a menu of questions.                                                                                                                                                                                                                                                                                                                                                          |
| questionStatus          | "unanswered" | "unanswered" or "correct" or "warning"              | Status of this question.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| worthPoints             | 1            | Number                                              | Number of points this question is worth. This can be displayed on a score panel. If not provided, defaults to 1.                                                                                                                                                                                                                                                                                                                                              |
| partialPoints           | 0            | Number                                              | Partial points that the user obtains for this question. By the definition of correctness, when a question has a correct status, partialPoints is assumed to equal worthPoints. You do not have to provide this value if the user currently has 0 points, or the question has a correct status, or you do not plan to assign partial points.                                                                                                                   |
| disableMultipleAttempts | false        | Boolean                                             | If false, multiple attempts to the question is allowed until the question is correctly answered. Otherwise, the question becomes disabled after one attempt. Defaults to false.                                                                                                                                                                                                                                                                               |
| allowEmptyResponse      | false        | Boolean                                             | If true, this question accepts empty response. Otherwise, this question prevents users from submitting an empty answer to the question. Defaults to false.                                                                                                                                                                                                                                                                                                    |
| checkAnswer             | _undefined_  | (userResponse: any) => Promise\<boolean \| number\> | Return a promise which resolves in a boolean value to indicate whether `userResponse` is correct, or a number to indicate the number of marks that the user gets with `userResponse`. This function is called when the user clicks on the submit button in the form. When this attribute is not specified, the question will determine whether the user's answer is correct based on other attributes. Otherwise, only the result from this function is used. |

?> **Tips:** A star (\*) beside the property name means that the property is required.

## Events

You can listen to these events: "change" | "save" | "read".

<!-- tabs:start -->

#### **JS**

```javascript
// Suppose `question` is referring to a question instance.
// Remember that the Question class is abstract!

question.on("change", (changedProps) => {
  console.log(changedProps);
});
```

#### **TS**

```typescript
// Suppose `question` is referring to a question instance.
// Remember that the Question class is abstract!

// Recall: Question is a generic class that works with
// type T which extends QuestionProps.
question.on("change", (changedProps: unknown) => {
  console.log(changedProps as Partial<T>);
});
```

<!-- tabs:end -->

## Accessors

You can access these properties from a question model.

```javascript
// Actual id used for rendering this question
// Interactive Blocks append a prefix to the `id` that you
// specified to avoid id conflicts between different components.
question.idWithPrefix;

// Whether this question has been answered
question.isAnswered;

// Number of points that the current user achieves in
// this question.
question.currentPoints;

// Whether this question should not accept further attempts.
question.shouldDisable;

// whether an unanswered error should be shown based on the current
// state of the question.
question.shouldShowEmptyError;
```

## Methods

Methods you can call on a question model.

?> **Tips:** Typically, you do not need to call these methods manually.
You only need to call these methods when you are writing scripts to dynamically update question properties.

```javascript
// Update question status based the current question attributes.
question.updateQuestionStatus();
```

Please note the additional methods inherited from [BlockModel](/base-classes/block-model.md).
These methods include `get`, `getAll`, `set`, `replace`, `on`, `unregister`, `trigger`, `save`, `read`,
`serialize`, `deserialize`.
