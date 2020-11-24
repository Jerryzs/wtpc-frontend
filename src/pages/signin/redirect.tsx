import { useEffect } from 'react'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { OAuth2Client, Credentials } from 'google-auth-library'
import { NextSeo } from 'next-seo'
import type { GetServerSideProps } from 'next'

function SignInRedirect ({
  idToken
}: {
  idToken: string
}): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    $0.post($0.api.auth, {
      token: idToken
    })
      .then((res: { newbie: boolean }) => {
        mutate($0.api.user).then(((isNewbie: boolean) => () => {
          isNewbie
            ? router.replace('/signin/welcome').then(null, null)
            : router.replace('/').then(null, null)
        })(res.newbie), null)
      }, () => {
        router.replace('/signin').then(null, null)
      })
  }, [])

  return (
    <>
      <NextSeo
        noindex
        title='Redirecting'
      />

      <div>
        Signing you in, please wait...
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const oauth2 = new OAuth2Client(
    process.env.GOOGLE_AUTH_CLIENT_ID,
    process.env.GOOGLE_AUTH_CLIENT_SECRET,
    'http://localhost:3000/signin/redirect'
  )

  var tokens: Credentials | undefined
  try {
    tokens = await oauth2.getToken(query.code as string).then(res => res.tokens)
  } catch (e) {
    tokens = undefined
  }

  return { props: { idToken: tokens?.id_token ?? '' } }
}

export default SignInRedirect
