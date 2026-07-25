from enum import Enum


class HealthState(str, Enum):
    SUSCEPTIBLE = "S"
    INFECTED = "I"
    RECOVERED = "R"