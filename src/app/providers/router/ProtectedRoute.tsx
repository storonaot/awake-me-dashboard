import { Navigate, Outlet } from 'react-router-dom'
import { useAuthGate } from '@/app/providers/auth-gate/useAuthGate'

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuthGate()

  if (isLoading) return <div>Загрузка...</div>
  if (!user) return <Navigate to="/login" />

  return <Outlet />
}
