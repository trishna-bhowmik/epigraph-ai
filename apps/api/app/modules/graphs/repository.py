from uuid import UUID

from sqlalchemy.orm import Session

from app.modules.datasets.model import Dataset
from app.modules.graphs.model import Graph


class GraphRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, graph: Graph):
        self.db.add(graph)
        self.db.commit()
        self.db.refresh(graph)
        return graph

    def get_by_id(
        self,
        graph_id: UUID,
    ):
        return (
            self.db.query(Graph)
            .filter(Graph.id == graph_id)
            .first()
        )

    def get_by_dataset(
        self,
        dataset_id: UUID,
    ):
        return (
            self.db.query(Graph)
            .filter(Graph.dataset_id == dataset_id)
            .all()
        )

    # NEW
    def get_by_project(
        self,
        project_id: UUID,
    ):
        return (
            self.db.query(Graph, Dataset)
            .join(
                Dataset,
                Graph.dataset_id == Dataset.id,
            )
            .filter(
                Dataset.project_id == project_id,
            )
            .order_by(
                Graph.created_at.desc(),
            )
            .all()
        )

    def delete(
        self,
        graph: Graph,
    ):
        self.db.delete(graph)
        self.db.commit()

   