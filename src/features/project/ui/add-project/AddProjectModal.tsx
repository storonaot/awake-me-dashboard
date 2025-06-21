import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui'
import AddProjectForm from './AddProjectForm'

const AddProjectModal = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="default" size="icon">
        +
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Добавить проект</DialogTitle>
      </DialogHeader>
      <AddProjectForm />
    </DialogContent>
  </Dialog>
)

export default AddProjectModal
