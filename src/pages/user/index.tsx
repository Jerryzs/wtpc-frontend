import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import HTMLRedirect from '../../components/HTMLRedirect'

function SessionUser ({
  user
}: {
  user: SessionUser
}): JSX.Element {
  if ($0.authed(user)) {
    useRouter().replace(`/user/${user.uid}`).then(null, null)
  } else {
    useRouter().replace('/signin').then(null, null)
  }

  return (
    <>
      <NextSeo
        noindex
        title='Me - User'
      />

      <HTMLRedirect
        url='/signin'
      />
    </>
  )
}

export default SessionUser
