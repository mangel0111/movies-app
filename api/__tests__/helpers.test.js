require('regenerator-runtime/runtime')
require("@testing-library/jest-dom");
const helpers = require('../src/helpers.mjs')
const mockedData = {
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
    it("genreListConstructor - Without parameters should retrieve all the movies", () => {
        const movies = helpers.getAllMoviesFromStudios([mockedData],{})
        expect(movies.length).toBe(mockedData.movies.length)
    })

    it("genreListConstructor - With title parameters should retrieve the movies having that text", () => {
        const movies = helpers.getAllMoviesFromStudios([mockedData],{
            title: "carter"
        })
        expect(movies[0].name).toBe(mockedData.movies[3].name)
        expect(movies.length).toBe(1)
    })

    it("genreListConstructor - With genre parameter should retrieve the movies having that genreId", () => {
        const movies = helpers.getAllMoviesFromStudios([mockedData],{
            genreId: "4"
        })

        expect(movies[0].name).toBe(mockedData.movies[1].name)
        expect(movies[0].genre).toBe(4)
        expect(movies.length).toBe(1)
    })

    it("genreListConstructor - With minPrice parameter should retrieve the movies having that minimum value", () => {
        const movies = helpers.getAllMoviesFromStudios([mockedData],{
            minPrice: 600
        })
        expect(movies[0].name).toBe(mockedData.movies[0].name)
        expect(movies[1].name).toBe(mockedData.movies[1].name)
        expect(movies.length).toBe(2)
    })

    it("genreListConstructor - With maxPrice parameter should retrieve the movies having that maximum value", () => {
        const movies = helpers.getAllMoviesFromStudios([mockedData],{
            maxPrice: 300
        })
        expect(movies[0].name).toBe(mockedData.movies[2].name)
        expect(movies.length).toBe(1)
    })
})