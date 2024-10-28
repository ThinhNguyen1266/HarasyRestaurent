import axios from "axios";

const BASE_URL = "http://localhost:8080";

const axiosPublic = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  header: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  header: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosPublic.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosPublic;
