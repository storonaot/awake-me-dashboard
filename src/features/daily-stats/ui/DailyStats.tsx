import { useDailyStats } from '@/features/daily-stats/model'
import { Progress } from '@/shared/ui'

interface DailyStatsProps {
  date: string
  projectIds: string[]
}

const DailyStats = ({ date, projectIds }: DailyStatsProps) => {
  const { total, completed, isLoading } = useDailyStats({ date, projectIds })

  if (isLoading) return <p className="text-sm text-muted-foreground">Загрузка статистики...</p>
  if (total === 0)
    return <p className="text-sm text-muted-foreground">Нет запланированных сегментов</p>

  const hoursTotal = (total * 0.5).toFixed(1)
  const hoursCompleted = (completed * 0.5).toFixed(1)
  const percent = Math.round((completed / total) * 100)

  return (
    <div className="w-1/3 ml-auto text-right">
      <p className="text-sm">
        Запланировано: {hoursTotal} ч<br />
        Выполнено: {hoursCompleted} ч
      </p>
      <div className="relative mt-2">
        <Progress value={percent} className="h-2" />
        <div className="text-xs text-muted-foreground mt-1 text-right">Выполнено {percent}%</div>
      </div>
    </div>
  )
}

export default DailyStats
