export type Segment = {
  id: string
  projectId: string
  date: string // ISO: '2025-06-20'
  duration: number // в минутах, по умолчанию 30
  // TODO: Nullable
  label?: string | null // например: 'Speaking'
  createdAt: string // ISO
  isCompleted: boolean
}

export type NewSegment = Omit<Segment, 'id' | 'createdAt'> & {
  createdAt: unknown
}
