import uuid
from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, JSON, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class ExplanationRun(Base):
    __tablename__ = "explanation_runs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    graph_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("graphs.id", ondelete="CASCADE"))
    training_run_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("training_runs.id", ondelete="CASCADE"))
    model: Mapped[str] = mapped_column(String)
    node_index: Mapped[int] = mapped_column(Integer)
    prediction: Mapped[int] = mapped_column(Integer)
    confidence: Mapped[float] = mapped_column(Float)
    feature_importance: Mapped[list] = mapped_column(JSON)
    edge_importance: Mapped[list] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
