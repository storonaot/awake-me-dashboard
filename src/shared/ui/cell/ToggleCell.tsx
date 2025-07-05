import { Cell } from '.'

type ToggleCellProps = {
  value: boolean
  onToggle: () => void
  label?: string
  bordered?: boolean
  className?: string
}

const ToggleCell = ({ value, onToggle, label, className }: ToggleCellProps) => {
  return <Cell filled={value} onClick={onToggle} label={label} className={className} />
}

export default ToggleCell
