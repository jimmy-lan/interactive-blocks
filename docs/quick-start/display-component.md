# Displaying a Component

InteractiveBlocks.js can be integrated with script tags, common JS, and TypeScript.
Depending on how you integrated this library, the syntax for importing resources from InteractiveBlocks.js may differ.

## Import Needed Resources

Let's begin by importing a `MultipleChoice` model and a `MultipleChoiceComponent` view.

<!-- tabs:start -->
#### **Script Tag**
When the library is installed via a script tag, an object named `Blocks` will be added to the window object.
Therefore, we can access library components via `window.Blocks`, as follows:

```javascript
const { MultipleChoice, MultipleChoiceComponent } = Blocks;
```

#### **Common JS**

When the library is installed via npm and accessed using common JS, we can use the following syntax:

```javascript
const Blocks = require("interactive-blocks");
const { MultipleChoice, MultipleChoiceComponent } = Blocks;
```

#### **TS / Bundler**
When typescript and/or a bundler is used, we can access library classes this way:

```javascript
import Blocks from "interactive-blocks";
const { MultipleChoice, MultipleChoiceComponent } = Blocks;
```

<!-- tabs:end -->

In the remainder of this documentation, we will assume that the needed resources are properly imported.

## Display a Multiple Choice Question

?> **Tips:** InteractiveBlocks.js has many pre-built components with complex features. The multiple choice that we are building in this guide does not represent all available features. You can visit the API documentation for more information after this series of guides.

First, we will add a `div` element to the `html` page.

```html
<div id="multiple-choice-example"></div>
```

Then, in a custom javascript file, we select this element.

```javascript
const div = document.getElementById("multiple-choice-example");
```

We will then create a multiple choice model to represent our question.

```javascript
const mc = new MultipleChoice({
  id: "multiple-choice-1",
  question: "Which of the following is a valid React hook?",
  options: [
    {id: "option-1", text: "useReact"}, 
    {id: "option-2", text: "useComponent"},
    {id: "option-3", text: "useEffect", isAnswer: true},
    {id: "option-4", text: "useHtmlAndJavascript"},
  ]
});
```

Finally, let's create a multiple choice component to display our question:

```javascript
const mcComponent = new MultipleChoiceComponent(div, mc);
mcComponent.render();
```

We will see the following output:

<div id="multiple-choice-example"></div>

<script>
    const { MultipleChoice, MultipleChoiceComponent } = Blocks;
    
    const div = document.getElementById("multiple-choice-example");
    
    const mc = new MultipleChoice({
      id: "multiple-choice-1",
      question: "Which of the following is a valid React hook?",
      options: [
        {id: "option-1", text: "useReact"}, 
        {id: "option-2", text: "useComponent"},
        {id: "option-3", text: "useEffect", isAnswer: true},
        {id: "option-4", text: "useHtmlAndJavascript"},
      ]
    });
    
    const mcComponent = new MultipleChoiceComponent(div, mc);
    mcComponent.render();
</script>

## Question ID and Options

We specified an `id` property for the MultipleChoice model.
The `id` property is mandatory for a Question model, because it helps us distinguish between different questions. Imagine when we eventually have a list of questions, the `id` properties may be crucial to us because otherwise we might not be able to tell the questions apart from each other.

!> **Important:** Please ensure that the questions on your page have unique `id`s.

We also specify an `id` for each multiple choice option above. These `id`s are there to help us distinguish what the user selects. For example, we may access the user selections for this particular multiple-choice question using `mc.get("userSelections")`, so that we obtain a list of option `id`s corresponding to the options that the user selects.
This can be particularly useful when we are connecting to an external API.

If we don't use any external APIs to determine the correctness for questions, and don't care too much about user selections in our app, a convenient helper method can be used to construct the options list.
We can use the following syntax:

```javascript
MultipleChoice.parseOptions(
  ["useReact", "useComponent", "useEffect", "useHtmlAndJavascript"], 
  [2]
);
```

to produce a list that looks like the following:

```javascript
[
  { id: "0", text: "useReact", isAnswer: false },
  { id: "1", text: "useComponent", isAnswer: false },
  { id: "2", text: "useEffect", isAnswer: true },
  { id: "3", text: "useHtmlAndJavascript", isAnswer: false }
]
```

This array can then be passed into the multiple choice model as its options.
