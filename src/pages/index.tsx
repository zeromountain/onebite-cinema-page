import SearchableLayout from "@/components/layout/SearchableLayout";

export default function Home() {
  return <h1>ONEBITE CINEMA</h1>;
}

Home.getLayout = (page: React.ReactNode) => (
  <SearchableLayout>{page}</SearchableLayout>
);
