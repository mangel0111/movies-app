import { render, screen } from '@testing-library/react';

import MovieItem from './MovieItem';

const movie = {
  name: 'Movie Name',
  studio: 'Warner Bros',
  img: 'https://miro.medium.com/max/256/1*caPdcEFzPoRrmrTryveacQ.jpeg',
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
