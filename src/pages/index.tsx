import SearchableLayout from "@/components/layout/searchable-layout";
import MovieItem from "@/components/common/movie-item";
import dummyData from "@/mock/dummy.json";

export default function Home() {
  return (
    <div className="min-h-screen pt-4">
      <section className="mb-8 w-full">
        <h2 className="text-2xl font-bold mb-4">지금 가장 추천하는 영화</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {[...dummyData]
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map((movie) => (
              <li key={`recommended-${movie.id}`}>
                <MovieItem movie={movie} w={300} h={400} />
              </li>
            ))}
        </ul>
      </section>
      <section className="mb-8 w-full ">
        <h2 className="text-2xl font-bold mb-4">등록된 모든 영화</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {dummyData.map((movie) => (
            <li key={`all-${movie.id}`}>
              <MovieItem movie={movie} w={140} h={200} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
