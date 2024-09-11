import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 h-20 flex items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold text-red-500">🎥 ONEBITE CINEMA</h1>
      </Link>
    </header>
  );
}
