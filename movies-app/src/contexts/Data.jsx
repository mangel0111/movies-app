import { createContext, useMemo, useState } from 'react'
import RESOURCES from '../constants/resources'
import useFilter from '../hooks/useFilter'
import useResource from '../hooks/useResource'

const fields = { name: 'string', genre: 'string', price: 'number' }

export const DataContext = createContext({
  loading: true,
  studios: [],
  movies: [],
  filterFields: {},
  movieSelected: null,
  studioSeleted: null,
  isSameStudio: null,
  handleFilterChange: (str) => null,
  handleElementSelect: (type, value) => null,
})

export const DataProvider = ({ children }) => {
  const [fields] = useState({
    name: 'string',
    genre: 'string',
    price: 'number',
  })
  const [studios, studiosLoading] = useResource(RESOURCES.studios)
  const [rawMovies, moviesLoading] = useResource(RESOURCES.movies)
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
        handleFilterChange,
        handleElementSelect,
        loading: studiosLoading || moviesLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
