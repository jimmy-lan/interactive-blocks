const {
  MultipleChoice,
  MultipleChoiceComponent,
  FillBlanks,
  FillBlanksComponent,
  StoragePersistence,
  Persistence,
} = Blocks;

const div = document.getElementById("root");

// let mc;
//
// const options = MultipleChoice.parseOptions(
//   ["useCSC309", "useUofT", "useEffect", "useComponent"],
//   [2]
// );
// mc = new MultipleChoice(
//   {
//     id: "multiple-choice-react",
//     question: "Which of the following is a valid hook in React?",
//     options,
//     hint: "<b>Hint:</b> React hooks has nothing to do with UofT.",
//     isShowingHint: true,
//   },
//   sessionStorage
// );
//
// try {
//   mc.read("mc");
// } catch (error) {}
//
// new MultipleChoiceComponent(div, mc).render();
//
// mc.on("change", () => {
//   mc.save("mc");
// });

const fb = new FillBlanks({
  id: "fill-blanks",
  question:
    "What is the ultimate answer to the world, the universe, and everything?",
  acceptableAnswers: ["forty two"],
  hintNumChars: true,
  caseSensitive: true,
});

new FillBlanksComponent(div, fb).render();

fb.on("change", () => {
  fb.save("fb");
});
