import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';

import Error from 'next/error';
import { NextSeo } from 'next-seo';

import ProfilePanel from '../../components/ProfilePanel';
import Markdown from '../../components/Markdown';

import styles from '../../scss/pages/user/User.module.scss';

function User ({
  user,
  data
}: {
  user: SessionUser,
  data: UserWithPage | undefined
}): JSX.Element {
  if (!data) {
    return <Error statusCode={404} />;
  }

  const [isCU, setIsCU] = useState(false);

  useEffect(() => {
    if ($0.authed(user) && user.uid === data.uid) {
      setIsCU(true);
    } else {
      setIsCU(false);
    }
  }, [user]);

  return (
    <>
      <NextSeo
        title={`${data.name} - User`}
      />

      <div
        className={styles.wrapper}
      >
        <div
          className={styles.profile}
        >
          <ProfilePanel
            large
            user={data}
          />
        </div>

        <div
          className={styles.main}
        >
          <div
            className='markdown-body'
          >
            <Markdown
              children={data.user_page}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const uid: number = parseInt(String(params?.uid), 10);

  var data: UserWithPage | undefined;
  if (!isNaN(uid)) {
    data = await $0.fetcher(`${$0.api.user}?uid=${uid}&userpage=1`) as UserWithPage;
  }

  return {
    props: {
      data: data
    }
  };
}

export default User;
