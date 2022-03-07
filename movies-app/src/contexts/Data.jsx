import { createContext, useMemo, useState } from 'react'
import axios from '../../node_modules/axios/index'
import config from '../constants/config'
import RESOURCES from '../constants/resources'
import useFilter from '../hooks/useFilter'
import useResource from '../hooks/useResource'
import { mutator } from '../lib/fetcher'

export const DataContext = createContext({
  loading: true,
  studios: [],
  movies: [],
  filterFields: {},
  isSameStudio: null,
  movieSelected: null,
  studioSelected: null,
  transferLoading: false,
  handleFilterChange: (_str) => null,
  handleTransferOwnership: (_movie, _studioToTransfer) => null,
  handleElementSelect: (_type, _value) => null,
})

export const DataProvider = ({ children }) => {
  const [fields] = useState({
    name: 'string',
    genre: 'string',
    price: 'number',
  })
  const [transferLoading, setTransferLoading] = useState(false)
  const [studios, studiosLoading] = useResource(RESOURCES['GET'].studios)
  const [rawMovies, moviesLoading] = useResource(RESOURCES['GET'].movies)
  const [movies, , handleFilterChange] = useFilter({
    data: rawMovies,
    fields,
  })

  const [movieIdSelected, setMovieIdSelected] = useState(null)
  const [studioIdSelected, setStudioIdSelected] = useState(null)

  const movieSelected = useMemo(
    () => movies && movies?.find((movie) => movie.id === movieIdSelected),
    [movieIdSelected, movies]
  )
  const studioSelected = useMemo(
    () =>
      !!studios && studios?.find((studio) => studio.id === studioIdSelected),
    [studioIdSelected, studios]
  )

  /**
   *
   * @param {"movie" | "studio"} type
   * @param {string} value
   */
  const handleElementSelect = (type, value) => {
    if (type === 'movie') return setMovieIdSelected(value)
    if (type === 'studio') return setStudioIdSelected(value)
  }

  const handleTransferOwnership = async (movie, studioToTransfer) => {
    setTransferLoading(true)
    console.log('START')
    try {
      const res = await mutator('POST', 'transfer', {
        originId: movie.studioId,
        destinationId: studioToTransfer.id,
        movieId: movie.id,
      })
      console.log({ res })
      // TODO: handle this
    } catch (error) {
      console.log({ error })
    } finally {
      setTransferLoading(false)
    }
  }

  /**
   * TODO: Should it be here? Or in the component itself?
   */
  const isSameStudio = useMemo(
    () =>
      movieSelected &&
      studioSelected &&
      studioSelected.id === movieSelected.studioId,
    [studioSelected, movieSelected]
  )

  return (
    <DataContext.Provider
      value={{
        movies,
        studios,
        isSameStudio,
        filterFields: fields,
        movieSelected,
        studioSelected,
        transferLoading,
        handleFilterChange,
        handleElementSelect,
        handleTransferOwnership,
        loading: studiosLoading || moviesLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
