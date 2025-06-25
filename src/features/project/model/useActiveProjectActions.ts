import { PROJECTS_CACHE_KEY, setActiveProjectForDateAPI } from '@/entities/project/model'
import type { Nullable } from '@/shared/utils/utility-types'
import type { Project } from '@/entities/project/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useActiveProjectActions = () => {
  const queryClient = useQueryClient()

  const setActive = useMutation({
    mutationFn: ({ projectId, date }: { projectId: string; date?: Nullable<string> }) =>
      setActiveProjectForDateAPI(projectId, date),

    onMutate: async ({ projectId, date }) => {
      await queryClient.cancelQueries({ queryKey: [PROJECTS_CACHE_KEY] })

      const previous = queryClient.getQueryData<Project[]>([PROJECTS_CACHE_KEY])
      if (!previous) return

      const updated = previous.map(p =>
        p.id === projectId
          ? { ...p, activeDate: date }
          : p.activeDate === date
            ? { ...p, activeDate: undefined }
            : p
      )

      queryClient.setQueryData([PROJECTS_CACHE_KEY], updated)

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData([PROJECTS_CACHE_KEY], context.previous)
      }
    },

    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [PROJECTS_CACHE_KEY], exact: false })
      }, 500)
    },
  })

  return { setActive }
}
