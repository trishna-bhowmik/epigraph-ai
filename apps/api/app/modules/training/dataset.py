import pickle

import networkx as nx
import pandas as pd
import torch
from torch_geometric.data import Data

from app.modules.training.feature_engineering import FeatureEngineer
from app.modules.training.label_builder import LabelBuilder


class GraphDatasetBuilder:

    def load_graph(
        self,
        graph_path: str,
    ):
        with open(graph_path, "rb") as f:
            return pickle.load(f)

    def build(
        self,
        graph_path: str,
        dataframe: pd.DataFrame,
        node_column: str,
        target_column: str,
    ):
        # -------------------------
        # Load Graph
        # -------------------------

        G: nx.Graph = self.load_graph(
            graph_path
        )

        # -------------------------
        # Node Mapping
        # -------------------------

        nodes = list(G.nodes())

        node_to_index = {
            node: index
            for index, node in enumerate(nodes)
        }

        # -------------------------
        # Edge Index
        # -------------------------

        edge_index = []

        for source, target in G.edges():

            edge_index.append(
                [
                    node_to_index[source],
                    node_to_index[target],
                ]
            )

            edge_index.append(
                [
                    node_to_index[target],
                    node_to_index[source],
                ]
            )

        edge_index = torch.tensor(
            edge_index,
            dtype=torch.long,
        ).t().contiguous()

        # -------------------------
        # Feature Matrix (X)
        # -------------------------
        print("Step 1: Graph loaded")

        engineer = FeatureEngineer()
        print("Step 2: Building features")

        try:
            x = engineer.build_features(
            graph=G,
            dataframe=dataframe,
            node_column=node_column,
        )
        except Exception as e:
            import traceback
            traceback.print_exc()
            raise

        print("Step 3: Features built")

        builder = LabelBuilder()
        print("Step 4: Building labels")

        y = builder.build(
            dataframe=dataframe,
            node_column=node_column,
            target_column=target_column,
            graph=G,
        )

        print("Step 5: Labels built")

        # -------------------------
        # Create Data Object
        # -------------------------

        data = Data(
            x=x,
            edge_index=edge_index,
            y=y,
        )

        # -------------------------
        # Train / Validation / Test
        # -------------------------

        num_nodes = data.num_nodes

        indices = torch.randperm(
            num_nodes
        )

        train_end = int(
            num_nodes * 0.70
        )

        val_end = int(
            num_nodes * 0.85
        )

        train_mask = torch.zeros(
            num_nodes,
            dtype=torch.bool,
        )

        val_mask = torch.zeros(
            num_nodes,
            dtype=torch.bool,
        )

        test_mask = torch.zeros(
            num_nodes,
            dtype=torch.bool,
        )

        train_mask[
            indices[:train_end]
        ] = True

        val_mask[
            indices[
                train_end:val_end
            ]
        ] = True

        test_mask[
            indices[val_end:]
        ] = True

        data.train_mask = train_mask
        data.val_mask = val_mask
        data.test_mask = test_mask

        return data
    
    def build_for_prediction(
        self,
        graph_path: str,
        dataframe: pd.DataFrame,
        node_column: str,
    ):
        """
        Builds a PyTorch Geometric Data object
        without labels (y).

        Used during inference.
        """

        G: nx.Graph = self.load_graph(
            graph_path
        )

        nodes = list(G.nodes())

        node_to_index = {
            node: index
            for index, node in enumerate(nodes)
        }

        edge_index = []

        for source, target in G.edges():

            edge_index.append(
                [
                    node_to_index[source],
                    node_to_index[target],
                ]
            )

            edge_index.append(
                [
                    node_to_index[target],
                    node_to_index[source],
                ]
            )

        edge_index = torch.tensor(
            edge_index,
            dtype=torch.long,
        ).t().contiguous()

        engineer = FeatureEngineer()

        x = engineer.build_features(
            graph=G,
            dataframe=dataframe,
            node_column=node_column,
        )

        data = Data(
            x=x,
            edge_index=edge_index,
        )

        return data, nodes