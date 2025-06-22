import type { SegmentGroup } from './types'

export const SEGMENT_GROUP_FIELDS = {
  id: 'id',
  projectId: 'projectId',
  date: 'date',
  label: 'label',
  total: 'total',
  completed: 'completed',
  createdAt: 'createdAt',
  duration: 'duration',
} as const satisfies Record<keyof SegmentGroup, string>

export const SEGMENT_GROUPS_COLLECTION_NAME = 'segmentGroups'
