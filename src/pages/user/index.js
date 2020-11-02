import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';

import HTMLRedirect from '../../components/HtmlRedirect';

function SessionUser ({ user }) {
  if (user.uid) {
    useRouter().replace(`/user/${user.uid}`);
  }

  if (user.empty) {
    useRouter().replace('/signin');
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
  );
}

export default SessionUser;
