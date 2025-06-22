import { useState, useEffect, type FC } from 'react'
import { Button, Input } from '@/shared/ui'

type SegmentGroupFormProps = {
  initialValues?: {
    label?: string
    total: number
  }
  onSubmit: (values: { label?: string; total: number }) => void
  submitText?: string
}

const SegmentGroupForm: FC<SegmentGroupFormProps> = ({
  initialValues,
  onSubmit,
  submitText = 'Сохранить',
}) => {
  const [label, setLabel] = useState('')
  const [total, setTotal] = useState(1)

  useEffect(() => {
    if (initialValues) {
      setLabel(initialValues.label || '')
      setTotal(initialValues.total)
    }
  }, [initialValues])

  const handleSubmit = () => {
    if (total < 1) return
    onSubmit({ label: label.trim() || undefined, total })
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Метка (опционально)"
        value={label}
        onChange={e => setLabel(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Количество сегментов"
        value={total}
        onChange={e => setTotal(Number(e.target.value))}
        min={1}
        required
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>{submitText}</Button>
      </div>
    </div>
  )
}

export default SegmentGroupForm
