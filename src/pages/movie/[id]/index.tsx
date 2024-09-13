import { useParams } from "next/navigation";

import movieData from "@/mock/dummy.json";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  company: string;
  genres: string[];
  subTitle: string;
  description: string;
  runtime: number;
  posterImgUrl: string;
}

export default function MoviePage() {
  const params = useParams();
  const movieId = Number(params?.id);
  const movie = movieData.find((m) => m.id === movieId);

  if (!movie) {
    return <p className="text-center text-2xl">영화를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 이미지 포스터 영역 */}
      <section
        style={{
          backgroundImage: `url(${movie.posterImgUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="flex h-[400px] justify-center items-center relative before:content-[''] before:absolute before:top-0 before:left-0 before:bg-black before:opacity-50 before:w-full before:h-full"
      >
        <Image
          src={movie.posterImgUrl}
          alt={movie.title}
          width={220}
          height={300}
          className="absolute z-10"
        />
      </section>
      {/* 영화 정보 영역 */}
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">{movie.title}</h3>
        <div className="flex gap-2 text-sm">
          <p>{movie.releaseDate}</p>
          <span className="text-gray-500">|</span>
          <p>{movie.genres.join(", ")}</p>
          <span className="text-gray-500">|</span>
          <p>{movie.runtime}분</p>
        </div>
        <p className="text-sm font-light text-gray-300">{movie.company}</p>
        <h4 className="text-lg font-bold">{movie.subTitle}</h4>
        <p className="text-sm text-yellow-200 font-semibold">
          {movie.description}
        </p>
      </section>
    </div>
  );
}
