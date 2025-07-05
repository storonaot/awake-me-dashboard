import { getProjectsAPI, PROJECTS_CACHE_KEY, type GetProjectsOptions } from '@/entities/project'
import { useQuery } from '@tanstack/react-query'

export const useProjects = (options?: GetProjectsOptions) => {
  return useQuery({
    queryKey: [PROJECTS_CACHE_KEY],
    queryFn: () => getProjectsAPI(options),
  })
}
