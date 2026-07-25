from typing import List

from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime


# --------------------------------------------------
# Simulation Request
# --------------------------------------------------

class SimulationRequest(BaseModel):

    graph_id: UUID

    beta: float = Field(
        default=0.30,
        ge=0,
        le=1,
    )

    gamma: float = Field(
        default=0.10,
        ge=0,
        le=1,
    )

    steps: int = Field(
        default=30,
        ge=1,
        le=365,
    )

    initial_infected: int = Field(
        default=5,
        ge=1,
    )


# --------------------------------------------------
# Timeline Item
# --------------------------------------------------

class SimulationHistoryItem(BaseModel):

    day: int

    susceptible: int

    infected: int

    recovered: int

# --------------------------------------------------
# Statistics
# --------------------------------------------------

class SimulationStatistics(BaseModel):

    population: int

    peak_day: int

    peak_infected: int

    peak_percentage: float

    total_recovered: int

    remaining_susceptible: int

    attack_rate: float

    epidemic_duration: int


# --------------------------------------------------
# Response
# --------------------------------------------------

class SimulationResponse(BaseModel):

    graph_id: str

    graph_name: str

    beta: float

    gamma: float

    history: List[
        SimulationHistoryItem
    ]

    statistics: SimulationStatistics


# --------------------------------------------------
# Summary
# --------------------------------------------------

class SimulationSummary(BaseModel):

    graph_id: str

    graph_name: str

    nodes: int

    edges: int

    density: float

    connected_components: int    


class SimulationHistoryItem(BaseModel):
    id: str
    model: str
    beta: float
    gamma: float
    days: int
    created_at: datetime


class SimulationStepResponse(BaseModel):
    day: int
    susceptible: int
    infected: int
    recovered: int

class SimulationRunResponse(BaseModel):
    id: str
    graph_id: str
    training_run_id: str | None
    model: str
    beta: float
    gamma: float
    days: int
    created_at: datetime
    history: list[SimulationStepResponse]            