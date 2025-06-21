import { useCallback, useState } from 'react'
import { useProjectActions, useProjects } from '../model'
import { SegmentList } from '@/features/segment/ui'
import { format } from 'date-fns'
import ProjectActionsMenu from './ProjectActionsMenu'
import EditProjectModal from './EditProjectModal'

const today = format(new Date(), 'yyyy-MM-dd')

const ProjectList = () => {
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

  if (isLoading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка загрузки</p>
  if (!data?.length) return <p>Проектов пока нет</p>

  return (
    <>
      <ul className="grid gap-2">
        {data.map(project => (
          <li
            key={project.id}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-4 p-2 border rounded-md"
          >
            <span className="truncate">{project.title}</span>
            <div className="flex flex-wrap gap-1">
              <SegmentList projectId={project.id} date={today} />
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

// import { useCallback } from 'react'
// import { useProjectActions, useProjects } from '../model'
// import { SegmentList } from '@/features/segment/ui'
// import { format } from 'date-fns'
// import ProjectActionsMenu from './ProjectActionsMenu'

// const today = format(new Date(), 'yyyy-MM-dd')

// const ProjectList = () => {
//   const { data, isLoading, error } = useProjects()

//   const { deleteProject, archiveProject, hideProject } = useProjectActions()

//   const handleDelete = useCallback(
//     (id: string) => {
//       if (confirm('Удалить проект?')) deleteProject.mutate(id)
//     },
//     [deleteProject]
//   )

//   const handleArchive = useCallback(
//     (id: string) => {
//       archiveProject.mutate(id)
//     },
//     [archiveProject]
//   )

//   const handleHide = useCallback(
//     (id: string) => {
//       hideProject.mutate(id)
//     },
//     [hideProject]
//   )

//   if (isLoading) return <p>Загрузка...</p>
//   if (error) return <p>Ошибка загрузки</p>
//   if (!data?.length) return <p>Проектов пока нет</p>

//   return (
//     <ul className="grid gap-2">
//       {data.map(project => (
//         <li
//           key={project.id}
//           className="grid grid-cols-[1fr_auto_auto] items-center gap-4 p-2 border rounded-md"
//         >
//           <span className="truncate">{project.title}</span>
//           <div className="flex flex-wrap gap-1">
//             <SegmentList projectId={project.id} date={today} />
//           </div>
//           <div className="flex gap-1">
//             <ProjectActionsMenu
//               onArchive={() => handleArchive(project.id)}
//               onHide={() => handleHide(project.id)}
//               onDelete={() => handleDelete(project.id)}
//               onEdit={() => {}}
//             />
//           </div>
//         </li>
//       ))}
//     </ul>
//   )
// }

export default ProjectList
