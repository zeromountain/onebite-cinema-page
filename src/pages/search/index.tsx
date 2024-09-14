import { useRouter } from "next/router";

import SearchableLayout from "@/components/layout/searchable-layout";
import dummyData from "@/mock/dummy.json";
import MovieItem from "@/components/common/movie-item";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query as { q: string };

  const results = dummyData.filter((movie) =>
    movie.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-4">
      {results.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {results.map((movie) => (
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
