import { cn } from '@/shared/libs/utils'

type SegmentCellProps = {
  index: number
  isCompleted: boolean
  onToggle: () => void
  label?: string
}

const SegmentCell = ({ isCompleted, onToggle, label }: SegmentCellProps) => {
  return (
    // <div
    //   onClick={onToggle}
    //   className={cn(
    //     'w-4 h-4 rounded border border-gray-400 transition-colors cursor-pointer',
    //     isCompleted ? 'bg-green-500' : 'bg-transparent'
    //   )}
    //   title={label || ''}
    // />

    <div
      onClick={onToggle}
      className={cn(
        'h-6 w-8 min-w-[24px] rounded-full px-2 transition-colors cursor-pointer text-sm',
        isCompleted ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/70'
      )}
      // className={cn(
      //   'w-8 h-4 rounded-full border border-gray-400 transition-colors cursor-pointer',
      //   isCompleted ? 'bg-green-500' : 'bg-transparent'
      // )}
      // title={`Сегмент ${index + 1}`}
    >
      {label}
    </div>
  )
}

export default SegmentCell
