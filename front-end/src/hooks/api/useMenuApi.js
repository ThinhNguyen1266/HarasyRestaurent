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
      console.log("response", response.data);
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
    return response;
  };

  const addReservation = async (reservationData) => {
    try {
      // Ensure that amountGuest is always a number
      const amountGuest = Number(reservationData.amountGuest) || 0; // Convert to number, default to 0 if invalid

      // Construct the payload as per the given format
      const payload = {
        branchId: reservationData.branchId,
        tableIds: reservationData.tableIds,
        customer: {
          customerId: reservationData.customer.customerId||"",
          newCustomer:{ fullName: reservationData.customer.name||"",
          email: reservationData.customer.email||"",}
        },
        date: reservationData.date,
        time: reservationData.time,
        amountGuest, // Use the sanitized number value for amountGuest
        typeId: reservationData.typeId,
        order: {
          branchId: reservationData.order.branchId,
          tableIds: reservationData.order.tableIds,
          staffId: reservationData.order.staffId,          
          orderItems: {
            creates: reservationData.order.orderItems.creates,
            updates: reservationData.order.orderItems.updates,
          },
          note: reservationData.order.note || "",
        },
      };

      
      // Send the POST request
      const response = await axiosPrivate.post("/reserve", payload);

      return response.data; // Return the successful response
    } catch (error) {
      console.error(
        "Error adding reservation:",
        error.response?.data || error.message
      );
      throw error; // Re-throw for upstream error handling
    }
  };

  const getReservationType = async () => {
    try {
      const reservationType = await axiosPrivate.get(`/reserve/type`);
      return await reservationType;
    } catch (error) {
    }
  };
  

  const getRerservationCus = async (page) => {
    try {

      const cusReservation = await axiosPrivate.get(
        `/branch/${user.branchId}/reserve`,
        {
          params: { page },
        }
      );

      return await cusReservation;
    } catch (error) {
      throw error;
    }
  };
  const getAvailableTablelist = async (request) => {
    try {

      const tableData = await axiosPrivate.post(
        `/reserve/availableTable`,
        request
      );
      return tableData;
    } catch (error) {
    }
  };

  const getMenubyBranchID = async () => {
    try {
      const branchId = user?.branchId;
      if (!branchId) throw new Error("Branch ID not found");
      const response = await axiosPrivate.get(`/branch/${branchId}/menus`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch menus for branch with ID :`, error);
      throw error;
    }
  };
  const editReservationOrder = async (request) => {
    try {

      // Construct the payload as per the given format
      const payload = {
        
        order: {
          branchId: request.order.branchId,
          tableIds: request.order.tableIds,
          staffId: request.order.staffId,          
          orderItems: {
            creates: request.order.orderItems.creates,
            updates: request.order.orderItems.updates,
          },
          note: request.order.note || "",
        },
      };
      
      // Send the POST request
      const response = await axiosPrivate.post(`/reserve/${request.id}`,{payload});

      return response.data; // Return the successful response
    } catch (error) {
      console.error(
        "Error adding reservation:",
        error.response?.data || error.message
      );
      throw error; // Re-throw for upstream error handling
    }
  };
  const deleteFoodFromMenu = async (menuId, foodIds) => {
    try {
      const response = await axiosPrivate.delete(`/menu/${menuId}/foods`, {
        data: {
          foodIds: foodIds,
        },
      });
      console.log("Data", foodIds);
      return response;
    } catch (error) {
      throw new Error(
        `Failed to delete food from menu: ${
          error.response?.data?.message || error.message
        }`
      );
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

  const getOrderByID = async (orderId) => {
    try {
      const response = await axiosPrivate.get(`/order/${orderId}`);
      console.log("Fetched order:", response); // Log only the useful data
      return response; // Return only the data part of the response
    } catch (error) {
      console.error(
        `Error fetching order with ID ${orderId}:`,
        error.response?.data || error.message
      );
      throw error; // Re-throw the error to handle it upstream
    }
  };

  const updateOrder = async (id, updatedOrder) => {
    try {
      const payload = {
        orderItems: {
          creates: (updatedOrder?.orderItems?.creates || []).filter(
            (item) => item.foodId && item.quantity > 0
          ),
          updates: (updatedOrder?.orderItems?.updates || []).filter(
            (item) => item.foodId && item.quantity > 0 && item.status
          ),
        },
        cooked: updatedOrder?.cooked || 0, // Pass cooked value
        note: updatedOrder?.note || "",
      };

      const response = await axiosPrivate.put(`/order/${id}`, payload);
      return response;
    } catch (error) {
      console.error(
        "Error updating order:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  return {
    addFoodToMenu,
    getMenuByID,
    getMenubyBranchID,
    createOrder,
    getCustomerProfileByPhone,
    getOrderByID,
    updateOrder,
    getRerservationCus,
    getReservationType,
    getAvailableTablelist,
    addReservation,
    deleteFoodFromMenu,
    editReservationOrder
  };
};

export default useMenuApi;
