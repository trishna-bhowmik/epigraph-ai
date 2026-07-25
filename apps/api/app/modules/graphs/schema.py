from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class GraphCreate(BaseModel):
    name: str
    source_column: str
    target_column: str
    weight_column: str | None = None


class GraphResponse(BaseModel):
    id: UUID
    dataset_id: UUID

    name: str

    graph_file: str
    html_file: str | None

    nodes: int
    edges: int

    created_at: datetime

    class Config:
        from_attributes = True

from typing import Any

class GraphAnalyticsResponse(BaseModel):
    nodes: int
    edges: int

    density: float

    connected_components: int

    average_degree: float

    average_clustering: float

    top_degree_nodes: list[dict[str, Any]]

    degree_distribution: dict[int, int]

    degree_centrality: list[dict[str, Any]]

    betweenness_centrality: list[dict[str, Any]]

    closeness_centrality: list[dict[str, Any]]

    eigenvector_centrality: list[dict[str, Any]]


class ProjectGraphResponse(BaseModel):
    id: UUID
    name: str

    dataset_id: UUID
    dataset_name: str

    nodes: int
    edges: int

    created_at: datetime

    model_config = ConfigDict(from_attributes=True)    