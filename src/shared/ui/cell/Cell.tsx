import { cn } from '@/shared/libs/utils'

type CellProps = {
  filled?: boolean
  bordered?: boolean
  label?: string
  onClick?: () => void
  className?: string
}

const Cell = ({ filled = false, bordered = false, label, onClick, className }: CellProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'h-6 w-8 min-w-[24px] px-2 text-sm text-center cursor-pointer transition-colors rounded-full',
        filled ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/70',
        bordered && 'border border-muted-foreground',
        className
      )}
    >
      {label}
    </div>
  )
}

export default Cell
