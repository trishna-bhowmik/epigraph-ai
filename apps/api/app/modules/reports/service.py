import os
from datetime import datetime

from sqlalchemy.orm import Session
from reportlab.lib.units import inch
from reportlab.platypus import Spacer

from app.modules.datasets.repository import (
    DatasetRepository,
)
from app.modules.graphs.repository import (
    GraphRepository,
)
from app.modules.training.repository import (
    TrainingRepository,
)
from app.modules.predictions.repository import (
    PredictionRepository,
)
from app.modules.simulation.service import (
    SimulationService,
)
from app.modules.explainability.service import (
    ExplainabilityService,
)
from app.modules.reports.pdf_generator import (
    PDFGenerator,
)


class ReportService:

    def __init__(
        self,
        db: Session,
    ):

        self.db = db

        self.dataset_repository = (
            DatasetRepository(db)
        )

        self.graph_repository = (
            GraphRepository(db)
        )

        self.training_repository = (
            TrainingRepository(db)
        )

        self.prediction_repository = (
            PredictionRepository(db)
        )

        self.simulation_service = (
            SimulationService(db)
        )

        self.explainability_service = (
            ExplainabilityService(db)
        )

        self.pdf = PDFGenerator()

    # ---------------------------------------
    # Dataset Section
    # ---------------------------------------

    def dataset_section(
        self,
        dataset,
    ):

        return [

            self.pdf.heading(
                "Dataset Summary"
            ),

            self.pdf.paragraph(
                f"""
                Dataset Name: {dataset.original_name}<br/>

                File Type: {dataset.extension}<br/>

                Uploaded At: {dataset.created_at}
                """
            ),

        ]

    # ---------------------------------------
    # Graph Section
    # ---------------------------------------

    def graph_section(
        self,
        graph,
    ):

        summary = (
            self.simulation_service
            .simulation_summary(
                graph.id
            )
        )

        table = [

            [

                "Metric",

                "Value",

            ],

            [

                "Nodes",

                summary["nodes"],

            ],

            [

                "Edges",

                summary["edges"],

            ],

            [

                "Density",

                f"{summary['density']:.4f}",

            ],

            [

                "Connected Components",

                summary[
                    "connected_components"
                ],

            ],

        ]

        return [

            self.pdf.heading(
                "Graph Summary"
            ),

            self.pdf.table(
                table
            ),

        ]
    
        # ---------------------------------------
    # Training Section
    # ---------------------------------------

    def training_section(
        self,
        graph_id,
    ):

        training_run = (
            self.training_repository
            .get_best_model(
                graph_id
            )
        )

        if training_run is None:

            return [

                self.pdf.heading(
                    "Training"
                ),

                self.pdf.paragraph(
                    "No training results available."
                ),

            ]

        table = [

            [
                "Metric",
                "Value",
            ],

            [
                "Model",
                training_run.model_name,
            ],

            [
                "Accuracy",
                f"{training_run.accuracy:.4f}",
            ],

            [
                "Precision",
                f"{training_run.precision:.4f}",
            ],

            [
                "Recall",
                f"{training_run.recall:.4f}",
            ],

            [
                "F1 Score",
                f"{training_run.f1:.4f}",
            ],

            [
                "Loss",
                f"{training_run.loss:.4f}",
            ],

            [
                "Epochs",
                training_run.epochs,
            ],

            [
                "Learning Rate",
                training_run.learning_rate,
            ],

            [
                "Training Time",
                f"{training_run.training_time:.2f} sec",
            ],

        ]

        return [

            self.pdf.heading(
                "Training Results"
            ),

            self.pdf.table(
                table
            ),

        ]

    # ---------------------------------------
    # Prediction Section
    # ---------------------------------------

    def prediction_section(
        self,
        graph_id,
    ):

        latest = (
            self.prediction_repository
            .get_latest_training_run(
                graph_id
            )
        )

        if latest is None:

            return [

                self.pdf.heading(
                    "Prediction"
                ),

                self.pdf.paragraph(
                    "Prediction has not been generated."
                ),

            ]

        return [

            self.pdf.heading(
                "Prediction Summary"
            ),

            self.pdf.paragraph(

                f"""
                Model Used: {latest.model_name}<br/>

                Accuracy: {latest.accuracy:.4f}<br/>

                Precision: {latest.precision:.4f}<br/>

                Recall: {latest.recall:.4f}<br/>

                F1 Score: {latest.f1:.4f}
                """

            ),

        ]

    # ---------------------------------------
    # Simulation Section
    # ---------------------------------------

    def simulation_section(
        self,
        graph_id,
    ):

        result = (
            self.simulation_service
            .simulate_default(
                graph_id
            )
        )

        statistics = result[
            "statistics"
        ]

        table = [

            [
                "Metric",
                "Value",
            ],

            [
                "Population",
                statistics["population"],
            ],

            [
                "Peak Day",
                statistics["peak_day"],
            ],

            [
                "Peak Infected",
                statistics["peak_infected"],
            ],

            [
                "Recovered",
                statistics["total_recovered"],
            ],

            [
                "Simulation Days",
                statistics["epidemic_duration"],
            ],

        ]

        return [

            self.pdf.heading(
                "Disease Spread Simulation"
            ),

            self.pdf.table(
                table
            ),

        ]
    
        # ---------------------------------------
    # Explainability Section
    # ---------------------------------------

    def explainability_section(
        self,
        training_run_id,
        graph_id,
        node_column: str = "id",
        target_column: str = "label",
        node_index: int = 0,
    ):

        try:

            explanation = (
                self.explainability_service
                .explain_prediction(
                    training_run_id=training_run_id,
                    graph_id=graph_id,
                    node_column=node_column,
                    target_column=target_column,
                    node_index=node_index,
                )
            )

            features = explanation[
                "feature_importance"
            ][:10]

            table = [

                [
                    "Feature",
                    "Importance",
                ]

            ]

            for feature in features:

                table.append(

                    [

                        feature[
                            "feature_index"
                        ],

                        f"{feature['importance']:.4f}",

                    ]

                )

            return [

                self.pdf.heading(
                    "Explainability"
                ),

                self.pdf.paragraph(

                    f"""
                    Predicted Class: {explanation['prediction']}<br/>

                    Confidence: {explanation['confidence']:.4f}
                    """

                ),

                self.pdf.table(
                    table
                ),

            ]

        except Exception:

            return [

                self.pdf.heading(
                    "Explainability"
                ),

                self.pdf.paragraph(
                    "Explainability results are unavailable."
                ),

            ]

    # ---------------------------------------
    # Executive Summary
    # ---------------------------------------

    def executive_summary(
        self,
        graph,
        training_run,
    ):

        return [

            self.pdf.heading(
                "Executive Summary"
            ),

            self.pdf.paragraph(

                f"""
                This report summarizes the disease spread prediction
                workflow performed using the graph
                <b>{graph.name}</b>.

                The best performing model was
                <b>{training_run.model_name}</b>
                with an accuracy of
                <b>{training_run.accuracy:.4f}</b>.
                """

            ),

        ]

    # ---------------------------------------
    # Conclusion
    # ---------------------------------------

    def conclusion(self):

        return [

            self.pdf.heading(
                "Conclusion"
            ),

            self.pdf.paragraph(

                """
                The Graph Neural Network successfully
                analyzed the network structure and
                produced disease spread predictions.

                This report combines graph analytics,
                model training metrics,
                prediction outcomes,
                simulation analysis,
                and explainability results
                into a unified document.

                The generated insights can help
                researchers and decision makers
                understand potential disease spread
                and evaluate intervention strategies.
                """

            ),

        ]
    
        # ---------------------------------------
    # Generate Report
    # ---------------------------------------

    def generate_report(
        self,
        graph_id,
    ):

        graph = self.graph_repository.get_by_id(
            graph_id
        )

        if graph is None:

            raise ValueError(
                "Graph not found."
            )

        dataset = self.dataset_repository.get_by_id(
            graph.dataset_id
        )

        if dataset is None:
            raise ValueError("Dataset not found for this graph.")

        training_run = (
            self.training_repository.get_best_model(
                graph_id
            )
        )

        if training_run is None:

            raise ValueError(
                "No trained model found."
            )

        elements = []

        # ---------------------------------------
        # Cover Page
        # ---------------------------------------

        elements.append(

            self.pdf.title(
                "EpiGraph AI Report"
            )

        )

        elements.append(
            Spacer(
                1,
                0.30 * inch,
            )
        )

        elements.append(

            self.pdf.paragraph(

                f"""
                Generated On:
                {datetime.now().strftime('%d %B %Y %H:%M')}
                """

            )

        )

        elements.append(
            Spacer(
                1,
                0.25 * inch,
            )
        )

        # ---------------------------------------
        # Executive Summary
        # ---------------------------------------

        elements.extend(

            self.executive_summary(

                graph,

                training_run,

            )

        )

        elements.append(
            Spacer(
                1,
                0.20 * inch,
            )
        )

        # ---------------------------------------
        # Dataset
        # ---------------------------------------

        elements.extend(
            self.dataset_section(
                dataset
            )
        )

        elements.append(
            Spacer(
                1,
                0.20 * inch,
            )
        )

        # ---------------------------------------
        # Graph
        # ---------------------------------------

        elements.extend(
            self.graph_section(
                graph
            )
        )

        elements.append(
            Spacer(
                1,
                0.20 * inch,
            )
        )

        # ---------------------------------------
        # Training
        # ---------------------------------------

        elements.extend(
            self.training_section(
                graph_id
            )
        )

        elements.append(
            Spacer(
                1,
                0.20 * inch,
            )
        )

        # ---------------------------------------
        # Prediction
        # ---------------------------------------

        elements.extend(
            self.prediction_section(
                graph_id
            )
        )

        elements.append(
            Spacer(
                1,
                0.20 * inch,
            )
        )

        # ---------------------------------------
        # Simulation
        # ---------------------------------------

        elements.extend(
            self.simulation_section(
                graph_id
            )
        )

        elements.append(
            Spacer(
                1,
                0.20 * inch,
            )
        )

        # ---------------------------------------
        # Explainability
        # ---------------------------------------

        elements.extend(

            self.explainability_section(

                training_run_id=training_run.id,

                graph_id=graph.id,

            )

        )

        elements.append(
            Spacer(
                1,
                0.20 * inch,
            )
        )

        # ---------------------------------------
        # Conclusion
        # ---------------------------------------

        elements.extend(
            self.conclusion()
        )

        # ---------------------------------------
        # Export
        # ---------------------------------------

        filename = (
            f"report_{graph.id}.pdf"
        )

        filepath = self.pdf.export(

            filename,

            elements,

        )

        return {

            "graph_id": str(
                graph.id
            ),

            "report_name": filename,

            "report_path": filepath,

            "generated_at":
            datetime.now(),

        }
