import { useMutation } from '@tanstack/react-query'
import { logout } from '../model/auth.api'
import { Button } from '@/shared/ui'

const LogoutButton = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
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
