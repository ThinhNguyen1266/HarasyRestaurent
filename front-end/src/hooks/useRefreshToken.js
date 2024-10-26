import axios from "../services/axios";
import { useDispatch } from "react-redux";
import { newAccessToken } from "../redux/authSlice";
const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axios.post("/refresh", {
      withCredentials: true,
    });
    dispatch(newAccessToken(response));
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
