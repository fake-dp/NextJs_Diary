import { api } from '../api';
import axios from 'axios';

export const test = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('테스트 실패:', error);
      throw error;
    }
  };
  

export const login = async (email, password) => {
    try {
      const response = await api.post({
        url: '/auth/login',
        data: { email, password },
      });
      return response.data;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

export const register = async (username, email, password) => {
  try {
    const response = await api.post({
      url: '/user',
      data: { username, email, password },
    });
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post({
      url: '/auth/reissue',
      data: { refreshToken },
    });
    return response.data;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    throw error;
  }
};

export const logout = async () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
  try {
    const response = await api.post({
      url: '/auth/logout',
      data: { accessToken, refreshToken },
    });
    return response.data;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};
