import { useRouter } from 'next/router';

import Badge from './Badge';
import Markdown from './Markdown';

import styles from '../scss/components/ProfilePanel.module.scss';

function ProfilePanel ({ className, large, link, user }) {
  const router = useRouter();

  user = Object.assign({
    name: 'Not signed in',
    picture: '/assets/icons/person.svg',
    lv: {
      id: 0,
      name: 'Visitor',
      text_color: '#ffffff',
      color: '#6c757d'
    }
  }, user);

  if (!user.uid) {
    link = false;
  }

  function handlePanelClick () {
    if (link) {
      router.replace(`/user/${user.uid}`);
    }
  }

  return (
    <div
      className={`${styles.wrapper} ${className}`.trim()}
      style={{
        width: !large ? '196px' : '255px',
        minWidth: !large ? '196px' : '255px',
        cursor: !link ? 'default' : 'pointer'
      }}
      onClick={handlePanelClick}
    >
      {
        !user.picture ? undefined : (
          <img
            src={user.picture}
          />
        )
      }

      <div
        style={{
          fontSize: !large ? '1rem' : '1.15rem'
        }}
      >
        {user.name}
      </div>

      {
        !large || !user.verify ? undefined : (
          <Badge
            text={`${user.verify.message}`}
            color={user.verify.text_color}
            bgColor={user.verify.color}
          />
        )
      }

      <div
        className={styles.badges}
      >
        <div
          className={styles.level}
        >
          {
            !user.uid ? undefined : (
              <span
                className={styles.exp}
              >
                Exp: {user.exp}
              </span>
            )
          }

          <Badge
            text={`Lv${user.lv.id}: ${user.lv.name}`}
            color={user.lv.text_color}
            bgColor={user.lv.color}
          />
        </div>

        {
          !user.is_member ? undefined : (
            <Badge
              text={!large ? 'Member' : 'Programming Club Member'}
              bgColor='#28a745'
            />
          )
        }

        {
          !user.is_moderator ? undefined : (
            <Badge
              text='Moderator'
              bgColor='#17a2b8'
            />
          )
        }

        {
          large || !user.verify ? undefined : (
            <Badge
              text={user.verify.tag}
              color={user.verify.text_color}
              bgColor={user.verify.color}
            />
          )
        }
      </div>

      {
        !large ? undefined : (
          <div
            className={styles.bio}
          >
            <Markdown
              children={user.bio}
            />
          </div>
        )
      }
    </div>
  );
}

export default ProfilePanel;
