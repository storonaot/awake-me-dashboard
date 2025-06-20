import type { Segment } from './types'

export const SEGMENT_FIELDS = {
  id: 'id',
  projectId: 'projectId',
  date: 'date',
  duration: 'duration',
  label: 'label',
  createdAt: 'createdAt',
  isCompleted: 'isCompleted',
} as const satisfies Record<keyof Segment, string>

export const SEGMENTS_COLLECTION_NAME = 'segments'
