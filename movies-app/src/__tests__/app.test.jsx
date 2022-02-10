import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import withQueryClient from '../hoc/withQueryClient'

describe('Main app', () => {
  it('Queries movies correctly', async () => {
    render(withQueryClient(<App />))

    await waitFor(() => screen.getByRole('searchbox'))

    expect(screen.getByRole('searchbox')).toBeDefined()

    userEvent.click(screen.getByRole('searchbox'))
    userEvent.type(screen.getByRole('searchbox'), 'test')

    // await waitFor(() => screen.getByText('Test movie')) //?
  })
})
