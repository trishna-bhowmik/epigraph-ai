from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db

from .schema import (
    DashboardOverview,
    RecentProject,
    RecentTraining,
    DashboardCharts,
)
from .service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/overview",
    response_model=DashboardOverview,
)
def overview(
    db: Session = Depends(get_db),
):
    return DashboardService(db).overview()


@router.get(
    "/projects",
    response_model=list[RecentProject],
)
def projects(
    db: Session = Depends(get_db),
):
    return DashboardService(db).recent_projects()


@router.get(
    "/training",
    response_model=list[RecentTraining],
)
def training(
    db: Session = Depends(get_db),
):
    return DashboardService(db).recent_training()


@router.get(
    "/charts",
    response_model=DashboardCharts,
)
def charts(
    db: Session = Depends(get_db),
):
    return DashboardService(db).charts()