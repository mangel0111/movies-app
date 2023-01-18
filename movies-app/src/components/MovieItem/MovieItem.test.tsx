import { render, screen } from '@testing-library/react';

import { MovieExt } from '../../store/movies/reducer';
import MovieItem from './MovieItem';

const movie: MovieExt = {
  id: 1,
  name: 'Movie Name',
  price: 300,
  studio: 'Warner Bros',
  studioId: 1,
  genre: 1,
  img: '',
};

jest.mock('./TransferModalButton', () => () => <p>TransferModalButton</p>);

describe('MovieItem', () => {
  it('should render component', () => {
    render(<MovieItem movie={movie} />);

    const img = screen.queryByAltText('Movie Name');
    const pName = screen.queryByText('Movie Name');
    const pStudio = screen.queryByText('Warner Bros');

    expect(img).toBeTruthy();
    expect(pName).toBeTruthy();
    expect(pStudio).toBeTruthy();
  });

  it('should have img with noreferrer policy', () => {
    render(<MovieItem movie={movie} />);

    const img = screen.queryByAltText('Movie Name');
    expect(img).toHaveAttribute('referrerPolicy', 'no-referrer');
  });
});
