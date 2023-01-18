import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MovieExt } from '../../../store/movies/reducer';
import TransferModalButton from './TransferModalButton';

jest.mock('./ModalContent', () => () => <p>ModalContent</p>);

jest.mock('react-redux', () => {
  const studios = (
    [
      [1, 'Disney Studios', 400],
      [2, 'Warner Bros', 500],
    ] as [number, string, number][]
  ).map(([id, name, money]) => ({ id, name, money, shortName: '', logo: '' }));

  return { useSelector: () => ({ studios }) };
});

const movieMock = { name: '', genre: 1, img: '', studioId: 1, studio: '' };

describe('TransferModalButton', () => {
  it('should not render component if no studio can buy the movie', () => {
    const movie: MovieExt = { id: 1, price: 600, ...movieMock };
    render(<TransferModalButton movie={movie} />);

    const button = screen.queryByRole('button');
    expect(button).toBeNull();
  });

  it('should render component with button if at least 1 studio can buy', () => {
    const movie = { id: 1, price: 300, ...movieMock };
    render(<TransferModalButton movie={movie} />);

    const button = screen.queryByRole('button');
    expect(button).toBeTruthy();
  });

  it('should open modal on button click', async () => {
    const movie = { id: 1, price: 300, ...movieMock };

    render(<TransferModalButton movie={movie} />);

    const button = screen.queryByRole('button');
    userEvent.click(button);

    const modal = await screen.findByText('ModalContent');
    expect(modal).toBeTruthy();
  });
});
