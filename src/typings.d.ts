import GlobalObject from './global'

declare global {
  const $0: typeof GlobalObject

  interface ResponseBase {
    readonly data: any
    readonly message: string
    readonly success: boolean
  }

  interface UserBase {
    readonly lv: {
      readonly color: null | string
      readonly id: number
      readonly name: string
      readonly text_color: null | string
    }
    readonly name: string
    readonly picture: string
  }

  interface User extends UserBase {
    readonly bio: string
    readonly code: number
    readonly email: string
    readonly exp: number
    readonly is_member: 0 | 1
    readonly is_moderator: 0 | 1
    readonly join_time: null | bigint
    readonly register_time: bigint
    readonly uid: number
    readonly verify: null | {
      readonly color: null | string
      readonly id: number
      readonly message: string
      readonly tag: string
      readonly text_color: null | string
    }
  }

  interface UserWithPage extends User {
    readonly user_page: string
  }

  interface NoUser {
    readonly empty: true
  }

  type SessionUser = User | NoUser | undefined
}
