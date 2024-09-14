import { PropsWithChildren } from "react";
import Header from "../common/header";
import Footer from "../common/footer";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="max-w-[800px] mx-auto py-4 px-5">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
