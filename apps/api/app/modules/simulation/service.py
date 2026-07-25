import os

import networkx as nx
import pandas as pd
from sqlalchemy.orm import Session
import pickle

from app.modules.graphs.repository import (
    GraphRepository,
)
from app.modules.simulation.sir import (
    SIRSimulation,
)
from app.modules.simulation.model import (
    SimulationRun,
    SimulationStep,
)
from app.modules.simulation.repository import (
    SimulationRepository,
)


class SimulationService:

    def __init__(
        self,
        db: Session,
    ):

        self.db = db

        self.graph_repository = (
            GraphRepository(db)
        )

        self.simulation_repository = SimulationRepository(db)

    # ----------------------------------------
    # Load Graph File
    # ----------------------------------------

    def load_graph(
        self,
        graph,
    ):

        graph_path = os.path.join(

            "storage",

            "graphs",

            graph.graph_file,

        )

        if not os.path.exists(
            graph_path
        ):

            raise FileNotFoundError(
                "Graph file not found."
            )

        return graph_path

    # ----------------------------------------
    # Read Graph
    # ----------------------------------------

    def read_graph(
        self,
        graph_path: str,
    ) -> nx.Graph:

        extension = graph_path.split(".")[-1].lower()

        if extension == "graphml":

            return nx.read_graphml(
                graph_path
            )

        if extension == "gml":

            return nx.read_gml(
                graph_path
            )

        if extension == "gpickle":

            with open(
                graph_path,
                "rb",
            ) as f:

                graph = pickle.load(f)

            if not isinstance(
                graph,
                nx.Graph,
            ):
 
                raise ValueError(
                    "Invalid gpickle graph."
                )

            return graph

        raise ValueError(
            f"Unsupported graph format: {extension}"
        )
    # ----------------------------------------
    # Initial Infected Nodes
    # ----------------------------------------

    def get_initial_infected(
        self,
        graph: nx.Graph,
        count: int = 5,
    ):

        nodes = list(
            graph.nodes()
        )

        return nodes[:count]
    
        # ----------------------------------------
    # Run Simulation
    # ----------------------------------------

    def run_simulation(
        self,
        graph_id,
        beta: float = 0.30,
        gamma: float = 0.10,
        steps: int = 30,
        initial_infected: int = 5,
    ):

        graph_record = (
            self.graph_repository.get_by_id(
                graph_id
            )
        )

        if graph_record is None:

            raise ValueError(
                "Graph not found."
            )

        graph_path = self.load_graph(
            graph_record
        )

        graph = self.read_graph(
            graph_path
        )

        infected_nodes = (
            self.get_initial_infected(
                graph,
                initial_infected,
            )
        )

        simulation = SIRSimulation(

            graph=graph,

            beta=beta,

            gamma=gamma,

        )

        simulation.initialize(
            infected_nodes
        )

        history = simulation.run(
            steps=steps
        )

        simulation_run = SimulationRun(
            graph_id=graph_record.id,
            training_run_id=None,  # replace later if you have a TrainingRun
            model="SIR",
            beta=beta,
            gamma=gamma,
            days=steps,
        )

        simulation_run = (
            self.simulation_repository.create_simulation_run(
                simulation_run
            )
        )

        # ----------------------------------------
        # Compute Statistics
        # ----------------------------------------

        peak_infected = max(
            history,
            key=lambda x: x["infected"],
        )

        total_population = (
            graph.number_of_nodes()
        )

        final_day = history[-1]

        epidemic_duration = len(
            history
        )

        attack_rate = (
            final_day["recovered"]
            / total_population
        )

        peak_percentage = (
            peak_infected["infected"]
            / total_population
        )

        statistics = {

            "population":
            total_population,

            "peak_day":
            peak_infected["day"],

            "peak_infected":
            peak_infected["infected"],

            "peak_percentage":
            round(
                peak_percentage * 100,
                2,
            ),

            "total_recovered":
            final_day["recovered"],

            "remaining_susceptible":
            final_day["susceptible"],

            "attack_rate":
            round(
                attack_rate * 100,
                2,
            ),

            "epidemic_duration":
            epidemic_duration,

        }

        simulation_steps = []

        for item in history:

            simulation_steps.append(
                SimulationStep(
                    simulation_run_id=simulation_run.id,
                    day=item["day"],
                    susceptible=item["susceptible"],
                    infected=item["infected"],
                    recovered=item["recovered"],
                )
            )

        self.simulation_repository.save_simulation_steps(
            simulation_steps
        )

        return self.build_response(
            graph=graph_record,
            simulation_run=simulation_run,
            history=history,
            statistics=statistics,
            beta=beta,
            gamma=gamma,
        )

        # ----------------------------------------
    # Build Response
    # ----------------------------------------

    def build_response(
        self,
        graph,
        simulation_run,
        history,
        statistics,
        beta,
        gamma,
    ):
        return {
            "simulation_run_id": str(simulation_run.id),
            "graph_id": str(graph.id),
            "graph_name": graph.name,
            "beta": beta,
            "gamma": gamma,
            "history": history,
            "statistics": statistics,
        }

    # ----------------------------------------
    # Simulation Summary
    # ----------------------------------------

    def simulation_summary(
        self,
        graph_id,
    ):

        graph = self.graph_repository.get_by_id(
            graph_id
        )

        if graph is None:

            raise ValueError(
                "Graph not found."
            )

        graph_path = self.load_graph(
            graph
        )

        network = self.read_graph(
            graph_path
        )

        return {

            "graph_id": str(graph.id),

            "graph_name": graph.name,

            "nodes": network.number_of_nodes(),

            "edges": network.number_of_edges(),

            "density": nx.density(
                network
            ),

            "connected_components": nx.number_connected_components(
                network
            ),

        }

    # ----------------------------------------
    # Run Default Simulation
    # ----------------------------------------

    def simulate_default(
        self,
        graph_id,
    ):
        return self.run_simulation(
            graph_id=graph_id,
            beta=0.30,
            gamma=0.10,
            steps=30,
            initial_infected=5,
        )

    def get_simulation_history(
        self,
        graph_id,
    ):
        simulations = (
            self.simulation_repository.get_simulation_history(
                graph_id
            )
        )

        return [
            {
                "id": str(sim.id),
                "graph_id": str(sim.graph_id),
                "training_run_id": (
                    str(sim.training_run_id)
                    if sim.training_run_id
                    else None
                ),
                "model": sim.model,
                "beta": sim.beta,
                "gamma": sim.gamma,
                "days": sim.days,
                "created_at": sim.created_at,
            }
            for sim in simulations
        ]

    def get_simulation_run(
        self,
        simulation_run_id,
    ):
        simulation = (
            self.simulation_repository.get_simulation_run(
                simulation_run_id
            )
        )

        if simulation is None:
            raise ValueError("Simulation not found.")

        steps = (
            self.simulation_repository.get_simulation_steps(
                simulation_run_id
            )
        )

        return {
            "id": str(simulation.id),
            "graph_id": str(simulation.graph_id),
            "training_run_id": (
                str(simulation.training_run_id)
                if simulation.training_run_id
                else None
            ),
            "model": simulation.model,
            "beta": simulation.beta,
            "gamma": simulation.gamma,
            "days": simulation.days,
            "created_at": simulation.created_at,
            "history": [
                {
                    "day": step.day,
                    "susceptible": step.susceptible,
                    "infected": step.infected,
                    "recovered": step.recovered,
                }
                for step in steps
            ],
        }

    def delete_simulation_run(
        self,
        simulation_run_id,
    ):
        deleted = (
            self.simulation_repository.delete_simulation_run(
                simulation_run_id
            )
        )

        if not deleted:
            raise ValueError("Simulation not found.")

        return {
            "message": "Simulation deleted successfully."
        }