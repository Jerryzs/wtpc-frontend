import Error from 'next/error';
import { NextSeo } from 'next-seo';

import ProfilePanel from '../../components/ProfilePanel';
import Markdown from '../../components/Markdown';

import styles from '../../scss/pages/user/User.module.scss';

function User ({ user, data }) {
  var isCU = false;

  if (!data.uid) {
    return <Error statusCode={404} />;
  }

  if (!isCU && user.uid === data.uid) {
    isCU = true;
  }

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

export async function getServerSideProps ({ params }) {
  const props = {};
  const uid = parseInt(params.uid, 10);

  if (!isNaN(uid)) {
    props.data = await $0.fetcher(`${$0.api.user}?uid=${uid}&userpage=1`);
  } else {
    props.data = {};
  }

  return {
    props: props
  };
}

export default User;
