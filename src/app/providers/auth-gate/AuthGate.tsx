import { type ReactNode } from 'react'
import { LoginForm } from '@/features/auth/ui/LoginForm'
import { useAuthGate } from './useAuthGate'

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuthGate()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!user) {
    return (
      <div>
        <h2>Вход</h2>
        <LoginForm />
      </div>
    )
  }

  return <>{children}</>
}
