import '../global';
import '../scss/global.scss';

import useSWR from 'swr';

import { DefaultSeo } from 'next-seo';

import MainLayout from '../components/MainLayout';

import type { AppProps } from 'next/app';

if (typeof window !== 'undefined') {
  require('bootstrap');
}

const __seo = {
  titleTemplate: '%s - WT Programming Club'
};

function App ({
  Component,
  pageProps
}: AppProps): JSX.Element {
  const user = useSWR(
    $0.api.user,
    (url: string) => $0.fetcher(url, { credentials: 'include' })
  ).data ?? {};

  return (
    <>
      <DefaultSeo
        {...__seo}
      />

      <MainLayout
        user={user}
      >
        <Component
          {...pageProps}
          user={user}
        />
      </MainLayout>
    </>
  );
}

export default App;
