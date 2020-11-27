const multipleChoiceDiv = document.getElementById("mc1");

// multiple choice

const { MultipleChoice, MultipleChoiceComponent } = Blocks;

const mc = new MultipleChoice({
  id: "1",
  question: "Which of the following files are provided by Interactive Blocks?",
  options: [
    { id: "1", text: "interactive.js" },
    { id: "2", text: "interactive-blocks.js", isAnswer: true },
    { id: "3", text: "interactive-blocks.min.js", isAnswer: true },
    { id: "4", text: "interactive-blocks.js.map", isAnswer: true },
  ],
});

const mcComponent = new MultipleChoiceComponent(multipleChoiceDiv, mc);
mcComponent.render();

// true or false

const trueOrFalseDiv = document.getElementById("tf1");
const tfOptions = MultipleChoice.parseOptions(["True", "False"], [0]);

const tf = new MultipleChoice({
  id: "2",
  question: "Interactive Blocks is a front-end javascript library.",
  options: tfOptions,
});

const tfComponent = new MultipleChoiceComponent(trueOrFalseDiv, tf);
tfComponent.render();

// fill in the blanks

const fillInTheBlanksDiv = document.getElementById("fb1");

const { FillBlanks, FillBlanksComponent } = Blocks;

const fb = new FillBlanks({
  id: "3",
  question:
    "What is the ultimate answer to the world, " +
    "the universe, and everything? (Hint: forty two)",
  acceptableAnswers: ["forty two"],
  hintNumChars: true,
  disableMultipleAttempts: true,
});

const fbComponent = new FillBlanksComponent(fillInTheBlanksDiv, fb);
fbComponent.render();

const fillInTheBlanksNoHintDiv = document.getElementById("fb2");

const fb2 = new FillBlanks({
  id: "4",
  question:
    "What is the ultimate answer to the world, " +
    "the universe, and everything? (Hint: forty two)",
  acceptableAnswers: ["forty two", "42"],
});

const fbComponentNoHint = new FillBlanksComponent(
  fillInTheBlanksNoHintDiv,
  fb2
);
fbComponentNoHint.render();
