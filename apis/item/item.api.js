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

  export const postItems = async (title, content) => {
    try {
      const response = await api.post({
        url: '/posts',
        data: { title, content },
      });
      return response.data;
    } catch (error) {
      console.error('아이탭 입력하기 실패:', error.response);
      throw error;
    }
  };

  export const patchItems = async (title, content) => {
    try {
      const response = await api.patch({
        url: '/posts',
        data: { title, content },
      });
      return response.data;
    } catch (error) {
      console.error('아이탭 입력하기 실패:', error.response);
      throw error;
    }
  };


  export const deleteItems = async (id) => {
    try {
      const response = await api.del({
        url: `/posts/${id}`,
      });
      return response.data;
    } catch (error) {
      console.error('아이탭 삭제 실패:', error.response);
      throw error;
    }
  };


  export const detailItems = async (id) => {
    try {
      const response = await api.get({
        url: `/posts/${id}`,
      });
      return response.data;
    } catch (error) {
      console.error('아이탭 상세조회 실패:', error.response);
      throw error;
    }
  };

  export const itemLike = async (id) => {
    try {
      const response = await api.post({
        url: `/posts/${id}/like`,
      });
      return response.data;
    } catch (error) {
      console.error('아이탭 좋아 실패:', error.response);
      throw error;
    }
  };


  export const itemUnlike = async (id) => {
    try {
      const response = await api.post({
        url: `/posts/${id}/unlike`,
      });
      return response.data;
    } catch (error) {
      console.error('아이탭 싫어 실패:', error.response);
      throw error;
    }
  };
