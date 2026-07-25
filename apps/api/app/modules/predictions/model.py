import uuid
from datetime import datetime

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Integer,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.db.base_class import Base


class PredictionRun(Base):
    __tablename__ = "prediction_runs"

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

    training_run_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey(
            "training_runs.id",
            ondelete="CASCADE",
        ),
    )

    total_nodes: Mapped[int] = mapped_column(
        Integer,
    )

    average_confidence: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )


class PredictionItem(Base):
    __tablename__ = "prediction_items"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    prediction_run_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey(
            "prediction_runs.id",
            ondelete="CASCADE",
        ),
    )

    node_index: Mapped[int] = mapped_column(
        Integer,
    )

    predicted_class: Mapped[int] = mapped_column(
        Integer,
    )

    confidence: Mapped[float] = mapped_column(
        Float,
    )