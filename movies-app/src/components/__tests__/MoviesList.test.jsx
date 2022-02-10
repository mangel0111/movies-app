import MoviesList from '../MoviesList'
import { render, waitFor, screen } from '@testing-library/react'
import { mockMovies, mockStudios } from '../../constants/data'

describe('MoviesList', () => {
  it('Renders correctly with correct data', async () => {
    render(<MoviesList movies={mockMovies} studios={mockStudios} />)
    await waitFor(() => screen.getByTestId('movie-list'))
    expect(screen.getByTestId('movie-list')).toBeDefined()
  })
})
