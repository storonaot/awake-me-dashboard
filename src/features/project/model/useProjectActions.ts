import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  deleteProject as deleteProjectAPI,
  archiveProject as archiveProjectAPI,
  hideProject as hideProjectAPI,
  addProject as addProjectAPI,
} from './project.api'

export const useProjectActions = () => {
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: addProjectAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProjectAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })

  const archiveMutation = useMutation({
    mutationFn: archiveProjectAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })

  const hideMutation = useMutation({
    mutationFn: hideProjectAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })

  return {
    addProject: addMutation,
    deleteProject: deleteMutation,
    archiveProject: archiveMutation,
    hideProject: hideMutation,
  }
}
