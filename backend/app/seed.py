"""Заполняет БД демо-данными. Запуск: python -m app.seed"""
from datetime import date, timedelta

from app.database import Base, SessionLocal, engine
from app.models import Exercise, Recommendation, User, Workout, WorkoutExercise, WorkoutSet


def seed() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(User).count() > 0:
            print("Database already seeded")
            return

        user = User(
            email="alex@example.com",
            name="Алексей Иванов",
            age=28,
            height_cm=180,
            weight_kg=78,
            goal="mass",
        )
        db.add(user)
        db.flush()

        exercises_data = [
            ("Жим штанги лёжа", "Грудь", "Штанга", "Базовое упражнение для грудных"),
            ("Приседания со штангой", "Ноги", "Штанга", "Базовое для ног"),
            ("Становая тяга", "Спина", "Штанга", "Многосуставное упражнение"),
            ("Подтягивания", "Спина", "Турник", "Развивает широчайшие"),
            ("Жим гантелей сидя", "Плечи", "Гантели", "Для дельтовидных"),
            ("Тяга блока к груди", "Спина", "Тренажёр", "Изоляция спины"),
            ("Разгибания ног", "Ноги", "Тренажёр", "Изоляция квадрицепсов"),
            ("Планка", "Пресс", "Собственный вес", "Статика на кор"),
        ]
        exercises: list[Exercise] = []
        for name, group, equipment, desc in exercises_data:
            ex = Exercise(name=name, muscle_group=group, equipment=equipment, description=desc)
            exercises.append(ex)
        db.add_all(exercises)
        db.flush()

        def add_workout(title: str, days_ago: int, duration: int, notes: str | None, items):
            w = Workout(
                user_id=user.id,
                title=title,
                date=date.today() - timedelta(days=days_ago),
                duration_min=duration,
                notes=notes,
            )
            for i, (ex_idx, sets) in enumerate(items):
                we = WorkoutExercise(exercise_id=exercises[ex_idx].id, order_index=i)
                for j, (reps, weight) in enumerate(sets, start=1):
                    we.sets.append(WorkoutSet(set_number=j, reps=reps, weight=weight))
                w.exercises.append(we)
            db.add(w)

        add_workout("Push день", 7, 70, "Хорошее самочувствие",
                    [(0, [(10, 60), (8, 70), (6, 80), (6, 80)]),
                     (4, [(12, 20), (10, 22.5), (10, 22.5)])])
        add_workout("Pull день", 5, 65, None,
                    [(3, [(10, 0), (9, 0), (8, 0)]),
                     (5, [(12, 55), (10, 60), (10, 60)])])
        add_workout("Leg день", 3, 75, "Техника чистая",
                    [(1, [(10, 80), (8, 90), (6, 100)]),
                     (6, [(15, 60), (15, 65)])])

        db.add_all([
            Recommendation(user_id=user.id, category="Нагрузка",
                           title="Увеличьте объём тяговых тренировок",
                           body="Объём тяговых упражнений ниже, чем толкающих."),
            Recommendation(user_id=user.id, category="Восстановление",
                           title="Добавьте день отдыха",
                           body="Пульс в покое вырос на 4 уд/мин за неделю."),
            Recommendation(user_id=user.id, category="Питание",
                           title="Больше белка в дни силовых",
                           body="Рекомендуется 1.6–2.0 г белка на кг массы."),
        ])

        db.commit()
        print("Seeded successfully")
    finally:
        db.close()


if __name__ == "__main__":
    seed()