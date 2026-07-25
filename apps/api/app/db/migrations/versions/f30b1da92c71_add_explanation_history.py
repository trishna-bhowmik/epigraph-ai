"""add explanation history"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = "f30b1da92c71"
down_revision: Union[str, Sequence[str], None] = "e4a805a569d0"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "explanation_runs",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("graph_id", sa.UUID(), nullable=False),
        sa.Column("training_run_id", sa.UUID(), nullable=False),
        sa.Column("model", sa.String(), nullable=False),
        sa.Column("node_index", sa.Integer(), nullable=False),
        sa.Column("prediction", sa.Integer(), nullable=False),
        sa.Column("confidence", sa.Float(), nullable=False),
        sa.Column("feature_importance", sa.JSON(), nullable=False),
        sa.Column("edge_importance", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["graph_id"], ["graphs.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["training_run_id"], ["training_runs.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("explanation_runs")
