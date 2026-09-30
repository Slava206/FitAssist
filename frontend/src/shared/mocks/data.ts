export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  description: string;
};

export type WorkoutSet = { reps: number; weight: number };

export type WorkoutExercise = {
  exerciseId: string;
  name: string;
  sets: WorkoutSet[];
};

export type Workout = {
  id: string;
  title: string;
  date: string;
  durationMin: number;
  totalVolume: number;
  notes?: string;
  exercises: WorkoutExercise[];
};

export type ProgressPoint = {
  date: string;
  weight: number;
  volume: number;
  workouts: number;
};

export type RecommendationCategory = 'Нагрузка' | 'Восстановление' | 'Питание' | 'Техника';

export type Recommendation = {
  id: string;
  title: string;
  body: string;
  category: RecommendationCategory;
};

export const mockExercises: Exercise[] = [
  { id: 'ex-1', name: 'Жим штанги лёжа', muscleGroup: 'Грудь', equipment: 'Штанга', description: 'Базовое упражнение для грудных мышц.' },
  { id: 'ex-2', name: 'Приседания со штангой', muscleGroup: 'Ноги', equipment: 'Штанга', description: 'Базовое упражнение для квадрицепсов и ягодиц.' },
  { id: 'ex-3', name: 'Становая тяга', muscleGroup: 'Спина', equipment: 'Штанга', description: 'Многосуставное упражнение для задней цепи.' },
  { id: 'ex-4', name: 'Подтягивания', muscleGroup: 'Спина', equipment: 'Турник', description: 'Развивает широчайшие мышцы и бицепс.' },
  { id: 'ex-5', name: 'Жим гантелей сидя', muscleGroup: 'Плечи', equipment: 'Гантели', description: 'Упражнение для дельтовидных мышц.' },
  { id: 'ex-6', name: 'Тяга блока к груди', muscleGroup: 'Спина', equipment: 'Блочный тренажёр', description: 'Изолирующее упражнение для спины.' },
  { id: 'ex-7', name: 'Разгибания ног', muscleGroup: 'Ноги', equipment: 'Тренажёр', description: 'Изоляция квадрицепсов.' },
  { id: 'ex-8', name: 'Планка', muscleGroup: 'Пресс', equipment: 'Собственный вес', description: 'Статическое упражнение на мышцы кора.' },
];

export const mockWorkouts: Workout[] = [
  {
    id: 'w-1',
    title: 'День "толкающие"',
    date: '2025-06-01',
    durationMin: 70,
    totalVolume: 5240,
    notes: 'Хорошее самочувствие, добавил 2.5 кг в жиме.',
    exercises: [
      { exerciseId: 'ex-1', name: 'Жим штанги лёжа', sets: [
        { reps: 10, weight: 60 }, { reps: 8, weight: 70 },
        { reps: 6, weight: 80 }, { reps: 6, weight: 80 },
      ]},
      { exerciseId: 'ex-5', name: 'Жим гантелей сидя', sets: [
        { reps: 12, weight: 20 }, { reps: 10, weight: 22.5 }, { reps: 10, weight: 22.5 },
      ]},
    ],
  },
  {
    id: 'w-2',
    title: 'День "тянущие"',
    date: '2025-06-03',
    durationMin: 65,
    totalVolume: 4820,
    exercises: [
      { exerciseId: 'ex-4', name: 'Подтягивания', sets: [
        { reps: 10, weight: 0 }, { reps: 9, weight: 0 }, { reps: 8, weight: 0 },
      ]},
      { exerciseId: 'ex-6', name: 'Тяга блока к груди', sets: [
        { reps: 12, weight: 55 }, { reps: 10, weight: 60 }, { reps: 10, weight: 60 },
      ]},
    ],
  },
  {
    id: 'w-3',
    title: 'День "ноги"',
    date: '2025-06-05',
    durationMin: 75,
    totalVolume: 7600,
    notes: 'Тяжело, но техника чистая.',
    exercises: [
      { exerciseId: 'ex-2', name: 'Приседания со штангой', sets: [
        { reps: 10, weight: 80 }, { reps: 8, weight: 90 }, { reps: 6, weight: 100 },
      ]},
      { exerciseId: 'ex-7', name: 'Разгибания ног', sets: [
        { reps: 15, weight: 60 }, { reps: 15, weight: 65 },
      ]},
    ],
  },
  {
    id: 'w-4',
    title: 'Верхняя часть тела',
    date: '2025-06-08',
    durationMin: 60,
    totalVolume: 4300,
    exercises: [
      { exerciseId: 'ex-1', name: 'Жим штанги лёжа', sets: [
        { reps: 10, weight: 65 }, { reps: 8, weight: 75 }, { reps: 6, weight: 82.5 },
      ]},
      { exerciseId: 'ex-4', name: 'Подтягивания', sets: [
        { reps: 11, weight: 0 }, { reps: 9, weight: 0 },
      ]},
    ],
  },
  {
    id: 'w-5',
    title: 'Full body',
    date: '2025-06-10',
    durationMin: 55,
    totalVolume: 3900,
    exercises: [
      { exerciseId: 'ex-3', name: 'Становая тяга', sets: [
        { reps: 8, weight: 100 }, { reps: 6, weight: 110 }, { reps: 5, weight: 120 },
      ]},
      { exerciseId: 'ex-8', name: 'Планка', sets: [
        { reps: 60, weight: 0 }, { reps: 60, weight: 0 },
      ]},
    ],
  },
];

export const mockProgress: ProgressPoint[] = [
  { date: '01.05', weight: 80.0, volume: 4200, workouts: 3 },
  { date: '08.05', weight: 79.5, volume: 4500, workouts: 4 },
  { date: '15.05', weight: 79.1, volume: 4900, workouts: 4 },
  { date: '22.05', weight: 78.8, volume: 5300, workouts: 5 },
  { date: '29.05', weight: 78.5, volume: 5100, workouts: 4 },
  { date: '05.06', weight: 78.2, volume: 5240, workouts: 5 },
  { date: '12.06', weight: 78.0, volume: 4820, workouts: 4 },
];

export const mockPersonalRecords = [
  { exercise: 'Жим лёжа', value: '82.5 кг × 6', date: '2025-06-08' },
  { exercise: 'Приседания', value: '100 кг × 6', date: '2025-06-05' },
  { exercise: 'Становая тяга', value: '120 кг × 5', date: '2025-06-10' },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'r-1',
    title: 'Увеличьте объём тяговых тренировок',
    body: 'За последние 2 недели объём тяговых упражнений на 18% ниже, чем толкающих. Рекомендуем добавить 1–2 подхода в подтягиваниях или тяге блока.',
    category: 'Нагрузка',
  },
  {
    id: 'r-2',
    title: 'Дни отдыха: восстановление',
    body: 'Пульс в покое вырос на 4 уд/мин по сравнению с прошлой неделей. Запланируйте 1 дополнительный день отдыха или лёгкую кардиосессию.',
    category: 'Восстановление',
  },
  {
    id: 'r-3',
    title: 'Больше белка в дни силовых',
    body: 'При текущей нагрузке (~5 тренировок в неделю) рекомендовано 1.6–2.0 г белка на кг массы тела. Добавьте порцию белка после тренировки.',
    category: 'Питание',
  },
  {
    id: 'r-4',
    title: 'Проверьте технику приседа',
    body: 'При весах от 90 кг скорость подъёма снижается неравномерно. Снизьте рабочий вес на 10% на одну неделю для отработки техники.',
    category: 'Техника',
  },
];