import { useSegmentGroupActions } from '@/features/segment-group/model'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui'
import SegmentGroupForm from './SegmentGroupForm'
import type { FC } from 'react'

type Props = {
  open: boolean
  onOpenChange: (value: boolean) => void
  segmentGroupId: string
  initialValues: { label?: string; total: number }
}

const EditSegmentGroupModal: FC<Props> = ({
  open,
  onOpenChange,
  segmentGroupId,
  initialValues,
}) => {
  const { updateSegmentGroup } = useSegmentGroupActions()

  const handleSubmit = (values: { label?: string; total: number }) => {
    debugger

    updateSegmentGroup.mutate({
      id: segmentGroupId,
      updates: values,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать сегменты</DialogTitle>
        </DialogHeader>
        <SegmentGroupForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitText="Сохранить"
        />
      </DialogContent>
    </Dialog>
  )
}

export default EditSegmentGroupModal
