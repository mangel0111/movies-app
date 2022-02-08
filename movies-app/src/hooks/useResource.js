import { useQuery } from 'react-query'
import fetcher from '../lib/fetcher'

const useResource = (resource) => {
  const { isLoading, data, error } = useQuery(resource, () => fetcher(resource))

  return [data, isLoading, error]
}

export default useResource
