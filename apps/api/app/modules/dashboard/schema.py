from datetime import datetime

from pydantic import BaseModel


class DashboardOverview(BaseModel):
    projects: int
    datasets: int
    graphs: int
    training_runs: int


class RecentProject(BaseModel):
    id: str
    name: str
    description: str | None
    created_at: datetime


class RecentTraining(BaseModel):
    id: str
    model_name: str
    accuracy: float
    loss: float
    created_at: datetime


class ChartPoint(BaseModel):
    label: str
    value: float


class DashboardCharts(BaseModel):
    projects: list[ChartPoint]
    graphs: list[ChartPoint]
    accuracies: list[ChartPoint]