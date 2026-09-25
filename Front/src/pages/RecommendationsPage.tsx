import { Stack, Title, Text, Card, Badge, SimpleGrid, Group, Button, ThemeIcon } from '@mantine/core';
import { IconSparkles, IconRefresh } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { mockRecommendations, type RecommendationCategory } from '@/shared/mocks/data';

const colorByCategory: Record<RecommendationCategory, string> = {
  Нагрузка: 'teal',
  Восстановление: 'blue',
  Питание: 'orange',
  Техника: 'grape',
};

export function RecommendationsPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2}>Рекомендации ИИ</Title>
          <Text c="dimmed">Персональные советы на основе последних тренировок.</Text>
        </div>
        <Button
          leftSection={<IconRefresh size={16} />}
          variant="light"
          onClick={() =>
            notifications.show({
              title: 'ИИ-модуль будет подключён позже',
              message: 'Генерация рекомендаций появится после реализации backend.',
              color: 'teal',
            })
          }
        >
          Обновить
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        {mockRecommendations.map((r) => {
          const color = colorByCategory[r.category];
          return (
            <Card key={r.id} withBorder padding="lg">
              <Group mb="xs">
                <ThemeIcon variant="light" color={color}>
                  <IconSparkles size={16} />
                </ThemeIcon>
                <Badge variant="light" color={color}>{r.category}</Badge>
              </Group>
              <Text fw={600} mb="xs">{r.title}</Text>
              <Text size="sm" c="dimmed">{r.body}</Text>
            </Card>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}