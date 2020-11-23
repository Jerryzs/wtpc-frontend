import { useEffect } from 'react';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
import { OAuth2Client } from 'google-auth-library';

import { GetServerSideProps } from 'next';
import { Credentials } from 'google-auth-library';

import { NextSeo } from 'next-seo';

function SignInRedirect ({
  idToken
}: {
  idToken: string
}): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    window.fetch($0.api.auth, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
      body: 'token=' + idToken
    }).then((res) => res.json()).then((res) => {
      if (!res.success) {
        router.replace('/signin');
        return;
      }

      mutate($0.api.user).then(((isNewbie) => () =>
        isNewbie ? router.replace('/signin/welcome') : router.replace('/')
      )(res.newbie));
    });
  }, []);

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
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const oauth2 = new OAuth2Client(
    process.env.GOOGLE_AUTH_CLIENT_ID,
    process.env.GOOGLE_AUTH_CLIENT_SECRET,
    'http://localhost:3000/signin/redirect'
  );

  var tokens: Credentials | undefined;
  try {
    tokens = await oauth2.getToken(query.code as string).then(res => res.tokens);
  } catch (e) {
    tokens = undefined;
  }

  return {
    props: {
      idToken: tokens?.id_token ?? ''
    }
  };
}

export default SignInRedirect;
