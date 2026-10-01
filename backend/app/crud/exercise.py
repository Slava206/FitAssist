from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Exercise
from app.schemas.exercise import ExerciseCreate, ExerciseUpdate


def get_exercise(db: Session, exercise_id: int) -> Exercise | None:
    return db.get(Exercise, exercise_id)


def get_exercise_by_name(db: Session, name: str) -> Exercise | None:
    return db.scalar(select(Exercise).where(Exercise.name == name))


def list_exercises(
    db: Session,
    muscle_group: str | None = None,
    search: str | None = None,
    skip: int = 0,
    limit: int = 100,
) -> list[Exercise]:
    stmt = select(Exercise).order_by(Exercise.name)
    if muscle_group:
        stmt = stmt.where(Exercise.muscle_group == muscle_group)
    if search:
        pattern = f"%{search.lower()}%"
        stmt = stmt.where(Exercise.name.ilike(pattern))
    return list(db.scalars(stmt.offset(skip).limit(limit)))


def create_exercise(db: Session, data: ExerciseCreate) -> Exercise:
    exercise = Exercise(**data.model_dump())
    db.add(exercise)
    db.commit()
    db.refresh(exercise)
    return exercise


def update_exercise(db: Session, exercise: Exercise, data: ExerciseUpdate) -> Exercise:
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(exercise, key, value)
    db.commit()
    db.refresh(exercise)
    return exercise


def delete_exercise(db: Session, exercise: Exercise) -> None:
    db.delete(exercise)
    db.commit()