import { loginFail, loginStart, loginSuccess } from "../redux/authSlice";
import axios from "./axios";

export const login = async (user, dispatch, navigate, location) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    const from = location?.state?.from.pathname || "/";
    dispatch(loginSuccess(res));
    navigate(from, { replace: true });
  } catch (e) {
    dispatch(loginFail());
  }
};
