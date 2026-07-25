from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.datasets.schema import DatasetResponse
from app.modules.datasets.service import DatasetService
from app.modules.users.model import User

router = APIRouter(
    prefix="/projects/{project_id}/datasets",
    tags=["Datasets"],
)


@router.post(
    "",
    response_model=DatasetResponse,
)
def upload_dataset(
    project_id: UUID,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = DatasetService(db)

    try:
        return service.upload_dataset(
            project_id,
            current_user.id,
            file,
        )

    except PermissionError as e:
        raise HTTPException(
            status_code=403,
            detail=str(e),
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "",
    response_model=list[DatasetResponse],
)
def get_project_datasets(
    project_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = DatasetService(db)

    try:
        return service.get_project_datasets(
            project_id,
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