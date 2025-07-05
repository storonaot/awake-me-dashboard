import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/app/layouts'
import { TodayProjects } from '@/widgets/today-projects/ui'
import { ProgressGrid } from '@/widgets/progress-grid/ui'
import { LoginPage } from '@/pages/login/ui/LoginPage'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <TodayProjects /> },
          { path: 'grid', element: <ProgressGrid /> },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
])
