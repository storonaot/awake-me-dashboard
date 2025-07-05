// import { SegmentCell } from '@/shared/ui'
import { Cell } from '@/shared/ui'
import type { FC } from 'react'

interface SegmentsLeftIndicatorProps {
  countLeft: number
}

const SegmentsLeftIndicator: FC<SegmentsLeftIndicatorProps> = ({ countLeft }) => {
  return (
    <div>
      {countLeft}
      <Cell bordered />
    </div>
  )
}

export default SegmentsLeftIndicator
