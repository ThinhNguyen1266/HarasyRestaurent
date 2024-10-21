import axios from "axios";

const intance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 3000,
  header: {
    "Content-Type": "application/json",
  },
});

intance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default intance;
