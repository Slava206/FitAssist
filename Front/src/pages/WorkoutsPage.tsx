import { Stack, Title, Text, Table, Badge, Button, Group, Card, Modal } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { mockWorkouts } from '@/shared/mocks/data';

export function WorkoutsPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2}>Тренировки</Title>
          <Text c="dimmed">Журнал всех тренировок.</Text>
        </div>
        <Button onClick={open}>Добавить тренировку</Button>
      </Group>

      <Card withBorder padding={0}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Дата</Table.Th>
              <Table.Th>Название</Table.Th>
              <Table.Th visibleFrom="sm">Длительность</Table.Th>
              <Table.Th visibleFrom="md">Упражнений</Table.Th>
              <Table.Th>Объём</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {mockWorkouts.map((w) => (
              <Table.Tr key={w.id}>
                <Table.Td>{w.date}</Table.Td>
                <Table.Td>{w.title}</Table.Td>
                <Table.Td visibleFrom="sm">{w.durationMin} мин</Table.Td>
                <Table.Td visibleFrom="md">{w.exercises.length}</Table.Td>
                <Table.Td><Badge variant="light">{w.totalVolume} кг</Badge></Table.Td>
                <Table.Td>
                  <Button component={Link} to={`/workouts/${w.id}`} size="xs" variant="subtle">
                    Открыть
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Modal opened={opened} onClose={close} title="Новая тренировка" centered>
        <Text size="sm" c="dimmed" mb="md">
          Форма создания тренировки будет реализована на этапе интеграции с backend.
          Сейчас доступны только демонстрационные данные.
        </Text>
        <Button
          fullWidth
          onClick={() => {
            close();
            notifications.show({
              title: 'Раздел в разработке',
              message: 'Создание тренировки появится после подключения API.',
              color: 'teal',
            });
          }}
        >
          Понятно
        </Button>
      </Modal>
    </Stack>
  );
}