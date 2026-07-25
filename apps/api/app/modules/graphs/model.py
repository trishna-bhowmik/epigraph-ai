import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class Graph(Base):
    __tablename__ = "graphs"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    dataset_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey(
            "datasets.id",
            ondelete="CASCADE",
        ),
    )

    name: Mapped[str] = mapped_column(
        String(255),
    )

    graph_file: Mapped[str] = mapped_column(
        String(255),
    )

    nodes: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    edges: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    html_file: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )