import { cn } from '@/shared/libs/utils'

type SegmentCellProps = {
  index: number
  isCompleted: boolean
  onToggle: () => void
  label?: string
}

const SegmentCell = ({ isCompleted, onToggle, label }: SegmentCellProps) => {
  return (
    <div
      onClick={onToggle}
      className={cn(
        'w-4 h-4 rounded border border-gray-400 transition-colors cursor-pointer',
        isCompleted ? 'bg-green-500' : 'bg-transparent'
      )}
      title={label || ''}
    />
  )
}

export default SegmentCell
