import useAxiosPrivate from "../useAxiosPrivate";
import axios, { axiosPrivate } from "../../services/axios";
import useAuth from "../useAuth";
import React from "react";

const useMenuApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const getMenuByID = async (menuId) => {
    try {
      const response = await axios.get(`/menu/${menuId}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching menu:", error);
      throw error;
    }
  };

  const addFoodToMenu = async (menuId, foodIds) => {
    const response = await axiosPrivate.post(`/menu/${menuId}/foods`, {
      foodIds: foodIds,
    });
    return response.data;
  };

  const getMenubyBranchID = async () => {
    try {
      const branchId = user?.branchId;
      if (!branchId) throw new Error("Branch ID not found");
      // Thêm tham số includeAll vào URL
      const response = await axiosPrivate.get(`/branch/${branchId}/menus`);

      return response;
    } catch (error) {
      console.error(`Failed to fetch menus for branch with ID :`, error);
      throw error;
    }
  };
  const createOrder = async (orderData) => {
    try {
      const payload = {
        branchId: orderData.branchId,
        tableIds: orderData.tableIds,
        staffId: orderData.staffId,
        customer: orderData.customer.customerId
          ? {
              customerId: orderData.customer.customerId, // If customerId exists, use it
            }
          : orderData.customer.newCustomer // If no customerId, send newCustomer details
          ? {
              newCustomer: {
                email: orderData.customer.newCustomer.email,
                fullName: orderData.customer.newCustomer.fullName,
              },
            }
          : {}, // If no customer or newCustomer, send empty object (optional)
        orderItems: {
          creates: orderData.orderItems.creates.filter(
            (item) => item.foodId && item.quantity
          ),
          updates: orderData.orderItems.updates,
        },
        note: orderData.note || "",
      };

      console.log("payload", payload);

      const order = await axiosPrivate.post("/order", payload);

      return order;
    } catch (error) {
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };

  const getCustomerProfileByPhone = async (phone) => {
    try {
      const response = await axiosPrivate.get("/accounts", {
        params: { phone },
      });
      return response;
    } catch (error) {
      console.error("Error fetching customer by phone:", error);
      throw error;
    }
  };

  return {
    addFoodToMenu,
    getMenuByID,
    getMenubyBranchID,
    createOrder,
    getCustomerProfileByPhone,
  };
};

export default useMenuApi;
