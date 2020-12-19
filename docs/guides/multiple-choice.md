# Examples: Multiple Choice

## Single Select

<!-- tabs:start -->

#### **JS**

```javascript
const singleSelectMc = new MultipleChoice({
  id: "mc1",
  question: "Which of the following is a valid hook in React?",
  options: [
    { id: "option-1", text: "useReact" },
    { id: "option-2", text: "useComponent" },
    { id: "option-3", text: "useEffect", isAnswer: true },
    { id: "option-4", text: "useHtmlAndJavascript" },
  ],
});
new MultipleChoiceComponent(
  document.getElementById("single-select-mc"),
  singleSelectMc
).render();
```

#### **HTML**

```html
<div id="single-select-mc"></div>
```

<!-- tabs:end -->

<div id="single-select-mc"></div>

## Multi-Select

<!-- tabs:start -->

#### **JS**

```javascript
const multiSelectMc = new MultipleChoice({
  id: "mc2",
  question: "Which of the following is a valid hook in React?",
  options: [
    { id: "option-1", text: "useReact" },
    { id: "option-2", text: "useState", isAnswer: true },
    { id: "option-3", text: "useEffect", isAnswer: true },
    { id: "option-4", text: "useHtmlAndJavascript" },
  ],
});
new MultipleChoiceComponent(
  document.getElementById("multi-select-mc"),
  multiSelectMc
).render();
```

#### **HTML**

```html
<div id="multi-select-mc"></div>
```

<!-- tabs:end -->

<div id="multi-select-mc"></div>

## Multi-Select with One Correct Option

<!-- tabs:start -->

#### **JS**

```javascript
const multiSelectOneAnswerMc = new MultipleChoice({
  id: "mc3",
  question: "Which of the following is a valid hook in React?",
  options: [
    { id: "option-1", text: "useReact" },
    { id: "option-2", text: "useComponent" },
    { id: "option-3", text: "useEffect", isAnswer: true },
    { id: "option-4", text: "useHtmlAndJavascript" },
  ],
  // Note the following line
  allowMultipleSelect: true,
});
new MultipleChoiceComponent(
  document.getElementById("multi-select-one-answer-mc"),
  multiSelectOneAnswerMc
).render();
```

#### **HTML**

```html
<div id="multi-select-one-answer-mc"></div>
```

<!-- tabs:end -->

<div id="multi-select-one-answer-mc"></div>

## Showing Hint

<!-- tabs:start -->

#### **JS**

```javascript
const hintMc = new MultipleChoice({
  id: "mc4",
  question: "Which of the following is a valid hook in React?",
  options: [
    { id: "option-1", text: "useReact" },
    { id: "option-2", text: "useComponent" },
    { id: "option-3", text: "useEffect", isAnswer: true },
    { id: "option-4", text: "useHtmlAndJavascript" },
  ],
  allowMultipleSelect: true,
  // Supports HTML tags
  hint: "<strong>Hint:</strong> Please select only the third option!",
  // Allow question to show hint without the user clicking on
  // the hint button
  isShowingHint: true,
});
new MultipleChoiceComponent(
  document.getElementById("hint-mc"),
  hintMc
).render();
```

#### **HTML**

```html
<div id="hint-mc"></div>
```

<!-- tabs:end -->

<div id="hint-mc"></div>

## Allowing Empty Response

<!-- tabs:start -->

#### **JS**

```javascript
const emptyResponseMc = new MultipleChoice({
  id: "mc5",
  question: "Which of the following is a valid hook in React?",
  options: [
    { id: "option-1", text: "useReact" },
    { id: "option-2", text: "useComponent" },
    { id: "option-3", text: "useInternet" },
    { id: "option-4", text: "useHtmlAndJavascript" },
  ],
  allowMultipleSelect: true,
  // Supports HTML tags
  hint:
    "<strong>Hint:</strong> Don't select anything and you will get the correct answer.",
  // Do not show hint until the user clicks on the hint button
  // Not necessary (defaults to false)
  isShowingHint: false,
  // Note the following line
  allowEmptyResponse: true,
});
new MultipleChoiceComponent(
  document.getElementById("empty-response-mc"),
  emptyResponseMc
).render();
```

#### **HTML**

```html
<div id="empty-response-mc"></div>
```

<!-- tabs:end -->

<div id="empty-response-mc"></div>

## Allow Only One Attempt

By default, questions only disable after the user has correctly answered them.
By passing `true` to `disableMultipleAttempts`, a question disables after one attempt regardless of the result.

<!-- tabs:start -->

#### **JS**

```javascript
const oneAttemptMc = new MultipleChoice({
  id: "mc6",
  question: "Which of the following is a valid hook in React?",
  options: [
    { id: "option-1", text: "useReact" },
    { id: "option-2", text: "useComponent" },
    { id: "option-3", text: "useEffect", isAnswer: true },
    { id: "option-4", text: "useHtmlAndJavascript" },
  ],
  disableMultipleAttempts: true,
});
new MultipleChoiceComponent(
  document.getElementById("one-attempt-mc"),
  oneAttemptMc
).render();
```

#### **HTML**

```html
<div id="one-attempt-mc"></div>
```

<!-- tabs:end -->

<div id="one-attempt-mc"></div>

## Using External API

<!-- tabs:start -->

#### **JS**

```javascript
const externalApiMc = new MultipleChoice({
  id: "mc7",
  question: "Which of the following is a valid hook in React?",
  options: [
    { id: "option-1", text: "useReact" },
    { id: "option-2", text: "useComponent" },
    { id: "option-3", text: "useEffect" },
    { id: "option-4", text: "useHtmlAndJavascript" },
  ],
  checkAnswer: (userSelections) => {
    // Simulate API requests
    return new Promise((resolve) => {
      // Wait a few seconds to simulate async request
      setTimeout(() => {
        // Option with id "option-3" is correct
        const correctAnswers = ["option-3"];

        if (
          // User did not select anything
          !userSelections ||
          !userSelections.length ||
          // User selected too many options
          userSelections.length > 1
        ) {
          resolve(false);
        }

        resolve(userSelections[0] === correctAnswers[0]);
      }, 3000);
    });
  },
});
new MultipleChoiceComponent(
  document.getElementById("external-api-mc"),
  externalApiMc
).render();
```

#### **HTML**

```html
<div id="external-api-mc"></div>
```

<!-- tabs:end -->

<div id="external-api-mc"></div>

<script>
   const { MultipleChoice, MultipleChoiceComponent } = Blocks;
   // Single Select
   const singleSelectMc = new MultipleChoice({
     id: "mc1",
     question: "Which of the following is a valid hook in React?",
     options: [
       { id: "option-1", text: "useReact" },
       { id: "option-2", text: "useComponent" },
       { id: "option-3", text: "useEffect", isAnswer: true },
       { id: "option-4", text: "useHtmlAndJavascript" },
     ],
   });
   new MultipleChoiceComponent(
     document.getElementById("single-select-mc"),
     singleSelectMc
   ).render();
   // Multi-select
   const multiSelectMc = new MultipleChoice({
     id: "mc2",
     question: "Which of the following is a valid hook in React?",
     options: [
       { id: "option-1", text: "useReact" },
       { id: "option-2", text: "useState", isAnswer: true },
       { id: "option-3", text: "useEffect", isAnswer: true },
       { id: "option-4", text: "useHtmlAndJavascript" },
     ],
   });
   new MultipleChoiceComponent(
     document.getElementById("multi-select-mc"),
     multiSelectMc
   ).render();
   // Multi-select one answer
   const multiSelectOneAnswerMc = new MultipleChoice({
     id: "mc3",
     question: "Which of the following is a valid hook in React?",
     options: [
       { id: "option-1", text: "useReact" },
       { id: "option-2", text: "useComponent" },
       { id: "option-3", text: "useEffect", isAnswer: true },
       { id: "option-4", text: "useHtmlAndJavascript" },
     ],
     allowMultipleSelect: true,
   });
   new MultipleChoiceComponent(
     document.getElementById("multi-select-one-answer-mc"),
     multiSelectOneAnswerMc
   ).render();
   // With hint
   const hintMc = new MultipleChoice({
     id: "mc4",
     question: "Which of the following is a valid hook in React?",
     options: [
       { id: "option-1", text: "useReact" },
       { id: "option-2", text: "useComponent" },
       { id: "option-3", text: "useEffect", isAnswer: true },
       { id: "option-4", text: "useHtmlAndJavascript" },
     ],
     allowMultipleSelect: true,
     hint: "<strong>Hint:</strong> Please select only the third option!",
     isShowingHint: true,
   });
   new MultipleChoiceComponent(
     document.getElementById("hint-mc"),
     hintMc
   ).render();
   // Empty response mc
   const emptyResponseMc = new MultipleChoice({
     id: "mc5",
     question: "Which of the following is a valid hook in React?",
     options: [
       { id: "option-1", text: "useReact" },
       { id: "option-2", text: "useComponent" },
       { id: "option-3", text: "useInternet" },
       { id: "option-4", text: "useHtmlAndJavascript" },
     ],
     allowMultipleSelect: true,
     hint:
       "<strong>Hint:</strong> Don't select anything and you will get the correct answer.",
     isShowingHint: false,
     allowEmptyResponse: true,
   });
   new MultipleChoiceComponent(
     document.getElementById("empty-response-mc"),
     emptyResponseMc
   ).render();
   // One Attempt
   const oneAttemptMc = new MultipleChoice({
     id: "mc6",
     question: "Which of the following is a valid hook in React?",
     options: [
       { id: "option-1", text: "useReact" },
       { id: "option-2", text: "useComponent" },
       { id: "option-3", text: "useEffect", isAnswer: true },
       { id: "option-4", text: "useHtmlAndJavascript" },
     ],
     disableMultipleAttempts: true,
   });
   new MultipleChoiceComponent(
     document.getElementById("one-attempt-mc"),
     oneAttemptMc
   ).render();
   // External API
   const externalApiMc = new MultipleChoice({
     id: "mc7",
     question: "Which of the following is a valid hook in React?",
     options: [
       { id: "option-1", text: "useReact" },
       { id: "option-2", text: "useComponent" },
       { id: "option-3", text: "useEffect" },
       { id: "option-4", text: "useHtmlAndJavascript" },
     ],
     checkAnswer: (userSelections) => {
       return new Promise((resolve) => {
         setTimeout(() => {
           const correctAnswers = ["option-3"];
           if (
             !userSelections ||
             !userSelections.length ||
             userSelections.length > 1
           ) {
             resolve(false);
           }
           resolve(userSelections[0] === correctAnswers[0]);
         }, 3000);
       });
     },
   });
   new MultipleChoiceComponent(
     document.getElementById("external-api-mc"),
     externalApiMc
   ).render();
</script>
