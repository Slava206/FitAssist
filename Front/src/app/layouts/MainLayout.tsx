import { AppShell, Burger, Group, NavLink, Text, Avatar, Menu, UnstyledButton, rem,} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { IconHome, IconBarbell, IconList, IconChartLine, IconSparkles, IconUser, IconLogout,} from '@tabler/icons-react';
import { ColorSchemeToggle } from '@/shared/ui/ColorSchemeToggle';

const navItems = [
  { to: '/dashboard', label: 'Обзор', icon: IconHome },
  { to: '/workouts', label: 'Тренировки', icon: IconBarbell },
  { to: '/exercises', label: 'Упражнения', icon: IconList },
  { to: '/progress', label: 'Прогресс', icon: IconChartLine },
  { to: '/recommendations', label: 'Рекомендации ИИ', icon: IconSparkles },
  { to: '/profile', label: 'Профиль', icon: IconUser },
];

export function MainLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  const { pathname } = useLocation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={700} size="lg">FitAssist</Text>
          </Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs">
                  <Avatar color="teal" radius="xl">АИ</Avatar>
                  <Text size="sm" visibleFrom="sm">Алексей И.</Text>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={Link} to="/profile" leftSection={<IconUser size={14} />}>
                Профиль
              </Menu.Item>
              <Menu.Item component={Link} to="/login" leftSection={<IconLogout size={14} />} color="red">
                Выйти
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={700} size="lg">FitAssist</Text>
          </Group>
          <Group gap="sm">
            <ColorSchemeToggle />
            <Menu shadow="md" width={200}>
              {/* ... существующий Menu ... */}
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        {navItems.map((item) => {
          const active = pathname === item.to || pathname.startsWith(item.to + '/');
          return (
            <NavLink
              key={item.to}
              component={Link}
              to={item.to}
              label={item.label}
              leftSection={<item.icon style={{ width: rem(18), height: rem(18) }} />}
              active={active}
              variant="light"
              onClick={close}
            />
          );
        })}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}