from __future__ import annotations

from datetime import date as Date, datetime

from pydantic import BaseModel, Field

from app.schemas.common import ORMModel
from app.schemas.exercise import ExerciseRead


class SetBase(BaseModel):
    reps: int = Field(ge=0, le=1000)
    weight: float = Field(ge=0, le=1000)


class SetCreate(SetBase):
    pass


class SetRead(ORMModel, SetBase):
    id: int
    set_number: int


class WorkoutExerciseCreate(BaseModel):
    exercise_id: int
    sets: list[SetCreate] = Field(default_factory=list)


class WorkoutExerciseRead(ORMModel):
    id: int
    exercise_id: int
    order_index: int
    exercise: ExerciseRead
    sets: list[SetRead]


class WorkoutBase(BaseModel):
    title: str = Field(min_length=2, max_length=150)
    date: Date
    duration_min: int = Field(ge=1, le=1440)
    notes: str | None = None


class WorkoutCreate(WorkoutBase):
    user_id: int
    exercises: list[WorkoutExerciseCreate] = Field(default_factory=list)


class WorkoutUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=2, max_length=150)
    date: Date | None = None
    duration_min: int | None = Field(default=None, ge=1, le=1440)
    notes: str | None = None


class WorkoutRead(ORMModel, WorkoutBase):
    id: int
    user_id: int
    created_at: datetime
    exercises: list[WorkoutExerciseRead]