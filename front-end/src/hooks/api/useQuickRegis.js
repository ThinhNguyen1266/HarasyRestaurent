import React from "react";
import useAxiosPrivate from "../useAxiosPrivate";

const useQuickRegis = () => {
  const axiosPrivate = useAxiosPrivate();

  const quickRegis = async (newAccount) => {
    try {
      const payload = {
        email: newAccount.email,
        fullName: newAccount.fullName,
      };
      console.log(payload);

      const response = await axiosPrivate.post("/quickregis/user", payload);

      return response.data;
    } catch (error) {
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };

  return { quickRegis };
};

export default useQuickRegis;
