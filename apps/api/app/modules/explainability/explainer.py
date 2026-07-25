import torch
from torch_geometric.explain import (
    Explainer,
    GNNExplainer,
    ModelConfig,
)


class GraphExplainer:

    def __init__(
        self,
        model,
    ):

        self.model = model

        self.explainer = Explainer(

            model=model,

            algorithm=GNNExplainer(
                epochs=200,
            ),

            explanation_type="model",

            node_mask_type="attributes",

            edge_mask_type="object",

            model_config=ModelConfig(

                mode="multiclass_classification",

                task_level="node",

                return_type="raw",

            ),

        )

    # --------------------------------------
    # Explain One Node
    # --------------------------------------

    def explain(
        self,
        x,
        edge_index,
        node_index: int,
    ):

        explanation = self.explainer(

            x,

            edge_index,

            index=node_index,

        )

        return explanation