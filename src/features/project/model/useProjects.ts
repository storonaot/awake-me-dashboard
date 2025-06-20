import { getProjects } from '@/entities/project/model'
import { useQuery } from '@tanstack/react-query'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })
}
