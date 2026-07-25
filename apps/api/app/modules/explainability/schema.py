from typing import List

from pydantic import BaseModel
from uuid import UUID


class ExplainRequest(BaseModel):

    training_run_id: UUID

    graph_id: UUID

    node_column: str

    target_column: str

    node_index: int


class FeatureImportance(BaseModel):

    feature_index: int

    importance: float


class EdgeImportance(BaseModel):

    source: int

    target: int

    importance: float

class ExplainResponse(BaseModel):

    graph_id: str

    training_run_id: str

    model: str

    node_index: int

    prediction: int

    confidence: float

    feature_importance: List[
        FeatureImportance
    ]

    edge_importance: List[
        EdgeImportance
    ]


class ExplanationHistoryItem(ExplainResponse):
    id: str
    created_at: str
