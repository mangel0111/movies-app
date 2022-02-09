import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

const MovieFilter = ({ fields, handleChange }) => {
  const text = `Search by ${fields.slice(0, -1).join(', ')} or ${fields.slice(
    -1
  )}`
  return (
    <Box>
      <TextField
        role="searchbox"
        onChange={(e) => handleChange(e.target.value)}
        placeholder={text}
      />
    </Box>
  )
}

export default MovieFilter
