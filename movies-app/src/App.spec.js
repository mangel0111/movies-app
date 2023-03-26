import { screen, render, act, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { domain } from './api/api';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { db } from './api/_mockups';

const movies = [
    {
        id: 1,
        name: "Nightmare before christmas",
        genre: 6,
        imgUrl: "someUrl",
        studioId: "1",
        price: 2
    },
    {
        id: 2,
        name: "Fantastic beasts and where to find them",
        genre: 9,
        imgUrl: "someURL",
        studioId: "2",
        price: 3,
    },
    {
        id: 3,
        name: "Christmas movie",
        genre: 6,
        imgUrl: "someURL",
        studioId: "2",
        price: 100,
    }
];

const genres = [
    {key: 6, text: 'Horror'},
    {key: 9, text: 'Adventures'}
];

const studios = [
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
];

const server = setupServer(
    rest.get(`${domain}/movies`, (req, res, ctx) => {
        //Get query params
        const title = req.url.searchParams.get('title');
        const genre = req.url.searchParams.get('genre');
        const minPrice = req.url.searchParams.get('minPrice');
        const maxPrice = req.url.searchParams.get('maxPrice');

        const movies = db.movies.getAll();

        return res(ctx.json(
            movies.filter(movie => {
                return (!title || movie.name.toLowerCase().includes(title.toLowerCase())) &&
                    (!genre || movie.genre === +genre) &&
                    (!minPrice || movie.price >= +minPrice) &&
                    (!maxPrice || movie.price <= +maxPrice)
            })
        ));
    }),
    rest.get(`${domain}/genres`, (req, res, ctx) => {
        return res(ctx.json(db.genres.getAll()));
    }),
    rest.get(`${domain}/studios`, (req, res, ctx) => {
        return res(ctx.json(db.studios.getAll()));
    }),
    rest.post(`${domain}/transfer`, (req, res, ctx) => {
        const {studioId, movieId} = req.body;
        
        db.movies.update({
            where: {
              id: {
                equals: movieId,
              },
            },
            data: {
              studioId,
            },
          });
        return res(ctx.json({message: 'Success'}));
    }),
);

describe('App tests ', () =>{
    beforeAll(() => {
        server.listen();
        //Populate database
        movies.forEach((movie => {
            db.movies.create(movie)
        }));
        studios.forEach((studio => {
            db.studios.create(studio)
        }));
        genres.forEach((genre => {
            db.genres.create(genre)
        }));
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should render proper headings and cards', async () => {
        await act(async() => render(<App />));
        expect(screen.getByRole('heading', { name: /images:/i})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /filters:/i})).toBeInTheDocument();
        expect(screen.getByText(/nightmare before christmas/i)).toBeInTheDocument();
        expect(screen.getByText(/fantastic beasts and where to find them/i)).toBeInTheDocument();
        expect(screen.getByText(/christmas movie/i)).toBeInTheDocument();
    });

    it('should render proper filter elements and send proper data when filtering', async () => {
        await act(async() => render(<App />));
        //Complete filters
        userEvent.click(screen.getByLabelText('Genre'))
        userEvent.click(screen.getByRole('option', { name: 'Horror'}));
        userEvent.type(screen.getByTestId('title-filter'), 'ch')
        userEvent.type(screen.getByTestId('min-price-filter'), '1')
        userEvent.type(screen.getByTestId('max-price-filter'), '10')
        userEvent.click(screen.getByRole('button', {
            name: /filter/i
        }))
        //Review final state
        await waitFor(() => {
            expect(screen.queryByText(/fantastic beasts and where to find them/i)).toBeFalsy();
            expect(screen.queryByText(/christmas movie/i)).toBeFalsy();      
        });
        expect(screen.getByText(/nightmare before christmas/i)).toBeInTheDocument();  
    });
    it('should transfer movies', async () => {
        await act(async() => render(<App />));
        //Assert initial state
        expect(screen.queryByRole('heading', { name: /transfer movie/i})).toBeFalsy();
        expect(screen.getByText(/disney studios/i)).toBeInTheDocument(); 
        expect(screen.getAllByText(/warner bros./i)).toHaveLength(2);  
        //Open modal
        userEvent.click(screen.queryAllByText(/transfer/i)[0]);
        expect(screen.getByRole('heading', { name: /transfer movie/i})).toBeInTheDocument();
        userEvent.click(screen.getByLabelText('Studio'));
        userEvent.click(screen.getByRole('option', { name: /warner bros./i}));
        userEvent.click(screen.getByRole('button', {
            name: /confirm transfer/i
        }));
        // Review final state
        await waitFor(() => {
            expect(screen.getByText(/Movie succesfully transfered/i)).toBeInTheDocument();
        });
        expect(screen.queryByText(/disney studios/i)).toBeFalsy(); 
        expect(screen.getAllByText(/warner bros./i)).toHaveLength(3);  
    });
})