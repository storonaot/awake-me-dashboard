import type { FC } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
} from '@/shared/ui'
import { MoreHorizontal, Archive, EyeOff, Pencil, Trash } from 'lucide-react'

type ProjectActionsMenuProps = {
  onArchive: () => void
  onHide: () => void
  onEdit: () => void
  onDelete: () => void
  disabled?: boolean
}

const ProjectActionsMenu: FC<ProjectActionsMenuProps> = ({
  onArchive,
  onHide,
  onEdit,
  onDelete,
  disabled,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Редактировать
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onArchive}>
          <Archive className="mr-2 h-4 w-4" />
          Архив
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onHide}>
          <EyeOff className="mr-2 h-4 w-4" />
          Скрыть
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onDelete} className="text-red-500 focus:text-red-500">
          <Trash className="mr-2 h-4 w-4 text-red-500 focus:text-red-500" />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProjectActionsMenu
