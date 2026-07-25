from uuid import UUID

from sqlalchemy.orm import Session

from app.modules.graphs.repository import (
    GraphRepository,
)
from app.modules.simulation.model import (
    SimulationRun,
    SimulationStep,
)


class SimulationRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db
        self.graph_repository = GraphRepository(db)

    def get_graph(
        self,
        graph_id: UUID,
    ):
        return self.graph_repository.get_by_id(
            graph_id
        )

    def graph_exists(
        self,
        graph_id: UUID,
    ) -> bool:
        return (
            self.get_graph(graph_id)
            is not None
        )

    def create_simulation_run(
        self,
        simulation_run: SimulationRun,
    ) -> SimulationRun:
        self.db.add(simulation_run)
        self.db.commit()
        self.db.refresh(simulation_run)
        return simulation_run

    def save_simulation_steps(
        self,
        steps: list[SimulationStep],
    ) -> None:
        self.db.add_all(steps)
        self.db.commit()

    def get_simulation_history(
        self,
        graph_id,
    ) -> list[SimulationRun]:
        return (
            self.db.query(SimulationRun)
            .filter(
                SimulationRun.graph_id == graph_id
            )
            .order_by(
                SimulationRun.created_at.desc()
            )
            .all()
        ) 

    def get_simulation_run(
        self,
        simulation_run_id,
    ) -> SimulationRun | None:
        return (
            self.db.query(SimulationRun)
            .filter(
                SimulationRun.id
                == simulation_run_id
            )
            .first()
        )  

    def get_simulation_steps(
        self,
        simulation_run_id,
    ) -> list[SimulationStep]:
        return (
            self.db.query(SimulationStep)
            .filter(
                SimulationStep.simulation_run_id
                == simulation_run_id
            )
            .order_by(
                SimulationStep.day
            )
            .all()
        )

    def delete_simulation_run(
        self,
        simulation_run_id,
    ) -> bool:
        simulation = (
            self.db.query(SimulationRun)
            .filter(
                SimulationRun.id
                == simulation_run_id
            )
            .first()
        )

        if not simulation:
            return False

        self.db.delete(simulation)
        self.db.commit()

        return True