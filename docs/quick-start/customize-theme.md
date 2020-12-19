# Customize Theme

You can override the default styles included in InteractiveBlocks.js.
In this page, we will talk about several theme configurations that you might find helpful.

## Updating Colours

Below is a multiple choice component which we mounted in the previous articles.
Except now, we change the primary colour to a pinkish one, the success colour to teal, and warning colour to amber.

<!-- tabs:start -->

#### **CSS**

```css
:root {
  --primary-color: #d81b60;
  --success-color: #00796b;
  --warning-color: #ffc107;
}
```

#### **HTML**

```html
<div id="multiple-choice-example"></div>
```

#### **JS**

```javascript
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
```

<!-- tabs:end -->

<style>
    :root {
        --primary-color: #d81b60;
        --success-color: #00796b;
        --warning-color: #ffc107;
    }
</style>

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

OK, I agree that this might not be the best colouring (lol).

## More Customizations

You can also change other properties, such as font family, container colours, etc. For more information, please refer to [this documentation].