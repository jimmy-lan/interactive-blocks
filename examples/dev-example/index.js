const {
  MultipleChoice,
  MultipleChoiceComponent,
  FillBlanks,
  FillBlanksComponent,
} = Blocks;

const div = document.getElementById("root");

// const options = MultipleChoice.parseOptions(
//   ["useCSC309", "useUofT", "useEffect", "useComponent"],
//   [2]
// );
// const mc = new MultipleChoice({
//   id: "multiple-choice-react",
//   question: "Which of the following is a valid hook in React?",
//   options,
//   hint: "<b>Hint:</b> React hooks has nothing to do with UofT.",
//   isShowingHint: true,
// });
//
// new MultipleChoiceComponent(div, mc).render();

const fb = new FillBlanks({
  id: "fill-blanks",
  question:
    "What is the ultimate answer to the world, the universe, and everything?",
  acceptableAnswers: ["forty two"],
  hint: "Have you ever heard of the movie?",
  isShowingHint: false,
});

new FillBlanksComponent(div, fb).render();
