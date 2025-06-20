import { SegmentCell } from '@/entities/segment/ui'
import { useSegmentActions, useSegments } from '../model'

import { format } from 'date-fns'

const today = format(new Date(), 'yyyy-MM-dd')

type SegmentListProps = {
  date: string
  projectId: string
}

const SegmentList = ({ date, projectId }: SegmentListProps) => {
  const { data, isLoading, error } = useSegments({ date, projectId })
  const { addSegment } = useSegmentActions()

  const createSegment = () => {
    // addSegment.mutate()
    addSegment.mutate({ projectId, date: today })
  }

  if (isLoading) return <div>Загрузка сегментов...</div>
  if (error) return <div>Ошибка загрузки сегментов</div>

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {(data || []).map(segment => (
        <SegmentCell key={segment.id} segment={segment} />
      ))}
      <button onClick={createSegment}>+</button>
    </div>
  )
}

export default SegmentList
