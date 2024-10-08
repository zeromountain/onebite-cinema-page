import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface MovieItemProps {
  movie: Movie;
  w: number;
  h: number;
}

export default function MovieItem({ movie, w, h }: MovieItemProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <Image
        src={movie.posterImgUrl}
        alt={movie.title}
        sizes="100vw"
        width={w}
        height={h}
        className="w-full h-auto rounded mb-2 hover:scale-105 transition-all duration-300 cursor-pointer"
      />
    </Link>
  );
}
