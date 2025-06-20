import { useCallback } from 'react'
import { useProjectActions, useProjects } from '../model'

const ProjectList = () => {
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

  if (isLoading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка загрузки</p>
  if (!data?.length) return <p>Проектов пока нет</p>

  return (
    <ul>
      {data.map(project => (
        <li key={project.id}>
          {project.title} <button onClick={() => handleArchive(project.id)}>архив</button>{' '}
          <button onClick={() => handleHide(project.id)}>скрыть</button>{' '}
          <button onClick={() => handleDelete(project.id)}>удалить</button>
        </li>
      ))}
    </ul>
  )
}

export default ProjectList
