from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models import Workout, WorkoutExercise, WorkoutSet
from app.schemas.workout import WorkoutCreate, WorkoutUpdate


def _load_options():
    """Жадно загружаем связанные данные, чтобы не было N+1 запросов."""
    return (
        selectinload(Workout.exercises).selectinload(WorkoutExercise.sets),
        selectinload(Workout.exercises).selectinload(WorkoutExercise.exercise),
    )


def get_workout(db: Session, workout_id: int) -> Workout | None:
    stmt = select(Workout).where(Workout.id == workout_id).options(*_load_options())
    return db.scalar(stmt)


def list_workouts(
    db: Session,
    user_id: int | None = None,
    skip: int = 0,
    limit: int = 100,
) -> list[Workout]:
    stmt = (
        select(Workout)
        .options(*_load_options())
        .order_by(Workout.date.desc(), Workout.id.desc())
        .offset(skip)
        .limit(limit)
    )
    if user_id is not None:
        stmt = stmt.where(Workout.user_id == user_id)
    return list(db.scalars(stmt))


def create_workout(db: Session, data: WorkoutCreate) -> Workout:
    workout = Workout(
        user_id=data.user_id,
        title=data.title,
        date=data.date,
        duration_min=data.duration_min,
        notes=data.notes,
    )
    for i, we in enumerate(data.exercises):
        workout_exercise = WorkoutExercise(exercise_id=we.exercise_id, order_index=i)
        for j, s in enumerate(we.sets):
            workout_exercise.sets.append(
                WorkoutSet(set_number=j + 1, reps=s.reps, weight=s.weight)
            )
        workout.exercises.append(workout_exercise)

    db.add(workout)
    db.commit()

    return get_workout(db, workout.id)  # type: ignore[return-value]


def update_workout(db: Session, workout: Workout, data: WorkoutUpdate) -> Workout:
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(workout, key, value)
    db.commit()
    return get_workout(db, workout.id)  # type: ignore[return-value]


def delete_workout(db: Session, workout: Workout) -> None:
    db.delete(workout)
    db.commit()