import { render, act, waitFor, screen } from "@testing-library/react";
import Card from './Card';
import * as Api from '../../api'

describe("Card", () => {
    it("With small card should add the correct class", async () => {
        const studios = [
            {
                id: 2,
                name: "StudioDummy"
            }
        ]
        const container = render(<Card isSmallCard movie={{ name: "Dummy", studioId: 2 }} studios={studios} />);
        const card = container.container.querySelector('#Dummy-card')

        await waitFor(() => {
            expect(card.className.includes("smallCard")).toBeTruthy()
        })

    });

    it("Without small card should add the regularCard class", async () => {
        const studios = [
            {
                id: 2,
                name: "StudioDummy"
            }
        ]
        const container = render(<Card movie={{ name: "Dummy", studioId: 2 }} studios={studios} />);
        const card = container.container.querySelector('#Dummy-card')

        await waitFor(() => {
            expect(card.className.includes("regularCard")).toBeTruthy()
        })

    });

    it("Without small card should set the avatar size to 280px", async () => {
        const studios = [
            {
                id: 2,
                name: "StudioDummy"
            }
        ]
        const container = render(<Card movie={{ name: "Dummy", studioId: 2 }} studios={studios} />);
        const avatar = container.container.querySelector('#Dummy-avatar')

        await waitFor(() => {
            expect(avatar.getAttribute('width')).toBe("280")
            expect(avatar.getAttribute('height')).toBe("280")
        })

    });

    it("Should render the studios list", async () => {
        const studios = [
            {
                id: 2,
                name: "StudioDummy"
            }
        ]
        render(<Card movie={{ name: "Dummy", studioId: 2 }} studios={studios} />);
        const studioName = screen.getByText('StudioDummy')

        await waitFor(() => {
            expect(studioName.innerHTML).toBe("StudioDummy")  
        })

    });
});
