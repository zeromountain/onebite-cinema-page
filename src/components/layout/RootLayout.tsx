import { PropsWithChildren } from "react";
import Header from "../common/header";
import Footer from "../common/footer";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto py-4 px-5">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
