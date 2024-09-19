export const QUERY_KEY = {
  MOVIE_LIST_RETRIEVE: ["movies"],
  RANDOM_MOVIE_RETRIEVE: ["random-movies"],
  SEARCH_MOVIE_RETRIEVE: (qs: string) => ["search-movie", qs],
  MOVIE_RETRIEVE: (id: string) => ["movie", id],
};
