from datetime import datetime
from typing import List

from pydantic import BaseModel, Field
from uuid import UUID


# ----------------------------------------------------
# Training Request
# ----------------------------------------------------

class TrainRequest(BaseModel):

    graph_id: UUID

    node_column: str

    target_column: str

    model_name: str = Field(
        default="GCN",
        description="GCN | GraphSAGE | GAT",
    )

    hidden_dim: int = Field(
        default=64,
        ge=8,
        le=1024,
    )

    learning_rate: float = Field(
        default=0.001,
        gt=0,
    )

    epochs: int = Field(
        default=200,
        ge=1,
        le=5000,
    )


# ----------------------------------------------------
# Epoch History
# ----------------------------------------------------

class EpochHistory(BaseModel):

    epoch: int

    loss: float

    accuracy: float

    precision: float

    recall: float

    f1: float

    learning_rate: float

# ----------------------------------------------------
# Training Run
# ----------------------------------------------------

class TrainingRunResponse(BaseModel):

    id: UUID

    graph_id: UUID

    model_name: str

    epochs: int

    learning_rate: float

    accuracy: float

    precision: float

    recall: float

    f1: float

    loss: float

    training_time: float

    checkpoint: str | None

    created_at: datetime

    class Config:
        from_attributes = True


# ----------------------------------------------------
# Training Response
# ----------------------------------------------------

class TrainingResponse(BaseModel):

    training_run: TrainingRunResponse

    history: List[EpochHistory]

    metrics: dict


# ----------------------------------------------------
# Summary
# ----------------------------------------------------

class TrainingSummaryResponse(BaseModel):

    total_runs: int

    best_accuracy: float

    best_model: str | None

    latest_training: datetime | None    