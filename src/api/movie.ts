export const getMovies = async () => {
  const res = await fetch("http://localhost:12345/movie");
  const data = await res.json();

  return data;
};

export const getRandomMovies = async () => {
  const res = await fetch("http://localhost:12345/movie/random");
  const data = await res.json();

  return data;
};

export const getMovieById = async (id: number) => {
  const res = await fetch(`http://localhost:12345/movie/${id}`);
  const data = await res.json();

  return data;
};

export const getMoviesBySearch = async (search: string) => {
  const res = await fetch(`http://localhost:12345/movie/search?q=${search}`);
  const data = await res.json();

  return data;
};
