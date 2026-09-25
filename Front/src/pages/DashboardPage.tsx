import { SimpleGrid, Card, Text, Group, Title, Stack, Badge, Button } from '@mantine/core';
import { IconBarbell, IconFlame, IconTrendingUp, IconClock } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { mockWorkouts, mockRecommendations } from '@/shared/mocks/data';
import { StatCard } from '@/shared/ui/StatCard';

export function DashboardPage() {
  const totalWorkouts = mockWorkouts.length;
  const totalVolume = mockWorkouts.reduce((s, w) => s + w.totalVolume, 0);
  const totalMinutes = mockWorkouts.reduce((s, w) => s + w.durationMin, 0);
  const recent = mockWorkouts.slice(0, 3);
  const topRec = mockRecommendations[0];

  return (
    <Stack gap="lg">
      <div>
        <Title order={2}>Обзор</Title>
        <Text c="dimmed">Краткая сводка по вашим тренировкам и прогрессу.</Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <StatCard icon={<IconBarbell size={20} />} label="Тренировок за месяц" value={String(totalWorkouts)} />
        <StatCard icon={<IconTrendingUp size={20} />} label="Общий объём, кг" value={totalVolume.toLocaleString('ru-RU')} />
        <StatCard icon={<IconClock size={20} />} label="Время, мин" value={String(totalMinutes)} />
        <StatCard icon={<IconFlame size={20} />} label="Серия, дней" value="5" />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Card withBorder padding="lg">
          <Group justify="space-between" mb="md">
            <Title order={4}>Последние тренировки</Title>
            <Button component={Link} to="/workouts" variant="subtle" size="xs">Все</Button>
          </Group>
          <Stack gap="sm">
            {recent.map((w) => (
              <Card
                key={w.id}
                withBorder
                padding="sm"
                component={Link}
                to={`/workouts/${w.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Group justify="space-between">
                  <div>
                    <Text fw={600}>{w.title}</Text>
                    <Text size="xs" c="dimmed">{w.date} · {w.durationMin} мин</Text>
                  </div>
                  <Badge variant="light">{w.totalVolume} кг</Badge>
                </Group>
              </Card>
            ))}
          </Stack>
        </Card>

        <Card withBorder padding="lg">
          <Title order={4} mb="md">Рекомендация ИИ</Title>
          {topRec && (
            <Stack gap="xs">
              <Badge variant="light" color="teal">{topRec.category}</Badge>
              <Text fw={600}>{topRec.title}</Text>
              <Text size="sm" c="dimmed">{topRec.body}</Text>
              <Button component={Link} to="/recommendations" variant="light" mt="sm">
                Все рекомендации
              </Button>
            </Stack>
          )}
        </Card>
      </SimpleGrid>
    </Stack>
  );
}