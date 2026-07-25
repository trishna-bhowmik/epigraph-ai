from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


class SimulationRun(Base):
    __tablename__ = "simulation_runs"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    graph_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("graphs.id", ondelete="CASCADE"),
        nullable=False,
    )

    training_run_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("training_runs.id", ondelete="CASCADE"),
        nullable=True,
    )

    model: Mapped[str]

    beta: Mapped[float] = mapped_column(Float)
    gamma: Mapped[float] = mapped_column(Float)

    days: Mapped[int] = mapped_column(Integer)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    steps: Mapped[list["SimulationStep"]] = relationship(
        back_populates="simulation_run",
        cascade="all, delete-orphan",
    )


class SimulationStep(Base):
    __tablename__ = "simulation_steps"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    simulation_run_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("simulation_runs.id", ondelete="CASCADE"),
        nullable=False,
    )

    day: Mapped[int] = mapped_column(Integer)

    susceptible: Mapped[int] = mapped_column(Integer)
    infected: Mapped[int] = mapped_column(Integer)
    recovered: Mapped[int] = mapped_column(Integer)

    simulation_run: Mapped["SimulationRun"] = relationship(
        back_populates="steps",
    )