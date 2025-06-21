import { AddProjectModal, ProjectList } from '@/features/project/ui'
import { Button } from '@/shared/ui'
import { DialogTrigger } from '@/shared/ui/dialog'
import { format } from 'date-fns'

const TodayProjects = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Today / {format(new Date(), 'dd MMMM yyyy')}
        </h2>
        <AddProjectModal />
      </div>
      <ProjectList />
    </div>
  )
}

export default TodayProjects
