from app.modules.training.dataset import GraphDatasetBuilder

builder = GraphDatasetBuilder()

G = builder.load_graph(
    "storage/graphs/your_graph.gpickle"
)

data = builder.to_pyg_data(G)

print(data)