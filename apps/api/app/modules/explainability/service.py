import os

import pandas as pd
import torch
from sqlalchemy.orm import Session

from app.modules.graphs.repository import (
    GraphRepository,
)
from app.modules.training.dataset import (
    GraphDatasetBuilder,
)
from app.modules.training.models.factory import (
    ModelFactory,
)
from app.modules.training.repository import (
    TrainingRepository,
)

from app.modules.explainability.explainer import (
    GraphExplainer,
)
from app.modules.datasets.model import Dataset
from app.modules.explainability.model import ExplanationRun


class ExplainabilityService:

    def __init__(
        self,
        db: Session,
    ):

        self.db = db

        self.graph_repository = (
            GraphRepository(db)
        )

        self.training_repository = (
            TrainingRepository(db)
        )

    # ------------------------------------------
    # Load Dataset
    # ------------------------------------------

    def load_dataset(
        self,
        dataset,
    ):

        path = os.path.join(
            "storage",
            "datasets",
            dataset.stored_name,
        )

        extension = (
            dataset.extension.lower()
        )

        if extension == "csv":

            return pd.read_csv(path)

        if extension in [
            "xlsx",
            "xls",
        ]:

            return pd.read_excel(path)

        if extension == "json":

            return pd.read_json(path)

        raise ValueError(
            "Unsupported dataset."
        )

    # ------------------------------------------
    # Build Dataset
    # ------------------------------------------

    def build_dataset(
        self,
        graph_path,
        dataframe,
        node_column,
        target_column,
    ):

        builder = GraphDatasetBuilder()

        return builder.build(

            graph_path=graph_path,

            dataframe=dataframe,

            node_column=node_column,

            target_column=target_column,

        )
    
        # ------------------------------------------
    # Explain Prediction
    # ------------------------------------------

    def explain_prediction(
        self,
        training_run_id,
        graph_id,
        node_column: str,
        target_column: str,
        node_index: int,
    ):

        # --------------------------------------
        # Load Training Run
        # --------------------------------------

        training_run = (
            self.training_repository.get_by_id(
                training_run_id
            )
        )

        if training_run is None:

            raise ValueError(
                "Training run not found."
            )

        # --------------------------------------
        # Load Graph
        # --------------------------------------

        graph = (
            self.graph_repository.get_by_id(
                graph_id
            )
        )

        if graph is None:

            raise ValueError(
                "Graph not found."
            )

        dataset = (
            self.db.query(Dataset)
            .filter(Dataset.id == graph.dataset_id)
            .first()
        )

        if dataset is None:

            raise ValueError(
                "Dataset not found."
            )

        dataframe = self.load_dataset(
            dataset
        )

        graph_path = os.path.join(

            "storage",

            "graphs",

            graph.graph_file,

        )

        data = self.build_dataset(

            graph_path=graph_path,

            dataframe=dataframe,

            node_column=node_column,

            target_column=target_column,

        )

        # --------------------------------------
        # Load Checkpoint
        # --------------------------------------

        checkpoint_path = os.path.join(

            "storage",

            "models",

            training_run.checkpoint,

        )

        if not os.path.exists(
            checkpoint_path
        ):

            raise FileNotFoundError(
                "Checkpoint not found."
            )

        checkpoint = torch.load(

            checkpoint_path,

            map_location="cpu",

        )

        # --------------------------------------
        # Create Model
        # --------------------------------------

        model = ModelFactory.create(

            model_name=training_run.model_name,

            input_dim=data.num_node_features,

            hidden_dim=checkpoint[
                "hidden_dim"
            ],

            output_dim=checkpoint[
                "output_dim"
            ],

        )

        model.load_state_dict(

            checkpoint[
                "model_state_dict"
            ]

        )

        model.eval()

        # --------------------------------------
        # Create Explainer
        # --------------------------------------

        explainer = GraphExplainer(
            model
        )

        explanation = explainer.explain(

            data.x,

            data.edge_index,

            node_index,

        )

                # --------------------------------------
        # Extract Importance Scores
        # --------------------------------------

        feature_importance = []

        if explanation.node_mask is not None:

            scores = (
                explanation.node_mask
                .mean(dim=0)
                .cpu()
                .tolist()
            )

            feature_importance = [

                {
                    "feature_index": i,
                    "importance": float(score),
                }

                for i, score in enumerate(scores)

            ]

            feature_importance.sort(

                key=lambda x: x["importance"],

                reverse=True,

            )

        edge_importance = []

        if explanation.edge_mask is not None:

            edge_scores = (
                explanation.edge_mask
                .cpu()
                .tolist()
            )

            edge_index = (
                data.edge_index
                .t()
                .cpu()
                .tolist()
            )

            for edge, score in zip(
                edge_index,
                edge_scores,
            ):

                edge_importance.append(

                    {

                        "source": int(edge[0]),

                        "target": int(edge[1]),

                        "importance": float(score),

                    }

                )

            edge_importance.sort(

                key=lambda x: x["importance"],

                reverse=True,

            )

        # --------------------------------------
        # Prediction
        # --------------------------------------

        with torch.no_grad():

            logits = model(

                data.x,

                data.edge_index,

            )

            probabilities = torch.softmax(

                logits,

                dim=1,

            )

            prediction = int(

                probabilities[node_index]

                .argmax()

                .item()

            )

            confidence = float(

                probabilities[node_index]

                .max()

                .item()

            )

        # --------------------------------------
        # Response
        # --------------------------------------

        result = {

            "graph_id": str(graph.id),

            "training_run_id": str(
                training_run.id
            ),

            "model": training_run.model_name,

            "node_index": node_index,

            "prediction": prediction,

            "confidence": confidence,

            "feature_importance":
                feature_importance,

            "edge_importance":
                edge_importance,

        }

        run = ExplanationRun(
            graph_id=graph.id,
            training_run_id=training_run.id,
            model=training_run.model_name,
            node_index=node_index,
            prediction=prediction,
            confidence=confidence,
            feature_importance=feature_importance,
            edge_importance=edge_importance,
        )
        # Explanation delivery must not fail just because the optional
        # history table has not been migrated yet.
        try:
            self.db.add(run)
            self.db.commit()
        except Exception:
            self.db.rollback()

        return result

    def get_history(self, graph_id):
        runs = (
            self.db.query(ExplanationRun)
            .filter(ExplanationRun.graph_id == graph_id)
            .order_by(ExplanationRun.created_at.desc())
            .all()
        )
        return [
            {
                "id": str(run.id),
                "graph_id": str(run.graph_id),
                "training_run_id": str(run.training_run_id),
                "model": run.model,
                "node_index": run.node_index,
                "prediction": run.prediction,
                "confidence": run.confidence,
                "feature_importance": run.feature_importance,
                "edge_importance": run.edge_importance,
                "created_at": run.created_at.isoformat(),
            }
            for run in runs
        ]
