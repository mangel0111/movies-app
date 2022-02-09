// eslint-disable-next-line no-unused-vars
import RESOURCES from '../constants/resources'
import { useQuery } from 'react-query'
import fetcher from '../lib/fetcher'

/**
 *
 * @param {keyof RESOURCES} resource
 * @returns
 */
const useResource = (resource) => {
  const { isLoading, data, error } = useQuery(resource, () => fetcher(resource))

  return [data, isLoading, error]
}

export default useResource
