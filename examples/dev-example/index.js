const {
  MultipleChoice,
  MultipleChoiceComponent,
  FillBlanks,
  FillBlanksComponent,
  StoragePersistence,
  Persistence,
  PointsPanel,
  PointsPanelComponent,
  PointsLabel,
  QuestionList,
} = Blocks;

const mc1Div = document.getElementById("mc1");

let mc1;

const options = MultipleChoice.parseOptions(
  ["useCSC309", "useUofT", "useEffect", "useComponent"],
  [2]
);
mc1 = new MultipleChoice(
  {
    id: "multiple-choice-react",
    question: "Which of the following is a valid hook in React?",
    options,
    hint: "<b>Hint:</b> React hooks has nothing to do with UofT.",
    isShowingHint: true,
  },
  sessionStorage
);

try {
  mc1.read("mc");
} catch (error) {}

new MultipleChoiceComponent(mc1Div, mc1).render();

const fb1Div = document.getElementById("fb1");

const fb1 = new FillBlanks({
  id: "fill-blanks",
  question:
    "What is the ultimate answer to the world, the universe, and everything?",
  acceptableAnswers: ["forty two"],
  hintNumChars: true,
  caseSensitive: true,
});

new FillBlanksComponent(fb1Div, fb1).render();

const mc2Div = document.getElementById("mc2");

const mc2 = new MultipleChoice({
  id: "mc-2",
  question:
    "Some random question here, I can't think of any right now. This is just a test!",
  options: MultipleChoice.parseOptions(["Hi", "There", "Good", "Job"], [1]),
});

new MultipleChoiceComponent(mc2Div, mc2).render();

const panel = new PointsPanel({ questions: [mc1, fb1, mc2] });
new PointsPanelComponent(document.querySelector("#panel"), panel).render();

new QuestionList(document.querySelector("#points"), panel).render();

setTimeout(() => {
  console.log("Time out");
  panel.set({ questions: [mc1] });
}, 5 * 1000);
