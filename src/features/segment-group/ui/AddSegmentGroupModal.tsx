import { useSegmentGroupActions } from '@/features/segment-group/model'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui'
import SegmentGroupForm from './SegmentGroupForm'
import type { FC } from 'react'

type Props = {
  open: boolean
  onOpenChange: (value: boolean) => void
  projectId: string
  date: string
}

const AddSegmentGroupModal: FC<Props> = ({ open, onOpenChange, projectId, date }) => {
  const { addSegmentGroup } = useSegmentGroupActions()

  const handleSubmit = (values: { label?: string; total: number }) => {
    addSegmentGroup.mutate({
      ...values,
      projectId,
      date,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить сегменты</DialogTitle>
        </DialogHeader>
        <SegmentGroupForm onSubmit={handleSubmit} submitText="Добавить" />
      </DialogContent>
    </Dialog>
  )
}

export default AddSegmentGroupModal
