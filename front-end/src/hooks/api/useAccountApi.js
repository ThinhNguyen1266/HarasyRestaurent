import useAxiosPrivate from "../useAxiosPrivate";
import axios from "../../services/axios";
import useAuth from "../useAuth";

const useAccountApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const getProfile = async () => {
    try {
      const response = await axios.get(`/profile/${user.id}`);
      const profileData = response.data; // Access 'data' from the response
      console.log("acc data", profileData);
      return profileData;
    } catch (error) {
      throw error;
    }
  };
  

  return { getProfile };
};

export default useAccountApi;
