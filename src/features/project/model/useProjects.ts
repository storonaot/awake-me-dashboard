import {
  getProjectsAPI_deprecated,
  PROJECTS_CACHE_KEY,
  type GetProjectsOptions,
} from '@/entities/project/model'
import { getProjectsAPI } from '@/entities/project/model'
import { useQuery } from '@tanstack/react-query'

export const useProjects_deprecated = () => {
  return useQuery({
    queryKey: [PROJECTS_CACHE_KEY],
    queryFn: getProjectsAPI_deprecated,
  })
}

export const useProjects = (options?: GetProjectsOptions) => {
  return useQuery({
    queryKey: ['projects', options],
    queryFn: () => getProjectsAPI(options),
  })
}
