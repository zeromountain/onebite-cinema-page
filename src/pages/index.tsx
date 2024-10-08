import { GetStaticProps } from "next";

import Head from "next/head";

import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";

import { getMovies, getRandomMovies } from "@/api/movie";
import SearchableLayout from "@/components/layout/searchable-layout";
import { QUERY_KEY } from "@/constant/query-key";
import MovieItem from "@/components/common/movie-item";
import { Movie } from "@/types";

export const getStaticProps = (async () => {
  const queryClient = new QueryClient();

  try {
    await Promise.allSettled([
      queryClient.prefetchQuery({
        queryKey: QUERY_KEY.MOVIE_LIST_RETRIEVE,
        queryFn: getMovies,
      }),
      queryClient.prefetchQuery({
        queryKey: QUERY_KEY.RANDOM_MOVIE_RETRIEVE,
        queryFn: getRandomMovies,
      }),
    ]);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
}) satisfies GetStaticProps;

export default function Home({
  dehydratedState,
}: {
  dehydratedState: DehydratedState;
}) {
  const { data: movies } = useQuery<Movie[]>({
    queryKey: QUERY_KEY.MOVIE_LIST_RETRIEVE,
    queryFn: getMovies,
    initialData: dehydratedState.queries[0].state.data as Movie[],
  });

  const { data: randomMovies } = useQuery<Movie[]>({
    queryKey: QUERY_KEY.RANDOM_MOVIE_RETRIEVE,
    queryFn: getRandomMovies,
    initialData: dehydratedState.queries[1].state.data as Movie[],
  });

  return (
    <>
      <Head>
        <title>한입 씨네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마" />
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 영화들을 만나보세요"
        />
      </Head>
      <div className="min-h-screen pt-4">
        <section className="mb-8 w-full">
          <h2 className="text-2xl font-bold mb-4">지금 가장 추천하는 영화</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {randomMovies.map((movie) => (
              <li key={`recommended-${movie.id}`}>
                <MovieItem movie={movie} w={300} h={400} />
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-8 w-full ">
          <h2 className="text-2xl font-bold mb-4">등록된 모든 영화</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {movies.map((movie) => (
              <li key={`all-${movie.id}`}>
                <MovieItem movie={movie} w={140} h={200} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: React.ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
