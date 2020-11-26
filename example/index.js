const mcRoot = document.getElementById("mc-root");

const {
  MultipleChoice,
  MultipleChoiceComponent,
  FillBlanks,
  FillBlanksComponent,
} = window.Blocks;

const options = MultipleChoice.parseOptions(["42", "43", "44", "45"], [0, 1]);

const mc1 = new MultipleChoice({
  id: "1",
  question:
    "Cloud Monitoring collects metrics, events, and metadata from Google Cloud, Amazon Web Services, hosted uptime probes, application instrumentation, and a variety of common application components including Cassandra, Nginx, Apache Web Server, Elasticsearch, and many others.",
  options,
});

const mc1View = new MultipleChoiceComponent(mcRoot, mc1);
mc1View.render();

const tfRoot = document.getElementById("tf-root");

const tfOptions = MultipleChoice.parseOptions(["True", "False"], [0]);

const tf1 = new MultipleChoice({
  id: "2",
  question: "Jimmy's favourite pet is cat.",
  options: tfOptions,
  disableMultipleAttempts: true,
});

const tf1View = new MultipleChoiceComponent(tfRoot, tf1);
tf1View.render();

tf1.get();

const fbRoot = document.getElementById("fb-root");

const fb1 = new FillBlanks({
  id: "3",
  question: "What is the answer to the world, universe, and everything?",
  acceptableAnswers: ["hello world"],
});

const fb1View = new FillBlanksComponent(fbRoot, fb1);
fb1View.render();
