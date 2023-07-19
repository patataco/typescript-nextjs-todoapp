import NiceModal from '@ebay/nice-modal-react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import '@/styles/globals.css';

import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NiceModal.Provider>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </NiceModal.Provider>
  );
}
