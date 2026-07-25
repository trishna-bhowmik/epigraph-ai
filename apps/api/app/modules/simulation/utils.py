import random

from app.modules.simulation.constants import (
    HealthState,
)


def infect_neighbor(
    probability: float,
):

    return (
        random.random()
        < probability
    )


def recover_node(
    probability: float,
):

    return (
        random.random()
        < probability
    )