const {
  MultipleChoice,
  MultipleChoiceComponent,
  FillBlanks,
  FillBlanksComponent,
  StoragePersistence,
  Persistence,
  PointsPanel,
  PointsPanelComponent,
  PointsLabelComponent,
  PointsListComponent,
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
  console.log(marksToAssign);
  return marksToAssign;
};
const mc2 = new MultipleChoice({
  id: "mc-2",
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
new MultipleChoiceComponent(mc2Div, mc2).render();

mc1.get("options");

const questionCollection = new Collection([mc1, fb1, mc2]);

const panel = new PointsPanel({
  id: "hello",
  questionCollection: [mc1, fb1, mc2],
  questionLinks: [
    "https://google.com",
    "https://google.com",
    "https://google.com",
  ],
});

const pointsPanelComponent = new PointsPanelComponent(
  document.querySelector("#panel"),
  panel
);
pointsPanelComponent.settings = {
  listTitle: "Hello World",
  showSuccessColor: false,
};
pointsPanelComponent.render();

new PointsListComponent(document.querySelector("#points"), panel).render();
