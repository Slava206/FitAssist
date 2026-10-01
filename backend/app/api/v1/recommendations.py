from fastapi import APIRouter, HTTPException, status

from app.api.v1.deps import DbSession
from app.crud import recommendation as crud
from app.crud import user as user_crud
from app.schemas.recommendation import (
    RecommendationCreate,
    RecommendationRead,
)

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("", response_model=list[RecommendationRead])
def list_recommendations(
    db: DbSession,
    user_id: int | None = None,
    skip: int = 0,
    limit: int = 100,
):
    return crud.list_recommendations(db, user_id, skip, limit)


@router.get("/{rec_id}", response_model=RecommendationRead)
def get_recommendation(rec_id: int, db: DbSession):
    rec = crud.get_recommendation(db, rec_id)
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    return rec


@router.post(
    "", response_model=RecommendationRead, status_code=status.HTTP_201_CREATED
)
def create_recommendation(data: RecommendationCreate, db: DbSession):
    if not user_crud.get_user(db, data.user_id):
        raise HTTPException(status_code=404, detail="User not found")
    return crud.create_recommendation(db, data)


@router.delete("/{rec_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_recommendation(rec_id: int, db: DbSession):
    rec = crud.get_recommendation(db, rec_id)
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    crud.delete_recommendation(db, rec)