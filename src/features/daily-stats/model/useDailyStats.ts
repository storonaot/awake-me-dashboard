import { useQueries } from '@tanstack/react-query'
import {
  getSegmentGroupByProjectAndDateAPI,
  type SegmentGroup,
} from '@/entities/segment-group/model'

interface UseDailyStatsParams {
  date: string
  projectIds: string[]
}

export const useDailyStats = ({ date, projectIds }: UseDailyStatsParams) => {
  const queries = useQueries({
    queries: projectIds.map(projectId => ({
      queryKey: ['segment-group', projectId, date],
      queryFn: () => getSegmentGroupByProjectAndDateAPI(projectId, date),
      staleTime: 1000 * 60 * 5, // 5 минут
    })),
  })

  const isLoading = queries.some(q => q.isLoading)
  const data = queries.map(q => q.data).filter(Boolean) as SegmentGroup[]

  const total = data.reduce((acc, group) => acc + (group.total ?? 0), 0)
  const completed = data.reduce((acc, group) => acc + (group.completed ?? 0), 0)

  return {
    total,
    completed,
    isLoading,
  }
}
