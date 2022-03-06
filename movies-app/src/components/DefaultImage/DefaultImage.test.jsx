import { render, act, waitFor, screen } from "@testing-library/react";
import DefaultImage from './DefaultImage';
import * as Api from '../../api'
import '@testing-library/jest-dom'
describe("DefaultImage", () => {
    it("Should render the movie name", async () => {
        render(<DefaultImage movie={{ name: "Dummy", studioId: 2 }}/>);
        const name = screen.getByText('Dummy')
        await waitFor(() => {
            expect(name).toBeInTheDocument()
        })

    });


});
