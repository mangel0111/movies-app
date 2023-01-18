import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import App from './App';
import { reduxRender } from './test/test-utils';

jest.mock('./components/MovieFilter', () => () => <p>MovieFilter</p>);

const movies = [
  [1, 'Movie 1', 6, 'https://www.google.com/image1.jpg', '1'],
  [2, 'Movie 2', 4, 'https://www.google.com/image2.jpg', '1'],
  [3, 'Movie 3', 6, 'https://www.google.com/image3.jpg', '2'],
].map(([id, name, genre, img, studioId]) => ({ id, name, genre, img, studioId }));

const studios = [
  ['1', 'Disney Studios'],
  ['2', 'Warner Bros'],
  ['3', 'Sony Pictures'],
].map(([id, name]) => ({ id, name }));

// handlers to intercept endpoint calls done in App component
const handlers = [
  rest.get('*/movies', (req, res, ctx) => res(ctx.json(movies))),
  rest.get('*/studios', (req, res, ctx) => res(ctx.json(studios))),
];

const server = setupServer(...handlers);

describe('App', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render loading on first render', () => {
    reduxRender(<App />);

    const loader = screen.getByTestId('spinner');
    const imagesTitle = screen.queryByText('Images:');

    expect(loader).toBeTruthy();
    expect(imagesTitle).toBeNull();
  });

  it('should render movies list after fetching data', async () => {
    reduxRender(<App />);

    // this one awaits until the element is visible, by that moment data is already fetched (not loading)
    const imagesTitle = await screen.findByText('Images:');
    const loader = screen.queryByTestId('spinner');
    const items = screen.queryAllByTestId('griditem');

    expect(imagesTitle).toBeTruthy();
    expect(loader).toBeNull();
    expect(items).toHaveLength(3);
  });
});
