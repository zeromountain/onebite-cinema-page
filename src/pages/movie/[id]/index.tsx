import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import { useParams } from "next/navigation";

import { getMovieById, getMovies } from "@/api/movie";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { Movie } from "@/types";
import { useRouter } from "next/router";
import { QUERY_KEY } from "@/constant/query-key";
import Head from "next/head";

export const getStaticPaths = (async () => {
  const movies: Movie[] = await getMovies();
  const paths = movies.map((movie) => ({ params: { id: String(movie.id) } }));

  return { paths, fallback: "blocking" };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEY.MOVIE_RETRIEVE(String(context.params?.id)),
      queryFn: () => getMovieById(Number(context.params?.id)),
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
}) satisfies GetStaticProps;

export default function MoviePage({
  dehydratedState,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const params = useParams();
  const movieId = Number(params?.id);

  const dehydratedMovie = dehydratedState?.queries[0].state.data as Movie;

  const { data: movie } = useQuery<Movie>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId),
    initialData: dehydratedMovie,
  });

  if (router.isFallback) {
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
        <div>Loading...</div>
      </>
    );
  }

  if (!movie) {
    return <p className="text-center text-2xl">영화를 찾을 수 없습니다.</p>;
  }

  return (
    <>
      <Head>
        <title>{movie.title}</title>
        <meta property="og:image" content={movie.posterImgUrl} />
        <meta property="og:title" content={movie.title} />
        <meta property="og:description" content={movie.description} />
      </Head>
      <div className="flex flex-col min-h-screen gap-4">
        {/* 이미지 포스터 영역 */}
        <section
          style={{
            backgroundImage: `url(${movie.posterImgUrl})`,
          }}
          className="flex h-[400px] justify-center items-center relative bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:top-0 before:left-0 before:bg-black before:opacity-50 before:w-full before:h-full"
        >
          <Image
            src={movie.posterImgUrl}
            alt={movie.title}
            width={220}
            height={300}
            objectFit="cover"
            className="relative z-10"
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
    </>
  );
}
