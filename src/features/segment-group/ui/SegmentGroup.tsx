import { useState, type FC } from 'react'
import { Pencil, Trash, Upload } from 'lucide-react'
import { Badge, Button } from '@/shared/ui'
import {
  useSegmentGroupByProjectAndDate,
  useSegmentGroupActions,
} from '@/features/segment-group/model'
import {
  SegmentCell,
  AddSegmentGroupModal,
  EditSegmentGroupModal,
} from '@/features/segment-group/ui'
import { cn } from '@/shared/libs/utils'
import { useImportSegmentGroupFromPreviousDay } from '@/features/segment-group/model'
import { toast } from 'sonner'

type SegmentGroupProps = {
  date: string
  projectId: string
  disabled?: boolean
}

const SegmentGroup: FC<SegmentGroupProps> = ({ date, projectId, disabled }) => {
  const { data, isLoading, error } = useSegmentGroupByProjectAndDate({ projectId, date })
  const { updateSegmentGroup, deleteSegmentGroup } = useSegmentGroupActions()
  const importFromPrevious = useImportSegmentGroupFromPreviousDay()

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

  const handleImport = async () => {
    try {
      await importFromPrevious.mutateAsync({ projectId, date })
      toast.success('Сегменты импортированы из последнего дня')
    } catch {
      toast.error('Не удалось найти предыдущие сегменты')
    }
  }

  if (isLoading) return <div>Загрузка сегментов...</div>
  if (error) return <div>Ошибка загрузки сегментов</div>

  return (
    <div className="relative">
      <div className={cn('transition-all', disabled && 'pointer-events-none opacity-50 grayscale')}>
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
              {data.label && <Badge>{data.label}</Badge>}
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => setIsEditOpen(true)}>
                  <Pencil size={16} />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleDelete}>
                  <Trash size={16} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button size="icon" variant="ghost" onClick={() => setIsAddOpen(true)}>
                +
              </Button>
              <Button size="icon" variant="ghost" onClick={handleImport}>
                <Upload size={16} />
              </Button>
            </>
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
      </div>
      {disabled && (
        <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm rounded-md" />
      )}
    </div>
  )
}

export default SegmentGroup
