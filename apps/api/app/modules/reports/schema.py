from datetime import datetime

from pydantic import BaseModel


class ReportResponse(BaseModel):

    graph_id: str

    report_name: str

    report_path: str

    generated_at: datetime


class ReportListItem(BaseModel):
    report_name: str
    report_path: str
    generated_at: datetime
