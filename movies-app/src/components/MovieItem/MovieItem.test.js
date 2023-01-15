import { render, screen } from "@testing-library/react";
import MovieItem from "./MovieItem";

const movie = {
  name: 'Movie Name',
  studio: 'Warner Bros',
  img: 'https://miro.medium.com/max/256/1*caPdcEFzPoRrmrTryveacQ.jpeg'
};

describe ('MovieItem', () => {
  it('should render component', async () => {
    render(<MovieItem movie={movie} />);

    const img = await screen.findByAltText('Movie Name');
    const pName = await screen.findByText('Movie Name');
    const pStudio = await screen.findByText('Warner Bros');

    expect(img).toBeDefined();
    expect(pName).toBeDefined();
    expect(pStudio).toBeDefined();
  });
});
