import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import * as moviesModule from '../../../store/movies/reducer';
import * as services from '../../../store/movies/services';
import * as studiosModule from '../../../store/studios/reducer';
import { reduxRender } from '../../../test/test-utils';
import ModalContent from './ModalContent';

const movie: moviesModule.MovieExt = {
  id: 1,
  name: 'Avatar',
  price: 300,
  studio: 'Disney Studios',
  studioId: 1,
  genre: 1,
  img: '',
};
const onClose = jest.fn();

const studios = (
  [
    [1, 'Disney Studios', 400],
    [2, 'Warner Bros', 500],
    [3, 'Sony Pictures', 500],
  ] as [number, string, number][]
).map(([id, name, money]) => ({ id, name, money }));

const studiosState = { loading: false, studios };

const handlers = [
  rest.get('*/movies', (req, res, ctx) => res(ctx.json([]))),
  rest.get('*/studios', (req, res, ctx) => res(ctx.json(studios))),
  rest.post('*/transfer', (req, res, ctx) => res(ctx.json({}))),
];

const server = setupServer(...handlers);

describe('TransferModalButton -> ModalContent', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render component', () => {
    reduxRender(<ModalContent movie={movie} onClose={onClose} />, {
      preloadedState: { studios: studiosState },
    });

    const header = screen.queryByText('Transfer Movie');
    const movieText = screen.queryByText('Movie to transfer: Avatar');
    const studio = screen.queryByText('Seller: Disney Studios');
    const price = screen.queryByText('Price: $300');

    expect(header).toBeTruthy();
    expect(movieText).toBeTruthy();
    expect(studio).toBeTruthy();
    expect(price).toBeTruthy();
  });

  it('should have 2 studios allowed to buy', async () => {
    reduxRender(<ModalContent movie={movie} onClose={onClose} />, {
      preloadedState: { studios: studiosState },
    });

    const selBuyer = screen.getByTestId('selBuyer');
    const clickableList = within(selBuyer).getByRole('button');
    userEvent.click(clickableList);

    const listboxpopup = await screen.findByRole('listbox'); // searching in popup being opened
    expect(listboxpopup.children).toHaveLength(2);
  });

  it('should call onClose when clicking close button', async () => {
    const onCustomClose = jest.fn();
    reduxRender(<ModalContent movie={movie} onClose={onCustomClose} />, {
      preloadedState: { studios: studiosState },
    });

    const closeButton = screen.getByText('Close');
    userEvent.click(closeButton);

    expect(onCustomClose).toHaveBeenCalled();
  });

  it('should post, call actions and close on submit', async () => {
    const onCustomClose = jest.fn();
    const spyTransferMovie = jest.spyOn(services, 'postTransferMovie');
    const spyFetchMovies = jest.spyOn(moviesModule, 'fetchMoviesRequest');
    const spyFetchStudios = jest.spyOn(studiosModule, 'fetchStudiosRequest');

    reduxRender(<ModalContent movie={movie} onClose={onCustomClose} />, {
      preloadedState: { studios: studiosState },
    });

    const transferButton = screen.getByText('Transfer');
    userEvent.click(transferButton);

    // Close is the last method invoked, if we wait for this assertion, then we can check other methods
    await waitFor(() => expect(onCustomClose).toBeCalled());

    expect(spyFetchMovies).toBeCalled();
    expect(spyFetchStudios).toBeCalled();

    // studioId is '2' because that's the first allowed studio in the list, selected by default
    expect(spyTransferMovie).toBeCalledWith({ movieId: '1', studioToId: '2' });
  });

  it('should change to studio 3 on item click', async () => {
    reduxRender(<ModalContent movie={movie} onClose={onClose} />, {
      preloadedState: { studios: studiosState },
    });

    const selBuyer = screen.getByTestId('selBuyer');
    const currentSelected = within(selBuyer).getByRole('button');
    expect(currentSelected).toHaveTextContent('Warner Bros - Money: $500');
    userEvent.click(currentSelected);

    const itemText = 'Sony Pictures - Money: $500';

    const studio3Item = await screen.findByText(itemText);
    userEvent.click(studio3Item);

    const newValueSelected = within(selBuyer).getByRole('button');
    expect(newValueSelected).toHaveTextContent(itemText);
  });
});
