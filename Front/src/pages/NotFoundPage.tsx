import { Center, Stack, Text, Title, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Center mih="60vh">
      <Stack align="center">
        <Title order={1}>404</Title>
        <Text c="dimmed">Страница не найдена</Text>
        <Button component={Link} to="/dashboard">На главную</Button>
      </Stack>
    </Center>
  );
}