from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.datasets.schema import DatasetResponse
from app.modules.datasets.service import DatasetService
from app.modules.users.model import User
from app.modules.datasets.schema import (
    DatasetResponse,
    DatasetPreviewResponse,
)
from app.modules.datasets.schema import (
    DatasetResponse,
    DatasetPreviewResponse,
    DatasetEDAResponse,
)

router = APIRouter(
    prefix="/datasets",
    tags=["Datasets"],
)


@router.get(
    "/{dataset_id}",
    response_model=DatasetResponse,
)
def get_dataset(
    dataset_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = DatasetService(db)

    try:
        return service.get_dataset(
            dataset_id,
            current_user.id,
        )

    except PermissionError as e:
        raise HTTPException(
            status_code=403,
            detail=str(e),
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.get(
    "/{dataset_id}/preview",
    response_model=DatasetPreviewResponse,
)
def preview_dataset(
    dataset_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = DatasetService(db)

    try:
        return service.preview_dataset(
            dataset_id,
            current_user.id,
        )

    except PermissionError as e:
        raise HTTPException(
            status_code=403,
            detail=str(e),
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
    

@router.get(
    "/{dataset_id}/eda",
    response_model=DatasetEDAResponse,
)
def get_dataset_eda(
    dataset_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = DatasetService(db)

    try:
        return service.get_eda(
            dataset_id,
            current_user.id,
        )

    except PermissionError as e:
        raise HTTPException(
            status_code=403,
            detail=str(e),
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )    

@router.delete("/{dataset_id}")
def delete_dataset(
    dataset_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = DatasetService(db)

    try:
        service.delete_dataset(
            dataset_id,
            current_user.id,
        )

        return {
            "message": "Dataset deleted successfully."
        }

    except PermissionError as e:
        raise HTTPException(
            status_code=403,
            detail=str(e),
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )