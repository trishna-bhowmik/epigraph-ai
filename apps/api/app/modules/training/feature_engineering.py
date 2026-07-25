import networkx as nx
import pandas as pd
import torch
from sklearn.preprocessing import MinMaxScaler


class FeatureEngineer:

    def build_features(
        self,
        graph: nx.Graph,
        dataframe: pd.DataFrame,
        node_column: str,
    ):
        nodes = list(graph.nodes())

        df = dataframe.copy()
        df = df.set_index(node_column)

        degree = dict(graph.degree())
        pagerank = nx.pagerank(graph)
        clustering = nx.clustering(graph)
        betweenness = nx.betweenness_centrality(graph)
        closeness = nx.closeness_centrality(graph)

        try:
            eigenvector = nx.eigenvector_centrality(
                graph,
                max_iter=1000,
            )
        except Exception:
            eigenvector = {
                node: 0
                for node in nodes
            }

        # Get numeric columns only once
        numeric_columns = df.select_dtypes(include="number").columns
        num_numeric = len(numeric_columns)

        features = []

        for node in nodes:

            row = [
                degree.get(node, 0),
                pagerank.get(node, 0),
                clustering.get(node, 0),
                betweenness.get(node, 0),
                closeness.get(node, 0),
                eigenvector.get(node, 0),
            ]

            if node in df.index:
                row_data = df.loc[node]

                if isinstance(row_data, pd.DataFrame):
                    row_data = row_data.iloc[0]

                row.extend(
                    row_data[numeric_columns].astype(float).tolist()
                )
            else:
                 # Node has no matching row in the dataframe (e.g. disease node)
                row.extend([0.0] * num_numeric)

            print(f"Node {node}: feature length = {len(row)}")

            features.append(row)

        features = MinMaxScaler().fit_transform(features)

        return torch.tensor(
            features,
            dtype=torch.float,
        )