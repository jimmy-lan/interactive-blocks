# Interactive Blocks

## Setup

Build project:

```
npm run build
```

Run in development mode:

```
npm run dev
```

<div id="test-mc"></div>
<button>Hi</button>
<script>
  const { MultipleChoice, MultipleChoiceComponent } = Blocks;
  const div = document.getElementById("test-mc");
  const mc = new MultipleChoice({
    id: "mc1",
    question: "A test multiple choice question.",
    options: MultipleChoice.parseOptions(["Hi", "There", "Good!!!"], [0])
  });
  new MultipleChoiceComponent(div, mc).render();
</script>
    
Project files output to folder `dist/`.
