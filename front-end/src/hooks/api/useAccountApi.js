import useAxiosPrivate from "../useAxiosPrivate";
import axios from "../../services/axios";
import useAuth from "../useAuth";

const useAccountApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const getProfile = async () => {
    try {
      console.log("user id", user.accountId);
      const response = await axios.get(`/profile/${user.accountId}`);
      const profileData = response.data;
      console.log("acc data", profileData);
      return profileData;
    } catch (error) {
      throw error;
    }
  };

  const updateCusProfile = async (updateCusProfile) => {
    try {
      const payload = {
        fullName: updateCusProfile.fullName,
        dob: updateCusProfile.dob,
        vipPoint: updateCusProfile.vipPoint,
      };

      // Sending the update request to the backend
      const cusProfile = await axiosPrivate.put(
        `/profile/${user.accountId}`,
        payload
      ).data;
      console.log("data sent:", payload);
      return cusProfile;
    } catch (error) {
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };

  return { getProfile ,updateCusProfile};
};

export default useAccountApi;
