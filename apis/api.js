import { axiosInstance } from './axios';

export const get = async (param) => {
  const { url = '', headers = {} } = param;
  let result = await axiosInstance.get(url, { headers });
  return result;
};

export const post = async (param) => {
  const { url = '', data = {}, headers = {} } = param;
  const result = await axiosInstance.post(url, data, { headers });
  return result;
};

export const put = async (param) => {
    const { url = '', data = {}, headers = {} } = param;
    const result = await axiosInstance.put(url, data, { headers });
    return result;
  };

export const patch = async (param) => {
  const { url = '', data = {}, headers = {} } = param;
  const result = await axiosInstance.patch(url, data, { headers });
  return result;
};

export const del = async (param) => {
  const { url = '', headers = {}, data = {} } = param;
  const result = await axiosInstance.delete(url, { headers, data });
  return result;
};

export const api = {
  get,
  post,
  patch,
  del,
  put
};
