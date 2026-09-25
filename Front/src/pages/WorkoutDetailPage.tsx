import { Stack, Title, Text, Group, Card, Table, Badge, Button } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { mockWorkouts } from '@/shared/mocks/data';

export function WorkoutDetailPage() {
  const { id } = useParams();
  const workout = mockWorkouts.find((w) => w.id === id);

  if (!workout) {
    return (
      <Stack>
        <Title order={2}>Тренировка не найдена</Title>
        <Button component={Link} to="/workouts" w="fit-content">
          К списку тренировок
        </Button>
      </Stack>
    );
  }

  return (
    <Stack gap="lg">
      <Button component={Link} to="/workouts" variant="subtle" w="fit-content">
        ← Назад
      </Button>

      <div>
        <Title order={2}>{workout.title}</Title>
        <Group gap="md" mt="xs">
          <Text c="dimmed">{workout.date}</Text>
          <Badge variant="light">{workout.durationMin} мин</Badge>
          <Badge variant="light" color="teal">{workout.totalVolume} кг</Badge>
        </Group>
      </div>

      {workout.notes && (
        <Card withBorder padding="md">
          <Text size="sm" c="dimmed">Заметка</Text>
          <Text>{workout.notes}</Text>
        </Card>
      )}

      <Stack gap="md">
        {workout.exercises.map((ex) => (
          <Card key={ex.exerciseId} withBorder padding="md">
            <Group justify="space-between" mb="sm">
              <Title order={4}>{ex.name}</Title>
              <Badge variant="light">{ex.sets.length} подх.</Badge>
            </Group>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>#</Table.Th>
                  <Table.Th>Повторения</Table.Th>
                  <Table.Th>Вес, кг</Table.Th>
                  <Table.Th>Объём, кг</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {ex.sets.map((s, i) => (
                  <Table.Tr key={i}>
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>{s.reps}</Table.Td>
                    <Table.Td>{s.weight}</Table.Td>
                    <Table.Td>{s.reps * s.weight}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}