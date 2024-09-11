import { useRouter } from "next/router";

import SearchableLayout from "@/components/layout/SearchableLayout";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;

  return <p>검색결과: {q}</p>;
}

SearchPage.getLayout = (page: React.ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
