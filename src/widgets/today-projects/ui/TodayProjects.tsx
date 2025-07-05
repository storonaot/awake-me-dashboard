import { DailyStats } from '@/features/daily-stats/ui'
import { useActiveProjectActions, useProjectActions, useProjects } from '@/features/project/model'
import { AddProjectModal, EditProjectModal, ProjectActionsMenu } from '@/features/project/ui'
import { SegmentGroup } from '@/features/segment-group/ui'
import { cn } from '@/shared/libs/utils'
import { Button } from '@/shared/ui'
import { addDays, format, isBefore, isToday, isTomorrow, isYesterday, startOfDay } from 'date-fns'
import { useCallback, useState } from 'react'

const getFormattedTitle = (date: Date): string => {
  const formattedDate = format(date, 'd MMMM, EEEE').toUpperCase() // например: 21 JUNE

  if (isToday(date)) return `TODAY, ${formattedDate}`
  if (isTomorrow(date)) return `TOMORROW, ${formattedDate}`
  if (isYesterday(date)) return `YESTERDAY, ${formattedDate}`

  return formattedDate
}

const TodayProjects = () => {
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()))

  const formattedDate = format(selectedDate, 'yyyy-MM-dd')
  const formattedTitle = getFormattedTitle(selectedDate)

  const [editModalProject, setEditModalProject] = useState<null | {
    id: string
    title: string
  }>(null)

  const { data, isLoading, error } = useProjects()
  const { deleteProject, archiveProject, hideProject } = useProjectActions()

  const handleDelete = useCallback(
    (id: string) => {
      if (confirm('Удалить проект?')) deleteProject.mutate(id)
    },
    [deleteProject]
  )

  const handleArchive = useCallback(
    (id: string) => {
      archiveProject.mutate(id)
    },
    [archiveProject]
  )

  const handleHide = useCallback(
    (id: string) => {
      hideProject.mutate(id)
    },
    [hideProject]
  )

  const goToPreviousDay = () => {
    setSelectedDate(prev => addDays(prev, -1))
  }

  const goToNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1))
  }

  const { setActive } = useActiveProjectActions()

  const handleToggleActive = (projectId: string, currentActiveDate?: string) => {
    if (!isToday(selectedDate)) return
    if (currentActiveDate === formattedDate) {
      setActive.mutate({ projectId, date: null }) // сброс активности
    } else {
      setActive.mutate({ projectId, date: formattedDate })
    }
  }

  const isPast = isBefore(selectedDate, startOfDay(new Date()))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Today / {format(new Date(), 'dd MMMM yyyy')}
        </h2>
        <AddProjectModal />
      </div>
      <>
        <div className="flex items-center justify-between mb-4">
          <Button onClick={goToPreviousDay} variant="outline">
            ←
          </Button>
          <h2
            className={cn(
              'text-lg font-medium text-center transition-colors',
              isPast ? 'text-muted-foreground' : 'text-foreground'
            )}
          >
            {formattedTitle}
          </h2>
          <Button onClick={goToNextDay} variant="outline">
            →
          </Button>
        </div>

        {isLoading && <p>Загрузка...</p>}
        {error && <p>Ошибка загрузки</p>}
        {!data?.length && <p>Проектов пока нет</p>}

        <ul className="grid gap-2">
          {data?.map(project => {
            const isActive = project.activeDate === formattedDate

            return (
              <li
                key={project.id}
                className={cn(
                  'grid grid-cols-[2fr_7fr_auto] items-center gap-4 p-2 border rounded-md cursor-pointer transition-colors',
                  isActive && isToday(selectedDate) && 'bg-green-200'
                )}
              >
                <span
                  className="truncate"
                  onClick={() => handleToggleActive(project.id, project.activeDate)}
                >
                  {project.title}
                </span>
                <div className="flex flex-wrap gap-1">
                  <SegmentGroup projectId={project.id} date={formattedDate} disabled={isPast} />
                </div>
                <div className="flex gap-1">
                  <ProjectActionsMenu
                    onArchive={() => handleArchive(project.id)}
                    onHide={() => handleHide(project.id)}
                    onDelete={() => handleDelete(project.id)}
                    onEdit={() => setEditModalProject({ id: project.id, title: project.title })}
                    disabled={isPast}
                  />
                </div>
              </li>
            )
          })}
        </ul>
        <div className="mt-6">
          <DailyStats date={formattedDate} projectIds={data?.map(p => p.id) ?? []} />
        </div>
        {editModalProject && (
          <EditProjectModal
            open={!!editModalProject}
            onOpenChange={open => (!open ? setEditModalProject(null) : undefined)}
            projectId={editModalProject.id}
            initialTitle={editModalProject.title}
          />
        )}
      </>
    </div>
  )
}

export default TodayProjects
