import { loginFail, loginStart, loginSuccess } from "../redux/authSlice";
import axios from "./index";

export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res));
    navigate("/");
  } catch (e) {
    dispatch(loginFail());
  }
};
