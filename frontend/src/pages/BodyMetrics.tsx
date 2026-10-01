import { Stack, Title, Text, Card, SimpleGrid, NumberInput, Group, Button, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { mockBodyMetrics, type BodyMetrics } from '@/shared/mocks/data';

const leftFields: { key: keyof BodyMetrics; label: string }[] = [
    {key: 'chest', label: 'Грудь'},
    {key: 'shoulderwidth', label: 'Ширина плеч'},
    {key: 'leftbicep', label: 'Левый бицепс'},
    {key: 'leftforearm', label: 'Левое предплечье'},
    {key: 'waist', label: 'Талия'},
    {key: 'leftthigh', label: 'Левая бедренная мышца'},
    {key: 'leftcalf', label: 'Левая икра'}
];

 const rightFields: { key: keyof BodyMetrics; label: string }[] = [
    {key: 'rightbicep', label: 'Правый бицепс'},
    {key: 'rightforearm', label: 'Правое предплечье'},
    {key: 'rightthigh', label: 'Правая бедренная мышца'},
    {key: 'rightcalf', label: 'Правая икра'},
    {key: 'hip', label: 'Бедра'},
    {key: 'buttocks', label: 'Ягодицы'},
    {key: 'lowerbust', label: 'Нижний бюст'},
 ];

 export function BodyMetricsPage() {
    const form = useForm<BodyMetrics>({ initialValues: mockBodyMetrics });
    const renderField = (key: keyof BodyMetrics, label: string) => (
        <NumberInput
            key={key}
            label={label}
            suffix=" см"
            min={0}
            {...form.getInputProps(key)}
        />
    );

    return (
        <Stack gap='lg'>
            <div>
                <Title order={2}>Метрики тела</Title>
                <Text c="dimmed">Отслеживайте изменения объёмов тела в сантиметрах.</Text>
            </div>

            <Card withBorder padding="lg">
                <form onSubmit={form.onSubmit(() => {
                    notifications.show({
                        title: 'Замеры тела сохранены',
                        message: 'Данные будут учтены при следующем обновлении прогресса.',
                        color: 'teal',
                    });
                })}
                >
                    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                        <Stack>{rightFields.map((f) => renderField(f.key, f.label))}</Stack>
                        <Image
                            src="public/body-metrics.png"
                            alt="Схема тела"
                            fit="contain"
                            h={{base: 260, md: 420}}
                        />
                        <Stack>{leftFields.map((f) => renderField(f.key, f.label))}</Stack>
                    </SimpleGrid>
                    <Group justify="flex-end" mt="lg">
                        <Button type="submit">Сохранить</Button>
                    </Group>
                </form>
            </Card>
        </Stack>
    );
};