import uuid
from datetime import datetime

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.db.base_class import Base
from sqlalchemy import JSON


class TrainingRun(Base):
    __tablename__ = "training_runs"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    graph_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey(
            "graphs.id",
            ondelete="CASCADE",
        ),
    )

    model_name: Mapped[str] = mapped_column(
        String(50),
    )

    epochs: Mapped[int] = mapped_column(
        Integer,
    )

    learning_rate: Mapped[float] = mapped_column(
        Float,
    )

    hidden_dim: Mapped[int] = mapped_column(
        Integer,
        default=64,
    )

    output_dim: Mapped[int] = mapped_column(
        Integer,
        default=2,
    )

    accuracy: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    precision: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    recall: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    f1: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    loss: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    training_time: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    checkpoint: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    history: Mapped[list | None] = mapped_column(
        JSON,
        nullable=True,
    )