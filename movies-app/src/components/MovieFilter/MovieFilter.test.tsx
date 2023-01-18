import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { reduxRender } from '../../test/test-utils';
import MovieFilter from './MovieFilter';

const handlers = [rest.get('*/genres', (req, res, ctx) => res(ctx.json([])))];

const server = setupServer(...handlers);

const filter = { minPrice: 100, maxPrice: 500, name: 'av' };
const setFilterFn = jest.fn();

jest.mock('./MovieFilterContent', () => () => <p>MovieFilterContent</p>);

describe('MovieFilter', () => {
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
    reduxRender(<MovieFilter filter={filter} setFilter={setFilterFn} />);

    const loader = screen.getByTestId('spinner');
    const content = screen.queryByText('MovieFilterContent');

    expect(loader).toBeTruthy();
    expect(content).toBeNull();
  });

  it('should render content after loading', async () => {
    reduxRender(<MovieFilter filter={{}} setFilter={jest.fn()} />);

    const content = await screen.findByText('MovieFilterContent');
    const loader = screen.queryByTestId('spinner');

    expect(content).toBeTruthy();
    expect(loader).toBeNull();
  });
});
