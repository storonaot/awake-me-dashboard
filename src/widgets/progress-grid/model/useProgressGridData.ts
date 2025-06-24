import type { SegmentGroup } from '@/entities/segment-group/model'
import { useProjects } from '@/features/project/model'
import { useSegmentGroupsInRange } from '@/features/segment-group/model'
import { format } from 'date-fns'
import { useMemo } from 'react'

export const useProgressGridData = (dateRange: string[]) => {
  const { data: projects, isLoading: isProjectsLoading } = useProjects({ includeArchived: true })
  const projectIds = useMemo(() => projects?.map(p => p.id) ?? [], [projects])

  const { data: segmentGroups, isLoading: isGroupsLoading } = useSegmentGroupsInRange(
    projectIds,
    dateRange[0],
    dateRange[dateRange.length - 1]
  )

  const segmentMap = useMemo(() => {
    const map = new Map<string, Map<string, SegmentGroup>>()
    segmentGroups?.forEach(group => {
      const date = format(group.date, 'yyyy-MM-dd')
      if (!map.has(group.projectId)) map.set(group.projectId, new Map())
      map.get(group.projectId)!.set(date, group)
    })
    return map
  }, [segmentGroups])

  return {
    projects,
    segmentMap,
    isProjectsLoading,
    isGroupsLoading,
  }
}
