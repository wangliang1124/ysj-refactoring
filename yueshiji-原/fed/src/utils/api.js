import axios from 'axios';
import cookie from 'cookiejs';
import qs from 'qs';
import store from '../vuex/index';

const client = axios.create({
  baseURL: 'http://ysj.tcfellow.com:3000/api/v1',
  timeout: 6000,
});

client.interceptors.request.use((c) => {
  const cnf = c;
  cnf.headers.authorization = store.getters.token.id;
  return cnf;
});

client.interceptors.response.use(
  response => response.data,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        cookie('uuid', null);
        cookie('token', null);
        const args = {
          appid: 'wxfc34b0cedd6ce73f',
          state: 'appwx',
          backurl: `${location.href}`,
        };
        const u = `http://ysj.tcfellow.com/static/auth.html?${qs.stringify(args)}`;
        location.replace(u);
      }
    }
  },
);
export default client;
