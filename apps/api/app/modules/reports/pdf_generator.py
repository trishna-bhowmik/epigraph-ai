import os
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


class PDFGenerator:

    def __init__(self):

        self.styles = getSampleStyleSheet()

    # --------------------------------------
    # Title
    # --------------------------------------

    def title(
        self,
        text,
    ):

        return Paragraph(

            f"<b>{text}</b>",

            self.styles["Title"],

        )

    # --------------------------------------
    # Heading
    # --------------------------------------

    def heading(
        self,
        text,
    ):

        return Paragraph(

            f"<b>{text}</b>",

            self.styles["Heading2"],

        )

    # --------------------------------------
    # Paragraph
    # --------------------------------------

    def paragraph(
        self,
        text,
    ):

        return Paragraph(

            text,

            self.styles["BodyText"],

        )
        # --------------------------------------
    # Table
    # --------------------------------------

    def table(
        self,
        data,
    ):

        table = Table(data)

        table.setStyle(

            TableStyle(

                [

                    (

                        "BACKGROUND",

                        (0, 0),

                        (-1, 0),

                        colors.HexColor("#2563eb"),

                    ),

                    (

                        "TEXTCOLOR",

                        (0, 0),

                        (-1, 0),

                        colors.white,

                    ),

                    (

                        "GRID",

                        (0, 0),

                        (-1, -1),

                        1,

                        colors.grey,

                    ),

                    (

                        "BOTTOMPADDING",

                        (0, 0),

                        (-1, 0),

                        10,

                    ),

                    (

                        "BACKGROUND",

                        (0, 1),

                        (-1, -1),

                        colors.whitesmoke,

                    ),

                ]

            )

        )

        return table

    # --------------------------------------
    # Export
    # --------------------------------------

    def export(
        self,
        filename,
        elements,
    ):

        os.makedirs(
            "storage/reports",
            exist_ok=True,
        )

        filepath = os.path.join(

            "storage",

            "reports",

            filename,

        )

        document = SimpleDocTemplate(

            filepath,

            pagesize=(8.5 * inch, 11 * inch),

        )

        document.build(elements)

        return filepath