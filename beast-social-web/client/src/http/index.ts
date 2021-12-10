import axios, { AxiosRequestConfig } from "axios";
import { checkAuthResponse } from "../store/reducers/UserSlice";

export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
  }

  return config;
});

$api.interceptors.response.use(
  (congif) => congif,
  async (err) => {
    const originRequest = err.config;

    if (err.response.status === 401 && err.config && !err.config._isRetry) {
      originRequest._isRetry = true;

      try {
        const res = await axios.get<checkAuthResponse>(
          "http://localhost:5000/api/auth/refresh",
          {
            withCredentials: true,
          }
        );

        localStorage.setItem("accessToken", res.data.accessToken);
        return $api.request(originRequest);
      } catch (e) {
        console.error(e);
      }
    }

    throw err;
  }
);

export default $api;
