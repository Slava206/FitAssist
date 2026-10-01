from datetime import datetime

from pydantic import BaseModel, Field

from app.schemas.common import ORMModel


class RecommendationBase(BaseModel):
    category: str = Field(min_length=2, max_length=50)
    title: str = Field(min_length=2, max_length=200)
    body: str = Field(min_length=2)


class RecommendationCreate(RecommendationBase):
    user_id: int


class RecommendationRead(ORMModel, RecommendationBase):
    id: int
    user_id: int
    created_at: datetime