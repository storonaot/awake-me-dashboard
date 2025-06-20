import { useQuery } from '@tanstack/react-query'
import { getProjects } from './project.api'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })
}
