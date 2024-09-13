import { useState, useEffect } from "react";
import SearchableLayout from "@/components/layout/searchable-layout";
import dummyData from "@/mock/dummy.json";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types";

export default function Home() {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const shuffled = [...dummyData].sort(() => 0.5 - Math.random());
    setRecommendedMovies(shuffled.slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen p-4">
      <section className="mb-8 w-full">
        <h2 className="text-2xl font-bold mb-4">지금 가장 추천하는 영화</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {recommendedMovies.map((movie) => (
            <Link key={`recommended-${movie.id}`} href={`/movie/${movie.id}`}>
              <Image
                src={movie.posterImgUrl}
                alt={movie.title}
                objectFit="cover"
                width={300}
                height={400}
                className="rounded mb-2 hover:scale-105 transition-all duration-300 cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="mb-8 w-full ">
        <h2 className="text-2xl font-bold mb-4">등록된 모든 영화</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {dummyData.map((movie) => (
            <Link key={`all-${movie.id}`} href={`/movie/${movie.id}`}>
              <Image
                src={movie.posterImgUrl}
                alt={movie.title}
                objectFit="cover"
                width={140}
                height={200}
                className="rounded mb-2 hover:scale-105 transition-all duration-300 cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
