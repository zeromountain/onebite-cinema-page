import type { AppProps } from "next/app";

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

function withAppProvider(AppComponent: React.FC<AppProps>) {
  return function WrappedAppComponent(
    props: AppProps<{ dehydratedState: DehydratedState }>
  ) {
    const [queryClient] = useState(() => new QueryClient());

    return (
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={props.pageProps.dehydratedState}>
          <AppComponent {...props} />
        </HydrationBoundary>
      </QueryClientProvider>
    );
  };
}

export default withAppProvider;
