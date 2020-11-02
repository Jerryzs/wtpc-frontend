/* global fetch */

const API = process.env.NEXT_PUBLIC_API;

const GlobalObject = {
  fetcher: (...args) => fetch(...args)
    .then(res => res.json())
    .then(res => { if (!res.success) throw Error(); return res.data; }),

  api: {
    forum: API + '/forum',
    auth: API + '/auth',
    user: API + '/user'
  }
};

export default GlobalObject;
