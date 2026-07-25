from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.modules.simulation.schema import (
    SimulationRequest,
    SimulationResponse,
)

from app.modules.simulation.service import (
    SimulationService,
)

router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"],
)


# --------------------------------------------------
# Run Custom Simulation
# --------------------------------------------------

@router.post(
    "/run",
    response_model=SimulationResponse,
)
def run_simulation(
    request: SimulationRequest,
    db: Session = Depends(get_db),
):

    service = SimulationService(db)

    try:

        return service.run_simulation(

            graph_id=request.graph_id,

            beta=request.beta,

            gamma=request.gamma,

            steps=request.steps,

            initial_infected=request.initial_infected,

        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# --------------------------------------------------
# Run Default Simulation
# --------------------------------------------------

@router.post(
    "/default/{graph_id}",
    response_model=SimulationResponse,
)
def run_default_simulation(
    graph_id: UUID,
    db: Session = Depends(get_db),
):

    service = SimulationService(db)

    try:

        return service.simulate_default(
            graph_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
    
# --------------------------------------------------
# Simulation Summary
# --------------------------------------------------

@router.get(
    "/summary/{graph_id}",
)
def simulation_summary(
    graph_id: UUID,
    db: Session = Depends(get_db),
):

    service = SimulationService(db)

    try:

        return service.simulation_summary(
            graph_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@router.get(
    "/health",
)
def health():

    return {

        "status": "healthy",

        "module": "Simulation",

    }    


# --------------------------------------------------
# Simulation History
# --------------------------------------------------

@router.get(
    "/history/{graph_id}",
)
def simulation_history(
    graph_id: UUID,
    db: Session = Depends(get_db),
):

    service = SimulationService(db)

    try:

        return service.get_simulation_history(
            graph_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# --------------------------------------------------
# Simulation Run Details
# --------------------------------------------------

@router.get(
    "/run/{simulation_run_id}",
)
def get_simulation_run(
    simulation_run_id: UUID,
    db: Session = Depends(get_db),
):

    service = SimulationService(db)

    try:

        return service.get_simulation_run(
            simulation_run_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# --------------------------------------------------
# Delete Simulation
# --------------------------------------------------

@router.delete(
    "/run/{simulation_run_id}",
)
def delete_simulation_run(
    simulation_run_id: UUID,
    db: Session = Depends(get_db),
):

    service = SimulationService(db)

    try:

        return service.delete_simulation_run(
            simulation_run_id
        )

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )        