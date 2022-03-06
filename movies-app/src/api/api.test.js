import { getMovies } from './index'

describe("API", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("Get movies - Having the genreId filter should build the request url with that paramenter",async () => {
        const spyFetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            })
        );
        global.fetch = spyFetch
        const filters ={
            genreId: 6
        }
        await getMovies(filters)

        expect(spyFetch.mock.calls[0][0].includes('&genreId=6')).toBeTruthy()
    })

    it("Get movies - Having the title filter should build the request url with that paramenter",async () => {
        const spyFetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            })
        );
        global.fetch = spyFetch
        const filters ={
            title: 'dummy'
        }
        await getMovies(filters)

        expect(spyFetch.mock.calls[0][0].includes('&title=dummy')).toBeTruthy()
    })

    it("Get movies - Having the minPrice filter should build the request url with that paramenter",async () => {
        const spyFetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            })
        );
        global.fetch = spyFetch
        const filters ={
            minPrice: '5'
        }
        await getMovies(filters)

        expect(spyFetch.mock.calls[0][0].includes('&minPrice=5')).toBeTruthy()
    })

    it("Get movies - Having the maxPrice filter should build the request url with that paramenter",async () => {
        const spyFetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            })
        );
        global.fetch = spyFetch
        const filters ={
            maxPrice: '10'
        }
        await getMovies(filters)

        expect(spyFetch.mock.calls[0][0].includes('&maxPrice=10')).toBeTruthy()
    })

    it("Get movies - Having the title and maxPrice filters should build the request url with that paramenters",async () => {
        const spyFetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            })
        );
        global.fetch = spyFetch
        const filters ={
            maxPrice: '10',
            title: "dummy"
        }
        await getMovies(filters)

        expect(spyFetch.mock.calls[0][0].includes('&maxPrice=10')).toBeTruthy()
        expect(spyFetch.mock.calls[0][0].includes('&title=dummy')).toBeTruthy()
    })
})