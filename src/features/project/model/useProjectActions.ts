import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  deleteProjectAPI,
  updateProjectAPI,
  addProjectAPI,
  PROJECT_FIELDS,
  type Project,
} from '@/entities/project/model'

export const useProjectActions = () => {
  const queryClient = useQueryClient()

  const _invalidate = () => queryClient.invalidateQueries({ queryKey: ['projects'] })

  const add = useMutation({
    mutationFn: addProjectAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
    onError: (error: Error) => {
      alert(error.message)
    },
  })

  const remove = useMutation({
    mutationFn: deleteProjectAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })

  const archive = useMutation({
    mutationFn: (id: string) => updateProjectAPI(id, { [PROJECT_FIELDS.isArchived]: true }),
    onSuccess: _invalidate,
  })

  const hide = useMutation({
    mutationFn: (id: string) => updateProjectAPI(id, { [PROJECT_FIELDS.isHidden]: true }),
    onSuccess: _invalidate,
  })

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Omit<Project, 'id'>> }) =>
      updateProjectAPI(id, payload),
    onSuccess: _invalidate,
  })

  return {
    addProject: add,
    deleteProject: remove,
    archiveProject: archive,
    hideProject: hide,
    updateProject: update,
  }
}
