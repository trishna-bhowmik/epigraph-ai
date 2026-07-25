from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.datasets.service import DatasetService
from app.modules.graphs.schema import (
    GraphCreate,
    GraphResponse,
)
from app.modules.graphs.service import GraphService
from app.modules.users.model import User

router = APIRouter(
    prefix="/datasets/{dataset_id}/graphs",
    tags=["Graphs"],
)

@router.post(
    "",
    response_model=GraphResponse,
)
def create_graph(
    dataset_id: UUID,
    graph: GraphCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    dataset = DatasetService(db).get_dataset(
        dataset_id,
        current_user.id,
    )

    service = GraphService(db)

    try:
        return service.create_graph(
            dataset,
            graph,
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
    
@router.get(
    "",
    response_model=list[GraphResponse],
)
def get_graphs(
    dataset_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    dataset = DatasetService(db).get_dataset(
        dataset_id,
        current_user.id,
    )

    service = GraphService(db)

    return service.get_dataset_graphs(
        dataset.id
    )  