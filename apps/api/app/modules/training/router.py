from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.modules.training.schema import (
    TrainRequest,
    TrainingResponse,
)
from app.modules.training.service import (
    TrainingService,
)

router = APIRouter(
    prefix="/training",
    tags=["Training"],
)


@router.post(
    "/train",
    response_model=TrainingResponse,
)
def train_model(
    request: TrainRequest,
    db: Session = Depends(get_db),
):

    service = TrainingService(db)

    try:

        return service.train_model(

            graph_id=request.graph_id,

            node_column=request.node_column,

            target_column=request.target_column,

            model_name=request.model_name,

            hidden_dim=request.hidden_dim,

            learning_rate=request.learning_rate,

            epochs=request.epochs,

        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/{run_id}",
)
def get_training_run(
    run_id: UUID,
    db: Session = Depends(get_db),
):

    service = TrainingService(db)

    try:

        return service.get_training_run(
            run_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
@router.get(
    "/graph/{graph_id}",
)
def get_graph_training_runs(
    graph_id: UUID,
    db: Session = Depends(get_db),
):

    service = TrainingService(db)

    try:

        return service.get_graph_training_runs(
            graph_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/graph/{graph_id}/summary",
)
def training_summary(
    graph_id: UUID,
    db: Session = Depends(get_db),
):

    service = TrainingService(db)

    try:

        return service.training_summary(
            graph_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.delete(
    "/{run_id}",
)
def delete_training_run(
    run_id: UUID,
    db: Session = Depends(get_db),
):

    service = TrainingService(db)

    try:

        return service.delete_training_run(
            run_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )    