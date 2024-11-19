import {
  loginFail,
  loginStart,
  loginSuccess,
  logoutFail,
  logoutStart,
  logoutSuccess,
} from "../../redux/authSlice";
import axios from "../../services/axios";
import useAxiosPrivate from "../useAxiosPrivate";
const useAuthApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const login = async (user, dispatch, navigate, location) => {
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/login", user);
      const from = location?.state?.from?.pathname || "/";
      dispatch(loginSuccess(res));
      navigate(from, { replace: true });
    } catch (e) {
      dispatch(loginFail());
    }
  };

  const logout = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
      await axiosPrivate.post("/auth/logout");
      dispatch(logoutSuccess());
      navigate("/", { replace: true });
    } catch (e) {
      dispatch(logoutFail());
    }
  };
  return { login, logout };
};
export default useAuthApi;
