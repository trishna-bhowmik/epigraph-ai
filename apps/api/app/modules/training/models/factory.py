from app.modules.training.models import (
    GAT,
    GCN,
    GraphSAGE,
)


class ModelFactory:

    @staticmethod
    def create(
        model_name: str,
        input_dim: int,
        hidden_dim: int,
        output_dim: int,
    ):

        model_name = model_name.lower()

        if model_name == "gcn":
            return GCN(
                input_dim=input_dim,
                hidden_dim=hidden_dim,
                output_dim=output_dim,
            )

        if model_name == "graphsage":
            return GraphSAGE(
                input_dim=input_dim,
                hidden_dim=hidden_dim,
                output_dim=output_dim,
            )

        if model_name == "gat":
            return GAT(
                input_dim=input_dim,
                hidden_dim=hidden_dim,
                output_dim=output_dim,
            )

        raise ValueError(
            f"Unsupported model: {model_name}"
        )