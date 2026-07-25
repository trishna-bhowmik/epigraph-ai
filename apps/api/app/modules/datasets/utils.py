import os
import uuid


def generate_filename(extension: str) -> str:
    return f"{uuid.uuid4()}.{extension}"


def get_extension(filename: str) -> str:
    return filename.split(".")[-1].lower()


def ensure_upload_directory(path: str):
    os.makedirs(path, exist_ok=True)