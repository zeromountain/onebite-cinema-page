import { NextPage } from "next";
import type { AppProps } from "next/app";

import RootLayout from "@/components/layout/root-layout";

import "@/styles/globals.css";
import withAppProvider from "@/provider/app-provider";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>;
}

export default withAppProvider(App);
