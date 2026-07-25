import os
import uuid
from pathlib import Path

import pandas as pd
from sqlalchemy.orm import Session

from app.modules.datasets.model import Dataset
from app.modules.graphs.model import Graph
from app.modules.graphs.repository import (
    GraphRepository,
)
from app.modules.training.dataset import (
    GraphDatasetBuilder,
)
from app.modules.training.trainer import (
    Trainer,
)
from app.modules.training.training_run import (
    TrainingRun,
)


class TrainingService:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

        self.graph_repository = (
            GraphRepository(db)
        )

    # ---------------------------------------------------
    # Load Dataset
    # ---------------------------------------------------

    def load_dataset(
        self,
        dataset: Dataset,
    ) -> pd.DataFrame:

        BASE_DIR = Path(__file__).resolve().parents[3]

        upload_path = (
            BASE_DIR
            / "storage"
            / "datasets"
            / dataset.stored_name
        )

        print("=" * 60)
        print("BASE_DIR:", BASE_DIR)
        print("UPLOAD PATH:", upload_path)
        print("FILE EXISTS:", upload_path.exists())
        print("=" * 60)

        extension = dataset.extension.lower()

        if extension == "csv":
            return pd.read_csv(upload_path)

        if extension in [
            "xlsx",
            "xls",
        ]:

            return pd.read_json(str(upload_path))

        if extension == "json":

            return pd.read_json(
                upload_path
            )

        raise ValueError(
            f"Unsupported dataset format: {extension}"
        )

    # ---------------------------------------------------
    # Load Graph
    # ---------------------------------------------------

    def load_graph(
        self,
        graph: Graph,
    ) -> str:

        graph_path = os.path.join(
            "storage",
            "graphs",
            graph.graph_file,
        )

        if not os.path.exists(
            graph_path
        ):

            raise FileNotFoundError(
                f"Graph not found: {graph_path}"
            )

        return graph_path

    # ---------------------------------------------------
    # Build PyTorch Dataset
    # ---------------------------------------------------

    def build_graph_dataset(
        self,
        graph_path: str,
        dataframe: pd.DataFrame,
        node_column: str,
        target_column: str,
    ):

        builder = (
            GraphDatasetBuilder()
        )

        return builder.build(
            graph_path=graph_path,
            dataframe=dataframe,
            node_column=node_column,
            target_column=target_column,
        )
    
        # ---------------------------------------------------
    # Train Model
    # ---------------------------------------------------

    def train_model(
        self,
        graph_id,
        node_column: str,
        target_column: str,
        model_name: str = "GCN",
        hidden_dim: int = 64,
        learning_rate: float = 0.001,
        epochs: int = 200,
    ):

        graph = self.graph_repository.get_by_id(
            graph_id
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

        print("\nLoading dataset...")

        dataframe = self.load_dataset(
            dataset
        )

        print("Dataset loaded successfully.")

        print("\nLoading graph...")

        graph_path = self.load_graph(
            graph
        )

        print("Graph loaded successfully.")

        print("\nBuilding graph dataset...")

        data = self.build_graph_dataset(
            graph_path=graph_path,
            dataframe=dataframe,
            node_column=node_column,
            target_column=target_column,
        )

        print("Graph dataset created.")

        checkpoint_name = (
            f"{uuid.uuid4()}.pt"
        )

        trainer = Trainer(
            data=data,
            model_name=model_name,
            hidden_dim=hidden_dim,
            learning_rate=learning_rate,
            epochs=epochs,
        )

        print("\nTraining model...")

        training_result = trainer.train(
            checkpoint_path=checkpoint_name,
        )

        history = training_result[
            "history"
        ]

        metrics = training_result[
            "metrics"
        ]

        training_time = training_result[
            "training_time"
        ]

        hidden_dimension = training_result[
            "hidden_dim"
        ]

        output_dimension = training_result[
            "output_dim"
        ]

        print("\nTraining finished successfully.")

        training_run = TrainingRun(

            graph_id=graph.id,

            model_name=model_name,

            epochs=epochs,

            learning_rate=learning_rate,

            accuracy=metrics["accuracy"],

            precision=metrics["precision"],

            recall=metrics["recall"],

            f1=metrics["f1"],

            loss=history[-1]["loss"],

            training_time=training_time,

            checkpoint=checkpoint_name,

            hidden_dim=hidden_dimension,

            output_dim=output_dimension,

            history=history,

        )

        self.db.add(
            training_run
        )

        self.db.commit()

        self.db.refresh(
            training_run
        )

        return self.build_training_response(
            training_run=training_run,
            history=history,
            metrics=metrics,
        )

            # ---------------------------------------------------
    # Get Training Run
    # ---------------------------------------------------

    def get_training_run(
        self,
        run_id,
    ):

        run = (
            self.db.query(
                TrainingRun
            )
            .filter(
                TrainingRun.id == run_id
            )
            .first()
        )

        if run is None:

            raise ValueError(
                "Training run not found."
            )

        return {
            "training_run": run,
            "history": run.history or [],
            "metrics": {
            "accuracy": run.accuracy,
            "precision": run.precision,
            "recall": run.recall,
            "f1": run.f1,
            "loss": run.loss,
            },
        }

    # ---------------------------------------------------
    # Get All Training Runs
    # ---------------------------------------------------

    def get_graph_training_runs(
        self,
        graph_id,
    ):

        return (
            self.db.query(
                TrainingRun
            )
            .filter(
                TrainingRun.graph_id
                == graph_id
            )
            .order_by(
                TrainingRun.created_at.desc()
            )
            .all()
        )

    # ---------------------------------------------------
    # Delete Training Run
    # ---------------------------------------------------

    def delete_training_run(
        self,
        run_id,
    ):

        run = self.get_training_run(
            run_id
        )

        if run.checkpoint:

            checkpoint_path = os.path.join(
                "storage",
                "models",
                run.checkpoint,
            )

            if os.path.exists(
                checkpoint_path
            ):

                os.remove(
                    checkpoint_path
                )

        self.db.delete(run)

        self.db.commit()

        return {

            "message":
            "Training run deleted successfully."

        }

    # ---------------------------------------------------
    # Training Summary
    # ---------------------------------------------------

    def training_summary(
        self,
        graph_id,
    ):

        runs = self.get_graph_training_runs(
            graph_id
        )

        if len(runs) == 0:

            return {

                "total_runs": 0,

                "best_accuracy": 0,

                "best_model": None,

            }

        best_run = max(
            runs,
            key=lambda x: x.accuracy,
        )

        return {

            "total_runs": len(runs),

            "best_accuracy": best_run.accuracy,

            "best_model": best_run.model_name,

            "latest_training": runs[0].created_at,

        }

    # ---------------------------------------------------
    # Response Builder
    # ---------------------------------------------------

    def build_training_response(
        self,
        training_run,
        history,
        metrics,
    ):

        return {

            "training_run": {

                "id": str(
                    training_run.id
                ),

                "graph_id": str(
                    training_run.graph_id
                ),

                "model_name":
                training_run.model_name,

                "epochs":
                training_run.epochs,

                "learning_rate":
                training_run.learning_rate,

                "accuracy":
                training_run.accuracy,

                "precision":
                training_run.precision,

                "recall":
                training_run.recall,

                "f1":
                training_run.f1,

                "loss":
                training_run.loss,

                "training_time":
                training_run.training_time,

                "checkpoint":
                training_run.checkpoint,

                "created_at":
                training_run.created_at,

            },

            "history": history,

            "metrics": metrics,

        }