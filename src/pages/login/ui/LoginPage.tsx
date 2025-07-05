import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthGate } from '@/app/providers/auth-gate/useAuthGate'
import { LoginForm } from '@/features/auth/ui'

const LoginPage = () => {
  const { user, isLoading } = useAuthGate()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/') // редирект на главную, если уже вошёл
    }
  }, [user, navigate])

  if (isLoading) return <p>Загрузка...</p>
  if (user) return null // временно ничего не рендерим до редиректа

  return (
    <div>
      <h2>Вход</h2>
      <LoginForm />
    </div>
  )
}

export { LoginPage }
