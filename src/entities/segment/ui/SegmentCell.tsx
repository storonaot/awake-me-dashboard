import { memo } from 'react'
import type { Segment } from '../model'
import { useSegmentActions } from '@/features/segment/model'

type SegmentCellProps = {
  segment: Segment
  //   onToggle?: (id: string, newValue: boolean) => void
}

const SegmentCell = ({ segment }: SegmentCellProps) => {
  const { toggleCompleteSegment } = useSegmentActions()

  const handleClick = () => {
    if (toggleCompleteSegment.isPending) return

    toggleCompleteSegment.mutate({
      id: segment.id,
      isCompleted: !segment.isCompleted,
    })
  }

  return (
    <div
      onClick={handleClick}
      style={{
        width: 16,
        height: 16,
        borderRadius: 4,
        backgroundColor: segment.isCompleted ? 'green' : 'transparent',
        border: '1px solid gray',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      title={segment.label || ''}
    />
  )
}

export default memo(SegmentCell, (prev, next) => {
  return (
    prev.segment.id === next.segment.id && prev.segment.isCompleted === next.segment.isCompleted
  )
})
