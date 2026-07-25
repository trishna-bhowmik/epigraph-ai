from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.modules.explainability.schema import (
    ExplainRequest,
    ExplainResponse,
    ExplanationHistoryItem,
)

from app.modules.explainability.service import (
    ExplainabilityService,
)

router = APIRouter(
    prefix="/explainability",
    tags=["Explainability"],
)


# --------------------------------------------------
# Explain Prediction
# --------------------------------------------------

@router.post(
    "/explain",
    response_model=ExplainResponse,
)
def explain_prediction(
    request: ExplainRequest,
    db: Session = Depends(get_db),
):

    service = ExplainabilityService(db)

    try:

        return service.explain_prediction(

            training_run_id=request.training_run_id,

            graph_id=request.graph_id,

            node_column=request.node_column,

            target_column=request.target_column,

            node_index=request.node_index,

        )


    except Exception as e:

        raise HTTPException(

            status_code=400,

            detail=str(e),

        )


@router.get(
    "/history/{graph_id}",
    response_model=list[ExplanationHistoryItem],
)
def explainability_history(
    graph_id: UUID,
    db: Session = Depends(get_db),
):
    return ExplainabilityService(db).get_history(graph_id)
    
# --------------------------------------------------
# Health Check
# --------------------------------------------------

@router.get(
    "/health",
)
def health():

    return {

        "status": "healthy",

        "module": "Explainability",

    }


# --------------------------------------------------
# Explainability Summary
# --------------------------------------------------

@router.get(
    "/summary/{training_run_id}",
)
def explainability_summary(
    training_run_id: UUID,
    db: Session = Depends(get_db),
):

    service = ExplainabilityService(db)

    try:

        training_run = (
            service.training_repository.get_by_id(
                training_run_id
            )
        )

        if training_run is None:

            raise HTTPException(

                status_code=404,

                detail="Training run not found.",

            )

        return {

            "training_run_id": str(
                training_run.id
            ),

            "model": training_run.model_name,

            "accuracy": training_run.accuracy,

            "precision": training_run.precision,

            "recall": training_run.recall,

            "f1": training_run.f1,

        }

    except Exception as e:

        raise HTTPException(

            status_code=400,

            detail=str(e),

        )    
