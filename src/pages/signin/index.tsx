import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { OAuth2Client } from 'google-auth-library';

import { NextSeo } from 'next-seo';

import HTMLRedirect from '../../components/HTMLRedirect';

function SignIn ({
  url,
  user
}: {
  url: string,
  user: SessionUser
}): JSX.Element {
  useEffect(() => {
    if ($0.authed(user)) {
      useRouter().replace(`/user/${user.uid}`);
    } else {
      window.location.replace(url);
    }
  }, []);

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
  );
}

export async function getStaticProps () {
  const oauth2 = new OAuth2Client(
    process.env.GOOGLE_AUTH_CLIENT_ID,
    process.env.GOOGLE_AUTH_CLIENT_SECRET,
    'http://localhost:3000/signin/redirect'
  );

  const url = oauth2.generateAuthUrl({
    hd: 'winchesterthurston.org',
    scope: [
      'profile',
      'email'
      // 'https://www.googleapis.com/auth/userinfo.email',
      // 'https://www.googleapis.com/auth/userinfo.profile'
    ]
  });

  return {
    props: {
      url: url
    }
  };
}

export default SignIn;
