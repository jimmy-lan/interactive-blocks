# Connecting to External API

InteractiveBlocks.js is a highly flexible library that allows a high degree of customization among its components.
In this page, we will talk about how to use an external API to verify the correctness of a multiple choice question.

## Creating a Fake Async Function

We will begin by creating a fake async function that verifies whether a multiple choice question has been answered correctly. We will use this function to check against the same multiple choice question that we seen on the last page.
  
```javascript
// userSelections is an array of multiple choice option ids
const verifyResponseAsync = (userSelections) => {
  return new Promise((resolve) => {
    // Wait a few seconds to simulate async request
    setTimeout(() => {
      // Option with id "2" is correct
      const correctAnswers = ["2"]
  
      if (
          // User did not select anything
          !userSelections 
          || !userSelections.length 
          // User selected too many options
          || userSelections.length > 1
      ) {
        resolve(false)
      }
      
      resolve(userSelections[0] === correctAnswers[0])
    }, 3000)
  })
}
```

?> **Tips:** You can replace the body of the function above to call an external API.
   The function should return a promise (or use async/await) that eventually resolves to a boolean value indicating whether the user has correctly answered the multiple choice question.

## Creating a Multiple Choice

Now we will set up the multiple choice question. First, we create a div element in our html.

```html
<div id="multiple-choice-example"></div>
```

Then, we set up a multiple choice question model.

```javascript
const options = MultipleChoice.parseOptions(
  ["useReact", "useComponent", "useEffect", "useHtmlAndJavascript"]
);

const mc = new MultipleChoice({
  id: "multiple-choice-1",
  question: "Which of the following is a valid React hook?",
  options,
  // Note the added attribute
  checkAnswer: verifyResponseAsync
});
```

Finally, we will render the multiple choice question using a multiple choice component:

```javascript
const div = document.getElementById("multiple-choice-example");
new MultipleChoiceComponent(div, mc).render();
```

The output is displayed below:

<div id="multiple-choice-example"></div>
<script>
    const { MultipleChoice, MultipleChoiceComponent } = Blocks;
    const verifyResponseAsync = (userSelections) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const correctAnswers = ["2"];
          if (
              !userSelections 
              || !userSelections.length 
              || userSelections.length > 1
          ) {
            resolve(false)
          }
          resolve(userSelections[0] === correctAnswers[0])
        }, 3000)
      })
    };
    const options = MultipleChoice.parseOptions(
      ["useReact", "useComponent", "useEffect", "useHtmlAndJavascript"]
    );
    const mc = new MultipleChoice({
      id: "multiple-choice-1",
      question: "Which of the following is a valid React hook?",
      options,
      checkAnswer: verifyResponseAsync
    });
    const div = document.getElementById("multiple-choice-example");
    new MultipleChoiceComponent(div, mc).render();
</script>

While we are getting a response, any additional clicking on the "check answer" button will not trigger the check answer function again.
The current design tries not to confuse the user, so the question does not appear disabled during the API request. 
However, any additional clicking will have no effect at all.
