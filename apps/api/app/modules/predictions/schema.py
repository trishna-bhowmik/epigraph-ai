from typing import Dict, List
from uuid import UUID

from pydantic import BaseModel, Field
from datetime import datetime



# ---------------------------------------------------
# Prediction Request
# ---------------------------------------------------

class PredictionRequest(BaseModel):

    training_run_id: UUID

    graph_id: UUID

    node_column: str

    target_column: str


# ---------------------------------------------------
# Individual Prediction
# ---------------------------------------------------

class PredictionItem(BaseModel):

    node_index: int

    predicted_class: int

    confidence: float = Field(
        ge=0,
        le=1,
    )

    probabilities: List[float]

# ---------------------------------------------------
# Prediction Response
# ---------------------------------------------------

class PredictionResponse(BaseModel):

    prediction_run_id: str

    graph_id: str

    training_run_id: str

    model: str

    total_nodes: int

    average_confidence: float

    class_distribution: Dict[int, int]

    predictions: List[PredictionItem]


# ---------------------------------------------------
# Prediction Summary
# ---------------------------------------------------

class PredictionSummary(BaseModel):

    total_nodes: int

    average_confidence: float

    class_distribution: Dict[int, int]


class PredictionHistoryItem(BaseModel):

    id: UUID

    training_run_id: UUID

    total_nodes: int

    average_confidence: float

    created_at: datetime

    class Config:
        from_attributes = True  


class StoredPredictionItem(BaseModel):

    node_index: int

    predicted_class: int

    confidence: float

    class Config:
        from_attributes = True             


class PredictionRunResponse(BaseModel):

    id: UUID

    graph_id: UUID

    training_run_id: UUID

    total_nodes: int

    average_confidence: float

    created_at: datetime

    predictions: List[StoredPredictionItem]

 