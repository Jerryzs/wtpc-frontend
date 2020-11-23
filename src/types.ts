import GlobalObject from './global';

declare global {
  const $0: typeof GlobalObject;

  type UserBase = {
    lv: {
      color: null | string,
      id: number,
      name: string,
      text_color: null | string
    },
    name: string,
    picture: string
  }

  type User = UserBase & {
    bio: string,
    code: number,
    email: string,
    exp: number,
    is_member: 0 | 1,
    is_moderator: 0 | 1,
    join_time: null | bigint,
    register_time: bigint,
    uid: number,
    verify: {
      color: null | string,
      id: number,
      message: string,
      tag: string,
      text_color: null | string
    }
  }

  type UserWithPage = User & {
    user_page: string
  }

  type NoUser = {
    empty: true
  }

  type SessionUser = User | NoUser
}
