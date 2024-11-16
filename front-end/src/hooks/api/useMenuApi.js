import React from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import axios, { axiosPrivate } from "../../services/axios";
import useAuth from "../useAuth";
import React from "react";

const useMenuApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getMenuByID = async (id) => {
    try {
      const response = await axios.get(`/menu/${id}`);
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

  return { addFoodToMenu, getMenuByID };
};

export default useMenuApi;
