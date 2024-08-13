import axios from "axios";

// basic axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["refreshtoken"] = refreshToken;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(response, "@@@response@@@");
    return response;
  },
  async (error) => {
    console.log("error", error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      console.log(refreshToken, "refreshToken");
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reissue`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            MemberId: memberId,
            RefreshToken: refreshToken,
          },
        }
      );
      console.log(response, "response");
      const newAccessToken = response.data.body.accessToken;
      localStorage.setItem("access_token", newAccessToken);

      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      originalRequest.headers["refreshtoken"] = refreshToken;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);