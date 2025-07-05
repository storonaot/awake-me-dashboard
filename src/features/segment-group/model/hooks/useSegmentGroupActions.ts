import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addSegmentGroupAPI,
  updateSegmentGroupAPI,
  deleteSegmentGroupAPI,
  type SegmentGroup,
  SEGMENT_GROUPS_CACHE_KEY,
} from '@/entities/segment-group'

export const useSegmentGroupActions = () => {
  const queryClient = useQueryClient()

  const _invalidate = () => queryClient.invalidateQueries({ queryKey: [SEGMENT_GROUPS_CACHE_KEY] })

  const add = useMutation({
    mutationFn: addSegmentGroupAPI,
    onSuccess: _invalidate,
  })

  const update = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<SegmentGroup> }) =>
      updateSegmentGroupAPI(id, updates),
    onSuccess: (_data, variables) => {
      const { updates } = variables
      const date = updates.date as string
      const projectId = updates.projectId as string

      // точечная инвалидизация по ключу
      if (date && projectId) {
        queryClient.invalidateQueries({ queryKey: [SEGMENT_GROUPS_CACHE_KEY, projectId, date] })
      }

      // и общая, если кто-то подписан на весь список
      queryClient.invalidateQueries({ queryKey: [SEGMENT_GROUPS_CACHE_KEY] })
    },
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteSegmentGroupAPI(id),
    onSuccess: _invalidate,
  })

  return {
    addSegmentGroup: add,
    updateSegmentGroup: update,
    deleteSegmentGroup: remove,
  }
}
