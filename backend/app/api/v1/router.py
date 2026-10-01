from fastapi import APIRouter

from app.api.v1 import exercises, recommendations, users, workouts

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(users.router)
api_router.include_router(exercises.router)
api_router.include_router(workouts.router)
api_router.include_router(recommendations.router)