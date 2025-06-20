import { LogoutButton } from '@/features/auth/ui'
import { AuthGate } from './providers/auth-gate/AuthGate'
import { TodayProjects } from '@/widgets/today-projects/ui'
import { MonthlyStats } from '@/widgets/monthly-stats/ui'

const App = () => {
  return (
    <AuthGate>
      AwakeME
      <LogoutButton />
      <TodayProjects />
      <MonthlyStats />
    </AuthGate>
  )
}

export { App }
