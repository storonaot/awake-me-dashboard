import { useQuery } from '@tanstack/react-query'
import {
  getSegmentGroupsInRangeAPI,
  SEGMENT_GROUPS_IN_RANGE_CACHE_KEY,
} from '@/entities/segment-group/model'

export const useSegmentGroupsInRange = (projectIds: string[], start: string, end: string) => {
  return useQuery({
    queryKey: [SEGMENT_GROUPS_IN_RANGE_CACHE_KEY, projectIds, start, end],
    queryFn: () => getSegmentGroupsInRangeAPI(projectIds, start, end),
    enabled: projectIds.length > 0,
  })
}
