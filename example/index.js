const root = document.getElementById("root");

const { MultipleChoice, MultipleChoiceComponent } = Blocks;

const mc1 = new MultipleChoice({
  question: "What is the answer to the world, the universe, and everything?",
  options: ["42", "43", "44", "45"],
  answerId: 0,
});

const mc1View = new MultipleChoiceComponent(root, mc1);
mc1View.render();
