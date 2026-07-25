from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.modules.predictions.schema import (
    PredictionRequest,
    PredictionResponse,
    PredictionHistoryItem,
    PredictionRunResponse
)

from app.modules.predictions.service import (
    PredictionService,
)

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"],
)


# -------------------------------------------------------
# Predict using a selected trained model
# -------------------------------------------------------

@router.post(
    "/predict",
    response_model=PredictionResponse,
)
def predict(
    request: PredictionRequest,
    db: Session = Depends(get_db),
):

    service = PredictionService(db)

    try:

        return service.predict(

            training_run_id=request.training_run_id,

            graph_id=request.graph_id,

            node_column=request.node_column,

            target_column=request.target_column,

        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# -------------------------------------------------------
# Predict using latest trained model
# -------------------------------------------------------

@router.post(
    "/latest",
    response_model=PredictionResponse,
)
def predict_latest(
    graph_id: UUID,
    node_column: str,
    target_column: str,
    db: Session = Depends(get_db),
):

    service = PredictionService(db)

    try:

        return service.predict_latest(

            graph_id=graph_id,

            node_column=node_column,

            target_column=target_column,

        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
    
    # -------------------------------------------------------
# Prediction Summary
# -------------------------------------------------------

@router.get(
    "/summary/{graph_id}",
)
def prediction_summary(
    graph_id: UUID,
    db: Session = Depends(get_db),
):

    service = PredictionService(db)

    try:

        result = service.predict_latest(

            graph_id=graph_id,

            node_column="id",

            target_column="label",

        )

        return {

            "graph_id": result["graph_id"],

            "model": result["model"],

            "total_nodes": result["total_nodes"],

            "average_confidence": result[
                "average_confidence"
            ],

            "class_distribution": result[
                "class_distribution"
            ],

        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# -------------------------------------------------------
# Health Check
# -------------------------------------------------------

@router.get(
    "/health",
)
def health():

    return {

        "status": "healthy",

        "module": "Prediction",

    }


@router.get(
    "/history/{graph_id}",
    response_model=list[PredictionHistoryItem],
)
def prediction_history(
    graph_id: UUID,
    db: Session = Depends(get_db),
):

    service = PredictionService(db)

    try:
        return service.get_prediction_history(graph_id)

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/run/{prediction_run_id}",
    response_model=PredictionRunResponse,
)
def prediction_run(
    prediction_run_id: UUID,
    db: Session = Depends(get_db),
):

    service = PredictionService(db)

    try:
        return service.get_prediction_run(
            prediction_run_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.delete(
    "/run/{prediction_run_id}",
)
def delete_prediction_run(
    prediction_run_id: UUID,
    db: Session = Depends(get_db),
):

    service = PredictionService(db)

    try:

        service.delete_prediction_run(
            prediction_run_id
        )

        return {
            "message": "Prediction deleted successfully."
        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )    