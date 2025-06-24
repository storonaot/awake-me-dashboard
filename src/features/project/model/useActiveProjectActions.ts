import { PROJECTS_CACHE_KEY, setActiveProjectForDateAPI } from '@/entities/project/model'
import type { Nullable } from '@/shared/utils/utility-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useActiveProjectActions = () => {
  const queryClient = useQueryClient()

  const setActive = useMutation({
    mutationFn: ({ projectId, date }: { projectId: string; date?: Nullable<string> }) =>
      setActiveProjectForDateAPI(projectId, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_CACHE_KEY] })
    },
  })

  return { setActive }
}
