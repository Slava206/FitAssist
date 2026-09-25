import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { WorkoutsPage } from '@/pages/WorkoutsPage';
import { WorkoutDetailPage } from '@/pages/WorkoutDetailPage';
import { ExercisesPage } from '@/pages/ExercisesPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { RecommendationsPage } from '@/pages/RecommendationsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'workouts', element: <WorkoutsPage /> },
      { path: 'workouts/:id', element: <WorkoutDetailPage /> },
      { path: 'exercises', element: <ExercisesPage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'recommendations', element: <RecommendationsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);