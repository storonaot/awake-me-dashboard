import { useState } from 'react'
import { Button } from '@/shared/ui'
import { useProjectActions } from '../../model'

const AddProjectForm = () => {
  const [title, setTitle] = useState('')
  const {
    addProject: { mutate, isPending },
  } = useProjectActions()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!title.trim()) return

    mutate(title, {
      onSuccess: () => {
        setTitle('')
      },
      onError: () => {
        setTitle('')
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        type="text"
        placeholder="Название проекта"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Button type="submit" disabled={isPending}>
        Добавить
      </Button>
    </form>
  )
}

export default AddProjectForm
