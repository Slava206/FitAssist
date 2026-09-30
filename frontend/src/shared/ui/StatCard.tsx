import { Card, Group, Text } from '@mantine/core';
import type { ReactNode } from 'react';

type Props = { icon: ReactNode; label: string; value: string };

export function StatCard({ icon, label, value }: Props) {
  return (
    <Card withBorder padding="lg">
      <Group gap="sm">
        {icon}
        <Text size="sm" c="dimmed">{label}</Text>
      </Group>
      <Text size="xl" fw={700} mt="xs">{value}</Text>
    </Card>
  );
}