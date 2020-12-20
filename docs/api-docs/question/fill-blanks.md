# Fill in the Blanks

## Alias

- FillBlanks
- FillBlanks extends [Question](api-docs/question/question-model.md)\<FillBlanksProps\>

## Parent Class

- [Question](api-docs/question/question-model.md)\<MultipleChoiceProps\>

## Fill Blanks Props

| Property          | default     | Type                                        | Description                                                                                                                                                                                                                                                                         |
| ----------------- | ----------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| acceptableAnswers | _undefined_ | String[]                                    | A list of correct answers. If the user's response is included in this list, the user is considered to answer the question correctly.                                                                                                                                                |
| hintNumChars      | false       | Boolean or Number                           | A boolean value deciding whether to hint the user on the number of characters in the correct answer. If this option is provided and set to a number (or true), all answers in `acceptableAnswers` must have the same length, or `acceptableAnswers` should only contain one string. |
| caseSensitive     | false       | Boolean                                     | Indicates whether the answers to this question are case-sensitive. Defaults to false.                                                                                                                                                                                               |
| userInput         | _undefined_ | String                                      | A string storing the current user response to this fill in the blanks question.                                                                                                                                                                                                     |
| checkAnswer       | _undefined_ | (p: string) => Promise\<boolean \| number\> | Please see `checkAnswer` property in [Question](api-docs/question/question-model.md?id=question-props). This property is listed again due to change in type.                                                                                                                        |

!> **Important**: You should provide either `acceptableAnswers` or `checkAnswers` to the props.

You should provide either `acceptableAnswers` or `checkAnswers` to the props. If both are not provided, we cannot tell whether a fill in the blanks question is correct. A checking mechanism will be activated during the instantiation of `FillBlanks` to catch this problem. You will see an error saying something similar to the following:

```
Error: FillBlanks must contain one of the attributes: 'acceptableAnswers' | 'checkAnswer'
```

If one of `acceptableAnswers` and `checkAnswers` is missing.
`FillBlanks` also checks for other properties such as `hintNumChars`.
If a property is incorrectly provided, the model throws an error, resulting the component rendering this model to fail.
Please check the developer console often.

## Constructor

The constructor for fill in the blanks model takes one or two arguments, and is slightly different from the constructor of its parent class, [BlockModel](api-docs/base-classes/block-model.md).

<!-- tabs:start -->

#### **JS**

```javascript
// Some props for the fill blanks model
const props = {
  id: "fill-blanks-1",
  question:
    "What is the ultimate answer to the world, the universe, and everything?",
  acceptableAnswers: ["42", "forty-two", "forty two"],
};

// One argument: attributes
const fillBlanks1 = new FillBlanks(props);

// Two arguments: attributes and storage
const storage = localStorage;
const fillBlanks2 = new FillBlanks(props, storage);

// Note that the two-argument constructor is equivalent to the following
const fillBlanks3 = new FillBlanks(props);
multipleChoice3.persistence = new StoragePersistence(multipleChoice3, storage);
```

#### **TS**

```typescript
// Some props for the fill blanks model
const props: FillBlanksProps = {
  id: "fill-blanks-1",
  question:
    "What is the ultimate answer to the world, the universe, and everything?",
  acceptableAnswers: ["42", "forty-two", "forty two"],
};

// One argument: attributes
const fillBlanks1 = new FillBlanks(props);

// Two arguments: attributes and storage
const storage: Storage = localStorage;
const fillBlanks2 = new FillBlanks(props, storage);

// Note that the two-argument constructor is equivalent to the following
const fillBlanks3 = new FillBlanks(props);
multipleChoice3.persistence = new StoragePersistence(multipleChoice3, storage);
```

<!-- tabs:end -->

When the second argument is missing, `localStorage` is used by default.
Please also note the equivalent form of the two-argument constructor presented above.
Persistence on a block model can be freely substituted, which allows the development of plugins.

## Events

See [Question](api-docs/question/question-model.md?id=events).

## Accessors

See [Question](api-docs/question/question-model.md?id=accessors).

## Methods

See [Question](api-docs/question/question-model.md?id=methods).

## Pre-build View Components

Pre-build components that work with this model.
You can also create your own component by extending [QuestionContainer](api-docs/question/question-container.md) or [BlockComponent](api-docs/base-classes/block-component.md).

### Fill Blanks Component

A subclass of [QuestionContainer](api-docs/question/question-container.md) that mounts a fill in the blanks question.
