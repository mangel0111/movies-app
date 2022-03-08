require('regenerator-runtime/runtime')
require("@testing-library/jest-dom");
import { studiosMap } from '../constants/studio_constants'
const helpers = require('../src/helpers.mjs')
const mockedDataDisney = {
    id: '1',
    name: 'Disney studios',
    shortName: 'Disney',
    logo: 'https://cdn.mos.cms.futurecdn.net/qfFFFhnM8LwZnjpTECN3oB.jpg',
    money: 1000,
    movies: [
        {
            id: '11',
            name: 'Nightmare before christmas',
            genre: 6,
            img: 'https://www.dimanoinmano.it/img/638590/full/libri-per-ragazzi/infanzia/nightmare-before-christmas.jpg',
            price: 600,
        },
        {
            id: '12',
            name: 'Aladdin',
            genre: 4,
            url: 'https://www.lainformacion.com/files/article_default_content/uploads/2018/11/23/5bf84292d23b5.jpeg',
            price: 10000000000,
        },
        {
            id: '13',
            name: 'The avengers',
            genre: 1,
            url: 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2b/The_Avengers_Poster.png/revision/latest?cb=20150610135853&path-prefix=es',
            price: 300,
        },
        {
            id: '14',
            name: 'John Carter',
            genre: 9,
            url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/John_carter_poster.jpg/220px-John_carter_poster.jpg',
            price: 400,
        },
    ]
}
describe("Helpers", () => {
    describe("GetAllMoviesFromStudios", () => {
        it("Without parameters should retrieve all the movies", () => {
            const movies = helpers.getAllMoviesFromStudios([mockedDataDisney], {})
            expect(movies.length).toBe(mockedDataDisney.movies.length)
        })

        it("With title parameters should retrieve the movies having that text", () => {
            const movies = helpers.getAllMoviesFromStudios([mockedDataDisney], {
                title: "carter"
            })
            expect(movies[0].name).toBe(mockedDataDisney.movies[3].name)
            expect(movies.length).toBe(1)
        })

        it("With genre parameter should retrieve the movies having that genreId", () => {
            const movies = helpers.getAllMoviesFromStudios([mockedDataDisney], {
                genreId: "4"
            })

            expect(movies[0].name).toBe(mockedDataDisney.movies[1].name)
            expect(movies[0].genre).toBe(4)
            expect(movies.length).toBe(1)
        })

        it("With minPrice parameter should retrieve the movies having that minimum value", () => {
            const movies = helpers.getAllMoviesFromStudios([mockedDataDisney], {
                minPrice: 600
            })
            expect(movies[0].name).toBe(mockedDataDisney.movies[0].name)
            expect(movies[1].name).toBe(mockedDataDisney.movies[1].name)
            expect(movies.length).toBe(2)
        })

        it("With maxPrice parameter should retrieve the movies having that maximum value", () => {
            const movies = helpers.getAllMoviesFromStudios([mockedDataDisney], {
                maxPrice: 300
            })
            expect(movies[0].name).toBe(mockedDataDisney.movies[2].name)
            expect(movies.length).toBe(1)
        })
    })

    describe("Transfer Movie", () => {
        it('Having all parameters should transfer the movie', () => {
            const movie = studiosMap['1'].movies[0]
            const movieStudio = studiosMap['1']
            const nextStudio = studiosMap['2']
            const newStudioList = helpers.transferMovie({ movieId: movie.id, movieStudioId: movieStudio.id, nextStudioId: nextStudio.id })
            const transferedMovie = newStudioList['2'].movies.filter(mov => mov.name === movie.name)[0]
            expect(movie).toMatchObject(transferedMovie)

        })

        it('Withoud MovieId shoudl throw an error', () => {
            const movieStudio = studiosMap['1']
            const nextStudio = studiosMap['2']

            try {
                helpers.transferMovie({ movieStudioId: movieStudio.id, nextStudioId: nextStudio.id })
            } catch (error) {
                expect(error.message).toBe("Missing movie id")
            }

        })

        it('Withoud movieStudioId should throw an error', () => {
            const movie = studiosMap['1'].movies[0]
            const nextStudio = studiosMap['2']

            try {
                helpers.transferMovie({ movieId: movie.id, nextStudioId: nextStudio.id })
            } catch (error) {
                expect(error.message).toBe("Missing movie studio id")
            }

        })
        it('Withoud nextStudioId should throw an error', () => {
            const movie = studiosMap['1'].movies[0]
            const movieStudio = studiosMap['1']

            try {
                helpers.transferMovie({ movieId: movie.id, movieStudioId: movieStudio.id })
            } catch (error) {
                expect(error.message).toBe("Missing next movie studio id")
            }

        })
    })

    describe('GenreListConstructor', () => {
        it('Should generate a new list with each label capitalize', () => {
            const list = helpers.genreListConstructor()
            const validations = list.every(label => (/^[A-Z]/).test(label.value))

            expect(validations).toBeTruthy()
        })
    })
})