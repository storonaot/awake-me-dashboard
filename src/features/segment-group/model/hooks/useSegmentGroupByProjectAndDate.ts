import { useQuery } from '@tanstack/react-query'
import {
  getSegmentGroupByProjectAndDateAPI,
  SEGMENT_GROUPS_CACHE_KEY,
} from '@/entities/segment-group/model'

interface Params {
  projectId: string
  date: string // ISO string, e.g., '2025-06-21'
}

export const useSegmentGroupByProjectAndDate = ({ projectId, date }: Params) => {
  return useQuery({
    queryKey: [SEGMENT_GROUPS_CACHE_KEY, projectId, date],
    queryFn: () => getSegmentGroupByProjectAndDateAPI(projectId, date),
    enabled: !!projectId && !!date,
  })
}
