import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addSegmentGroupAPI,
  updateSegmentGroupAPI,
  deleteSegmentGroupAPI,
  type SegmentGroup,
} from '@/entities/segment-group/model'

export const useSegmentGroupActions = () => {
  const queryClient = useQueryClient()

  const _invalidate = () => queryClient.invalidateQueries({ queryKey: ['segmentGroup'] })

  const add = useMutation({
    mutationFn: addSegmentGroupAPI,
    onSuccess: _invalidate,
  })

  const update = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<SegmentGroup> }) =>
      updateSegmentGroupAPI(id, updates),
    onSuccess: _invalidate,
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
