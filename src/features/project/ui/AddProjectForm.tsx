import { useState } from 'react'
import { useProjectActions } from '../model'

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
      <button type="submit" disabled={isPending}>
        Добавить
      </button>
    </form>
  )
}

export default AddProjectForm
