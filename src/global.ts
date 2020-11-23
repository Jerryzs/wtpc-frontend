/* global fetch */

const API = process.env.NEXT_PUBLIC_API;

type RequestData = {
  [key: string]: string
}

const GlobalObject = {
  authed: (user: any): user is User => {
    return !(user as NoUser).empty;
  },

  fetcher: (url: RequestInfo, init?: RequestInit) => fetch(url, init)
    .then(res =>
      res.json() as Promise<{ data: any, message: string, success: boolean }>)
    .then(res => { if (!res.success) throw Error(); return res.data; }),

  api: {
    forum: API + '/forum',
    auth: API + '/auth',
    user: API + '/user',
    userCheck: API + '/user/check'
  },

  request: (url: string, data: RequestData = {}) => new Promise<any>((resolve, reject) => {
    url += '?' + Object.keys(data).map((key) => `${key}=${encodeURIComponent(data[key])}`).join('&');

    const request = new window.XMLHttpRequest();

    request.open('GET', url, true);
    request.withCredentials = true;
    request.responseType = 'json';

    request.onload = () => {
      const res = request.response;
      if (!res.success) reject(res.message);
      else resolve(res.data);
    };
    request.onerror = () => reject(request.status);

    request.send();
  }),

  post: (url: string, data: RequestData = {}) => new Promise<any>((resolve, reject) => {
    const raw = Object.keys(data).map((key) => `${key}=${encodeURIComponent(data[key])}`).join('&');

    const request = new window.XMLHttpRequest();
    request.open('POST', url, true);
    request.withCredentials = true;
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.responseType = 'json';

    request.onload = () => {
      const res = request.response;
      if (!res.success) reject(res.message);
      else resolve(res.data);
    };
    request.onerror = () => reject(request.status);

    request.send(raw);
  })
};

export default GlobalObject;
