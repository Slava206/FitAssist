from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Recommendation
from app.schemas.recommendation import RecommendationCreate


def get_recommendation(db: Session, rec_id: int) -> Recommendation | None:
    return db.get(Recommendation, rec_id)


def list_recommendations(
    db: Session,
    user_id: int | None = None,
    skip: int = 0,
    limit: int = 100,
) -> list[Recommendation]:
    stmt = select(Recommendation).order_by(Recommendation.created_at.desc())
    if user_id is not None:
        stmt = stmt.where(Recommendation.user_id == user_id)
    return list(db.scalars(stmt.offset(skip).limit(limit)))


def create_recommendation(
    db: Session, data: RecommendationCreate
) -> Recommendation:
    rec = Recommendation(**data.model_dump())
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return rec


def delete_recommendation(db: Session, rec: Recommendation) -> None:
    db.delete(rec)
    db.commit()