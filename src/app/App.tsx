import { AuthGate } from './providers/auth-gate/AuthGate'
import { TodayProjects } from '@/widgets/today-projects/ui'
// import { MonthlyStats } from '@/widgets/monthly-stats/ui'
import { MainLayout } from './layouts'
import { Toaster } from '@/shared/ui'

const App = () => {
  return (
    <>
      <AuthGate>
        <MainLayout>
          <TodayProjects />
          {/* <MonthlyStats /> */}
        </MainLayout>
      </AuthGate>
      <Toaster />
    </>
  )
}

export { App }
