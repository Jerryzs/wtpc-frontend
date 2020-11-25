import { useRouter } from 'next/router'
import Badge from './Badge'
import Markdown from './Markdown'
import styles from '../scss/components/ProfilePanel.module.scss'

function ProfilePanel ({
  data,
  className = '',
  large = false,
  link = false
}: {
  data?: User | NoUser
  className?: string
  large?: boolean
  link?: boolean
}): JSX.Element {
  const router = useRouter()
  var _user: User | UserBase

  if (!$0.isUser(data)) {
    _user = {
      name: 'Not signed in',
      picture: '/assets/icons/person.svg',
      lv: {
        id: 0,
        name: 'Visitor',
        text_color: '#ffffff',
        color: '#6c757d'
      }
    }
  } else {
    _user = data
  }

  function handlePanelClick (): void {
    if (link && $0.isUser(_user)) {
      router.replace(`/user/${_user.uid}`).then(null, null)
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
        _user.picture === '' ? undefined : (
          <img
            src={_user.picture}
          />
        )
      }

      <div
        style={{
          fontSize: !large ? '1rem' : '1.15rem'
        }}
      >
        {_user.name}
      </div>

      {
        !(large && ($0.isUser(_user) && _user.verify !== null)) ? undefined : (
          <Badge
            text={_user.verify.message}
            color={_user.verify.text_color}
            bgColor={_user.verify.color}
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
            !$0.isUser(_user) ? undefined : (
              <span
                className={styles.exp}
              >
                Exp: {_user.exp}
              </span>
            )
          }

          <Badge
            text={`Lv${_user.lv.id}: ${_user.lv.name}`}
            color={_user.lv.text_color}
            bgColor={_user.lv.color}
          />
        </div>

        {
          !($0.isUser(_user) && _user.is_member !== 0) ? undefined : (
            <Badge
              text={!large ? 'Member' : 'Programming Club Member'}
              bgColor='#28a745'
            />
          )
        }

        {
          !($0.isUser(_user) && _user.is_moderator !== 0) ? undefined : (
            <Badge
              text='Moderator'
              bgColor='#17a2b8'
            />
          )
        }

        {
          !(!large && ($0.isUser(_user) && _user.verify !== null)) ? undefined : (
            <Badge
              text={_user.verify.tag}
              color={_user.verify.text_color}
              bgColor={_user.verify.color}
            />
          )
        }
      </div>

      {
        !(large && $0.isUser(_user)) ? undefined : (
          <div
            className={styles.bio}
          >
            <Markdown
              children={_user.bio}
            />
          </div>
        )
      }
    </div>
  )
}

export default ProfilePanel
