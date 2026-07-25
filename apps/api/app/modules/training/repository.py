from uuid import UUID

from sqlalchemy.orm import Session

from app.modules.training.training_run import (
    TrainingRun,
)


class TrainingRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    # -------------------------------------------------
    # Create
    # -------------------------------------------------

    def create(
        self,
        training_run: TrainingRun,
    ):

        self.db.add(
            training_run
        )

        self.db.commit()

        self.db.refresh(
            training_run
        )

        return training_run

    # -------------------------------------------------
    # Get By ID
    # -------------------------------------------------

    def get_by_id(
        self,
        run_id: UUID,
    ):

        return (
            self.db.query(
                TrainingRun
            )
            .filter(
                TrainingRun.id == run_id
            )
            .first()
        )

    # -------------------------------------------------
    # Get By Graph
    # -------------------------------------------------

    def get_by_graph(
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
    # Latest Run
    # -------------------------------------------------

    def get_latest(
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
    # Best Model
    # -------------------------------------------------

    def get_best_model(
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
    # Exists
    # -------------------------------------------------

    def exists(
        self,
        run_id: UUID,
    ) -> bool:

        return (
            self.db.query(
                TrainingRun
            )
            .filter(
                TrainingRun.id == run_id
            )
            .first()
            is not None
        )

    # -------------------------------------------------
    # Delete
    # -------------------------------------------------

    def delete(
        self,
        training_run: TrainingRun,
    ):

        self.db.delete(
            training_run
        )

        self.db.commit()

    # -------------------------------------------------
    # Count
    # -------------------------------------------------

    def count(
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
            .count()
        )

    # -------------------------------------------------
    # Best Accuracy
    # -------------------------------------------------

    def best_accuracy(
        self,
        graph_id: UUID,
    ):

        run = self.get_best_model(
            graph_id
        )

        if run:

            return run.accuracy

        return 0.0