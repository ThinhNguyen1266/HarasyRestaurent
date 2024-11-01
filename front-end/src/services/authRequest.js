import {
  loginFail,
  loginStart,
  loginSuccess,
  logoutFail,
  logoutStart,
  logoutSuccess,
} from "../redux/authSlice";
import axios from "./axios";

export const login = async (user, dispatch, navigate, location) => {
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

export const logout = async (accessToken, dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    await axios.post("/logout", {
      accessToken,
    });
    dispatch(logoutSuccess());
    console.log("hi");
    navigate("/", { replace: true });
  } catch (e) {
    dispatch(logoutFail());
  }
};
