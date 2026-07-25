from uuid import UUID

from sqlalchemy.orm import Session

from app.modules.projects.model import Project
from app.modules.projects.repository import ProjectRepository
from app.modules.projects.schema import (
    ProjectCreate,
    ProjectUpdate,
)


class ProjectService:
    def __init__(self, db: Session):
        self.repo = ProjectRepository(db)

    def create_project(
        self,
        owner_id: UUID,
        data: ProjectCreate,
    ):
        project = Project(
            name=data.name,
            description=data.description,
            owner_id=owner_id,
        )

        return self.repo.create(project)

    def get_projects(self, owner_id: UUID):
        return self.repo.get_all_by_owner(owner_id)

    def get_project(self, project_id: UUID):
        project = self.repo.get_by_id(project_id)

        if project is None:
            raise ValueError("Project not found")

        return project

    def update_project(
        self,
        project_id: UUID,
        data: ProjectUpdate,
    ):
        project = self.get_project(project_id)

        project.name = data.name
        project.description = data.description

        return self.repo.update(project)

    def delete_project(self, project_id: UUID):
        project = self.get_project(project_id)

        self.repo.delete(project)