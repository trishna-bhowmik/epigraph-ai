from uuid import UUID
from datetime import datetime
from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.modules.reports.schema import (
    ReportResponse,
    ReportListItem,
)

from app.modules.reports.service import (
    ReportService,
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get("/", response_model=list[ReportListItem])
def list_reports():
    reports_dir = Path("storage/reports")
    if not reports_dir.exists():
        return []

    return [
        {
            "report_name": report.name,
            "report_path": f"storage/reports/{report.name}",
            "generated_at": datetime.fromtimestamp(report.stat().st_mtime),
        }
        for report in sorted(
            reports_dir.glob("*.pdf"),
            key=lambda report: report.stat().st_mtime,
            reverse=True,
        )
    ]


@router.post(
    "/generate/{graph_id}",
    response_model=ReportResponse,
)
def generate_report(
    graph_id: UUID,
    db: Session = Depends(get_db),
):

    service = ReportService(db)

    try:

        return service.generate_report(
            graph_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get("/health")
def health():

    return {

        "status": "healthy",

        "module": "Reports",

    }
