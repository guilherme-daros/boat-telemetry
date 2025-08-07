function updateGraph(graph, data) {
  graph.data.labels.push(0);
  graph.data.datasets[0].data.push(data);
  if (graph.data.datasets[0].data.length > 100) {
    graph.data.datasets[0].data.shift();
    graph.data.labels.shift();
  }
  graph.update();
}
