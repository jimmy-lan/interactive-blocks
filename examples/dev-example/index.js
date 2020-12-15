const {
  MultipleChoice,
  MultipleChoiceComponent,
  FillBlanks,
  FillBlanksComponent,
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

let fb;

try {
  fb = FillBlanks.fromStorage("fb");
} catch (error) {
  fb = new FillBlanks(
    {
      id: "fill-blanks",
      question:
        "What is the ultimate answer to the world, the universe, and everything?",
      acceptableAnswers: ["forty two"],
      hint: "Have you ever heard of the movie?",
      disableMultipleAttempts: true,
      hintNumChars: true,
    },
    sessionStorage
  );
}

new FillBlanksComponent(div, fb).render();

fb.on("change", () => {
  fb.save("fb");
});
