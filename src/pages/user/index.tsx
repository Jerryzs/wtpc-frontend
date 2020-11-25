import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import HTMLRedirect from '../../components/HTMLRedirect'

function SessionUser ({
  user
}: {
  user: SessionUser
}): JSX.Element | null {
  const router = useRouter()

  useEffect(() => {
    if ($0.isUser(user)) {
      router.replace(`/user/${user.uid}`).then(null, null)
    }
    if ($0.noAuth(user)) {
      router.replace('/signin').then(null, null)
    }
  }, [user])

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
