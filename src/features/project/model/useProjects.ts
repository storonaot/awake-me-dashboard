import { PROJECTS_CACHE_KEY, type GetProjectsOptions } from '@/entities/project/model'
import { getProjectsAPI } from '@/entities/project/model'
import { useQuery } from '@tanstack/react-query'

export const useProjects = (options?: GetProjectsOptions) => {
  return useQuery({
    queryKey: [PROJECTS_CACHE_KEY, options],
    queryFn: () => getProjectsAPI(options),
  })
}
