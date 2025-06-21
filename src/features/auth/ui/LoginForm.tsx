import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login } from '../model/auth.api'
import { Button, Input } from '@/shared/ui'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [haveLoggedIn, setHaveLoggedIn] = useState(false)

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: () => {
      setHaveLoggedIn(true)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate()
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}
    >
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={isPending}>
        Войти
      </Button>

      {isError && <p style={{ color: 'red' }}>{(error as Error).message}</p>}
      {haveLoggedIn && <p style={{ color: 'green' }}>U have logged in</p>}
    </form>
  )
}

export default LoginForm
