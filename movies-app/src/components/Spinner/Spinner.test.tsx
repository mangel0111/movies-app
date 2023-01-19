import { render, screen } from '@testing-library/react';

import Spinner from './Spinner';

describe('Spinner', () => {
  it('should render component', async () => {
    render(<Spinner />);

    const parentDiv = await screen.findByTestId('spinner');
    expect(parentDiv).toBeTruthy();
    expect(parentDiv.children).toHaveLength(4);
  });
});
