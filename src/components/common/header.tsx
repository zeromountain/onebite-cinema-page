import Link from "next/link";

export default function Header() {
  return (
    <header className="h-20 flex items-center bg-transparent">
      <Link href="/">
        <h1 className="text-2xl font-bold text-red-500">🎥 ONEBITE CINEMA</h1>
      </Link>
    </header>
  );
}
