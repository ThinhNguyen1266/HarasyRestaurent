import { useEffect } from "react";
import { axiosPrivate } from "../services/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { accessToken } = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      async (response) => await response.data,
      async (error) => {
        const prevReqquest = error?.config;
        if (error?.response?.data?.code === 5003 && !prevReqquest?.sent) {
          prevReqquest.sent = true;
          const newAccesToken = await refresh();
          prevReqquest.headers["Authorization"] = `Bearer ${newAccesToken}`;
          return axiosPrivate(prevReqquest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
