export type Project = {
  id: string
  title: string
  createdAt: string // ISO timestamp или toDate().toISOString()
  isArchived: boolean
  isHidden: boolean
  activeDate?: string
}

export type NewProject = Omit<Project, 'id' | 'createdAt'> & {
  createdAt: unknown
}

// API types
export interface GetProjectsOptions {
  includeArchived?: boolean
  includeHidden?: boolean
}
