from uuid import UUID

from sqlalchemy.orm import Session

from app.modules.training.training_run import (
    TrainingRun,
)


class ExplainabilityRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    # ------------------------------------------
    # Get Training Run
    # ------------------------------------------

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

    # ------------------------------------------
    # Exists
    # ------------------------------------------

    def exists(
        self,
        training_run_id: UUID,
    ) -> bool:

        return (

            self.get_training_run(
                training_run_id
            )

            is not None

        )