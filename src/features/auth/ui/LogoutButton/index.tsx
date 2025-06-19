import { useMutation } from '@tanstack/react-query'
import { logout } from '../../model/auth.api'

export const LogoutButton = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
  })

  return (
    <button onClick={() => mutate()} disabled={isPending}>
      Выйти
    </button>
  )
}
