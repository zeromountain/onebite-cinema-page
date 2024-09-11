import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function SearchForm() {
  const router = useRouter();
  const { q } = router.query;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchQuery = inputRef.current?.value;

    if (!searchQuery) {
      alert("검색어를 입력해 주세요.");
      inputRef.current?.focus();
      return;
    }

    router.push(`/search?q=${searchQuery}`);
  };

  useEffect(() => {
    if (!q) {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [q]);

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        name="search"
        defaultValue={q}
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
