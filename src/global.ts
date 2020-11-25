/* global fetch */

const API = process.env.NEXT_PUBLIC_API ?? ''

interface RequestData {
  [key: string]: string
}

const GlobalObject = {
  isUser: (user: any): user is User => {
    return user !== undefined && user.uid !== undefined
  },

  noAuth: (user: any): user is NoUser => {
    return user !== undefined && user.empty === true
  },

  fetcher: async (url: RequestInfo, init?: RequestInit) =>
    await fetch(url, init)
      .then(async (res): Promise<ResponseBase> => await res.json())
      .then((res): any => {
        if (!res.success) {
          throw Error()
        }
        return res.data
      }),

  api: {
    forum: API + '/forum',
    auth: API + '/auth',
    user: API + '/user',
    userCheck: API + '/user/check'
  },

  request: async (url: string, data: RequestData = {}) =>
    await new Promise<any>((resolve, reject) => {
      url +=
        '?' +
        Object.keys(data)
          .map((key) => `${key}=${encodeURIComponent(data[key])}`)
          .join('&')

      const request = new window.XMLHttpRequest()

      request.open('GET', url, true)
      request.withCredentials = true
      request.responseType = 'json'

      request.onload = () => {
        const res: ResponseBase = request.response
        if (!res.success) {
          reject(res.message)
        } else {
          resolve(res.data)
        }
      }
      request.onerror = () => reject(request.status)

      request.send()
    }),

  post: async (url: string, data: RequestData = {}) =>
    await new Promise<any>((resolve, reject) => {
      const raw = Object.keys(data)
        .map((key) => `${key}=${encodeURIComponent(data[key])}`)
        .join('&')

      const request = new window.XMLHttpRequest()
      request.open('POST', url, true)
      request.withCredentials = true
      request.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded; charset=UTF-8'
      )
      request.responseType = 'json'

      request.onload = () => {
        const res: ResponseBase = request.response
        if (!res.success) {
          reject(res.message)
        } else {
          resolve(res.data)
        }
      }
      request.onerror = () => reject(request.status)

      request.send(raw)
    })
}

export default GlobalObject
