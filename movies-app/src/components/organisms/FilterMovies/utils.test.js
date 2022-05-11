import {filterMovies} from './utils';

const genres = [
  {
    label: 'adventures',
    value: 9
  },
  {label: 'horror', value: 6},
  {label: 'animation', value: 4},
  {label: 'heroes', value: 1}
];

const mockMovies = [
  {
    genre: 4,
    id: '12',
    img: '',
    name: 'Aladdin',
    price: 10000000000,
    studioId: '1'
  },
  {
    genre: 4,
    id: '22',
    img: '',
    name: 'Space Jame',
    price: 500,
    studioId: '2'
  },
  {
    genre: 1,
    id: '33',
    img: '',
    name: 'Spider-man',
    price: 500,
    studioId: '3'
  }
];
describe('filterMovies', () => {
  it('should return the same array if there are not parameters', () => {
    const filteredMovies = filterMovies(mockMovies, '', '', '');
    expect(filteredMovies.length).toBe(3);
    expect(filteredMovies).toBe(mockMovies);
  });
  it('should return an array of movies by genre type animation (4)', () => {
    const filteredMovies = filterMovies(mockMovies, '', '', 4);
    expect(filteredMovies.length).toBe(2);
    expect(filteredMovies).toStrictEqual([mockMovies[0], mockMovies[1]]);
  });
  it('should return an array of movies by min price', () => {
    const filteredMovies = filterMovies(mockMovies, 1, '', '');
    expect(filteredMovies.length).toBe(3);
    expect(filteredMovies).toStrictEqual(mockMovies);
  });
  it('should return an array of movies by max price', () => {
    const filteredMovies = filterMovies(mockMovies, '', 1000, '');
    expect(filteredMovies.length).toBe(2);
    expect(filteredMovies).toStrictEqual([mockMovies[1], mockMovies[2]]);
  });
  it('should return an array of movies by min and max price', () => {
    const filteredMovies = filterMovies(mockMovies, 1000, 10000000001, '');
    expect(filteredMovies.length).toBe(1);
    expect(filteredMovies).toStrictEqual([mockMovies[0]]);
  });
  it('should return an array of movies by min, max price and genre', () => {
    const filteredMovies = filterMovies(mockMovies, 100, 10000000001, 4);
    expect(filteredMovies.length).toBe(2);
    expect(filteredMovies).toStrictEqual([mockMovies[0], mockMovies[1]]);
  });
  it('should return an empty array if there is not match', () => {
    const filteredMovies = filterMovies(mockMovies, 1000, 2000, 3);
    expect(filteredMovies.length).toBe(0);
    expect(filteredMovies).toStrictEqual([]);
  });
});
