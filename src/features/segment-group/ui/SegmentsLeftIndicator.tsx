// import { SegmentCell } from '@/shared/ui'
import { Cell } from '@/shared/ui'
import type { FC } from 'react'

interface SegmentsLeftIndicatorProps {
  countLeft: number
}

const SegmentsLeftIndicator: FC<SegmentsLeftIndicatorProps> = ({ countLeft }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div>Left: </div>
      {Array.from({ length: countLeft }).map((_, index) => (
        <Cell key={index} bordered />
      ))}
    </div>
  )
}

export default SegmentsLeftIndicator
