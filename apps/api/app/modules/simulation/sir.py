import random

import networkx as nx


class SIRSimulation:

    def __init__(
        self,
        graph: nx.Graph,
        beta: float = 0.30,
        gamma: float = 0.10,
    ):

        self.graph = graph

        self.beta = beta

        self.gamma = gamma

        self.state = {}

        for node in graph.nodes():

            self.state[node] = "S"

    # ------------------------------------
    # Initialize
    # ------------------------------------

    def initialize(
        self,
        infected_nodes,
    ):

        for node in infected_nodes:

            if node in self.state:

                self.state[node] = "I"

    # ------------------------------------
    # One Simulation Step
    # ------------------------------------

    def step(self):

        new_state = self.state.copy()

        for node in self.graph.nodes():

            if self.state[node] == "I":

                for neighbor in self.graph.neighbors(
                    node
                ):

                    if (
                        self.state[neighbor]
                        == "S"
                    ):

                        if (
                            random.random()
                            < self.beta
                        ):

                            new_state[
                                neighbor
                            ] = "I"

                if (
                    random.random()
                    < self.gamma
                ):

                    new_state[node] = "R"

        self.state = new_state

    # ------------------------------------
    # Count
    # ------------------------------------

    def count_states(self):

        susceptible = sum(
            1
            for state in self.state.values()
            if state == "S"
        )

        infected = sum(
            1
            for state in self.state.values()
            if state == "I"
        )

        recovered = sum(
            1
            for state in self.state.values()
            if state == "R"
        )

        return {

            "susceptible":
            susceptible,

            "infected":
            infected,

            "recovered":
            recovered,

        }

    # ------------------------------------
    # Timeline
    # ------------------------------------

    def run(
        self,
        steps: int = 30,
    ):

        history = []

        for day in range(steps):

            counts = self.count_states()

            counts["day"] = day

            history.append(
                counts
            )

            self.step()

        return history