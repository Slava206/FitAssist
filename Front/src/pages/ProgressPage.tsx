import { Stack, Title, Text, Card, SimpleGrid, SegmentedControl } from '@mantine/core';
import { LineChart } from '@mantine/charts';
import { useState } from 'react';
import { mockProgress, mockPersonalRecords } from '@/shared/mocks/data';

type Metric = 'volume' | 'weight';

export function ProgressPage() {
  const [metric, setMetric] = useState<Metric>('volume');

  return (
    <Stack gap="lg">
      <div>
        <Title order={2}>Прогресс</Title>
        <Text c="dimmed">Динамика объёма нагрузки и веса тела.</Text>
      </div>

      <SegmentedControl
        value={metric}
        onChange={(v) => setMetric(v as Metric)}
        data={[
          { label: 'Объём нагрузки', value: 'volume' },
          { label: 'Вес тела', value: 'weight' },
        ]}
        w="fit-content"
      />

      <Card withBorder padding="lg">
        <LineChart
          h={320}
          data={mockProgress}
          dataKey="date"
          series={
            metric === 'volume'
              ? [{ name: 'volume', color: 'teal.6', label: 'Объём, кг' }]
              : [{ name: 'weight', color: 'blue.6', label: 'Вес, кг' }]
          }
          curveType="monotone"
          withLegend
        />
      </Card>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {mockPersonalRecords.map((r) => (
          <Card key={r.exercise} withBorder padding="md">
            <Text size="sm" c="dimmed">{r.exercise}</Text>
            <Text fw={700} size="lg">{r.value}</Text>
            <Text size="xs" c="dimmed">Дата: {r.date}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
}