import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui'
import ProjectForm from './ProjectForm'

type EditProjectModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  initialTitle: string
}

const EditProjectModal = ({
  open,
  onOpenChange,
  projectId,
  initialTitle,
}: EditProjectModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Редактировать проект</DialogTitle>
      </DialogHeader>
      <ProjectForm
        projectId={projectId}
        initialTitle={initialTitle}
        onAfterSubmit={() => onOpenChange(false)}
      />
    </DialogContent>
  </Dialog>
)

export default EditProjectModal
