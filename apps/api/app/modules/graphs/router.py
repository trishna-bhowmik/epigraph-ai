from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.datasets.service import DatasetService
from app.modules.graphs.schema import (
    GraphCreate,
    GraphResponse,
    GraphAnalyticsResponse,
    ProjectGraphResponse
)
from app.modules.graphs.service import GraphService
from app.modules.users.model import User


router = APIRouter(
    prefix="/graphs",
    tags=["Graphs"],
)



@router.post(
    "/{graph_id}/visualize",
    response_model=GraphResponse,
)
def visualize_graph(
    graph_id: UUID,
    db: Session = Depends(get_db),
):
    service = GraphService(db)

    try:
        return service.visualize_graph(
            graph_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )   
    
    

@router.get(
    "/{graph_id}/analytics",
    response_model=GraphAnalyticsResponse,
)
def get_graph_analytics(
    graph_id: UUID,
    db: Session = Depends(get_db),
):
    service = GraphService(db)

    try:
        return service.get_analytics(
            graph_id,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )   


@router.get(
    "/{graph_id}",
    response_model=GraphResponse,
)
def get_graph(
    graph_id: UUID,
    db: Session = Depends(get_db),
):
    service = GraphService(db)

    try:
        return service.get_graph(graph_id)

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

@router.delete("/{graph_id}")
def delete_graph(
    graph_id: UUID,
    db: Session = Depends(get_db),
):
    service = GraphService(db)

    try:
        return service.delete_graph(graph_id)

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to delete graph and its related records.",
        )


@router.get(
    "/project/{project_id}",
    response_model=list[ProjectGraphResponse],
)
def get_project_graphs(
    project_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = GraphService(db)
    return service.get_project_graphs(project_id)


