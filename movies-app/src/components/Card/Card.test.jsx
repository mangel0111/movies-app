import { render, act, waitFor, screen } from "@testing-library/react";
import Card from './Card';
import * as redux from 'react-redux';
import '@testing-library/jest-dom'
const mockStore = {
    movies:[{"id":"12","name":"Aladdin","genre":4,"price":10000000000,"img":"https://www.lainformacion.com/files/article_default_content/uploads/2018/11/23/5bf84292d23b5.jpeg","studioId":"1"},{"id":"13","name":"The avengers","genre":1,"price":300,"img":"https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2b/The_Avengers_Poster.png/revision/latest?cb=20150610135853&path-prefix=es","studioId":"1"},{"id":"21","name":"The conjuring","genre":6,"img":"https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg","price":1000000000,"studioId":"2"},{"id":"22","name":"Space Jame","genre":4,"img":"https://static.wikia.nocookie.net/warnerbros/images/d/d0/SpaceJam.jpg/revision/latest/scale-to-width-down/350?cb=20120727135751&path-prefix=es","price":500,"studioId":"2"},{"id":"23","name":"The dark knight rises","genre":1,"price":400,"img":"https://pics.filmaffinity.com/The_Dark_Knight_Rises-149544881-large.jpg","studioId":"2"},{"id":"24","name":"Fantastic beasts and where to find them","genre":9,"img":"https://i.pinimg.com/originals/11/95/b8/1195b802fe9108f0458830054ba1fd57.jpg","price":500,"studioId":"2"},{"id":"14","name":"John Carter","genre":9,"price":400,"img":"https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/John_carter_poster.jpg/220px-John_carter_poster.jpg","studioId":"2"},{"id":"31","name":"Slender man","genre":6,"price":700,"studioId":"3"},{"id":"32","name":"Spider-man into the spider-verse","genre":4,"price":450,"studioId":"3"},{"id":"33","name":"Spider-man","genre":1,"price":500,"studioId":"3"},{"id":"34","name":"Last action hero","genre":9,"price":10000000000000,"studioId":"3"},{"id":"11","name":"Nightmare before christmas","genre":6,"img":"https://www.dimanoinmano.it/img/638590/full/libri-per-ragazzi/infanzia/nightmare-before-christmas.jpg","price":600,"studioId":"3"}],
    studios: [{"id":"1","name":"Disney studios","shortName":"Disney","logo":"https://cdn.mos.cms.futurecdn.net/qfFFFhnM8LwZnjpTECN3oB.jpg","money":600},{"id":"2","name":"Warner Bros.","shortName":"Warner","logo":"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12c6f684-d447-4457-84fa-12033cfd581e/d9z4nxu-626ae303-e830-4b4f-ab8b-4aff7f1bef0f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyYzZmNjg0LWQ0NDctNDQ1Ny04NGZhLTEyMDMzY2ZkNTgxZVwvZDl6NG54dS02MjZhZTMwMy1lODMwLTRiNGYtYWI4Yi00YWZmN2YxYmVmMGYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gtKaGVrDg8gzU7QFThusbHJw2d6bKgnDauezUcZo-1A","money":100},{"id":"3","name":"Sony Pictures","shortName":"Sony","logo":"https://logoeps.com/wp-content/uploads/2013/05/sony-pictures-entertainment-vector-logo.png","money":100}],
    genresList: [{"id":9,"value":"Adventures"},{"id":6,"value":"Horror"},{"id":4,"value":"Animation"},{"id":1,"value":"Heroes"}]
}
describe("Card", () => {
    it("With small card should add the correct class", async () => {
        const dispatchSpy = jest.spyOn(redux, 'useDispatch');
        const selectorSpy = jest.spyOn(redux, 'useSelector');
    
        dispatchSpy.mockReturnValue(jest.fn())
        selectorSpy.mockReturnValue(mockStore)

        const container = render(<Card isSmallCard movie={mockStore.movies[0]} />);
        const card = container.container.querySelector(`#${mockStore.movies[0].name}-card`)

        await waitFor(() => {
            expect(card.className.includes("smallCard")).toBeTruthy()
        })

    });

    it("Without small card should add the regularCard class", async () => {
        const dispatchSpy = jest.spyOn(redux, 'useDispatch');
        const selectorSpy = jest.spyOn(redux, 'useSelector');
    
        dispatchSpy.mockReturnValue(jest.fn())
        selectorSpy.mockReturnValue(mockStore)

        const container = render(<Card movie={mockStore.movies[0]} />);
        const card = container.container.querySelector(`#${mockStore.movies[0].name}-card`)

        await waitFor(() => {
            expect(card.className.includes("regularCard")).toBeTruthy()
        })

    });

    it("Without small card should set the avatar size to 280px", async () => {
        const dispatchSpy = jest.spyOn(redux, 'useDispatch');
        const selectorSpy = jest.spyOn(redux, 'useSelector');
    
        dispatchSpy.mockReturnValue(jest.fn())
        selectorSpy.mockReturnValue(mockStore)

        const container = render(<Card movie={mockStore.movies[0]} />);
        const avatar = container.container.querySelector(`#${mockStore.movies[0].name}-avatar`)

        await waitFor(() => {
            expect(avatar.getAttribute('width')).toBe("280")
            expect(avatar.getAttribute('height')).toBe("280")
        })

    });

    it("With smallCard property should set the avatar size to 60px", async () => {
        const dispatchSpy = jest.spyOn(redux, 'useDispatch');
        const selectorSpy = jest.spyOn(redux, 'useSelector');
    
        dispatchSpy.mockReturnValue(jest.fn())
        selectorSpy.mockReturnValue(mockStore)

        const container = render(<Card isSmallCard movie={mockStore.movies[0]} />);
        const avatar = container.container.querySelector(`#${mockStore.movies[0].name}-avatar`)

        await waitFor(() => {
            expect(avatar.getAttribute('width')).toBe("60")
            expect(avatar.getAttribute('height')).toBe("60")
        })

    });

    it("Should render the studios list", async () => {
        const dispatchSpy = jest.spyOn(redux, 'useDispatch');
        const selectorSpy = jest.spyOn(redux, 'useSelector');
    
        dispatchSpy.mockReturnValue(jest.fn())
        selectorSpy.mockReturnValue(mockStore)
        const studio = mockStore.studios.find(studio => studio.id === mockStore.movies[0].studioId)
        render(<Card movie={mockStore.movies[0]} />);
        const studioName = screen.getByText(studio.name)

        await waitFor(() => {
            expect(studioName).toBeInTheDocument() 
        })

    });
});
