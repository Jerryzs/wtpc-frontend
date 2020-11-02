import { useRouter } from 'next/router';
import { OAuth2Client } from 'google-auth-library';
import { NextSeo } from 'next-seo';

import HTMLRedirect from '../../components/HtmlRedirect';

function SignIn ({ url, user }) {
  if (typeof window !== 'undefined') {
    if (user.uid) {
      useRouter().replace(`/user/${user.uid}`);
    } else if (user.empty) {
      window.location.replace(url);
    }
  }

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
