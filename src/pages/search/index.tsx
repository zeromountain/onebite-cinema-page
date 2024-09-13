import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import SearchableLayout from "@/components/layout/searchable-layout";
import dummyData from "@/mock/dummy.json";
import { Movie } from "@/types";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  useEffect(() => {
    if (q && typeof q === "string") {
      const results = dummyData.filter((movie) =>
        movie.title.toLowerCase().includes(q.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [q]);

  return (
    <div className="min-h-screen pt-4">
      {searchResults.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((movie) => (
            <li key={movie.id}>
              <Link href={`/movie/${movie.id}`}>
                <Image
                  src={movie.posterImgUrl}
                  alt={movie.title}
                  objectFit="cover"
                  width={300}
                  height={400}
                  className="rounded mb-2 hover:scale-105 transition-all duration-300 cursor-pointer"
                />
              </Link>
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
