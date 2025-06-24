import { getProjectsAPI, PROJECTS_CACHE_KEY } from '@/entities/project/model'
import { useQuery } from '@tanstack/react-query'

export const useProjects = () => {
  return useQuery({
    queryKey: [PROJECTS_CACHE_KEY],
    queryFn: getProjectsAPI,
  })
}
