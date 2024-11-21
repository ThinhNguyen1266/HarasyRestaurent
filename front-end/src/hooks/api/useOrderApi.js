import React from "react";
import axios, { axiosPrivate } from "../../services/axios";
import useAxiosPrivate from "../useAxiosPrivate";
import useAuth from "../useAuth";
const useOrderApi = () => {
  const { user } = useAuth();
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

  const getCustomerOrders = async (page, size) => {
    try {
      const response = await axiosPrivate.get(
        `/customer/${user.customerId}/order?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer orders:", error);
      throw error;
    }
  };

  return { getOrderInTimebyBranchID, getCustomerOrders };
};

export default useOrderApi;
