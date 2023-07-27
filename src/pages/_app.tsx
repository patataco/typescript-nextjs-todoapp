import type { ReactElement, ReactNode } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import '@/styles/globals.css';

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>
        <RecoilRoot>
          <ReactQueryDevtools initialIsOpen={false} />
          {getLayout(<Component {...pageProps} />)}
        </RecoilRoot>
      </NiceModal.Provider>
    </QueryClientProvider>
  );
}
