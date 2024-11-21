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

  const Register = async (newAccount) => {
    try {
      const payload = {
        username: newAccount.username,
        password: newAccount.password,
        email: newAccount.email,
        fullName: newAccount.fullName,
        dob: newAccount.dob,
      };
      console.log(payload);

      const response = await axios.post("/regis/user", payload);

      return response.data;
    } catch (error) {
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };

  const sentOtp = async (newotp) => {
    try {
      const payload = {
        email: newotp.email,
        token: newotp.token,
      };
      console.log("du lieu gui api", payload);

      const response = await axios.post("/auth/validateOtp", payload);

      return response;
    } catch (error) {
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };

  const resentOtp = async (resentotp) => {
    try {
      const payload = {
        email: resentotp.email,
      };
      console.log("du lieu gui api", payload);

      const response = await axios.post("/resend/otp", payload);

      return response;
    } catch (error) {
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };
  const changePassWord = async (request) => {
    try {      

      // Sending the update request to the backend
      const cusProfile = await axiosPrivate.post(
        `/account/${user.accountId}/changePassword`,
        {
          oldPassword: request.password,
          newPassword: request.newPass,
          confirmPassword: request.confirmPass,
        }
      ).data;
      return cusProfile;
    } catch (error) {
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };

  return {
    getProfile,
    updateCusProfile,
    Register,
    sentOtp,
    resentOtp,
    changePassWord,
  };
};

export default useAccountApi;
