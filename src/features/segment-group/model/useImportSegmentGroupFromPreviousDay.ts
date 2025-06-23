import {
  addSegmentGroupAPI,
  getLastSegmentGroupForProjectAPI,
} from '@/entities/segment-group/model/segment-group.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useImportSegmentGroupFromPreviousDay = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ projectId, date }: { projectId: string; date: string }) => {
      const lastGroup = await getLastSegmentGroupForProjectAPI(projectId, date)

      if (!lastGroup) {
        toast('Не удалось импортировать', {
          description: 'Нет данных о сегментах в предыдущие дни',
        })
        throw new Error('Нет данных о сегментах') // нужен throw, чтобы onError отработал
      }

      await addSegmentGroupAPI({
        projectId,
        date,
        total: lastGroup.total,
        label: lastGroup.label ?? undefined,
      })
    },
    onSuccess: () => {
      toast('Сегменты импортированы', {
        description: 'Скопированы из последнего активного дня',
      })
      queryClient.invalidateQueries({ queryKey: ['segmentGroup'] })
    },
    onError: () => {
      toast.error('Ошибка импорта', {
        description: 'Что-то пошло не так при импорте сегментов',
      })
    },
  })
}
