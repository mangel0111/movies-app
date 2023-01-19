import { transferMovie } from './movies';
import { getStudios } from '../helpers';
import { Request, Response } from 'express';
import { Mock } from 'vitest';

const studiosBase = [
  {
    id: 1,
    name: 'Disney studios',
    money: 1000,
    movies: [
      { id: 11, name: 'Nightmare before christmas', price: 600 },
      { id: 12, name: 'Aladdin', price: 10000000000 },
    ],
  },
  {
    id: 2,
    name: 'Warner Bros.',
    money: 900,
    movies: [
      { id: 21, name: 'The conjuring', price: 1000000000 },
      { id: 22, name: 'Space Jame', price: 500 },
    ],
  },
  {
    id: 3,
    name: 'Sony Pictures',
    money: 900,
    movies: [
      { id: 31, name: 'Slender man', price: 700 },
      { id: 32, name: 'Spider-man into the spider-verse', price: 450 },
    ],
  },
];

const createStudiosCopy = () => {
  const [disney, warner, sony] = studiosBase;
  return [{ ...disney }, { ...warner }, { ...sony }];
};

vi.mock('../helpers', async () => {
  const actual = (await vi.importActual('../helpers')) as {};
  return {
    ...actual,
    getStudios: vi.fn(),
  };
});

const res = {} as Response;
res.status = () => res;
res.json = () => res;
const next = vi.fn();

describe('Movies', () => {
  it('should transfer movie successfully', () => {
    const studios = createStudiosCopy();
    (getStudios as Mock).mockImplementation(() => studios);

    // movie 11 ($600), transfering from studio 1 ($1000) to 3 ($900)
    const req = { body: { movieId: 11, studioToId: 3 } } as Request;

    transferMovie(req, res, next);

    const studio1 = studios.find((st) => st.id === 1);
    const studio3 = studios.find((st) => st.id === 3);
    expect(studio1.money).toBe(1600);
    expect(studio3.money).toBe(300);
    expect(studio1.movies).toHaveLength(1);
    expect(studio3.movies).toHaveLength(3);
    expect(studio3.movies.find((movie) => movie.id === 11)).toBeTruthy();
  });

  it('should throw error if movie not found', () => {
    const studios = createStudiosCopy();
    (getStudios as Mock).mockImplementation(() => studios);

    const req = { body: { movieId: 16, studioToId: 3 } } as Request;

    expect(() => {
      transferMovie(req, res, next);
    }).toThrow('Movie not found.');
  });

  it('should throw error if studio not found', () => {
    const studios = createStudiosCopy();
    (getStudios as Mock).mockImplementation(() => studios);

    const req = { body: { movieId: 11, studioToId: 5 } } as Request;

    expect(() => {
      transferMovie(req, res, next);
    }).toThrow('Studio not found.');
  });

  it('should throw error if movie is already in studio requested for transfer', () => {
    const studios = createStudiosCopy();
    (getStudios as Mock).mockImplementation(() => studios);

    const req = { body: { movieId: 11, studioToId: 1 } } as Request;

    expect(() => {
      transferMovie(req, res, next);
    }).toThrow('Buyer and seller studios cannot be the same.');
  });

  it("should throw error if buyer doesn't have enough money", () => {
    const studios = createStudiosCopy();
    (getStudios as Mock).mockImplementation(() => studios);

    const req = { body: { movieId: 12, studioToId: 3 } } as Request;

    expect(() => {
      transferMovie(req, res, next);
    }).toThrow('Not enough money for transfer.');
  });
});
