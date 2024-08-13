import { api } from '../api';

export const getItems = async () => {
    try {
      const response = await api.get({
        url: '/posts',
      });
      return response.data;
    } catch (error) {
      console.error('아이탬가져오기 실패:', error);
      throw error;
    }
  };