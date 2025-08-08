import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/app/layouts'
import { ProtectedRoute } from './ProtectedRoute'
import LoginPage from '@/pages/login'
import Dashboard from '@/pages/dashboard'
import Analytics from '@/pages/analytics'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'progress', element: <Analytics /> },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
])
