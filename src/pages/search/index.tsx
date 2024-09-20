import { useRouter } from "next/router";

import { useQuery } from "@tanstack/react-query";

import { getMoviesBySearch } from "@/api/movie";
import SearchableLayout from "@/components/layout/searchable-layout";
import MovieItem from "@/components/common/movie-item";
import { Movie } from "@/types";
import { QUERY_KEY } from "@/constant/query-key";
import Head from "next/head";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query as { q: string };

  const { data } = useQuery<Movie[]>({
    queryKey: QUERY_KEY.SEARCH_MOVIE_RETRIEVE(q),
    queryFn: () => getMoviesBySearch(q),
  });

  return (
    <>
      <Head>
        <title>한입 씨네마 검색:{q}</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content={`한입 씨네마`} />
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 영화들을 만나보세요"
        />
      </Head>
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
    </>
  );
}

SearchPage.getLayout = (page: React.ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
