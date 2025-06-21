import { useEffect, useState, type FC } from 'react'
import { useProjectActions } from '../model'
import { Button, Input } from '@/shared/ui'

type ProjectFormProps = {
  onAfterSubmit?: () => void
  projectId?: string
  initialTitle?: string
}

const ProjectForm: FC<ProjectFormProps> = ({ onAfterSubmit, projectId, initialTitle = '' }) => {
  const [title, setTitle] = useState(initialTitle)

  const {
    addProject: { mutate: add, isPending: isAdding },
    updateProject: { mutate: update, isPending: isUpdating },
  } = useProjectActions()

  const isEdit = Boolean(projectId)
  const isPending = isAdding || isUpdating

  useEffect(() => {
    setTitle(initialTitle)
  }, [initialTitle])

  const handleSubmitCreate = (closeAfter: boolean) => {
    if (!title.trim()) return

    add(title, {
      onSuccess: () => {
        setTitle('')
        if (closeAfter) onAfterSubmit?.()
      },
    })
  }

  const handleSubmitEdit = () => {
    if (!title.trim() || !projectId) return

    update(
      {
        id: projectId,
        payload: { title },
      },
      {
        onSuccess: () => {
          onAfterSubmit?.()
        },
      }
    )
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
        {isEdit ? (
          <Button disabled={isPending} onClick={handleSubmitEdit}>
            Сохранить
          </Button>
        ) : (
          <>
            <Button disabled={isPending} onClick={() => handleSubmitCreate(false)}>
              Добавить
            </Button>
            <Button
              disabled={isPending}
              onClick={() => handleSubmitCreate(true)}
              variant="secondary"
            >
              Добавить и закрыть
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default ProjectForm
