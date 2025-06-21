import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui'
import { useState } from 'react'
import AddProjectForm from './AddProjectForm'

const AddProjectModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="icon">
          +
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить проект</DialogTitle>
        </DialogHeader>
        <AddProjectForm onAfterCreate={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default AddProjectModal
