import cookie from "js-cookie";

export const getCookie = (key) => {
  return cookie.get(key);
};

export const setCookie = (key, value) => {
  cookie.set(key, value, { expires: 1 });
};

export const removeCookie = (key) => {
  cookie.remove(key);
};

export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
