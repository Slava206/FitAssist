from pydantic import BaseModel, ConfigDict


class ORMModel(BaseModel):
    """База для схем чтения: позволяет создавать модель из SQLAlchemy-объекта."""

    model_config = ConfigDict(from_attributes=True)