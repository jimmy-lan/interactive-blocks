const mcRoot = document.getElementById("mc-root");

const {
  MultipleChoice,
  MultipleChoiceComponent,
  FillBlanks,
  FillBlanksComponent,
} = window.Blocks;

const options = MultipleChoice.parseOptions(["42", "43", "44", "45"], [0, 1]);

const mc1 = MultipleChoice.fromStorage("mc241234");

mc1.on("change", () => {
  mc1.save("mc1");
});

const mc1View = new MultipleChoiceComponent(mcRoot, mc1);
mc1View.render();

// const tfRoot = document.getElementById("tf-root");
//
// const tfOptions = MultipleChoice.parseOptions(["True", "False"], [0]);
//
// const tf1 = new MultipleChoice({
//   id: "2",
//   question: "Jimmy's favourite pet is cat.",
//   options: tfOptions,
//   disableMultipleAttempts: true,
// });
//
// const tf1View = new MultipleChoiceComponent(tfRoot, tf1);
// tf1View.render();
//
// const fbRoot = document.getElementById("fb-root");
//
// const fb1 = new FillBlanks({
//   id: "3",
//   question: "What is the answer to the world, universe, and everything?",
//   acceptableAnswers: ["forty two"],
//   disableMultipleAttempts: true,
//   hintNumChars: true,
// });
//
// const fb1View = new FillBlanksComponent(fbRoot, fb1);
// fb1View.render();
