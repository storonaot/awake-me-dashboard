import type { Project } from './types'

export const PROJECT_FIELDS = {
  id: 'id',
  title: 'title',
  createdAt: 'createdAt',
  isArchived: 'isArchived',
  isHidden: 'isHidden',
  activeDate: 'activeDate',
} as const satisfies Record<keyof Project, string>

export const PROJECTS_COLLECTION_NAME = 'projects'

export const PROJECTS_CACHE_KEY = 'projects'
