import '../global';
import '../scss/global.scss';

import useSWR from 'swr';

import { DefaultSeo } from 'next-seo';

import MainLayout from '../components/MainLayout';

const __seo = {
  titleTemplate: '%s - WT Programming Club'
};

function App ({ Component, pageProps }) {
  const user = useSWR($0.api.user, (url) => $0.fetcher(url, { credentials: 'include' })).data ?? {};

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
