import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import HTMLRedirect from '../../components/HTMLRedirect'

function SessionUser ({
  user
}: {
  user: SessionUser
}): JSX.Element {
  const router = useRouter()

  if ($0.authed(user)) {
    router.replace(`/user/${user.uid}`).then(null, null)
  } else {
    router.replace('/signin').then(null, null)
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
