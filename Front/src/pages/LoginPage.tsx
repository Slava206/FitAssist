import {
  Button, Card, Container, PasswordInput, Stack, Text, TextInput, Title,
  Anchor, Center, Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { ColorSchemeToggle } from '@/shared/ui/ColorSchemeToggle';

export function LoginPage() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: { email: 'alex@example.com', password: 'demo1234' },
    validate: {
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : 'Некорректный email'),
      password: (v) => (v.length < 6 ? 'Минимум 6 символов' : null),
    },
  });

  return (
    <Box mih="100vh" bg="var(--mantine-color-body)" pos="relative">
      <Box pos="absolute" top={16} right={16}>
        <ColorSchemeToggle />
      </Box>

      <Center mih="100vh">
        <Container size={420} w="100%">
          <Title ta="center" mb="xs">FitAssist</Title>
          <Text c="dimmed" ta="center" mb="lg">Персональный фитнес-ассистент</Text>
          <Card withBorder padding="lg" shadow="sm">
            <form onSubmit={form.onSubmit(() => navigate('/dashboard'))}>
              <Stack>
                <TextInput label="Email" placeholder="you@example.com" {...form.getInputProps('email')} />
                <PasswordInput label="Пароль" {...form.getInputProps('password')} />
                <Button type="submit" fullWidth mt="sm">Войти</Button>
                <Text size="sm" ta="center" c="dimmed">
                  Нет аккаунта? <Anchor component={Link} to="/login">Зарегистрироваться</Anchor>
                </Text>
              </Stack>
            </form>
          </Card>
        </Container>
      </Center>
    </Box>
  );
}