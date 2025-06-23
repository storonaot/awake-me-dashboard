import { format, addDays, startOfDay } from 'date-fns'
import { useProjects } from '@/features/project/model'
import { useMemo } from 'react'
import { ScrollArea } from '@/shared/ui'

const getDateRange = (center: Date, before = 7, after = 7): string[] => {
  const dates: string[] = []
  for (let i = -before; i <= after; i++) {
    const date = format(addDays(center, i), 'yyyy-MM-dd')
    dates.push(date)
  }
  return dates
}

const ProgressGrid = () => {
  const { data: projects, isLoading } = useProjects()
  const today = startOfDay(new Date())
  const dateRange = useMemo(() => getDateRange(today), [today])

  if (isLoading) return <p className="text-sm text-muted-foreground">Загрузка...</p>
  if (!projects?.length) return <p className="text-sm text-muted-foreground">Нет проектов</p>

  return (
    <ScrollArea orientation="horizontal" className="max-w-full overflow-x-auto">
      <table className="min-w-[1600px] text-xs border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 bg-background z-10 text-left p-2 border-b">Проект</th>
            {dateRange.map(date => (
              <th
                key={date}
                className={`text-center p-2 border-b whitespace-nowrap ${date === format(today, 'yyyy-MM-dd') ? 'bg-muted font-semibold' : ''}`}
              >
                {date === format(today, 'yyyy-MM-dd') ? 'today' : format(new Date(date), 'dd.MM')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id} className={project.isArchived ? 'text-muted-foreground' : ''}>
              <td className="sticky left-0 bg-background z-10 p-2 border-r truncate max-w-[150px] min-w-[100px]">
                {project.title}
              </td>
              {dateRange.map(date => (
                <td key={date} className="text-center p-1">
                  {/* TODO: сюда придёт мини-компонент отображения сегментов */}-
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  )
}

export default ProgressGrid
