import { render, screen } from '@testing-library/react';

import App from './App';

vi.mock('./components/Alert', () => ({ default: () => <p>Alert</p> }));
vi.mock('./components/MovieFilter', () => ({ default: () => <p>MovieFilter</p> }));
vi.mock('./components/MovieList', () => ({ default: () => <p>MovieList</p> }));

describe('App', () => {
  it('should render component', () => {
    render(<App />);

    const filter = screen.queryByText('MovieFilter');
    const list = screen.queryByText('MovieList');

    expect(filter).toBeTruthy();
    expect(list).toBeTruthy();
  });
});
