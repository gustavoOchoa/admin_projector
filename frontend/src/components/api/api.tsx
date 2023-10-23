import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from "nookies";

const Api = () => {
  let instance = axios.create();

  instance.interceptors.request.use(async function (config:any) {
    // Verificacion por typescript
    if (config.headers === undefined) {
      config.headers = {};
    }
    const cokie = await getCookieToken();
    if (cokie) {
      config.headers['token'] = cokie['token'];
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
  }, error => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response:any) {
      // Verificacion por typescript
      if (response.config.headers === undefined) {
        response.config.headers = {};
      }
      if (response.config.headers['token']) {
        setCookieToken(response.config.headers['token']);
      }
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance;
};

export const setCookieToken = (token: any) => {
  setCookie(null, 'token', token, {
    secure: process.env.ENVIROMENT !== 'development',
    maxAge: Number(process.env.MAXAGE),
    sameSite: "strict",
    path: "/",
  });

  let cokies = parseCookies();

  // Definimos type boolean para success
  let ret: {
    success?: boolean
  } = {};

  ret.success = !!(cokies['token']);
  return ret;
};

export const removeCookies = async (url: string = '') => {
  // Con el path nos aseguramos que las cookies se eliminen desde cualquier app
  await Promise.all([
    destroyCookie(null, 'token', { path: '/' })
  ])
  if(url != ''){
    window.location.replace(url);
  }
};

export const getCookieToken = async () => {
  return parseCookies();
};

export default Api();
