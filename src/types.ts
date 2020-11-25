import GlobalObject from './global'

declare global {
  const $0: typeof GlobalObject

  interface ResponseBase {
    data: any
    message: string
    success: boolean
  }

  interface UserBase {
    lv: {
      color: null | string
      id: number
      name: string
      text_color: null | string
    }
    name: string
    picture: string
  }

  interface User extends UserBase {
    bio: string
    code: number
    email: string
    exp: number
    is_member: 0 | 1
    is_moderator: 0 | 1
    join_time: null | bigint
    register_time: bigint
    uid: number
    verify: null | {
      color: null | string
      id: number
      message: string
      tag: string
      text_color: null | string
    }
  }

  interface UserWithPage extends User {
    user_page: string
  }

  interface NoUser {
    empty: true
  }

  type SessionUser = User | NoUser | undefined
}
