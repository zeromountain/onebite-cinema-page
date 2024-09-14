import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";

import { getMoviesBySearch } from "@/api/movie";
import SearchableLayout from "@/components/layout/searchable-layout";
import MovieItem from "@/components/common/movie-item";
import { Movie } from "@/types";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["search-movies"],
      queryFn: () => getMoviesBySearch(context.query.q as string),
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
};

export default function SearchPage({
  dehydratedState,
}: {
  dehydratedState: DehydratedState;
}) {
  const router = useRouter();
  const { q } = router.query as { q: string };

  const { data } = useQuery<Movie[]>({
    queryKey: ["search-movies"],
    queryFn: () => getMoviesBySearch(q),
    initialData: dehydratedState.queries[0].state.data as Movie[],
  });

  return (
    <div className="min-h-screen pt-4">
      {data && data.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((movie) => (
            <li key={movie.id}>
              <MovieItem movie={movie} w={300} h={400} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-2xl font-bold">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

SearchPage.getLayout = (page: React.ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
