import { useRouter } from 'next/router';
import { OAuth2Client } from 'google-auth-library';

import { NextSeo } from 'next-seo';

const __api = {
  auth: API + '/auth'
};

function SignInRedirect ({ idToken }) {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    window.fetch(__api.auth, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
      body: 'token=' + idToken
    }).then((res) => res.json()).then((res) => {
      if (!res.success) {
        router.push('/signin');
        return;
      }

      if (!res.newbie) {
        router.push('/');
      }
    });
  }

  return (
    <NextSeo
      noindex
      title='Redirecting'
    />
  );
}

export async function getServerSideProps ({ query }) {
  const oauth2 = new OAuth2Client(
    process.env.GOOGLE_AUTH_CLIENT_ID,
    process.env.GOOGLE_AUTH_CLIENT_SECRET,
    'http://localhost:3000/signin/redirect'
  );

  var tokens;
  try {
    tokens = await oauth2.getToken(query.code).then(res => res.tokens);
  } catch (e) {
    tokens = '';
  }

  return {
    props: {
      idToken: tokens && tokens.id_token
    }
  };
}

export default SignInRedirect;
