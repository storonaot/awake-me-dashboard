export type SegmentGroup = {
  id: string
  projectId: string
  date: string // ISO-строка '2025-06-21'
  label?: string
  total: number // default 1
  completed: number // default 0
  createdAt: string
  duration: number // в минутахб дефолт 30
}

export type NewSegmentGroup = Omit<SegmentGroup, 'id' | 'createdAt'> & {
  createdAt: unknown
}
