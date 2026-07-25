from app.db.base_class import Base

# Import every SQLAlchemy model here so Alembic can discover them.
from app.modules.users.model import User
from app.modules.projects.model import Project
from app.modules.datasets.model import Dataset
from app.modules.graphs.model import Graph
from app.modules.training.training_run import TrainingRun
from app.modules.predictions.model import (
    PredictionRun,
    PredictionItem,
)
from app.modules.simulation.model import (
    SimulationRun,
    SimulationStep,
)
from app.modules.explainability.model import ExplanationRun
