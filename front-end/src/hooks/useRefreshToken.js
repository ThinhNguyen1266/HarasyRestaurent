import axios from "../services/axios";
import { useDispatch } from "react-redux";
import { newAccessToken } from "../redux/authSlice";
const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const response = await axios.post("/auth/refreshToken", null, {
        withCredentials: true,
      });
      dispatch(newAccessToken(response));
      return response.data.accessToken;
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  return refresh;
};

export default useRefreshToken;
