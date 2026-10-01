from pydantic import BaseModel, Field

from app.schemas.common import ORMModel


class ExerciseBase(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    muscle_group: str = Field(min_length=2, max_length=50)
    equipment: str = Field(min_length=2, max_length=100)
    description: str | None = None


class ExerciseCreate(ExerciseBase):
    pass


class ExerciseUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=150)
    muscle_group: str | None = Field(default=None, min_length=2, max_length=50)
    equipment: str | None = Field(default=None, min_length=2, max_length=100)
    description: str | None = None


class ExerciseRead(ORMModel, ExerciseBase):
    id: int