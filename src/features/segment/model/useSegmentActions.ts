import { addSegmentAPI, updateSegmentAPI } from '@/entities/segment/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSegmentActions = () => {
  const queryClient = useQueryClient()

  const add = useMutation({
    mutationFn: addSegmentAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['segments'] }),
  })

  const toggleComplete = useMutation<void, Error, { id: string; isCompleted: boolean }>({
    mutationFn: ({ id, isCompleted }) => updateSegmentAPI(id, { isCompleted }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['segments'] })
    },
  })

  return {
    addSegment: add,
    toggleCompleteSegment: toggleComplete,
  }
}
