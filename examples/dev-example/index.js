const { MultipleChoice, MultipleChoiceComponent } = Blocks;

const options = MultipleChoice.parseOptions(
  ["useCSC309", "useUofT", "useEffect", "useComponent"],
  [2]
);
const mc = new MultipleChoice({
  id: "multiple-choice-react",
  question: "Which of the following is a valid hook in React?",
  options,
});

const div = document.getElementById("root");

console.log(div);

new MultipleChoiceComponent(div, mc).render();
