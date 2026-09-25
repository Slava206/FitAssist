import {
  MantineProvider,
  localStorageColorSchemeManager,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { theme } from './theme';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'fitassist-color-scheme',
});

export function App() {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="auto"
      colorSchemeManager={colorSchemeManager}
    >
      <Notifications position="top-right" />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}