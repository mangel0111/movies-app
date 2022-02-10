import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { useContext } from 'react'
import { DataContext } from '../contexts/Data'

const MovieFilter = () => {
  const { filterFields, handleFilterChange } = useContext(DataContext)
  const text = `Search by ${Object.keys(filterFields)
    .slice(0, -1)
    .join(', ')} or ${Object.keys(filterFields).slice(-1)}`
  return (
    <Box>
      <TextField
        role="searchbox"
        onChange={(e) => handleFilterChange(e.target.value)}
        placeholder={text}
      />
    </Box>
  )
}

export default MovieFilter
