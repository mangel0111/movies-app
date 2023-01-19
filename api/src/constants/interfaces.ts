export interface IMovie {
  id: number;
  name: string;
  genre: number;
  img?: string;
  url?: string;
  price: number;
}

export interface IStudio {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  money: number;
  movies: IMovie[];
}
