import { useParams } from "next/navigation";

export default function MoviePage() {
  const params = useParams();

  return <p>{params?.id} 영화 상세 페이지</p>;
}
