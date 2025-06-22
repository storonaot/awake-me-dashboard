import { useState } from 'react'
import { Pencil, Trash } from 'lucide-react'
import { Button } from '@/shared/ui'
import {
  useSegmentGroupByProjectAndDate,
  useSegmentGroupActions,
} from '@/features/segment-group/model'
import {
  SegmentCell,
  AddSegmentGroupModal,
  EditSegmentGroupModal,
} from '@/features/segment-group/ui'

type SegmentGroupProps = {
  date: string
  projectId: string
}

const SegmentGroup = ({ date, projectId }: SegmentGroupProps) => {
  const { data, isLoading, error } = useSegmentGroupByProjectAndDate({ projectId, date })
  const { updateSegmentGroup, deleteSegmentGroup } = useSegmentGroupActions()

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const toggleComplete = (index: number) => {
    if (!data) return
    const completed = data.completed ?? 0

    const newCompleted = index === 0 && completed > 0 ? 0 : index < completed ? index : index + 1

    updateSegmentGroup.mutate({
      id: data.id,
      updates: { completed: newCompleted },
    })
  }

  const handleDelete = () => {
    if (data) {
      deleteSegmentGroup.mutate(data.id)
    }
  }

  if (isLoading) return <div>Загрузка сегментов...</div>
  if (error) return <div>Ошибка загрузки сегментов</div>

  return (
    <div className="flex items-center gap-2">
      {data ? (
        <>
          {Array.from({ length: data.total }).map((_, index) => (
            <SegmentCell
              key={index}
              index={index}
              onToggle={() => toggleComplete(index)}
              isCompleted={index < (data.completed || 0)}
            />
          ))}
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={() => setIsEditOpen(true)}>
              <Pencil size={16} />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleDelete}>
              <Trash size={16} />
            </Button>
          </div>
          <div>{data.label}</div>
        </>
      ) : (
        <Button size="icon" variant="ghost" onClick={() => setIsAddOpen(true)}>
          +
        </Button>
      )}

      <AddSegmentGroupModal
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        projectId={projectId}
        date={date}
      />

      {data && (
        <EditSegmentGroupModal
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          segmentGroupId={data.id}
          initialValues={{ label: data.label ?? '', total: data.total }}
        />
      )}
    </div>
  )
}

export default SegmentGroup
