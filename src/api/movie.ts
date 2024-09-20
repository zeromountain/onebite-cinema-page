import { CONFIG } from "@/config";

export const getMovies = async () => {
  const res = await fetch(`${CONFIG.API_URL}/movie`);
  const data = await res.json();

  return data;
};

export const getRandomMovies = async () => {
  const res = await fetch(`${CONFIG.API_URL}/movie/random`);
  const data = await res.json();

  return data;
};

export const getMovieById = async (id: number) => {
  const res = await fetch(`${CONFIG.API_URL}/movie/${id}`);
  const data = await res.json();

  return data;
};

export const getMoviesBySearch = async (search: string) => {
  const res = await fetch(`${CONFIG.API_URL}/movie/search?q=${search}`);
  const data = await res.json();

  return data;
};
