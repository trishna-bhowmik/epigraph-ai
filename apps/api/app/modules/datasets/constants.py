from enum import Enum


class DatasetStatus(str, Enum):
    UPLOADING = "UPLOADING"
    READY = "READY"
    PROCESSING = "PROCESSING"
    PROCESSED = "PROCESSED"
    GRAPH_READY = "GRAPH_READY"
    FAILED = "FAILED"


ALLOWED_EXTENSIONS = {
    "csv",
    "xlsx",
    "json",
}

MAX_UPLOAD_SIZE = 50 * 1024 * 1024  # 50 MB

UPLOAD_DIRECTORY = "storage/datasets"