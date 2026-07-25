from uuid import UUID

from sqlalchemy.orm import Session

from app.modules.datasets.model import Dataset


class DatasetRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        dataset: Dataset,
    ):
        self.db.add(dataset)
        self.db.commit()
        self.db.refresh(dataset)
        return dataset

    def get_by_project(
        self,
        project_id: UUID,
    ):
        return (
            self.db.query(Dataset)
            .filter(
                Dataset.project_id == project_id
            )
            .order_by(
                Dataset.created_at.desc()
            )
            .all()
        )

    def get_by_id(
        self,
        dataset_id: UUID,
    ):
        return (
            self.db.query(Dataset)
            .filter(
                Dataset.id == dataset_id
            )
            .first()
        )

    def update(
        self,
        dataset: Dataset,
    ):
        self.db.commit()
        self.db.refresh(dataset)
        return dataset

    def delete(
        self,
        dataset: Dataset,
    ):
        self.db.delete(dataset)
        self.db.commit()