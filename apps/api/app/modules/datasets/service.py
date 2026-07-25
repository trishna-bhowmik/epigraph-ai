import os
from uuid import UUID

import pandas as pd
from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.modules.datasets.constants import (
    ALLOWED_EXTENSIONS,
    DatasetStatus,
    MAX_UPLOAD_SIZE,
    UPLOAD_DIRECTORY,
)
from app.modules.datasets.model import Dataset
from app.modules.datasets.repository import DatasetRepository
from app.modules.datasets.utils import (
    ensure_upload_directory,
    generate_filename,
    get_extension,
)
from app.modules.projects.repository import ProjectRepository


class DatasetService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = DatasetRepository(db)
        self.project_repo = ProjectRepository(db)

    # ---------------------------------------------------------
    # Validate uploaded file
    # ---------------------------------------------------------
    def validate_file(self, file: UploadFile) -> str:
        if not file.filename:
            raise ValueError("Invalid filename.")

        extension = get_extension(file.filename)

        if extension not in ALLOWED_EXTENSIONS:
            raise ValueError(
                f"Unsupported file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
            )

        return extension

    # ---------------------------------------------------------
    # Save file to disk
    # ---------------------------------------------------------
    def save_file(
        self,
        file: UploadFile,
        extension: str,
    ):
        ensure_upload_directory(UPLOAD_DIRECTORY)

        stored_name = generate_filename(extension)

        file_path = os.path.join(
            UPLOAD_DIRECTORY,
            stored_name,
        )

        contents = file.file.read()

        if not contents:
            raise ValueError("Uploaded file is empty.")

        if len(contents) > MAX_UPLOAD_SIZE:
            raise ValueError("File exceeds maximum size.")

        with open(file_path, "wb") as f:
            f.write(contents)

        return stored_name, file_path, contents

    # ---------------------------------------------------------
    # Read dataset using Pandas
    # ---------------------------------------------------------
    def read_dataset(
        self,
        extension: str,
        file_path: str,
    ):
        if extension == "csv":
            return pd.read_csv(file_path)

        if extension == "xlsx":
            return pd.read_excel(file_path)

        if extension == "json":
            return pd.read_json(file_path)

        raise ValueError("Unsupported dataset format.")
    
    def process_dataset(
        self,
        dataset: Dataset,
        file_path: str,
    ):
        try:
            df = self.read_dataset(
                dataset.extension,
                file_path,
            )

            dataset.rows = len(df)
            dataset.columns = len(df.columns)
            dataset.status = DatasetStatus.READY.value

        except Exception:
            dataset.status = DatasetStatus.FAILED.value

        self.repo.update(dataset)

    # ---------------------------------------------------------
    # Upload Dataset
    # ---------------------------------------------------------
    def upload_dataset(
        self,
        project_id: UUID,
        owner_id: UUID,
        file: UploadFile,
    ):
        # Verify Project
        project = self.project_repo.get_by_id(project_id)

        if project is None:
            raise ValueError("Project not found.")

        if project.owner_id != owner_id:
            raise PermissionError(
                "You do not have permission to upload datasets to this project."
            )

        # Validate file
        extension = self.validate_file(file)

        # Save file
        stored_name, file_path, contents = self.save_file(
            file,
            extension,
        )

        # Read metadata
        try:
            df = self.read_dataset(
                extension,
                file_path,
            )
        except Exception:
            if os.path.exists(file_path):
                os.remove(file_path)

            raise ValueError("Unable to read dataset.")

        # Create database record
        dataset = Dataset(
            project_id=project_id,
            original_name=file.filename,
            stored_name=stored_name,
            mime_type=file.content_type or "application/octet-stream",
            extension=extension,
            file_size=len(contents),
            rows=len(df),
            columns=len(df.columns),
            status=DatasetStatus.READY.value,
        )

        return self.repo.create(dataset)

    # ---------------------------------------------------------
    # Get all datasets of a project
    # ---------------------------------------------------------
    def get_project_datasets(
        self,
        project_id: UUID,
        owner_id: UUID,
    ):
        project = self.project_repo.get_by_id(project_id)

        if project is None:
            raise ValueError("Project not found.")

        if project.owner_id != owner_id:
            raise PermissionError(
                "You do not have permission to access this project."
            )

        return self.repo.get_by_project(project_id)

    # ---------------------------------------------------------
    # Get one dataset
    # ---------------------------------------------------------
    def get_dataset(
        self,
        dataset_id: UUID,
        owner_id: UUID,
    ):
        dataset = self.repo.get_by_id(dataset_id)

        if dataset is None:
            raise ValueError("Dataset not found.")

        project = self.project_repo.get_by_id(
            dataset.project_id
        )

        if project is None:
            raise ValueError("Project not found.")

        if project.owner_id != owner_id:
            raise PermissionError(
                "You do not have permission to access this dataset."
            )

        return dataset

    # ---------------------------------------------------------
    # Delete dataset
    # ---------------------------------------------------------
    def delete_dataset(
        self,
        dataset_id: UUID,
        owner_id: UUID,
    ):
        dataset = self.get_dataset(
            dataset_id,
            owner_id,
        )

        file_path = os.path.join(
            UPLOAD_DIRECTORY,
            dataset.stored_name,
        )

        if os.path.exists(file_path):
            os.remove(file_path)

        self.repo.delete(dataset)

    def preview_dataset(
        self,
        dataset_id: UUID,
        owner_id: UUID,
    ):
        dataset = self.get_dataset(
            dataset_id,
            owner_id,
        )

        file_path = os.path.join(
            UPLOAD_DIRECTORY,
            dataset.stored_name,
        )

        if not os.path.exists(file_path):
            raise ValueError("Dataset file not found.")

        if dataset.extension == "csv":
            df = pd.read_csv(file_path)

        elif dataset.extension == "xlsx":
            df = pd.read_excel(file_path)

        elif dataset.extension == "json":
            df = pd.read_json(file_path)

        else:
            raise ValueError("Unsupported dataset format.")

        return {
            "columns": list(df.columns),
            "rows": df.head(20).fillna("").to_dict(
                orient="records"
            ),
        }   

    def get_eda(
        self,
        dataset_id: UUID,
        owner_id: UUID,
    ):
        dataset = self.get_dataset(
            dataset_id,
            owner_id,
        )

        file_path = os.path.join(
            UPLOAD_DIRECTORY,
            dataset.stored_name,
        ) 

        if not os.path.exists(file_path):
           raise ValueError("Dataset file not found.")

        if dataset.extension == "csv":
           df = pd.read_csv(file_path)

        elif dataset.extension == "xlsx":
           df = pd.read_excel(file_path)

        elif dataset.extension == "json":
           df = pd.read_json(file_path)

        else:
           raise ValueError("Unsupported dataset format.")

        numeric_columns = (
           df.select_dtypes(include="number")
           .columns.tolist()
        )

        categorical_columns = (
           df.select_dtypes(exclude="number")
           .columns.tolist()
        )

        column_summary = []

        for column in df.columns:
            column_summary.append(
                {
                    "name": column,
                    "dtype": str(df[column].dtype),
                    "missing": int(df[column].isna().sum()),
                }
            )

        return {
            "rows": len(df),
            "columns": len(df.columns),
            "duplicate_rows": int(df.duplicated().sum()),
            "numeric_columns": numeric_columns,
            "categorical_columns": categorical_columns,
            "column_summary": column_summary,
            "statistics": df.describe(
                include="all"
            ).fillna("").to_dict(),
        }     