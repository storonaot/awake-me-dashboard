import { useQuery } from '@tanstack/react-query'
import { getSegmentGroupByProjectAndDateAPI } from '@/entities/segment-group/model'

interface Params {
  projectId: string
  date: string // ISO string, e.g., '2025-06-21'
}

export const useSegmentGroupByProjectAndDate = ({ projectId, date }: Params) => {
  return useQuery({
    queryKey: ['segmentGroup', projectId, date],
    queryFn: () => getSegmentGroupByProjectAndDateAPI(projectId, date),
    enabled: !!projectId && !!date,
  })
}
