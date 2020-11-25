const root = document.getElementById("root");

const { MultipleChoice, MultipleChoiceComponent } = Blocks;

const options = MultipleChoice.parseOptions(["42", "43", "44", "45"], [0, 1]);
console.log(options);

const mc1 = new MultipleChoice({
  id: "1",
  question:
    "Cloud Monitoring collects metrics, events, and metadata from Google Cloud, Amazon Web Services, hosted uptime probes, application instrumentation, and a variety of common application components including Cassandra, Nginx, Apache Web Server, Elasticsearch, and many others.",
  options,
});

const mc1View = new MultipleChoiceComponent(root, mc1);
mc1View.render();
