import { NextSeo } from 'next-seo'
import LargeButton from '../../components/LargeButton'
import HorizontalDivider from '../../components/HorizontalDivider'
import ProfilePanel from '../../components/ProfilePanel'
import styles from '../../scss/pages/forum/index.module.scss'

import type { GetStaticProps } from 'next'

interface ForumBlockBase {
  category: number | null
  description: string
  icon: string
  id: number
  name: string
}

interface CategoryZero {
  blocks: Array<ForumBlockBase & { category: null }>
}

interface Category {
  blocks: Array<ForumBlockBase & { category: number}>
  id: number
  name: string
}

interface ForumBlocks {
  categories: {
    [cat: string]: Category
  } & {
    '0': CategoryZero
  }
}

function Forum ({
  user,
  blocks
}: {
  user: SessionUser
  blocks: ForumBlocks
}): JSX.Element {
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
            Object.keys(blocks.categories).map((category) => (
              <div
                key={`c_${category}`}
                className={styles.category}
              >
                {
                  category === '0' ? undefined : (
                    <HorizontalDivider
                      className={styles.divider}
                      text={blocks.categories[category].name}
                    />
                  )
                }

                {
                  blocks.categories[category].blocks.map((block, index) => (
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
            data={user}
          />
        </div>

        <div
          style={{
            marginLeft: '-16px'
          }}
        />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const blocks = await $0.fetcher($0.api.forum.blocks)
  return { props: { blocks } }
}

export default Forum
