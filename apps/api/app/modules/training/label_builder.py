import torch
from sklearn.preprocessing import LabelEncoder
import pandas as pd


class LabelBuilder:

    def build(
        self,
        dataframe,
        node_column,
        target_column,
        graph,
    ):

        encoder = LabelEncoder()

        dataframe = dataframe.copy()
        dataframe = dataframe.set_index(node_column)

        dataframe[target_column] = encoder.fit_transform(
            dataframe[target_column]
        )

        labels = []

        default_label = 0

        for node in graph.nodes():

            if node in dataframe.index:

                row = dataframe.loc[node]

                if isinstance(row, pd.DataFrame):
                    row = row.iloc[0]

                labels.append(
                    int(row[target_column])
                )

            else:
                # Disease node (or any node not present in dataset)
                labels.append(default_label)

        return torch.tensor(
            labels,
            dtype=torch.long,
        )