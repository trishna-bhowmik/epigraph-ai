import os
import pickle
import networkx as nx

from uuid import UUID
from sqlalchemy.orm import Session

from app.modules.datasets.repository import DatasetRepository
from app.modules.graphs.constants import (
    GRAPH_DIRECTORY,
    GRAPH_HTML_DIRECTORY,
)
from app.modules.graphs.model import Graph
from app.modules.graphs.repository import GraphRepository
from app.modules.graphs.schema import GraphCreate
from app.modules.graphs.utils import generate_graph_filename
from pyvis.network import Network
from app.modules.training.training_run import TrainingRun
from app.modules.predictions.model import PredictionItem, PredictionRun
from app.modules.simulation.model import SimulationRun, SimulationStep
from app.modules.explainability.model import ExplanationRun



class GraphService:
    def __init__(self, db: Session):
        self.db = db
        self.graph_repo = GraphRepository(db)
        self.dataset_repo = DatasetRepository(db)

    def create_graph(
        self,
        dataset,
        graph_data: GraphCreate,
    ):
        import pandas as pd

        file_path = os.path.join(
            "storage/datasets",
            dataset.stored_name,
        )

        if dataset.extension == "csv":
            df = pd.read_csv(file_path)

        elif dataset.extension == "xlsx":
            df = pd.read_excel(file_path)

        elif dataset.extension == "json":
            df = pd.read_json(file_path)

        else:
            raise ValueError("Unsupported dataset format.")

        G = nx.Graph()

        for _, row in df.iterrows():
            source = row[graph_data.source_column]
            target = row[graph_data.target_column]

            if graph_data.weight_column:
                weight = row[graph_data.weight_column]

                G.add_edge(
                    source,
                    target,
                    weight=float(weight),
                )
            else:
                G.add_edge(
                    source,
                    target,
                )

        filename = generate_graph_filename()

        graph_path = os.path.join(
            GRAPH_DIRECTORY,
            filename,
        )

        with open(graph_path, "wb") as f:
            pickle.dump(G, f)

        graph = Graph(
            dataset_id=dataset.id,
            name=graph_data.name,
            graph_file=filename,
            nodes=G.number_of_nodes(),
            edges=G.number_of_edges(),
        )

        return self.graph_repo.create(graph)
    
    def get_dataset_graphs(
        self,
        dataset_id: UUID,
    ):
        return self.graph_repo.get_by_dataset(
            dataset_id
        )
    
    def visualize_graph(
        self,
        graph_id: UUID,
    ):
        graph = self.graph_repo.get_by_id(
            graph_id
        )

        if not graph:
            raise ValueError("Graph not found.")

        import pickle

        graph_path = os.path.join(
            GRAPH_DIRECTORY,
            graph.graph_file,
        )

        with open(graph_path, "rb") as f:
            G = pickle.load(f)

        network = Network(
            height="800px",
            width="100%",
            bgcolor="#ffffff",
            font_color="black",
        )

        network.from_nx(G)
 
        html_name = (
            f"{graph.id}.html"
        )

        html_path = os.path.join(
            GRAPH_HTML_DIRECTORY,
            html_name,
        )

        network.save_graph(html_path)

        graph.html_file = (
    f"http://localhost:8000/storage/graphs/html/{html_name}"
)

        self.db.commit()
        self.db.refresh(graph)

        return graph
    
    def get_analytics(
        self,
        graph_id: UUID,
    ):
        graph = self.graph_repo.get_by_id(graph_id)

        if not graph:
            raise ValueError("Graph not found.")

        graph_path = os.path.join(
            GRAPH_DIRECTORY,
            graph.graph_file,
        )

        if not os.path.exists(graph_path):
            raise ValueError("Graph file not found.")

        with open(graph_path, "rb") as file:
            G = pickle.load(file)

    # -------------------------
    # Basic Statistics
    # -------------------------

        node_count = G.number_of_nodes()
        edge_count = G.number_of_edges()

        density = nx.density(G)

        if G.is_directed():
            connected_components = nx.number_weakly_connected_components(G)
        else:
            connected_components = nx.number_connected_components(G)

        degrees = dict(G.degree())

        average_degree = (
            sum(degrees.values()) / node_count
            if node_count > 0
            else 0
        )

        average_clustering = nx.average_clustering(G)

    # -------------------------
    # Top Degree Nodes
    # -------------------------

        top_degree_nodes = [
            {
                "node": node,
                "degree": degree,
            }
            for node, degree in sorted(
                degrees.items(),
                key=lambda item: item[1],
                reverse=True,
            )[:10]
        ]

    # -------------------------
    # Degree Distribution
    # -------------------------

        degree_distribution = {}

        for degree in degrees.values():
            degree_distribution[degree] = (
                degree_distribution.get(degree, 0) + 1
            )

    # -------------------------
    # Centrality Metrics
    # -------------------------

        degree_centrality = nx.degree_centrality(G)

        betweenness = nx.betweenness_centrality(G)

        closeness = nx.closeness_centrality(G)

        try:
            eigenvector = nx.eigenvector_centrality(
                G,
                max_iter=1000,
            )
        except Exception:
            eigenvector = {}

        def top_ten(metric):
            return [
                {
                    "node": node,
                    "score": round(score, 4),
                }
                for node, score in sorted(
                    metric.items(),
                    key=lambda item: item[1],
                    reverse=True,
                )[:10]
            ]

    # -------------------------
    # Response
    # -------------------------

        return {
            "nodes": node_count,
            "edges": edge_count,
            "density": round(density, 4),
            "connected_components": connected_components,
            "average_degree": round(average_degree, 2),
            "average_clustering": round(
                average_clustering,
                4,
            ),
            "top_degree_nodes": top_degree_nodes,
            "degree_distribution": degree_distribution,
            "degree_centrality": top_ten(
                degree_centrality
            ),
            "betweenness_centrality": top_ten(
                betweenness
            ),
            "closeness_centrality": top_ten(
                closeness
            ),
            "eigenvector_centrality": top_ten(
                eigenvector
            ),
        }
    
    def get_graph(
        self,
        graph_id: UUID,
    ):
        graph = (
            self.db.query(Graph)
            .filter(Graph.id == graph_id)
            .first()
        )

        if not graph:
            raise ValueError("Graph not found")

        return graph
    
    def delete_graph(
        self,
        graph_id: UUID,
    ):
        graph = (
            self.db.query(Graph)
            .filter(Graph.id == graph_id)
            .first()
        )

        if not graph:
            raise ValueError("Graph not found")

        try:
            prediction_run_ids = (
                self.db.query(PredictionRun.id)
                .filter(PredictionRun.graph_id == graph_id)
            )
            simulation_run_ids = (
                self.db.query(SimulationRun.id)
                .filter(SimulationRun.graph_id == graph_id)
            )

            # Delete child records first so this works with both legacy and
            # current database migrations.
            self.db.query(PredictionItem).filter(
                PredictionItem.prediction_run_id.in_(prediction_run_ids)
            ).delete(synchronize_session=False)
            self.db.query(PredictionRun).filter(
                PredictionRun.graph_id == graph_id
            ).delete(synchronize_session=False)

            self.db.query(SimulationStep).filter(
                SimulationStep.simulation_run_id.in_(simulation_run_ids)
            ).delete(synchronize_session=False)
            self.db.query(SimulationRun).filter(
                SimulationRun.graph_id == graph_id
            ).delete(synchronize_session=False)

            self.db.query(ExplanationRun).filter(
                ExplanationRun.graph_id == graph_id
            ).delete(synchronize_session=False)
            self.db.query(TrainingRun).filter(
                TrainingRun.graph_id == graph_id
            ).delete(synchronize_session=False)

            self.db.delete(graph)
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise

        return {
            "message": "Graph deleted successfully"
        }


    def get_project_graphs(
        self,
        project_id: UUID,
    ):
        records = self.graph_repo.get_by_project(project_id)

        response = []

        for graph, dataset in records:
            response.append(
                {
                    "id": graph.id,
                    "name": graph.name,
                    "dataset_id": dataset.id,
                    "dataset_name": dataset.original_name,
                    "nodes": graph.nodes,
                    "edges": graph.edges,
                    "created_at": graph.created_at,
                }
            )

        return response
