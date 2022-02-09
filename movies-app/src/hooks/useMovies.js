import useResource from './useResource'
import RESOURCES from '../constants/resources'
import { useEffect } from 'react'
import { useState } from 'react'

/**
 *
 * NOTE: Not in use right now
 */
const useMovies = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [studios, studiosLoading] = useResource(RESOURCES.studios)
  const [rawMovies, moviesLoading] = useResource(RESOURCES.movies)

  useEffect(() => {
    if (studiosLoading || moviesLoading || !studios || !rawMovies) return
    const newData = rawMovies.map()
  }, [moviesLoading, rawMovies, studios, studiosLoading])

  useEffect(() => {
    setLoading(studiosLoading || moviesLoading)
  }, [moviesLoading, studiosLoading])

  return [data, loading]
}
