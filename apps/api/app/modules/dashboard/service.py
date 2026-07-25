from sqlalchemy.orm import Session

from app.modules.projects.model import Project
from app.modules.datasets.model import Dataset
from app.modules.graphs.model import Graph
from app.modules.training.training_run import TrainingRun

from .schema import (
    DashboardOverview,
    RecentProject,
    RecentTraining,
    DashboardCharts,
    ChartPoint,
)


class DashboardService:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def overview(self):

        return DashboardOverview(
            projects=self.db.query(Project).count(),
            datasets=self.db.query(Dataset).count(),
            graphs=self.db.query(Graph).count(),
            training_runs=self.db.query(TrainingRun).count(),
        )

    def recent_projects(self):

        projects = (
            self.db.query(Project)
            .order_by(Project.created_at.desc())
            .limit(5)
            .all()
        )

        return [
            RecentProject(
                id=str(project.id),
                name=project.name,
                description=project.description,
                created_at=project.created_at,
            )
            for project in projects
        ]

    def recent_training(self):

        runs = (
            self.db.query(TrainingRun)
            .order_by(TrainingRun.created_at.desc())
            .limit(5)
            .all()
        )

        return [
            RecentTraining(
                id=str(run.id),
                model_name=run.model_name,
                accuracy=run.accuracy,
                loss=run.loss,
                created_at=run.created_at,
            )
            for run in runs
        ]

    def charts(self):

        projects = (
            self.db.query(Project)
            .order_by(Project.created_at.asc())
            .all()
        )

        graphs = (
            self.db.query(Graph)
            .order_by(Graph.created_at.asc())
            .all()
        )

        trainings = (
            self.db.query(TrainingRun)
            .order_by(TrainingRun.created_at.asc())
            .all()
        )

        return DashboardCharts(

            projects=[
                ChartPoint(
                    label=p.created_at.strftime("%d %b"),
                    value=1,
                )
                for p in projects
            ],

            graphs=[
                ChartPoint(
                    label=g.created_at.strftime("%d %b"),
                    value=g.nodes,
                )
                for g in graphs
            ],

            accuracies=[
                ChartPoint(
                    label=t.created_at.strftime("%d %b"),
                    value=t.accuracy,
                )
                for t in trainings
            ],

        )