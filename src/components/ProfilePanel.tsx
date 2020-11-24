import { useRouter } from 'next/router'
import Badge from './Badge'
import Markdown from './Markdown'
import styles from '../scss/components/ProfilePanel.module.scss'

function ProfilePanel<User extends UserBase> ({
  user,
  className = '',
  large = false,
  link = false
}: {
  user: User | NoUser
  className?: string
  large?: boolean
  link?: boolean
}): JSX.Element {
  const router = useRouter()

  if (!$0.authed(user)) {
    const guest: UserBase = {
      name: 'Not signed in',
      picture: '/assets/icons/person.svg',
      lv: {
        id: 0,
        name: 'Visitor',
        text_color: '#ffffff',
        color: '#6c757d'
      }
    }
    user = guest as User
  }

  function handlePanelClick (): void {
    if (link && $0.authed(user)) {
      router.replace(`/user/${user.uid}`).then(null, null)
    }
  }

  return (
    <div
      className={`${styles.wrapper} ${className}`.trim()}
      style={{
        width: large === undefined || !large ? '196px' : '255px',
        minWidth: large === undefined || !large ? '196px' : '255px',
        cursor: link === undefined || !link ? 'default' : 'pointer'
      }}
      onClick={handlePanelClick}
    >
      {
        user.picture === '' ? undefined : (
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
        !(large && ($0.authed(user) && user.verify !== null)) ? undefined : (
          <Badge
            text={user.verify.message}
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
            !$0.authed(user) ? undefined : (
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
          !($0.authed(user) && user.is_member !== 0) ? undefined : (
            <Badge
              text={!large ? 'Member' : 'Programming Club Member'}
              bgColor='#28a745'
            />
          )
        }

        {
          !($0.authed(user) && user.is_moderator !== 0) ? undefined : (
            <Badge
              text='Moderator'
              bgColor='#17a2b8'
            />
          )
        }

        {
          !(!large && ($0.authed(user) && user.verify !== null)) ? undefined : (
            <Badge
              text={user.verify.tag}
              color={user.verify.text_color}
              bgColor={user.verify.color}
            />
          )
        }
      </div>

      {
        !(large && $0.authed(user)) ? undefined : (
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
  )
}

export default ProfilePanel
