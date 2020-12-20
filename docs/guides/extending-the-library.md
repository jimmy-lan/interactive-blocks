# Extending the Library

As specified in [API Docs](api-docs/base-classes/attribute-registry.md), InteractiveBlocks.js allows you to have full control over its objects.
You can use this library creatively, or extend to make your own components.

## Creative Use

There are many examples of creative use.

For example, you can create a [Collection](api-docs/base-classes/collection.md) of questions and render a list of questions using [CollectionComponent](api-docs/base-classes/collection-component.md).

For another example, you can create a subclass of [QuestionContainer](api-docs/question/question-container.md) and append your own view html into it (you might also want to create a new child class of [Question](api-docs/question/question-model.md) in this case.

## Making Your Own Component

InteractiveBlocks.js opens a potential for you to create custom components by subclassing [BlockModel](api-doc/base-classes/block-model.md) and [BlockComponent](api-doc/base-classes/block-component.md).

You can create many other interactive components using this framework, such as flash cards and other types of forms. Best of all, you can publish your custom components to npm so that other developers can use your component.

You may also create custom plugins, as we already seen an example in [Custom Sync Plugin](guides/custom-plugins.md)

## You Have Full Control

You have full control to the library. Make a change to any model, and the view component will sync by itself for you. This is also the case for custom components, as the automatic re-render mechanism is built-in.

For example, this is the multiple choice component that we created in this [quick start guide](quick-start/display-component.md).

<div id="multiple-choice-example"></div>

To demonstrate the flexibility, we will create several buttons here to modify the multiple choice model:

<button id="btn-select-first">Select the first option</button>
<button id="btn-mark-correct">Mark the question correct</button>
<button id="btn-mark-incorrect">Mark the question wrong</button>
<button id="btn-allow-multiselect">Allow multiple select</button>
<button id="btn-disable-multiselect">Disable multiple select</button>
<button id="btn-allow-empty">Allow empty response</button>

```html
<button id="btn-select-first">Select the first option</button>
<button id="btn-mark-correct">Mark the question correct</button>
<button id="btn-mark-incorrect">Mark the question wrong</button>
<button id="btn-allow-multiselect">Allow multiple select</button>
<button id="btn-disable-multiselect">Disable multiple select</button>
<button id="btn-allow-empty">Allow empty response</button>
```

```javascript
const selectFirstBtn = document.getElementById("btn-select-first");
const markCorrectBtn = document.getElementById("btn-mark-correct");
const markIncorrectBtn = document.getElementById("btn-mark-incorrect");
const allowMultiselectBtn = document.getElementById("btn-allow-multiselect");
const disableMultiselectBtn = document.getElementById(
  "btn-disable-multiselect"
);
const allowEmptyBtn = document.getElementById("btn-allow-empty");

selectFirstBtn.addEventListener("click", () => {
  mc.set({ userSelections: ["option-1"] });
});

markCorrectBtn.addEventListener("click", () => {
  mc.set({ questionStatus: "correct" });
});

markIncorrectBtn.addEventListener("click", () => {
  mc.set({ questionStatus: "warning" });
});

allowMultiselectBtn.addEventListener("click", () => {
  mc.set({ allowMultipleSelect: true });
});

disableMultiselectBtn.addEventListener("click", () => {
  mc.set({
    allowMultipleSelect: false,
    userSelections: [],
  });
});

allowEmptyBtn.addEventListener("click", () => {
  mc.set({ allowEmptyResponse: true });
});
```

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
      ],
    });
    
    const mcComponent = new MultipleChoiceComponent(div, mc);
    mcComponent.render();
    
    const selectFirstBtn = document.getElementById("btn-select-first");
    const markCorrectBtn = document.getElementById("btn-mark-correct");
    const markIncorrectBtn = document.getElementById("btn-mark-incorrect");
    const allowMultiselectBtn = document.getElementById("btn-allow-multiselect");
    const disableMultiselectBtn = document.getElementById(
      "btn-disable-multiselect"
    );
    const allowEmptyBtn = document.getElementById("btn-allow-empty");
    
    selectFirstBtn.addEventListener("click", () => {
      mc.set({ userSelections: ["option-1"] });
    });
    
    markCorrectBtn.addEventListener("click", () => {
      mc.set({ questionStatus: "correct" });
    });
    
    markIncorrectBtn.addEventListener("click", () => {
      mc.set({ questionStatus: "warning" });
    });
    
    allowMultiselectBtn.addEventListener("click", () => {
      mc.set({ allowMultipleSelect: true });
    });
    
    disableMultiselectBtn.addEventListener("click", () => {
      mc.set({
        allowMultipleSelect: false,
        userSelections: [],
      });
    });
    
    allowEmptyBtn.addEventListener("click", () => {
      mc.set({ allowEmptyResponse: true });
    });
</script>
