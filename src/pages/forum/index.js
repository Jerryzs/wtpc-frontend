import useSWR from 'swr';

import { NextSeo } from 'next-seo';

import LargeButton from '../../components/LargeButton';
import HorizontalDivider from '../../components/HorizontalDivider';
import ProfilePanel from '../../components/ProfilePanel';

import styles from '../../scss/pages/forum/index.module.scss';

function Forum ({ user, data }) {
  data = useSWR($0.api.forum, $0.fetcher, { initialData: data }).data ?? {};

  return (
    <>
      <NextSeo
        title='Forum'
      />

      <div
        className={styles.wrapper}
      >
        <div
          className={styles.blocksWrapper}
        >
          {
            Object.keys(data.blocks).map((category) => (
              <div
                key={`c_${category}`}
                className={styles.category}
              >
                {
                  category === '0' ? undefined : (
                    <HorizontalDivider
                      className={styles.divider}
                      text={data.categories[category].name}
                    />
                  )
                }

                {
                  data.blocks[category].map((block, index) => (
                    <LargeButton
                      key={`b_${index}`}
                      title={block.name}
                      description={block.description}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>

        <div
          className={styles.profileWrapper}
        >
          <ProfilePanel
            user={user}
          />
        </div>

        <div
          style={{
            marginLeft: '-16px'
          }}
        />
      </div>
    </>
  );
}

export async function getStaticProps () {
  const data = await $0.fetcher($0.api.forum);

  return {
    props: {
      data: data
    }
  };
}

export default Forum;
