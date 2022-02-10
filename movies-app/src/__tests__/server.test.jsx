import { rest } from 'msw'
import { setupServer } from 'msw/node'

const mockMovies = [
  {
    name: 'Movie test',
    genre: 6,
    img: 'https://google.com',
    studioId: '1',
  },
]

const server = setupServer(
  rest.get('/movies', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
