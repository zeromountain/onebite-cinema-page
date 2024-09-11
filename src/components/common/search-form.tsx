import { useRouter } from "next/router";

export default function SearchForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("search");
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        placeholder="영화 제목을 입력해 주세요.."
        className="flex-1 p-2 rounded-md border-2 border-gray-300 bg-transparent outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="w-[80px] bg-gray-500 text-white p-2 rounded-md"
      >
        검색
      </button>
    </form>
  );
}
