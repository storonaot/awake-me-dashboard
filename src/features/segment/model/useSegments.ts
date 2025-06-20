import { useQuery } from '@tanstack/react-query'
import { getSegmentsAPI } from '@/entities/segment/model'

interface UseSegmentsParams {
  projectId: string
  date: string // формат YYYY-MM-DD
}

export const useSegments = ({ projectId, date }: UseSegmentsParams) => {
  return useQuery({
    queryKey: ['segments', projectId, date],
    queryFn: () => getSegmentsAPI({ projectId, date }),
    enabled: Boolean(projectId && date), // не делать запрос, пока не определены параметры
  })
}
