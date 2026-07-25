from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.modules.auth.router import router as auth_router
from app.modules.projects.router import router as project_router
from app.modules.datasets.router import (
    router as datasets_router,
)
from app.modules.datasets.details_router import (
    router as dataset_details_router,
)
from fastapi.staticfiles import StaticFiles
from app.modules.training.router import (
    router as training_router,
)
from app.modules.predictions.router import (
    router as prediction_router,
)
from app.modules.simulation.router import (
    router as simulation_router,
)
from app.modules.dashboard.router import router as dashboard_router

from app.modules.graphs.router import (
    router as graph_router,
)

from app.modules.graphs.dataset_router import (
    router as graph_dataset_router,
)
from app.modules.explainability.router import router as explainability_router
from app.modules.reports.router import router as reports_router


app = FastAPI(
    title="EpiGraph AI API",
    version="1.0.0",
)

app.mount(
    "/storage",
    StaticFiles(directory="storage"),
    name="storage",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(project_router)
app.include_router(datasets_router)
app.include_router(dataset_details_router)
app.include_router(
    training_router
)
app.include_router(
    prediction_router
)
app.include_router(
    simulation_router
)
app.include_router(dashboard_router)
app.include_router(graph_router)
app.include_router(graph_dataset_router)
app.include_router(explainability_router)
app.include_router(reports_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to EpiGraph AI 🚀"
    }
