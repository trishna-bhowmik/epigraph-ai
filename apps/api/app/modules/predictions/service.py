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
from app.modules.datasets.model import Dataset
from app.modules.predictions.model import (
    PredictionRun,
    PredictionItem,
)

from app.modules.predictions.repository import (
    PredictionRepository,
)




class PredictionService:

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

        self.prediction_repository = PredictionRepository(db)

    # ------------------------------------------
    # Load Dataset
    # ------------------------------------------

    def load_dataset(
        self,
        dataset,
    ) -> pd.DataFrame:

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
    # Build Graph Dataset
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
    # Predict
    # ------------------------------------------

    def predict(
        self,
        training_run_id,
        graph_id,
        node_column: str,
        target_column: str,
    ):

        # -----------------------------
        # Load Training Run
        # -----------------------------

        training_run = (
            self.training_repository.get_by_id(
                training_run_id
            )
        )

        if training_run is None:

            raise ValueError(
                "Training run not found."
            )

        # -----------------------------
        # Load Graph
        # -----------------------------

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

        # -----------------------------
        # Load Checkpoint
        # -----------------------------

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

        # -----------------------------
        # Create Model
        # -----------------------------

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

        # -----------------------------
        # Forward Pass
        # -----------------------------

        with torch.no_grad():

            logits = model(

                data.x,

                data.edge_index,

            )

            probabilities = (
                torch.softmax(
                    logits,
                    dim=1,
                )
            )

            prediction = (
                probabilities.argmax(
                    dim=1
                )
            )

                    # -----------------------------
        # Build Predictions
        # -----------------------------

        prediction_list = []

        for index in range(data.num_nodes):

            confidence = float(
                probabilities[index].max().item()
            )

            predicted_class = int(
                prediction[index].item()
            )

            prediction_list.append(

                {

                    "node_index": index,

                    "predicted_class": predicted_class,

                    "confidence": confidence,

                    "probabilities": probabilities[
                        index
                    ]
                    .cpu()
                    .tolist(),

                }

            )

        # -----------------------------
        # Statistics
        # -----------------------------

        average_confidence = (
            sum(
                item["confidence"]
                for item in prediction_list
            )
            / len(prediction_list)
        )

        class_distribution = {}

        for item in prediction_list:

            cls = item[
                "predicted_class"
            ]

            class_distribution[cls] = (
                class_distribution.get(
                    cls,
                    0,
                )
                + 1
            )

        prediction_run = PredictionRun(

            graph_id=graph.id,

            training_run_id=training_run.id,

            total_nodes=data.num_nodes,
  
            average_confidence=average_confidence,

        )

        prediction_run = (
            self.prediction_repository
            .create_prediction_run(
                prediction_run
            )
        )    


        prediction_items = []

        for item in prediction_list:

            prediction_items.append(

            PredictionItem(

                prediction_run_id=prediction_run.id,

                node_index=item["node_index"],

                predicted_class=item["predicted_class"],

                confidence=item["confidence"],

            )

        )

        self.prediction_repository.save_prediction_items(
            prediction_items
        )

        # -----------------------------
        # Response
        # -----------------------------

        return {

            "prediction_run_id": str(
                prediction_run.id
            ),

            "graph_id": str(graph.id),

            "training_run_id": str(
                training_run.id
            ),

            "model": training_run.model_name,

            "total_nodes": data.num_nodes,

            "average_confidence":
                average_confidence,

            "class_distribution":
                class_distribution,

            "predictions":
                prediction_list,    

        }

    # ------------------------------------------
    # Latest Model Prediction
    # ------------------------------------------

    def predict_latest(
        self,
        graph_id,
        node_column: str,
        target_column: str,
    ):

        latest_run = (
            self.training_repository.get_latest(
                graph_id
            )
        )

        if latest_run is None:

            raise ValueError(
                "No trained model available."
            )

        return self.predict(

            training_run_id=latest_run.id,

            graph_id=graph_id,

            node_column=node_column,

            target_column=target_column,

        )

    # ------------------------------------------
# Prediction History
# ------------------------------------------

    def get_prediction_history(
        self,
        graph_id,
    ):

        return (
            self.prediction_repository
            .get_prediction_history(
                graph_id
            )
        )


    # ------------------------------------------
# Get Prediction Run
# ------------------------------------------

    def get_prediction_run(
        self,
        prediction_run_id,
    ):

        run = (
            self.prediction_repository
            .get_prediction_run(
                prediction_run_id
            )
        )

        if run is None:

            raise ValueError(
                "Prediction run not found."
            )

        items = (
            self.prediction_repository
            .get_prediction_items(
                prediction_run_id
            )
        )

        predictions = []

        for item in items:

            predictions.append(

                {

                    "node_index": item.node_index,

                    "predicted_class": item.predicted_class,

                    "confidence": item.confidence,


                }

            )

        return {

            "id": run.id,

            "graph_id": run.graph_id,

            "training_run_id": run.training_run_id,

            "total_nodes": run.total_nodes,

            "average_confidence": run.average_confidence,

            "created_at": run.created_at,

            "predictions": predictions,

        }


    # ------------------------------------------
# Delete Prediction Run
# ------------------------------------------

    def delete_prediction_run(
        self,
        prediction_run_id,
    ):

        run = (
            self.prediction_repository
           .get_prediction_run(
                prediction_run_id
            )
        )

        if run is None:

            raise ValueError(
                "Prediction run not found."
            )

        self.prediction_repository.delete_prediction_run(
            run
        )