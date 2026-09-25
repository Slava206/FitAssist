import { Stack, Title, Text, Table, Card, Badge, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { mockExercises } from '@/shared/mocks/data';

export function ExercisesPage() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () =>
      mockExercises.filter(
        (e) =>
          e.name.toLowerCase().includes(query.toLowerCase()) ||
          e.muscleGroup.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <Stack gap="lg">
      <div>
        <Title order={2}>Упражнения</Title>
        <Text c="dimmed">Каталог упражнений по группам мышц.</Text>
      </div>

      <TextInput
        placeholder="Поиск по названию или группе мышц"
        leftSection={<IconSearch size={16} />}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        maw={400}
      />

      <Card withBorder padding={0}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Название</Table.Th>
              <Table.Th>Группа мышц</Table.Th>
              <Table.Th visibleFrom="sm">Инвентарь</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((e) => (
              <Table.Tr key={e.id}>
                <Table.Td>
                  <Text fw={500}>{e.name}</Text>
                  <Text size="xs" c="dimmed" lineClamp={1}>{e.description}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light">{e.muscleGroup}</Badge>
                </Table.Td>
                <Table.Td visibleFrom="sm">{e.equipment}</Table.Td>
              </Table.Tr>
            ))}
            {filtered.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={3}>
                  <Text c="dimmed" ta="center" py="md">Ничего не найдено</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  );
}