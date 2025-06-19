import { LogoutButton } from '@/features/auth/ui/LogoutButton'
import { AuthGate } from './providers/auth-gate/AuthGate'

const Dashboard = () => {
  return <div>Dashboard</div>
}

const App = () => {
  return (
    <AuthGate>
      AwakeME
      <LogoutButton />
      <Dashboard />
    </AuthGate>
  )
}

export { App }
