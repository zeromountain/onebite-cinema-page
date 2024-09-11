import { PropsWithChildren } from "react";
import SearchForm from "../common/search-form";

export default function SearchableLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <SearchForm />
      {children}
    </div>
  );
}
