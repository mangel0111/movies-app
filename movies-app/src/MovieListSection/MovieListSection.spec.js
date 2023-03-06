import { screen, render } from '@testing-library/react';
import MovieListSection from './MovieListSection';
import userEvent from '@testing-library/user-event';

const confirm = jest.fn();

const props = {
    movies: [
        {
            id: "11",
            name: "Nightmare before christmas",
            genre: 6,
            imgUrl: "someUrl",
            studioId: "1"
        },
        {
            id: "21",
            name: "Fantastic beasts and where to find them",
            genre: 9,
            imgUrl: "someURL",
            studioId: "2"
        },
    ],
    studios: [
        {
            id: "1",
            name: "Disney studios",
            shortName: "Disney",
            logo: "some logo",
            money: 1000
        },
        {
            id: "2",
            name: "Warner Bros.",
            shortName: "Warner",
            logo: "some logo",
            money: 900
        }
    ],
    confirm,
    showNoResults: false,
}
describe ('MovieListSection', () => {
    it('should transfer movies', () => {
        render(<MovieListSection {...props}/>);
        //Assert initial state
        expect(screen.queryByRole('heading', { name: /transfer movie/i})).toBeFalsy();
        expect(screen.getByText(/disney studios/i)).toBeInTheDocument(); 
        expect(screen.getAllByText(/warner Bros./i)).toHaveLength(1);  
        //Open modal
        userEvent.click(screen.queryAllByText(/transfer/i)[0]);
        expect(screen.getByRole('heading', { name: /transfer movie/i})).toBeInTheDocument();
        userEvent.click(screen.getByLabelText('Studio'))
        userEvent.click(screen.getByRole('option', { name: /warner Bros./i}));
        userEvent.click(screen.getByRole('button', {
            name: /confirm transfer/i
        }));
        //Review call
        expect(confirm).toHaveBeenCalledWith('2', '11')
    });
});