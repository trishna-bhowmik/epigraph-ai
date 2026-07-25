from uuid import UUID

from sqlalchemy.orm import Session

from app.modules.training.training_run import TrainingRun
from app.modules.predictions.model import (
    PredictionRun,
    PredictionItem,
)


class PredictionRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    # -------------------------------------------------
    # Get Training Run
    # -------------------------------------------------

    def get_training_run(
        self,
        training_run_id: UUID,
    ):

        return (
            self.db.query(
                TrainingRun
            )
            .filter(
                TrainingRun.id == training_run_id
            )
            .first()
        )

    # -------------------------------------------------
    # Get Latest Training Run
    # -------------------------------------------------

    def get_latest_training_run(
        self,
        graph_id: UUID,
    ):

        return (
            self.db.query(
                TrainingRun
            )
            .filter(
                TrainingRun.graph_id == graph_id
            )
            .order_by(
                TrainingRun.created_at.desc()
            )
            .first()
        )

    # -------------------------------------------------
    # Get Best Training Run
    # -------------------------------------------------

    def get_best_training_run(
        self,
        graph_id: UUID,
    ):

        return (
            self.db.query(
                TrainingRun
            )
            .filter(
                TrainingRun.graph_id == graph_id
            )
            .order_by(
                TrainingRun.accuracy.desc()
            )
            .first()
        )

    # -------------------------------------------------
    # List Training Runs
    # -------------------------------------------------

    def get_training_runs(
        self,
        graph_id: UUID,
    ):

        return (
            self.db.query(
                TrainingRun
            )
            .filter(
                TrainingRun.graph_id == graph_id
            )
            .order_by(
                TrainingRun.created_at.desc()
            )
            .all()
        )

    # -------------------------------------------------
    # Exists
    # -------------------------------------------------

    def exists(
        self,
        training_run_id: UUID,
    ) -> bool:

        return (
            self.db.query(
                TrainingRun
            )
            .filter(
                TrainingRun.id == training_run_id
            )
            .first()
            is not None
        )

    # -------------------------------------------------
# Create Prediction Run
# -------------------------------------------------

    def create_prediction_run(
        self,
        prediction_run: PredictionRun,
    ):

        self.db.add(prediction_run)

        self.db.commit()

        self.db.refresh(prediction_run)

        return prediction_run

    # -------------------------------------------------
# Save Prediction Items
# -------------------------------------------------

    def save_prediction_items(
        self,
        items: list[PredictionItem],
    ):

        self.db.add_all(items)

        self.db.commit()

    # -------------------------------------------------
# Prediction History
# -------------------------------------------------

    def get_prediction_history(
        self,
        graph_id: UUID,
    ):

        return (
            self.db.query(
                PredictionRun
            )
            .filter(
                PredictionRun.graph_id == graph_id
            )
            .order_by(
                PredictionRun.created_at.desc()
            )
            .all()
        )    

        # -------------------------------------------------
# Get Prediction Run
# -------------------------------------------------

    def get_prediction_run(
        self,
        prediction_run_id: UUID,
    ):

        return (
            self.db.query(
                PredictionRun
            )
            .filter(
                PredictionRun.id == prediction_run_id
            )
            .first()
        )

    # -------------------------------------------------
# Get Prediction Items
# -------------------------------------------------

    def get_prediction_items(
        self,
        prediction_run_id: UUID,
    ):

        return (
            self.db.query(
                PredictionItem
            )
            .filter(
                PredictionItem.prediction_run_id
                == prediction_run_id
            )
            .order_by(
                PredictionItem.node_index
            )
            .all()
        )

    # -------------------------------------------------
# Delete Prediction Run
# -------------------------------------------------

    def delete_prediction_run(
        self,
        prediction_run: PredictionRun,
    ):

        self.db.delete(
            prediction_run
        )

        self.db.commit()