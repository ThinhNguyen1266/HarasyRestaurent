import React from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import axios, { axiosPrivate } from "../../services/axios";
import useAuth from "../useAuth";

const useFoodAPi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getFoodlist = async () => {
    try {
      const foodData = (await axios.get("/foods")).data;

      return foodData;
    } catch (error) {
      console.error("Error fetching food data:", error);
      throw error;
    }
  };
  const getFoodById = async (id) => {
    try {
      const foodData = (await axios.get(`/food/${id}`)).data;
      console.log("food id data:", foodData);
      return foodData;
    } catch (error) {
      console.error(`Failed to fetch food with ID ${id}:`, error);
      throw error;
    }
  };
  const createFood = async (newFood) => {
    try {
      const payload = {
        name: newFood.name,
        description: newFood.description,
        image: newFood.image,
        price: newFood.price,
        pointsPrice: newFood.pointsPrice,
        categoryId: newFood.categoryId,
      };
      console.log("api nhan duoc", payload);

      const response = await axiosPrivate.post("/food", payload);

      return response.data;
    } catch (error) {
      console.error("Server error details:", error.response?.data);
      throw error;
    }
  };

  const updateFood = async ({ id, ...updatedFood }) => {
    try {
      const response = await axiosPrivate.put(`/food/${id}`, updatedFood);
      console.log("API Response:", response);
      return response.data;
    } catch (error) {
      console.error(`Error updating food with ID ${id}:`, error.response?.data);
      throw error;
    }
  };

  const deleteFood = async (foodId) => {
    try {
      const response = await axiosPrivate.delete(`/food/${foodId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getMenubyBranchID = async (id) => {
    try {
      // Thêm tham số includeAll vào URL
      const response = await axiosPrivate.get(`/branch/${id}/menus`);
      console.log("response", response);
      return response;
    } catch (error) {
      console.error(`Failed to fetch menus for branch with ID ${id}:`, error);
      throw error;
    }
  };
  const updateFoodStatus = async ({ foodId, status }) => {
    try {
      const response = await axiosPrivate.put(`/food/${foodId}`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating table status:", error);
      throw error;
    }
  };

  return {
    getFoodlist,
    createFood,
    getFoodById,
    updateFood,
    deleteFood,
    getMenubyBranchID,
    updateFoodStatus,
  };
};

export default useFoodAPi;
