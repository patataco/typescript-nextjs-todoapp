import NiceModal from '@ebay/nice-modal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import '@/styles/globals.css';

import Layout from '@/components/Layout';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>
        <RecoilRoot>
          <Layout>
            <ReactQueryDevtools initialIsOpen={false} />
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </NiceModal.Provider>
    </QueryClientProvider>
  );
}
