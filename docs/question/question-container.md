# Question Container

A question container with status panel and content panel.

## Alias

- QuestionContainer\<T extends Question\<K\>, K extends QuestionProps\>

## Parent Class

- [BlockComponent](/base-classes/block-component.md)\<T extends Question\<K\>, K extends QuestionProps\>

## Settings

You can specify these settings by assigning to `questionContainer.settings`.

| Setting               | default        | Type   |
| --------------------- | -------------- | ------ |
| checkAnswerButtonText | "Check Answer" | String |
| hintButtonText        | "Hint"         | String |

## Accessors

You can access these properties from a question container

```javascript
// Current settings of question container
questionContainer.settings;
```

Some accessors overridden from [BlockComponent](/base-classes/block-component.md):

?> **Tips**: Inherited attributes or methods are not always outlined.
Please note that the inheritance information can typically be found at the top of the page.

```javascript
// Html structure of this question container
questionContainer.htmlStructure;

// An object mapping element name to a selector which can be used to
// select this element from the DOM
questionContainer.selectors;
```

## Methods

Methods that you can call on a question container.

?> **Tips:** Typically, you do not need to call these methods manually.
You only need to call these methods when you are writing scripts to dynamically update the question container.

```javascript
// Display empty-response error message
questionContainer.showEmptyError();

// Start loading animation
questionContainer.displayLoadingState(true);

// Stop loading animation
questionContainer.displayLoadingState(false);
```

Some methods inherited from [BlockComponent](/base-classes/block-component.md):

```javascript
// Render or rerender the question component
questionContainer.render();
questionContainer.rerender();
```
