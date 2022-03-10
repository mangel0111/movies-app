import { rest } from "msw";
import { setupServer } from "msw/node";

import { MOVIES_TEST_MOCK } from "../../constants/mocks";

const server = setupServer(
  rest.get(`http://localhost:3001/movies`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOVIES_TEST_MOCK));
  })
);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { rest, server };
