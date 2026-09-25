import {
  Stack, Title, Card, TextInput, NumberInput, Select, Button, Group, Text, Avatar, Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

type ProfileForm = {
  name: string;
  email: string;
  age: number | '';
  height: number | '';
  weight: number | '';
  goal: string;
};

export function ProfilePage() {
  const form = useForm<ProfileForm>({
    initialValues: {
      name: 'Алексей Иванов',
      email: 'alex@example.com',
      age: 28,
      height: 180,
      weight: 78,
      goal: 'mass',
    },
    validate: {
      name: (v) => (v.trim().length < 2 ? 'Укажите имя' : null),
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : 'Некорректный email'),
      age: (v) => (typeof v !== 'number' || v < 10 || v > 100 ? 'Возраст должен быть от 10 до 100' : null),
    },
  });

  return (
    <Stack gap="lg" maw={720}>
      <div>
        <Title order={2}>Профиль</Title>
        <Text c="dimmed">Данные пользователя и цель тренировок.</Text>
      </div>

      <Card withBorder padding="lg">
        <Group mb="md">
          <Avatar size={64} color="teal" radius="xl">АИ</Avatar>
          <div>
            <Text fw={600}>{form.values.name}</Text>
            <Text size="sm" c="dimmed">{form.values.email}</Text>
          </div>
        </Group>
        <Divider mb="md" />

        <form
          onSubmit={form.onSubmit(() => {
            notifications.show({
              title: 'Профиль сохранён',
              message: 'Изменения будут учтены в рекомендациях ИИ',
              color: 'teal',
            });
          })}
        >
          <Stack>
            <TextInput label="Имя" {...form.getInputProps('name')} />
            <TextInput label="Email" {...form.getInputProps('email')} />
            <Group grow>
              <NumberInput label="Возраст" {...form.getInputProps('age')} />
              <NumberInput label="Рост, см" {...form.getInputProps('height')} />
              <NumberInput label="Вес, кг" {...form.getInputProps('weight')} />
            </Group>
            <Select
              label="Цель"
              data={[
                { value: 'mass', label: 'Набор массы' },
                { value: 'cut', label: 'Снижение веса' },
                { value: 'strength', label: 'Развитие силы' },
                { value: 'endurance', label: 'Выносливость' },
              ]}
              {...form.getInputProps('goal')}
            />
            <Group justify="flex-end">
              <Button type="submit">Сохранить</Button>
            </Group>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
}