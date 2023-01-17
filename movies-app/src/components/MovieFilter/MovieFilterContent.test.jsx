import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import MovieFilterContent from "./MovieFilterContent";

jest.mock("react-redux", () => {
  const genres = [[1, 'Adventures'], [2, 'Animation'], [3, 'Heroes']]
    .map(([id, value]) => ({ id, value }));

  return { useSelector: () => ({ genres })};
});

describe ('MovieFilterContent', () => {
  it('should render TextFields with values from filter', () => {
    const filter = { minPrice: 100, maxPrice: 500, name: 'av' };
    const setFilterFn = jest.fn();

    render(<MovieFilterContent filter={filter} setFilter={setFilterFn} />);

    const txtName = screen.queryByDisplayValue('av');
    const txtMinPrice = screen.queryByDisplayValue(100);
    const txtMaxPrice = screen.queryByDisplayValue(500);

    expect(txtName).toBeTruthy();
    expect(txtMinPrice).toBeTruthy();
    expect(txtMaxPrice).toBeTruthy();
  });

  it('should render list with genres', async () => {
    /* Explanation:
       For Material UI a click is needed to open a popup for the Select component (it has role=button).
       The popup cannot be found in html before that. There seems to be a race condition such that
       when the listbox is rendered (after simulating a click), it already receives populated genres.
       I am not reaching a moment to see only 'All' being listed. Also, I think this scenario won't
       really happen on a real environment. This is why I am ignoring that, and only check listed genres
       in the end result.

       EDIT: I preferred to fix MovieFilter tests by separating components (loading state made things harder),
       now with MovieFilterContent I don't have the previous mentioned issue, genres is available from start
    */
    render(<MovieFilterContent filter={{}} setFilter={jest.fn()} />);

    const selGenre = screen.getByRole('button');
    user.click(selGenre);

    const listboxpopup = await screen.findByRole('listbox'); // searching in popup being opened
    expect(listboxpopup.children).toHaveLength(4); // the empty item counts as 1
  });

  it('should call setFilter when changing name, with typed value', (done) => {
    const filter = { name: 'av' };
    const setFilterFn = jest.fn((changedStateFn) => {
      const newFilter = changedStateFn();
      expect(newFilter.name).toBe('ave');
      done();
    });

    render(<MovieFilterContent filter={filter} setFilter={setFilterFn} />);

    const txtName = screen.queryByDisplayValue('av');
    user.type(txtName, 'e'); // 'av' + 'e' = 'ave';
  });

  it('should call setFilter when changing min price, with typed value', (done) => {
    const filter = { minPrice: 1 };
    const setFilterFn = jest.fn((changedStateFn) => {
      const newFilter = changedStateFn();
      expect(newFilter.minPrice).toBe(10);
      done();
    });

    render(<MovieFilterContent filter={filter} setFilter={setFilterFn} />);

    const txtMinPrice = screen.queryByDisplayValue(1);
    user.type(txtMinPrice, '0');
  });

  it('should call setFilter when changing max price, with typed value', (done) => {
    const filter = { maxPrice: 1 };
    const setFilterFn = jest.fn((changedStateFn) => {
      const newFilter = changedStateFn();
      expect(newFilter.maxPrice).toBe(10);
      done();
    });

    render(<MovieFilterContent filter={filter} setFilter={setFilterFn} />);

    const txtMaxPrice = screen.queryByDisplayValue(1);
    user.type(txtMaxPrice, '0');
  });

  it('should call setFilter when choosing genre, with its id', (done) => {
    const filter = {};
    const setFilterFn = jest.fn((changedStateFn) => {
      const newFilter = changedStateFn();

      // assertion here
      expect(newFilter.genreId).toBe(2);
      done();
    });

    render(<MovieFilterContent filter={filter} setFilter={setFilterFn} />);

    const selGenre = screen.getByRole('button');
    user.click(selGenre);

    screen.findByText('Animation').then((animationItem) => {
      user.click(animationItem);
    });
  });
});
