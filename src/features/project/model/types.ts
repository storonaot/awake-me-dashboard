export type Project = {
  id: string
  title: string
  createdAt: string // ISO timestamp или toDate().toISOString()
  isArchived: boolean
  isHidden: boolean
}

export type NewProject = Omit<Project, 'id' | 'createdAt'> & {
  createdAt: unknown
}
