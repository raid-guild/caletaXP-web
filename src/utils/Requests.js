import axios from 'axios';

export const BaseUrl = () => {
  // return 'https://52.206.204.123:1880/';
  return process.env.REACT_APP_API_URL;
};

export const get = async endpoint => {
  const baseURL = BaseUrl();

  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    return await instance.get(`/${endpoint}`);
  } catch (err) {
    throw new Error(err);
  }
};

export const post = async (endpoint, payload) => {
  const baseURL = BaseUrl();

  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    return await instance.post(`/${endpoint}`, payload);
  } catch (err) {
    return err.response;
  }
};

export const put = async (endpoint, payload) => {
  const baseURL = BaseUrl();

  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    return await instance.put(`/${endpoint}`, payload);
  } catch (err) {
    throw new Error(err);
  }
};

export const remove = async endpoint => {
  const baseURL = BaseUrl();

  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    return await instance.delete(`/${endpoint}`);
  } catch (err) {
    throw new Error(err);
  }
};
