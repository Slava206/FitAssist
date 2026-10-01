"""Создаёт все таблицы в БД. Запуск: python -m app.create_tables"""
from app import models  # noqa: F401
from app.database import Base, engine


def main() -> None:
    Base.metadata.create_all(bind=engine)
    print("Tables created")


if __name__ == "__main__":
    main()