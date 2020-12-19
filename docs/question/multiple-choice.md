# Multiple Choice

## Alias

- MultipleChoice
- MultipleChoice extends [Question](question/question-model.md)\<MultipleChoiceProps\>

## Parent Class

- [Question](question/question-model.md)\<MultipleChoiceProps\>

## Multiple Choice Props

| Property            | default     | Type                                        | Description                                                                                                                                         |
| ------------------- | ----------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| options\*           | /           | MultipleChoiceOption[]                      | A list of options corresponding to this multiple choice question. A more detailed description on `MultipleChoiceOption` follows this section.       |
| userSelections      | _undefined_ | String[]                                    | A list storing `id` of options chosen by the user.                                                                                                  |
| allowMultipleSelect | _guessed_   | Boolean                                     | If true, more than one option can be selected by the user. This attribute will be guessed if not specified.                                         |
| checkAnswer         | _undefined_ | (p: string[]) => Promise<boolean \| number> | Please see `checkAnswer` property in [Question](question/question-model.md?id=question-props). This property is listed again due to change in type. |

?> **Tips:** A star (\*) beside the property name means that the property is required.

Please see [Question](question/question-model.md?id=question-props) for other properties that you can specify for a multiple choice question.

## Multiple Choice Option

| Property | default | Type    | Description                                                                                    |
| -------- | ------- | ------- | ---------------------------------------------------------------------------------------------- |
| id\*     | /       | String  | Id used to distinguish between different options. Please ensure that this field is unique.     |
| text\*   | /       | String  | Text of this multiple choice option.                                                           |
| isAnswer | false   | Boolean | Indicates whether this option is part of the correct answer for this multiple choice question. |

?> **Tips:** A star (\*) beside the property name means that the property is required.

## Constructor

The constructor for multiple choice model takes one or two arguments, and is slightly different from the constructor of its parent class, [BlockModel](base-classes/block-model.md).

<!-- tabs:start -->

#### **JS**

```javascript
// Some props for the multiple choice
const props = {
  id: "multiple-choice-1",
  question: "How would you rate this documentation page?",
  // A convenient helper method from MultipleChoice to create
  // the options array
  options: MultipleChoice.parseOptions(["Good", "Average", "Poor"], [0]),
};

// One argument: attributes
const multipleChoice1 = new MultipleChoice(props);

// Two arguments: attributes and storage
const storage = localStorage;
const multipleChoice2 = new MultipleChoice(props, storage);

// Note that the two-argument constructor is equivalent to the following
const multipleChoice3 = new MultipleChoice(props);
multipleChoice3.persistence = new StoragePersistence(multipleChoice3, storage);
```

#### **TS**

```typescript
// Some props for the multiple choice
const props: MultipleChoiceProps = {
  id: "multiple-choice-1",
  question: "How would you rate this documentation page?",
  // A convenient helper method from MultipleChoice to create
  // the options array
  options: MultipleChoice.parseOptions(["Good", "Average", "Poor"], [0]),
};

// One argument: attributes
const multipleChoice1 = new MultipleChoice(props);

// Two arguments: attributes and storage
const storage: Storage = localStorage;
const multipleChoice2 = new MultipleChoice(props, storage);

// Note that the two-argument constructor is equivalent to the following
const multipleChoice3 = new MultipleChoice(props);
multipleChoice3.persistence = new StoragePersistence(multipleChoice3, storage);
```

<!-- tabs:end -->

When the second argument is missing, `localStorage` is used by default.
Please also note the equivalent form of the two-argument constructor presented above.
Persistence on a block model can be freely substituted, which allows the development of plugins.

## Events

See [Question](question/question-model.md?id=events).

## Accessors

See [Question](question/question-model.md?id=accessors).

## Methods

```javascript
// Static helper to create a list of multiple choice options

// One argument form: option texts
// Should specify "allowEmptyResponse" or a "checkAnswer" function
// Otherwise no answer will be marked correct
MultipleChoice.parseOptions(["option 1", "option 2", "option 3"]);

// Two argument form: option texts, answer indices
// Set "option 1" as correct answer
MultipleChoice.parseOptions(["option 1", "option 2", "option 3"], [0]);
// Set "option 1" and "option 3" as correct answers
MultipleChoice.parseOptions(["option 1", "option 2", "option 3"], [0, 2]);
```

See also: [Question](question/question-model.md?id=methods).

## Pre-build View Components

Pre-build components that work with this model.
You can also create your own component by extending [QuestionContainer](question/question-container.md) or [BlockComponent](base-classes/block-component.md).

### Multiple Choice Component

A subclass of [QuestionContainer](question/question-container.md) that mounts an [OptionsForm](question/multiple-choice?id=options-form.md) inside of the container.

### Options Form

A form component showing list of labels with radio button or checkboxes corresponding to the multiple choice options.
