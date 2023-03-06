import { screen, render, act, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';


const originalMovies = [
    {
        name: "Nightmare before christmas",
        genre: 6,
        imgUrl: "someUrl",
        studioId: "1"
    },
    {
        name: "Fantastic beasts and where to find them",
        genre: 9,
        imgUrl: "someURL",
        studioId: "2"
    },
];

jest.mock('./api', ()=> ({
    getGenres: () => Promise.resolve([
        {key: 6, text: 'Horror'},
        {key: 9, text: 'Adventures'}
    ]),
    getMovies: ({title} = {}) => Promise.resolve(
        originalMovies.filter(item => {
            return (!title || item.name.toLowerCase().includes(title.toLowerCase()))
        })),
    getStudios: () => Promise.resolve([
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
    ]),
}));

describe('App tests ', () =>{
    it('should render proper headings and cards', async () => {
        await act(async() => render(<App />));
        expect(screen.getByRole('heading', { name: /images:/i})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /filters:/i})).toBeInTheDocument();
        expect(screen.getByText('Nightmare before christmas')).toBeInTheDocument();
        expect(screen.getByText('Fantastic beasts and where to find them')).toBeInTheDocument();
    });

    it('should render proper filter elements and send proper data when filtering', async () => {
        await act(async() => render(<App />));
        //Complete filters
        userEvent.click(screen.getByLabelText('Genre'))
        userEvent.click(screen.getByRole('option', { name: 'Adventures'}));
        userEvent.type(screen.getByTestId('title-filter'), 'ch')
        userEvent.type(screen.getByTestId('min-price-filter'), '1')
        userEvent.type(screen.getByTestId('max-price-filter'), '10')
        userEvent.click(screen.getByRole('button', {
            name: /filter/i
        }))
        //Review final state
        await waitFor(() => {
            expect(screen.queryByText(/fantastic beasts and where to find them/i)).toBeFalsy();         
        });
        expect(screen.getByText(/nightmare before christmas/i)).toBeInTheDocument();   
    });
})