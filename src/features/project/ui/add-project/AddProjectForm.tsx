import { useState } from 'react'
import { useProjectActions } from '../../model'
import { Button, Input } from '@/shared/ui'

type Props = {
  onAfterCreate?: () => void
}

const AddProjectForm = ({ onAfterCreate }: Props) => {
  const [title, setTitle] = useState('')
  const {
    addProject: { mutate, isPending },
  } = useProjectActions()

  const handleAdd = (closeAfter = false) => {
    if (!title.trim()) return
    mutate(title, {
      onSuccess: () => {
        setTitle('')
        if (closeAfter) onAfterCreate?.()
      },
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Название проекта"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <div className="flex gap-2 justify-end">
        <Button disabled={isPending} onClick={() => handleAdd(false)}>
          Добавить
        </Button>
        <Button disabled={isPending} onClick={() => handleAdd(true)} variant="secondary">
          Добавить и закрыть
        </Button>
      </div>
    </div>
  )
}

export default AddProjectForm
