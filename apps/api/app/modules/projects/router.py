from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.projects.schema import (
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate,
)
from app.modules.projects.service import ProjectService
from app.modules.users.model import User

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.post("", response_model=ProjectResponse)
def create_project(
    project: ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = ProjectService(db)

    return service.create_project(
        current_user.id,
        project,
    )


@router.get("", response_model=list[ProjectResponse])
def get_projects(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = ProjectService(db)

    return service.get_projects(current_user.id)


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(
    project_id,
    db: Session = Depends(get_db),
):
    service = ProjectService(db)

    try:
        return service.get_project(project_id)
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id,
    project: ProjectUpdate,
    db: Session = Depends(get_db),
):
    service = ProjectService(db)

    try:
        return service.update_project(
            project_id,
            project,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.delete("/{project_id}")
def delete_project(
    project_id,
    db: Session = Depends(get_db),
):
    service = ProjectService(db)

    try:
        service.delete_project(project_id)

        return {"message": "Project deleted successfully"}
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )