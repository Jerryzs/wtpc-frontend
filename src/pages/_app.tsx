import '../global'
import '../scss/global.scss'

import useSWR from 'swr'

import { DefaultSeo } from 'next-seo'

import MainLayout from '../components/MainLayout'

import type { AppProps } from 'next/app'

if (typeof window !== 'undefined') {
  require('bootstrap')
}

const _seo = {
  titleTemplate: '%s - WT Programming Club'
}

function App ({
  Component,
  pageProps
}: AppProps): JSX.Element {
  const user: SessionUser = useSWR(
    $0.api.user,
    async (url: string) => await $0.fetcher(url, { credentials: 'include' })
  ).data

  return (
    <>
      <DefaultSeo
        {..._seo}
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
  )
}

export default App
