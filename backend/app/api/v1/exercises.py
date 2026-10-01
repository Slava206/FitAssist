from fastapi import APIRouter, HTTPException, status

from app.api.v1.deps import DbSession
from app.crud import exercise as crud
from app.schemas.exercise import ExerciseCreate, ExerciseRead, ExerciseUpdate

router = APIRouter(prefix="/exercises", tags=["exercises"])


@router.get("", response_model=list[ExerciseRead])
def list_exercises(
    db: DbSession,
    muscle_group: str | None = None,
    search: str | None = None,
    skip: int = 0,
    limit: int = 100,
):
    return crud.list_exercises(db, muscle_group, search, skip, limit)


@router.get("/{exercise_id}", response_model=ExerciseRead)
def get_exercise(exercise_id: int, db: DbSession):
    exercise = crud.get_exercise(db, exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return exercise


@router.post("", response_model=ExerciseRead, status_code=status.HTTP_201_CREATED)
def create_exercise(data: ExerciseCreate, db: DbSession):
    if crud.get_exercise_by_name(db, data.name):
        raise HTTPException(status_code=409, detail="Exercise already exists")
    return crud.create_exercise(db, data)


@router.patch("/{exercise_id}", response_model=ExerciseRead)
def update_exercise(exercise_id: int, data: ExerciseUpdate, db: DbSession):
    exercise = crud.get_exercise(db, exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return crud.update_exercise(db, exercise, data)


@router.delete("/{exercise_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_exercise(exercise_id: int, db: DbSession):
    exercise = crud.get_exercise(db, exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    crud.delete_exercise(db, exercise)