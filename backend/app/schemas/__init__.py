from app.schemas.common import ORMModel
from app.schemas.user import UserBase, UserCreate, UserRead, UserUpdate
from app.schemas.exercise import (
    ExerciseBase,
    ExerciseCreate,
    ExerciseRead,
    ExerciseUpdate,
)
from app.schemas.workout import (
    SetBase,
    SetCreate,
    SetRead,
    WorkoutBase,
    WorkoutCreate,
    WorkoutExerciseCreate,
    WorkoutExerciseRead,
    WorkoutRead,
    WorkoutUpdate,
)
from app.schemas.recommendation import (
    RecommendationBase,
    RecommendationCreate,
    RecommendationRead,
)

__all__ = [
    "ORMModel",
    "UserBase", "UserCreate", "UserRead", "UserUpdate",
    "ExerciseBase", "ExerciseCreate", "ExerciseRead", "ExerciseUpdate",
    "SetBase", "SetCreate", "SetRead",
    "WorkoutBase", "WorkoutCreate", "WorkoutRead", "WorkoutUpdate",
    "WorkoutExerciseCreate", "WorkoutExerciseRead",
    "RecommendationBase", "RecommendationCreate", "RecommendationRead",
]