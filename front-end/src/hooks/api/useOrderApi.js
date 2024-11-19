import React from "react";
import useAxiosPrivate from "../useAxiosPrivate";
const useOrderApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const getOrderInTimebyBranchID = async (id) => {
    try {
      const response = await axiosPrivate.get(`/orderInTime/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch order with BranchID ${id}:`, error);
      throw error;
    }
  };

  return { getOrderInTimebyBranchID };
};

export default useOrderApi;
