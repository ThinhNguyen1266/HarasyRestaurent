import useAxiosPrivate from "../useAxiosPrivate";
import axios from "../../services/axios";
import { useParams } from "react-router-dom";

const useAccountApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  console.log("param", params.id);
  const getProfile = async () => {
    try {
      const response = await axios.get(`/profile/${params.id}`);
      const profileData = response.data; // Access 'data' from the response
      console.log("data", profileData);
      return profileData;
    } catch (error) {
      throw error;
    }
  };
  

  return { getProfile };
};

export default useAccountApi;
