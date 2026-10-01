from fastapi import APIRouter, HTTPException, status

from app.api.v1.deps import DbSession
from app.crud import user as user_crud
from app.crud import workout as crud
from app.schemas.workout import WorkoutCreate, WorkoutRead, WorkoutUpdate

router = APIRouter(prefix="/workouts", tags=["workouts"])


@router.get("", response_model=list[WorkoutRead])
def list_workouts(
    db: DbSession,
    user_id: int | None = None,
    skip: int = 0,
    limit: int = 100,
):
    return crud.list_workouts(db, user_id, skip, limit)


@router.get("/{workout_id}", response_model=WorkoutRead)
def get_workout(workout_id: int, db: DbSession):
    workout = crud.get_workout(db, workout_id)
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    return workout


@router.post("", response_model=WorkoutRead, status_code=status.HTTP_201_CREATED)
def create_workout(data: WorkoutCreate, db: DbSession):
    if not user_crud.get_user(db, data.user_id):
        raise HTTPException(status_code=404, detail="User not found")
    return crud.create_workout(db, data)


@router.patch("/{workout_id}", response_model=WorkoutRead)
def update_workout(workout_id: int, data: WorkoutUpdate, db: DbSession):
    workout = crud.get_workout(db, workout_id)
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    return crud.update_workout(db, workout, data)


@router.delete("/{workout_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_workout(workout_id: int, db: DbSession):
    workout = crud.get_workout(db, workout_id)
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    crud.delete_workout(db, workout)