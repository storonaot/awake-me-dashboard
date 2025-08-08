import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '@/pages/login'
import Dashboard from '@/pages/dashboard'
import Analytics from '@/pages/analytics'
import MainLayout from './layouts/main-layout'
import { ProtectedRoute } from '@/features/auth/ui'
import { UserRoutePath } from './tmp'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <div>HomeScreen</div> },
          { path: UserRoutePath.DASHBOARD, element: <Dashboard /> },
          { path: UserRoutePath.ANALYTICS, element: <Analytics /> },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
])
