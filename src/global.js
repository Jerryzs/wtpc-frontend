/* global fetch */

const API = process.env.NEXT_PUBLIC_API;

const GlobalObject = {
  fetcher: (...args) => fetch(...args)
    .then(res => res.json())
    .then(res => { if (!res.success) throw Error(); return res.data; }),

  api: {
    forum: API + '/forum',
    auth: API + '/auth',
    user: API + '/user',
    userCheck: API + '/user/check'
  },

  request: (url, data = {}) => new Promise((resolve, reject) => {
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

  post: (url, data = {}) => new Promise((resolve, reject) => {
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
