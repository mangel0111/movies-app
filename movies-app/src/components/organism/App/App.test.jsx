import { render, act, waitFor, screen } from "@testing-library/react";
import App from './App';
import * as Api from '../../../api'

describe("App", () => {
    it("Should render title", async () => {
        jest.spyOn(Api, 'getStudios').mockResolvedValue([])
        jest.spyOn(Api, 'getGenres').mockResolvedValue([])
        jest.spyOn(Api, 'getStudios').mockResolvedValue([])

        const { getByRole } = render(<App />);
        const title = getByRole('heading', { level: 3 })

        await waitFor(() => {
            expect(title.innerHTML).toBe("Movies App")
        })

    });
});
