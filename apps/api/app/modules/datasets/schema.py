from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.modules.datasets.constants import DatasetStatus


class DatasetResponse(BaseModel):
    id: UUID
    project_id: UUID

    original_name: str
    stored_name: str

    mime_type: str
    extension: str

    file_size: int

    rows: int
    columns: int

    status: DatasetStatus

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


from typing import Any


class DatasetPreviewResponse(BaseModel):
    columns: list[str]
    rows: list[dict[str, Any]]    



class ColumnSummary(BaseModel):
    name: str
    dtype: str
    missing: int


class DatasetEDAResponse(BaseModel):
    rows: int
    columns: int
    duplicate_rows: int

    numeric_columns: list[str]
    categorical_columns: list[str]

    column_summary: list[ColumnSummary]

    statistics: dict[str, Any]