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
      console.log(payload); // For debugging purposes, this will show the payload being sent.

      // Make sure to include the payload in the POST request
      const response = await axiosPrivate.post("/quickregis/user", payload);

      // Return the response data from the API
      return response.data; // Adjust this based on the structure of your response
    } catch (error) {
      // Handle and log the error
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };

  return { quickRegis };
};

export default useQuickRegis;
