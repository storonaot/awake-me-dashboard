import { useMutation } from '@tanstack/react-query'
import { logout } from '../model/auth.api'
import { Button } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/login') // или '/', если у тебя нет отдельной логин-страницы
    },
  })

  return (
    <Button
      onClick={() => {
        mutate()
      }}
      disabled={isPending}
    >
      LogOut
    </Button>
  )
}

export default LogoutButton
