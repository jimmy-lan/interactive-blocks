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
  Collection,
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
    worthPoints: 25,
    options,
    hint: "<b>Hint:</b> React hooks has nothing to do with UofT.",
    isShowingHint: true,
  },
  localStorage
);

// try {
//   mc1.read("mc-key");
// } catch (error) {}
//
// mc1.on("change", () => {
//   mc1.save("mc-key");
// });

new MultipleChoiceComponent(mc1Div, mc1).render();

const fb1Div = document.getElementById("fb1");

const fb1 = new FillBlanks({
  id: "fill-blanks",
  question:
    "What is the ultimate answer to the world, the universe, and everything?",
  worthPoints: 25,
  acceptableAnswers: ["forty two"],
  hintNumChars: true,
});

new FillBlanksComponent(fb1Div, fb1).render();

const mc2Div = document.getElementById("mc2");

const mc2 = new MultipleChoice({
  id: "mc-2",
  question:
    "Some random question here, I can't think of any right now. This is just a test!",
  worthPoints: 25,
  options: MultipleChoice.parseOptions(["Hi", "There", "Good", "Job"]),
  allowMultipleSelect: true,
  checkAnswer: (userSelection) => {
    console.log(userSelection);
    return new Promise((resolve) => {
      setTimeout(() => resolve(userSelection.includes("1")), 3000);
    });
  },
});

const mc2View = new MultipleChoiceComponent(mc2Div, mc2);
mc2View.render();

const questionCollection = new Collection([mc1, fb1, mc2]);

const panel = new PointsPanel({
  id: "hello",
  questionCollection,
});

new PointsPanelComponent(document.querySelector("#panel"), panel).render();

new QuestionList(document.querySelector("#points"), panel).render();
