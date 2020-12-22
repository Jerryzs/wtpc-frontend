import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { OAuth2Client } from 'google-auth-library'
import { NextSeo } from 'next-seo'
import HTMLRedirect from '../../components/HTMLRedirect'

import type { GetStaticProps } from 'next'

function SignIn ({
  url,
  user
}: {
  url: string
  user: SessionUser
}): JSX.Element | null {
  const router = useRouter()

  useEffect(() => {
    if ($0.isUser(user)) {
      router.replace(`/user/${user.uid}`).then(null, null)
    }
    if ($0.noAuth(user)) {
      window.location.replace(url)
    }
  }, [user])

  return (
    <>
      <NextSeo
        noindex
        title='Sign In'
      />

      <HTMLRedirect
        url={url}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const oauth2 = new OAuth2Client(
    process.env.GOOGLE_AUTH_CLIENT_ID,
    process.env.GOOGLE_AUTH_CLIENT_SECRET,
    'http://localhost:3000/signin/redirect'
  )

  const url = oauth2.generateAuthUrl({
    hd: 'winchesterthurston.org',
    scope: [
      'profile',
      'email'
      // 'https://www.googleapis.com/auth/userinfo.email',
      // 'https://www.googleapis.com/auth/userinfo.profile'
    ]
  })

  return { props: { url } }
}

export default SignIn
