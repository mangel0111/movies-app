import { render, act, waitFor, screen, fireEvent } from "@testing-library/react";
import Filters from './Filters';
import * as Api from '../../api'
import '@testing-library/jest-dom'
describe("Filters", () => {
    it("On title filter change should call the handler with that value", async () => {
        const spy = jest.fn()
        const HandleChange = () => {
            return spy
        }
        const filtersData = {
            genreId: 1,
            minPrice: 0,
            maxPrice: undefined,
            title: undefined
        }
        const genresList = [
            {
                id: 1,
                value: "Genre1"
            }
        ]
        const {container} = render(<Filters filters={filtersData} genresList={genresList} handleFilterChange={HandleChange} />);
        const titleFilter = container.querySelector("#title")
        fireEvent.change(titleFilter, {target: {value: "newFilter"}})
        const postChangeFilter = container.querySelector("#title")

        await waitFor(() => {
            expect(spy).toHaveBeenCalledTimes(1)
            expect(postChangeFilter.value).toBe("newFilter")
        })

    });

    it("On min price change should call the handler", async () => {
        const innerSpy = jest.fn(() => {})
        const spy = jest.fn((id) => {
            return innerSpy
        })
        const filtersData = {
            genreId: 1,
            minPrice: 0,
            maxPrice: undefined,
            title: undefined
        }
        const genresList = [
            {
                id: 1,
                value: "Genre1"
            }
        ]
        render(<Filters filters={filtersData} genresList={genresList} handleFilterChange={spy} />);
        const filter = screen.getByPlaceholderText("Enter min price")
        fireEvent.change(filter, {target: {value: "123"}})
        await waitFor(() => {
            expect(innerSpy).toHaveBeenCalledTimes(1)
        })

    });
});
