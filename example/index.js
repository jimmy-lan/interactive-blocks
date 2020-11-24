const root = document.getElementById("root");

const { MultipleChoice, MultipleChoiceComponent } = Blocks;

const mc1 = new MultipleChoice({
  question:
    "Cloud Monitoring collects metrics, events, and metadata from Google Cloud, Amazon Web Services, hosted uptime probes, application instrumentation, and a variety of common application components including Cassandra, Nginx, Apache Web Server, Elasticsearch, and many others.",
  options: ["42", "43", "44", "45"],
  answerId: [0],
});

const mc1View = new MultipleChoiceComponent(root, mc1);
mc1View.render();
