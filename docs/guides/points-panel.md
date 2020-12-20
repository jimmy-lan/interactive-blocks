# Examples: Points Panel

## Using Pre-build Points Panel Component

With a list of questions or a question collection, it's easy to create a points panel.

<!-- tabs:start -->

#### **JS**

```javascript
const panel = new PointsPanel({
  // mc1, mc2, and fb1 are three question instances
  questionCollection: [mc1, mc2, fb1],
});
const pointsPanelComponent = new PointsPanelComponent(
  document.getElementById("panel"),
  panel
);
pointsPanelComponent.render();
```

#### **HTML**

```html
<div id="panel"></div>
```

<!-- tabs:end -->

You can now see the questions panel mounted on the page. It's on the top-right corner, and you can click on it to view athe list of questions along with your "scores".

We will continue to create the questions `mc1`, `mc2`, and `fb1` mentioned above.

?> **Tips:** As you progress through the page, please attempt to answer the questions while keeping
an eye on the questions panel. You will observe that it automatically updates itself without us explicitly writing any code for it!

## Building Questions

Let me take this opportunity to show you the flexibility of InteractiveBlocks.js.
If you haven't, please look at the previous guides on how to display multiple choice and fill-in-the-blanks questions on the page: [Multiple Choice Examples](guides/multiple-choice.md), [Fill in the Blanks Examples](guides/fill-blanks.md).

We will now create `mc1`, our first multiple choice question.

<!-- tabs:start -->

#### **JS**

```javascript
const mc1 = new MultipleChoice({
  id: "mc1",
  question: "Which of the following cat looks the most confused?",
  options: MultipleChoice.parseOptions(
    [
      `<img class="image-option" src="guides/images/cat-cry.jpeg" alt="crying cat" />`,
      `<img class="image-option" src="guides/images/cat-confused.jpeg" alt="confused cat" />`,
    ],
    [1]
  ),
  // This property specifies how many points that this question is worth
  // Expand the question points panel on the top-right corner to see how
  // this smoothly integrates with the question points panel!
  worthPoints: 25,
});
new MultipleChoiceComponent(document.getElementById("mc-1"), mc1).render();
```

#### **CSS**

```css
.image-option {
  height: 150px;
  width: 150px;
}
```

#### **HTML**

```html
<div id="mc-1"></div>
```

<!-- tabs:end -->

Although not recommended, InteractiveBlocks.js supports html tags for some model properties.
So, this means that we can display image elements for our multiple-choice options!

<div id="mc-1"></div>

<hr />

Time for some more questions!

In this question, we will use a custom function to assign part marks.
The default behaviour is to assign the user all points when they answer the question correctly,
or zero (0) points if the answer is incorrect. We can override this behaviour by using the
`checkAnswer` function.

You don't have to do this in your project. I'm just showing you the flexibility of using InteractiveBlocks.js here.

<!-- tabs:start -->

#### **JS**

```javascript
// Our part-mark assigning function
const checkAnswer = (userSelections) => {
  // Remember that the `parseOptions` helper helps us create
  // option ids from "0" to "3" in this case.
  const answersWorthFivePoints = ["0"];
  const answersWorthTenPoints = ["1", "3"];

  let marksToAssign = 0;
  // Calculate marks that the user gets
  // Our rules: selecting the first option "cats"
  // earns the user 5 points. Selecting the second or fourth
  // options ("the release of Angular" and "the release of
  // Linux 5.0") earn the user 10 points.
  userSelections.forEach((selection) => {
    if (answersWorthFivePoints.includes(selection)) {
      marksToAssign += 5;
    } else if (answersWorthTenPoints.includes(selection)) {
      marksToAssign += 10;
    }
  });

  // You can return a boolean or a number from `checkAnswer`
  return marksToAssign;
};
```

```javascript
// Now the multiple choice component
const mc2 = new MultipleChoice({
  id: "mc2",
  question:
    "Which of the following factors can contribute to the ending of humanity?",
  hint:
    "<strong>Hint:</strong> This is a joke. the options " +
    "'cats', 'the release of Angular', and 'the release of Linux 5.0' " +
    "are correct.",
  options: MultipleChoice.parseOptions([
    "Cats",
    "The release of Angular",
    "Artificial Intelligence",
    "The release of Linux 5.0",
  ]),
  allowMultipleSelect: true,
  worthPoints: 25,
  checkAnswer,
});
new MultipleChoiceComponent(document.getElementById("mc-2"), mc2).render();
```

#### **HTML**

```html
<div id="mc-2"></div>
```

<!-- tabs:end -->

<div id="mc-2"></div>

Please try to answer this question "partially correct" and note the update on points panel.
Then, answer this question completely correct to earn all the points!

<hr />

Finally, we will create our last question, `fb1`.

<!-- tabs:start -->

#### **JS**

```javascript
const fb1 = new FillBlanks({
  id: "fb1",
  question:
    "Please guess a word: the word describes a colour that " +
    "is used on this page and begins with 'or' and ends with 'nge'.",
  acceptableAnswers: ["orange"],
  hintNumChars: true,
  // Let's assign a higher mark for this question!
  worthPoints: 50,
  // Expand the points panel to see the effect of this!
  title: "Can you guess this secret word?",
});
const fb1Component = new FillBlanksComponent(
  document.getElementById("fb-1", fb1),
  fb1
);
// We can customize the button text on the component
fb1Component.settings.checkAnswerButtonText = "Take a Guess!";
fb1Component.render();
```

#### **HTML**

```html
<div id="fb-1"></div>
```

<!-- tabs:end -->

<div id="fb-1"></div>

Did you see the colour change on the points panel after you earned a perfect score?
Although I think it's a very nice effect, there might be circumstances that you don't want to have this colour change.
No problem! Just remember that `pointsPanelComponent.settings.showSuccessColor` is the on/off setting for this effect.

## Using Child Components

You don't always have to mount a points panel on the top-right corner of your page, and it doesn't always need to have a fixed position.
As specified in the API docs, [PointsPanelComponent](api-docs/points-panel/points-panel-component.md) internally renders [PointsLabelComponent](api-docs/points-panel/points-label-component.md) and [PointsListComponent](api-docs/points-panel/points-list-component.md) as child components.
You can use these child components separately and position them anywhere you want.

In this section, we will make use of the PointsListComponent.

<!-- tabs:start -->

#### **JS**

```javascript
// We created `panel` as a `PointsPanel` model at the beginning of
// this guide
new PointsListComponent(document.getElementById("list"), panel).render();
```

#### **HTML**

```html
<div id="list"></div>
```

<!-- tabs:end -->

<div id="list"></div>

Because we are using the same `PointsPanel` model, you will see the same data in the points list that we mounted above.

Now you can take this element and style/position it.

<div id="panel"></div>

<style>
.image-option {
  height: 150px;
  width: 150px;
}
</style>

<script>
const { MultipleChoice, MultipleChoiceComponent, FillBlanks, FillBlanksComponent, PointsPanel, PointsPanelComponent, PointsListComponent } = Blocks;
// Create mc1
const mc1 = new MultipleChoice({
  id: "mc1",
  question: "Which of the following cat looks the most confused?",
  options: MultipleChoice.parseOptions([
    `<img class="image-option" src="guides/images/cat-cry.jpeg" alt="crying cat" />`,
    `<img class="image-option" src="guides/images/cat-confused.jpeg" alt="confused cat" />`,
  ], [1]),
  worthPoints: 25,
});
new MultipleChoiceComponent(document.getElementById("mc-1"), mc1).render();
// Create mc2
const checkAnswer = (userSelections) => {
  const answersWorthFivePoints = ["0"];
  const answersWorthTenPoints = ["1", "3"];
  let marksToAssign = 0;
  userSelections.forEach((selection) => {
    if (answersWorthFivePoints.includes(selection)) {
      marksToAssign += 5;
    } else if (answersWorthTenPoints.includes(selection)) {
      marksToAssign += 10;
    }
  });
  return marksToAssign;
};
const mc2 = new MultipleChoice({
  id: "mc2",
  question:
    "Which of the following factors can contribute to the ending of humanity?",
  hint:
    "<strong>Hint:</strong> This is a joke. the options " +
    "'cats', 'the release of Angular', and 'the release of Linux 5.0' " +
    "are correct.",
  options: MultipleChoice.parseOptions([
    "Cats",
    "The release of Angular",
    "Artificial Intelligence",
    "The release of Linux 5.0",
  ]),
  allowMultipleSelect: true,
  worthPoints: 25,
  checkAnswer,
});
new MultipleChoiceComponent(document.getElementById("mc-2"), mc2).render();
// Create fb1
const fb1 = new FillBlanks({
  id: "fb1",
  question:
    "Please guess a word: the word describes a colour that " +
    "is used on this page and begins with 'or' and ends with 'nge'.",
  acceptableAnswers: ["orange"],
  hintNumChars: true,
  title: "Can you guess this secret word?",
  worthPoints: 50,
});
const fb1Component = new FillBlanksComponent(
  document.getElementById("fb-1", fb1),
  fb1
);
// We can customize the button text on the component
fb1Component.settings.checkAnswerButtonText = "Take a Guess!";
fb1Component.render();
// Points Panel
// This code is different from the code shown because this documentation site
// was configured to use absolute links.
const getLink = (question) => `/#/guides/points-panel#${question.idWithPrefix}`;
const questionCollection = [mc1, mc2, fb1];
const questionLinks = questionCollection.map(question => getLink(question));
const panel = new PointsPanel({
  questionCollection,
  questionLinks
});
new PointsPanelComponent(document.getElementById("panel"), panel).render();
// Create points list
new PointsListComponent(document.getElementById("list"), panel).render();
</script>
