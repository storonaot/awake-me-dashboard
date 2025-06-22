import { useCallback, useState } from 'react'
import { addDays, format, isBefore, isToday, isTomorrow, isYesterday, startOfDay } from 'date-fns'
import { useProjectActions, useProjects } from '../model'
import { EditProjectModal, ProjectActionsMenu } from './index'
import { SegmentGroup } from '@/features/segment-group/ui'
import { Button } from '@/shared/ui'

const getFormattedTitle = (date: Date): string => {
  const formattedDate = format(date, 'd MMMM, EEEE').toUpperCase() // например: 21 JUNE

  if (isToday(date)) return `TODAY, ${formattedDate}`
  if (isTomorrow(date)) return `TOMORROW, ${formattedDate}`
  if (isYesterday(date)) return `YESTERDAY, ${formattedDate}`

  return formattedDate
}

const ProjectList = () => {
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

  const isPast = isBefore(selectedDate, startOfDay(new Date()))

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Button onClick={goToPreviousDay} variant="outline">
          ←
        </Button>
        <h2 className="text-lg font-medium text-center">{formattedTitle}</h2>
        <Button onClick={goToNextDay} variant="outline">
          →
        </Button>
      </div>

      {isLoading && <p>Загрузка...</p>}
      {error && <p>Ошибка загрузки</p>}
      {!data?.length && <p>Проектов пока нет</p>}

      <ul className="grid gap-2">
        {data?.map(project => (
          <li
            key={project.id}
            className="grid grid-cols-[2fr_7fr_auto] items-center gap-4 p-2 border rounded-md"
          >
            <span className="truncate">{project.title}</span>
            <div className="flex flex-wrap gap-1">
              <SegmentGroup projectId={project.id} date={formattedDate} disabled={isPast} />
            </div>
            <div className="flex gap-1">
              <ProjectActionsMenu
                onArchive={() => handleArchive(project.id)}
                onHide={() => handleHide(project.id)}
                onDelete={() => handleDelete(project.id)}
                onEdit={() => setEditModalProject({ id: project.id, title: project.title })}
              />
            </div>
          </li>
        ))}
      </ul>

      {editModalProject && (
        <EditProjectModal
          open={!!editModalProject}
          onOpenChange={open => (!open ? setEditModalProject(null) : undefined)}
          projectId={editModalProject.id}
          initialTitle={editModalProject.title}
        />
      )}
    </>
  )
}

export default ProjectList
