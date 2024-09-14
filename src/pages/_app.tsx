import { NextPage } from "next";
import type { AppProps } from "next/app";

import RootLayout from "@/components/layout/root-layout";

import "@/styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>;
}
